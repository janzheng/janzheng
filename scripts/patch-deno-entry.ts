const entryPath = new URL("../dist/server/entry.mjs", import.meta.url);

let entryText: string;
try {
  entryText = await Deno.readTextFile(entryPath);
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    console.log("patch-deno-entry: dist/server/entry.mjs not found, skipping.");
    Deno.exit(0);
  }
  throw error;
}

const shimImport = "import '@deno/astro-adapter/__deno_imports.ts';";
if (!entryText.includes(shimImport)) {
  console.log("patch-deno-entry: shim import not present, nothing to patch.");
  Deno.exit(0);
}

const patched = entryText.replace(shimImport + "\n", "");
await Deno.writeTextFile(entryPath, patched);
console.log("patch-deno-entry: removed adapter shim import from entry.mjs.");
