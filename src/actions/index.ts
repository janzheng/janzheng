
// import 'dotenv/config';
// import 'jsr:@std/dotenv/load';

import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
// import sheet, { Sheet } from '@yawnxyz/sheetlog';
import sheet from '../lib/sheetlogs.ts';
import { executePipeline } from '../lib/pipeline.ts';



export const server = {
  // Proxy for coverflow.labspace.ai/execute. The CF Worker rejects
  // unauthed browser POSTs; this action runs on the server with
  // COVERFLOW_API_KEY in the environment so the worker accepts the
  // call. Converters in moreWithLess call this via actions.pipe().
  pipe: defineAction({
    input: z.object({
      pipeline: z.any(),
    }),
    handler: async ({ pipeline }) => {
      const result = await executePipeline(pipeline, { verbose: false, useCache: true });
      if (!result.ok) {
        console.error('[pipe] pipeline failed:', result.error, 'trace:', result.traceId);
        throw new ActionError({
          code: result.error.statusCode === 0 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST',
          message: result.error.message,
        });
      }
      // Return coverflow's `.result` object as-is (with its own `.data`,
      // `.messages`, etc. wrapping). Callers alias it back to `result`
      // so their existing field access (`result.data.text`, `result.messages`)
      // keeps working without rewrites.
      return result.result;
    },
  }),

  newsletter: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      terms: z.boolean(),
    }),
    handler: async ({ email, terms }) => { /* ... */ },
  }),
  emailSignup: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      attendance: z.string(), // Mandatory attendance
      note: z.string().optional(), // Optional note
    }),
    handler: async ({ email, name, attendance, note }) => { 
      try {
        if (!attendance) {
          throw new Error("Attendance is required.");
        }

        // console.log("email", email, name, attendance, note, 'env:', import.meta.env.SHEET_URL)

        sheet.setup({
          sheetUrl: import.meta.env.SHEET_URL,
          sheet: "emails"
        });

        sheet.log({ email, name, attendance, note })
      } catch (error) {
        console.error("Error in emailSignup handler:", error);
        // You might want to return an error response or handle the error appropriately
      }
    },
  })
}