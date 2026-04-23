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

export async function executePipeline(
  pipeline: any,
  settings: any = {},
): Promise<PipelineResult> {
  const apiKey = import.meta.env.COVERFLOW_API_KEY;
  // envelope=v2: response body is always
  //   { ok: true, result, meta, steps } on success, or
  //   { ok: false, error, meta } on failure.
  const url = 'https://coverflow.labspace.ai/execute?envelope=v2';

  const traceId = crypto.randomUUID();
  console.log(`[executePipeline trace=${traceId}] → ${url}`);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Trace-Id': traceId,
        ...(apiKey ? { 'X-API-Key': apiKey } : {}),
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

  const text = await response.text();
  let body: any;
  try { body = JSON.parse(text); } catch { body = { raw: text }; }

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
