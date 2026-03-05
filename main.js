// import { handle } from "./dist/server/entry.mjs";
// import { serveDir } from "jsr:@std/http/file-server";

// export default {
//     async fetch(req) {
//         // try to serve static files from the client directory
//         const res = await serveDir(req, {
//             fsRoot: "./app/dist/client",
//         });
//         if (res.status !== 404) {
//             return res;
//         }

//         // if the file was not found, pass the request to the app
//         return handle(req);
//     },
// };


// // import { Hono } from "npm:hono";
// // import { serveStatic } from "npm:hono/deno";
// // import { handle as ssrHandler } from "./dist/server/entry.mjs";

// // const app = new Hono();

// // // Serve static files
// // app.use("/*", serveStatic({ root: "./app/dist/client/" }));

// // // Use the SSR handler
// // app.use(ssrHandler);

// // console.log("Server is running on http://localhost:3000");

// // // Export app.fetch for Val Town, otherwise export app
// // 
// export default (typeof Deno !== "undefined" && Deno.env.get("valtown")) ? app.fetch : app;
