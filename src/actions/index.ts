
// import 'dotenv/config';
// import 'jsr:@std/dotenv/load';

import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
// import sheet, { Sheet } from '@yawnxyz/sheetlog';
import sheet from '../lib/sheetlogs.ts';



export const server = {
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