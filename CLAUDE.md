# janzheng — project notes for Claude

## ⚠️ Deploying to Deno Deploy — READ BEFORE TOUCHING DEPLOY SCRIPTS

**Canonical working reference (always diff against this first when deploys break):**

- Repo: `/Users/janzheng/Desktop/Projects/_deno/__active/astro-vanilla-deno/zapping-zero`
- Live: https://zapping-zero.yawnxyz.deno.net/
- **Never** misbehaves. If janzheng (or labspace, its parent) deploy breaks, diff config against zapping-zero before debugging anything else.

### The zapping-zero recipe

```jsonc
// deno.jsonc — literally this, nothing more
{ "deploy": { "org": "yawnxyz", "app": "zapping-zero" } }
```

```json
// package.json — no deploy script, no dist arg, nothing fancy
"scripts": {
  "dev": "astro dev",
  "build": "astro build && deno run --allow-read --allow-write ./scripts/patch-deno-entry.ts",
  "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs",
  "astro": "astro"
}
```

To deploy: `cd <project> && deno deploy --prod` — **no positional path, no flags beyond `--prod`**. The Astro preset (configured in the app's dashboard: `deno install` + `deno task build`) handles everything server-side.

### ⛔️ The `./dist` trap (root-caused 2026-04-23)

`deno deploy` treats its positional arg as the **upload root**, NOT as an app-directory hint. Passing `./dist` uploads only `./dist/` contents — which have no `deno.json` or `package.json`, so Deno Deploy's Astro preset runs `deno task build` and fails with:

```
error: deno task couldn't find deno.json(c) or package.json.
```

**Never pass `./dist` (or any positional) to `deno deploy`.** Deploy from the project root. If you see deploy scripts with `./dist` in them, that's the bug — remove it.

### What the deploy scripts should look like (janzheng, post-fix)

```json
// package.json
"prod": "npm run build && deno deploy --org yawnxyz --app janzheng --prod",
"test": "npm run build && deno deploy --org yawnxyz --app janzheng"
```

```json
// deno.json tasks
"deploy:dev": "npm run build && deno deploy --org yawnxyz --app janzheng",
"deploy:prod": "npm run build && deno deploy --org yawnxyz --app janzheng --prod"
```

### Janzheng-specific notes beyond the minimal recipe

- `deno.json` has `nodeModulesDir: "manual"` + a hand-maintained `imports` map. Same pattern as labspace (janzheng forked from it). Load-bearing for the current dep surface.
- `patch-deno-entry.ts` in `scripts/` is a workaround for https://github.com/denoland/deno-astro-adapter/issues/47 — strips one stray shim import from `dist/server/entry.mjs` that otherwise fails at warmup. Wired into `build` script.
- App dashboard config on Deno Deploy: **20-min build timeout, 4 GiB build memory** (higher than labspace because `svelte-jsoneditor` is a big compilation surface). Default 5-min / 1 GiB will fail with `Build cancelled`.
- Direct-deps the bundle needs but yarn hoisted silently (add to `package.json` if you hit them again): `prismjs` (transitive via `cmdk-sv`). Deno Deploy's `deno install` doesn't hoist transitive deps the way yarn does locally.
- macOS APFS is case-insensitive — Astro 6 + Linux (Deno Deploy) is case-sensitive. Any mismatched-case imports (e.g. `SocialBox.svelte` importing `./Socialbox.svelte`) pass local build, fail server build. Grep imports on any new file added.

## ⚠️ Two separate Deno Deploy apps — don't cross-deploy

`janzheng` and `labspace` are **separate apps** on the same Deno Deploy org (`yawnxyz`). Each repo's deploy script is hard-coded to its own `--app`. Never run ad-hoc `deno deploy --app labspace ...` from the janzheng directory (or vice versa) — the positional upload gets paired with the wrong app config, and because custom domains are attached at the app level, all the other app's domains start serving the wrong content.

That happened on 2026-04-23 — a janzheng build somehow landed on the labspace app, and jess.bio + swyripa.ca + labspace.ai all rendered janzheng's portfolio until we rebuilt + redeployed labspace from its own repo. **Telltale**: `curl https://labspace.yawnxyz.deno.net/resume` returns 200 → cross-deploy happened (labspace has no `/resume`, janzheng does).

## Related references

- `.brief/resume-system.md` — how the `/resume` system works (URL params, edit/save workflow, schema, where the data lives). Read this before touching `Resume.svelte` or `resume.astro` — it's also the reference jan reaches for when updating his own resume.
- `../labspace/.brief/deno-deploy-astro-ssr.md` — full Astro SSR deploy recipe (corrected 2026-04-23 to drop the wrong `./dist` guidance).
- `../labspace/CLAUDE.md` — parent project with the same deploy discipline. Stay in sync on any deploy-recipe change.
- `../labspace/.brief/valtown-proxy.md` — val.town proxy for the coverflow-v3 WAF 403 issue. Janzheng consumes the same `VALTOWN_COVERFLOW_PROXY_URL` / `_SECRET` env vars as labspace.
