// Portfolio candidate: preserve existing direct/proxy routing; single-attempt writes.
export type PipelineResult =
  | { ok: true; result: any; meta?: any; steps?: any[] }
  | { ok: false; error: { code: string; message: string; statusCode: number }; traceId: string };

export async function executePipeline(
  pipeline: any,
  settings: any = {},
): Promise<PipelineResult> {
  const env = import.meta.env ?? {};
  const viaProxy = !!env.VALTOWN_COVERFLOW_PROXY_URL && !!env.VALTOWN_COVERFLOW_PROXY_SECRET;
  const baseUrl = viaProxy ? `${env.VALTOWN_COVERFLOW_PROXY_URL.replace(/\/$/, '')}/execute`
    : 'https://coverflow.labspace.ai/execute';
  const traceId = crypto.randomUUID();
  const failure = (code: string, statusCode: number, message: string): PipelineResult => {
    console.warn('[executePipeline]', { traceId, code, statusCode });
    return { ok: false, error: { code, statusCode, message }, traceId };
  };
  // Direct execution has no durable acceptance identity. Never replay, including
  // empty 403, gateway failure, redirect, timeout or lost response body.
  let response: Response;
  let body: any;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 300_000);
  try {
    response = await fetch(`${baseUrl}?envelope=v2`, {
      method: 'POST', redirect: 'manual', signal: controller.signal,
      headers: {
        'Content-Type': 'application/json', 'X-Trace-Id': traceId,
        ...(viaProxy ? { 'X-Proxy-Secret': env.VALTOWN_COVERFLOW_PROXY_SECRET }
          : env.COVERFLOW_API_KEY ? { 'X-API-Key': env.COVERFLOW_API_KEY } : {}),
      },
      body: JSON.stringify({ ...settings, pipeline }),
    });
    body = JSON.parse(await response.text());
  } catch {
    return failure('WRITE_OUTCOME_UNKNOWN', 0,
      'The response could not be confirmed. The operation may have completed; check before submitting again.');
  } finally {
    clearTimeout(timer);
  }
  if (response.status >= 500 || (response.status >= 300 && response.status < 400)) {
    return failure('WRITE_OUTCOME_UNKNOWN', response.status,
      'The response could not be confirmed. The operation may have completed; check before submitting again.');
  }
  if (!response.ok || body?.ok === false) {
    // Provider errors/details may contain credentials or submitted private data.
    const code = response.status === 401 ? 'UNAUTHORIZED' : response.status === 403 ? 'FORBIDDEN' : 'UPSTREAM_ERROR';
    return failure(code, response.status, 'The service could not complete this request.');
  }
  console.log('[executePipeline]', { traceId, statusCode: response.status, ok: true });
  return body?.ok === true
    ? { ok: true, result: body.result, meta: { ...body.meta, traceId }, steps: body.steps }
    : { ok: true, result: body, meta: { ...body?._meta, traceId }, steps: body?.steps };
}
