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

// Caller-side retry for the CF-edge 403 pattern on new Deno Deploy.
// Deno Deploy's CF edge runs managed WAF / Bot Fight rules that score
// server-to-server POSTs and block some with empty-body 403s pre-origin.
// Retry is safe for this specific pattern because the request never
// executed on origin. Only 403s with no structured body retry; 401/400/410/
// 5xx pass through in one attempt.
const POST_RETRY_DELAYS_MS = [0, 900, 2500]; // + jitter

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

  let response: Response;
  let text = '';
  let body: any;

  for (let attempt = 0; attempt < POST_RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) {
      const jitter = Math.floor(Math.random() * 500);
      const delay = POST_RETRY_DELAYS_MS[attempt] + jitter;
      console.log(`[executePipeline trace=${traceId}] retry ${attempt}/${POST_RETRY_DELAYS_MS.length - 1} after ${delay}ms (prev CF-edge 403)`);
      await new Promise(r => setTimeout(r, delay));
    }
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
      console.error(`[executePipeline trace=${traceId}] network error:`, message);
      return {
        ok: false,
        error: { code: 'NETWORK_ERROR', message, statusCode: 0 },
        traceId,
      };
    }
    text = await response.text();
    try { body = JSON.parse(text); } catch { body = { raw: text }; }
    // Narrow retry: only the "CF-edge 403 pre-origin" shape — 403 with
    // no structured response body. Envelope-v2 bodies have `ok`.
    const isCfEdge403 = response.status === 403 && (!text || typeof body?.ok === 'undefined');
    if (!isCfEdge403) break;
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

  // CF-edge 403 that survived retries — empty body, no envelope. Surface
  // a clearer human message so the Astro action can show users something
  // actionable instead of raw "Forbidden".
  const isExhaustedCfEdge403 = response.status === 403 && (!text || typeof body?.ok === 'undefined');
  if (isExhaustedCfEdge403) {
    console.error(`[executePipeline trace=${traceId}] CF-edge 403 after ${POST_RETRY_DELAYS_MS.length} attempts — upstream WAF blocked`);
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
