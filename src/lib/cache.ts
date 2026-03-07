const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

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

  if (!refresh) {
    const entry = cache.get(url);
    if (entry && Date.now() - entry.timestamp < ttl) {
      return entry.data;
    }
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  cache.set(url, { data, timestamp: Date.now() });

  return data;
}
