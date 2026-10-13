const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const CONTENT_DEADLINE_MS = 15_000;
const MAX_CONTENT_BYTES = 8 * 1024 * 1024;

interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/** Buffer a GET within one deadline, including its streamed body. */
async function fetchContent(url: string, fetchOptions?: RequestInit): Promise<any> {
  const deadline = Date.now() + CONTENT_DEADLINE_MS;
  const controller = new AbortController();
  const callerSignal = fetchOptions?.signal;
  const abort = () => controller.abort();
  callerSignal?.addEventListener("abort", abort, { once: true });
  if (callerSignal?.aborted) abort();
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let rejectAbort: () => void = () => {};
  const aborted = new Promise<never>((_, reject) => {
    rejectAbort = () => {
      void reader?.cancel().catch(() => {});
      reject(new Error("Content unavailable"));
    };
    controller.signal.addEventListener("abort", rejectAbort, { once: true });
  });
  const timer = setTimeout(abort, CONTENT_DEADLINE_MS);
  try {
    const work = (async () => {
      controller.signal.throwIfAborted();
      const response = await fetch(url, { ...fetchOptions, method: "GET", signal: controller.signal, redirect: "manual" });
      reader = response.body?.getReader();
      if (controller.signal.aborted) void reader?.cancel().catch(() => {});
      controller.signal.throwIfAborted();
      // Never read, parse or cache redirect/error payloads.
      if (!response.ok) throw new Error("Content unavailable");
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (reader) {
        const part = await reader.read();
        controller.signal.throwIfAborted();
        if (part.done) break;
        size += part.value.byteLength;
        if (size > MAX_CONTENT_BYTES) throw new Error("Content unavailable");
        chunks.push(part.value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      const data = JSON.parse(new TextDecoder().decode(bytes));
      controller.signal.throwIfAborted();
      if (Date.now() >= deadline) throw new Error("Content unavailable");
      return data;
    })();
    return await Promise.race([work, aborted]);
  } catch {
    // Do not propagate provider payloads, URLs or transport error details.
    throw new Error("Content unavailable");
  } finally {
    clearTimeout(timer);
    controller.signal.removeEventListener("abort", rejectAbort);
    callerSignal?.removeEventListener("abort", abort);
    controller.abort();
    void reader?.cancel().catch(() => {});
  }
}

/**
 * Fetch with in-memory caching. Cached responses are returned until TTL expires.
 * Pass `refresh: true` to bypass the cache and re-fetch.
 */
export async function cachedFetch(
  url: string,
  options?: {
    refresh?: boolean;
    ttl?: number;
    fetchOptions?: RequestInit;
  }
): Promise<any> {
  const { refresh = false, ttl = DEFAULT_TTL_MS, fetchOptions } = options ?? {};
  if ((fetchOptions?.method ?? "GET").toUpperCase() !== "GET") {
    throw new Error("Only GET content requests are supported");
  }
  if (!refresh) {
    const entry = cache.get(url);
    if (entry && Date.now() - entry.timestamp < ttl) return entry.data;
  }
  const data = await fetchContent(url, fetchOptions);
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}
