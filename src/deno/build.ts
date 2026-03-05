// /* 
//     this import val.town vals and deno https imports into functions usable in your workspace!
//     all the vals need to be listed in vals.js
// */

// import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
// // import * as path from "https://deno.land/std/path/mod.ts";
// // import { copy, walk } from "https://deno.land/std/fs/mod.ts";

// await emptyDir("./build");

// await build({
//   entryPoints: ["./index.ts"],
//   outDir: "./build",

//   // these will fail on hono stuff
//   typeCheck: false,
//   test: false,
//   declaration: false,
//   scriptModule: false,

//   shims: {
//     deno: false,
//   },
//   package: {
//     name: "deno",
//     version: Deno.args[0],
//     description: "imported deno modules",
//   },
//   // can import straight from /deno-src/build/esm/index.js, so no need to postBuild
//   // doing this also causes tailwind to go over all node_modules 
//   // async postBuild() {
//   //   // const srcDir = path.join("./build", "src");
//   //   const srcDir = path.join("./build");
//   //   const destDir = path.join("..", "src", "deno-src");

//   //   // Walk through the built files and rename .tsx to .js
//   //   for await (const entry of walk(srcDir)) {
//   //     if (entry.isFile && entry.path.endsWith(".tsx")) {
//   //       const oldPath = entry.path;
//   //       const newPath = oldPath.slice(0, -3) + "js";
//   //       await Deno.rename(oldPath, newPath);
//   //     }
//   //   }

//   //   await copy(srcDir, destDir, { overwrite: true });
//   // },
// });