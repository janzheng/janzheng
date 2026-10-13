/** One outstanding save per editor. Unknown writes stay locked until reload/read-back. */
export function createResumeSaver(write: (payload: {Id:string;Resume:string}, options: {id:string;idColumn:string}) => Promise<unknown>) {
  let pending = false;
  let uncertain = false;
  return async (id: string, text: string) => {
    if (uncertain) return {status:'unknown' as const};
    if (pending) return {status:'busy' as const};
    if (typeof id !== 'string' || !id.trim() || id.length > 200 || typeof text !== 'string' || new TextEncoder().encode(text).byteLength > 1024 * 1024) return {status:'invalid' as const};
    try { const data=JSON.parse(text); if (!data || typeof data !== 'object' || Array.isArray(data)) return {status:'invalid' as const}; }
    catch { return {status:'invalid' as const}; }
    pending = true;
    let timer: ReturnType<typeof setTimeout>;
    try {
      const result = await Promise.race([write({Id:id,Resume:text},{id,idColumn:'Id'}), new Promise((_, reject) => {timer=setTimeout(() => reject(new Error('Unconfirmed save')), 15_000);})]) as {status?:number;data?:{message?:string}} | undefined;
      // The bundled Apps Script contract acknowledges UPSERT with these pairs.
      if ((result?.status === 200 && result.data?.message === 'Row updated') ||
          (result?.status === 201 && result.data?.message === 'Row inserted')) return {status:'confirmed' as const};
      uncertain = true;
      return {status:'unknown' as const};
    } catch {
      uncertain = true;
      return {status:'unknown' as const};
    } finally { clearTimeout(timer!); pending = false; }
  };
}
