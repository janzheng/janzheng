// Server-only execution definitions. Browser selectors confer no settings authority.
const hosts = new Set(['janzheng.com', 'www.janzheng.com', 'janzheng.yawnxyz.deno.net']);
function object(value: any, keys: string[]) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !keys.includes(key))) throw new Error('Invalid converter input.');
  return value;
}
function text(value: any, limit: number) {
  if (typeof value !== 'string' || !value.trim() || value.length > limit || /[{}]|^(?:raw|jq):/i.test(value)) throw new Error('Invalid converter input.');
  return value;
}
function date(value: any) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error('Invalid date.');
  return value;
}
function currency(value: any) {
  if (typeof value !== 'string' || !/^[A-Z]{3}$/.test(value)) throw new Error('Invalid currency.');
  return value;
}
function amount(value: any) {
  if (typeof value !== 'string' || !/^-?\d{1,12}(?:\.\d{1,8})?$/.test(value) || !Number.isFinite(Number(value))) throw new Error('Invalid amount.');
  return value;
}
function currencies(value: any) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 8 || new Set(value).size !== value.length) throw new Error('Invalid currencies.');
  return value.map(currency);
}
export function prepareConverter(value: unknown, request: Request) {
  const url = new URL(request.url);
  if (request.method !== 'POST' || url.protocol !== 'https:' || !hosts.has(url.hostname) || request.headers.get('origin') !== url.origin || !['same-origin', null].includes(request.headers.get('sec-fetch-site'))) throw new Error('Converter origin is not authorized.');
  const input = object(value, ['definitionId', 'entries']);
  const id = input.definitionId;
  if (id === 'currency-v1') {
    const fields = object(input.entries, ['amount', 'from', 'to', 'date']);
    return [{ name: 'getCurrency', settings: { amount: amount(fields.amount), from: currency(fields.from), to: currency(fields.to), date: date(fields.date) } }];
  }
  if (id === 'chat-v1' || id === 'concierge-v1') {
    const fields = object(input.entries, ['prompt', 'date']);
    return aiDefinition(id, { prompt: text(fields.prompt, 4000), date: date(fields.date) });
  }
  if (id === 'rube-v1') {
    const fields = object(input.entries, ['amount', 'from', 'to', 'date']);
    const entries = { amount: amount(fields.amount), from: currencies(fields.from), to: currencies(fields.to), date: date(fields.date) };
    if (entries.from.length * entries.to.length > 16) throw new Error('Too many conversions.');
    return aiDefinition(id, entries);
  }
  throw new Error('Unknown converter definition.');
}
function groq(prompt: string) {
  return [{ name: 'ai', settings: { tools: ['getCurrency'], prompt, model: 'llama3-groq-8b-8192-tool-use-preview', provider: 'groq' } }];
}
function aiDefinition(id: string, input: any) {
  if (id === 'chat-v1') return groq(`${input.prompt} | Today's date is ${input.date}`);
  if (id === 'concierge-v1') {
const prompt = `Ask: ${input.prompt} | 
          If the user's ask about currencies is nuanced, please add furter explanation. If the request asks about multiple or area currencies, please decide how to run multiple function calling, run them an explain the output in your answer.
          Always use the currency conversion function.
          Today's date is ${input.date}
        `;
    return [
      { name: 'ai', settings: { tools: ['getCurrency'], prompt, model: 'gpt-4o-mini', provider: 'openai' } },
      { name: 'ai', settings: { prompt: `Please use the context to asnswer the following query:<query>${prompt}</query>. Be succinct in your answer. Just respond to the answer, don't reflect on the question or explain your answer.`, model: 'llama3-70b-8192', provider: 'groq' } }
    ];
  }
  const prompt = `Please convert the amount ${input.amount} for all possible combinations of the following currencies:
        From currencies: ${input.from.join(', ')}
        To currencies: ${input.to.join(', ')}

        Instructions:
        1. Create a conversion for each possible pair of FROM currency to TO currency.
        2. Use one function call for each currency pair, as it only handles ONE CURRENCY PAIR at a time.
        3. Output your answers in an array of JSON objects, with each object structured as follows:
        {
          from: "USD",
          to: "EUR",
          amount: 100,
          result: 116.92
        }

        4. Ensure you make ${input.from.length * input.to.length} conversions in total.
        5. If a conversion is not possible or the function call fails, provide your best estimate and add "(guess)" to the 'to' field, e.g., "EUR (guess)".
        6. Review your answers after all function calls to ensure completeness and accuracy.
        7. Return the final result as a JSON array of objects.`;
  return groq(`${prompt} | Today's date is ${input.date}`);
}

/** Each request receives fresh settings; never retry an ambiguous provider POST. */
export async function runConverter(value: unknown, request: Request, execute: Function) {
  const pipeline = prepareConverter(value, request);
  const result = await execute(pipeline, { verbose: false, useCache: true });
  if (!result.ok) throw new Error('Conversion unavailable. Please try again later.');
  return result.result;
}
