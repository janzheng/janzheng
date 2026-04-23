// Centralized coverflow pipeline executor.
// Used by server-side Astro actions that proxy browser requests.
//
// Why server-side: coverflow.labspace.ai/execute is gated behind
// CF_ORIGIN_SECRET + COVERFLOW_API_KEY by the CF Worker, so browser
// POSTs get 401. Calling executePipeline() from an Astro action adds
// the API key header on the server and returns the result to the
// browser as a normal action response.
//
// Mirrors labspace/src/lib/pipeline.ts; kept in sync deliberately.

export type PipelineResult =
  | { ok: true; result: any; meta?: any; steps?: any[] }
  | {
      ok: false;
      error: { code: string; message: string; statusCode: number; details?: any };
      raw?: any;
      traceId: string;
    };

// Caller-side retry budget. Retry on three safe-to-repeat patterns:
//   1. CF-edge 403 with no body (pre-origin block; request never ran).
//   2. 5xx from upstream (502/503/504 — transient infra hiccup or val /
//      coverflow-v3 cold-start warmup).
//   3. Network-level errors (connection closed, TLS handshake failed,
//      fetch threw). Most often also pre-origin.
// 401/400/410/422/429 + 2xx pass through in one attempt.
// Budget is cold-start-friendly: coverflow-v3's Deno Deploy isolate
// cold-starts in 15–25s. Total delay across retries ~17s + per-attempt
// fetch time. Mirrors labspace.
const POST_RETRY_DELAYS_MS = [0, 2000, 5000, 10000]; // 4 attempts, + jitter

export async function executePipeline(
  pipeline: any,
  settings: any = {},
): Promise<PipelineResult> {
  const apiKey = import.meta.env.COVERFLOW_API_KEY;
  // Val.town proxy (labspace/BRIEF-valtown-proxy.md): if
  // VALTOWN_COVERFLOW_PROXY_URL is set on Deno Deploy env, route through
  // the val to sidestep the Deno CF-edge WAF that blocks Deno-to-Deno
  // server-side POSTs. Auth switches from X-API-Key to X-Proxy-Secret;
  // the val adds X-API-Key on its own outbound. Unset proxy URL = direct
  // path (pre-workaround).
  const proxyUrl = import.meta.env.VALTOWN_COVERFLOW_PROXY_URL;
  const proxySecret = import.meta.env.VALTOWN_COVERFLOW_PROXY_SECRET;
  const viaProxy = !!proxyUrl && !!proxySecret;
  const baseUrl = viaProxy
    ? `${proxyUrl.replace(/\/$/, '')}/execute`
    : 'https://coverflow.labspace.ai/execute';
  // envelope=v2: response body is always
  //   { ok: true, result, meta, steps } on success, or
  //   { ok: false, error, meta } on failure.
  const url = `${baseUrl}?envelope=v2`;

  const traceId = crypto.randomUUID();
  console.log(`[executePipeline trace=${traceId}] → ${url}`);

  let response!: Response;
  let text = '';
  let body: any;
  let lastNetworkError: string | null = null;

  for (let attempt = 0; attempt < POST_RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) {
      const jitter = Math.floor(Math.random() * 500);
      const delay = POST_RETRY_DELAYS_MS[attempt] + jitter;
      const reason = lastNetworkError
        ? `network error: ${lastNetworkError}`
        : response?.status === 403
          ? 'CF-edge 403'
          : `HTTP ${response?.status}`;
      console.log(`[executePipeline trace=${traceId}] retry ${attempt}/${POST_RETRY_DELAYS_MS.length - 1} after ${delay}ms (prev ${reason})`);
      await new Promise(r => setTimeout(r, delay));
    }
    lastNetworkError = null;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Trace-Id': traceId,
          // Via val.town proxy, send X-Proxy-Secret; val adds X-API-Key
          // on its outbound. Direct path uses X-API-Key.
          ...(viaProxy
            ? { 'X-Proxy-Secret': proxySecret }
            : apiKey ? { 'X-API-Key': apiKey } : {}),
        },
        body: JSON.stringify({ pipeline, ...settings }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[executePipeline trace=${traceId}] network error (attempt ${attempt + 1}/${POST_RETRY_DELAYS_MS.length}):`, message);
      lastNetworkError = message;
      // Retry network errors if budget remains; give up on final.
      if (attempt < POST_RETRY_DELAYS_MS.length - 1) continue;
      return {
        ok: false,
        error: { code: 'NETWORK_ERROR', message, statusCode: 0 },
        traceId,
      };
    }
    text = await response.text();
    try { body = JSON.parse(text); } catch { body = { raw: text }; }
    // Retry-safe patterns:
    //   - CF-edge 403 with no envelope body (pre-origin block; didn't run).
    //   - 5xx transient (cold-start warmup / gateway flake).
    // Deterministic results (2xx, 4xx non-403) break out immediately.
    const isCfEdge403 = response.status === 403 && (!text || typeof body?.ok === 'undefined');
    const isUpstreamTransient = response.status >= 502 && response.status <= 504;
    if (!isCfEdge403 && !isUpstreamTransient) break;
  }

  // Envelope v2: trust body.ok over response.ok (so a 200 with ok:false
  // surfaces consistently).
  if (body && typeof body.ok === 'boolean') {
    if (body.ok) {
      return {
        ok: true,
        result: body.result,
        meta: { ...(body.meta ?? {}), traceId },
        steps: body.steps,
      };
    }
    console.error(`[executePipeline trace=${traceId}] HTTP ${response.status}:`, body.error);
    return {
      ok: false,
      error: {
        code: body.error?.code ?? 'UPSTREAM_ERROR',
        message: body.error?.message ?? response.statusText,
        statusCode: body.error?.statusCode ?? response.status,
        details: body.error?.details,
      },
      raw: body,
      traceId,
    };
  }

  // Exhausted retries on a transient failure (CF-edge 403 with no body,
  // OR 5xx upstream). Surface a clear human message instead of raw
  // statusText so the Astro action layer shows users something actionable.
  const isExhaustedCfEdge403 = response.status === 403 && (!text || typeof body?.ok === 'undefined');
  const isExhaustedTransient = response.status >= 502 && response.status <= 504;
  if (isExhaustedCfEdge403 || isExhaustedTransient) {
    console.error(`[executePipeline trace=${traceId}] exhausted ${POST_RETRY_DELAYS_MS.length} attempts — final HTTP ${response.status}`);
    return {
      ok: false,
      error: {
        code: 'UPSTREAM_THROTTLED',
        message: 'Service temporarily unavailable — please try again in a moment.',
        statusCode: 503,
      },
      raw: body,
      traceId,
    };
  }

  // Legacy fallback (pre-v2 envelope, in case coverflow serves the
  // un-envelope'd shape during a rollout).
  if (!response.ok) {
    console.error(`[executePipeline trace=${traceId}] HTTP ${response.status} (legacy):`, body);
    return {
      ok: false,
      error: {
        code: body?.code ?? 'UPSTREAM_ERROR',
        message: body?.message ?? response.statusText,
        statusCode: response.status,
        details: body?.details,
      },
      raw: body,
      traceId,
    };
  }

  return {
    ok: true,
    result: body,
    meta: { ...(body?._meta ?? {}), traceId },
    steps: body?.steps,
  };
}
