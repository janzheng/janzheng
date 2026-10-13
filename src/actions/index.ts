
// import 'dotenv/config';
// import 'jsr:@std/dotenv/load';

import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
// import sheet, { Sheet } from '@yawnxyz/sheetlog';
import { Sheet } from '../lib/sheetlogs.ts';
import { executePipeline } from '../lib/pipeline.ts';
import { runConverter } from '../server/converter-definitions.ts';



export const server = {
  // Proxy for coverflow.labspace.ai/execute. The CF Worker rejects
  // unauthed browser POSTs; this action runs on the server with
  // COVERFLOW_API_KEY in the environment so the worker accepts the
  // call. Converters in moreWithLess call this via actions.pipe().
  pipe: defineAction({
    input: z.unknown(),
    handler: async (input, { request }) => {
      try { return await runConverter(input, request, executePipeline); }
      catch { throw new ActionError({code:'BAD_REQUEST',message:'Conversion unavailable. No automatic retry was made.'}); }
    },
  }),

  newsletter: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email().max(254),
      terms: z.boolean(),
    }),
    handler: async ({ email, terms }) => { /* ... */ },
  }),
  emailSignup: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().trim().min(1).max(200),
      email: z.string().email().max(254),
      attendance: z.string().trim().min(1).max(100), // Mandatory attendance
      note: z.string().max(4000).optional(), // Optional note
    }),
    handler: async ({ email, name, attendance, note }, { request }) => {
      const url = new URL(request.url);
      if (url.protocol !== 'https:' || !['janzheng.com','www.janzheng.com','janzheng.yawnxyz.deno.net'].includes(url.hostname) || request.headers.get('origin') !== url.origin) {
        throw new ActionError({code:'FORBIDDEN',message:'Request origin is not authorized.'});
      }
      const sheet = new Sheet();
      sheet.setup({sheetUrl:import.meta.env.SHEET_URL,sheet:'emails',logPayload:false});
      try {
        const result = await sheet.log({email,name,attendance,note});
        if (!result || result.status !== 201) throw new Error('Unconfirmed write');
        return {ok:true};
      } catch {
        throw new ActionError({code:'INTERNAL_SERVER_ERROR',message:'Submission outcome unknown. Check before submitting again.'});
      }
    },
  })
}
