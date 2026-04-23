# janzheng portfolio

Modified labspace fork running my personal site. Currently on Astro 4.15 + `@deno/astro-adapter` 0.1.3 + `deployctl`, deployed to the **previous-gen** Deno Deploy (project `janzheng`, id `cdf5a87a-...`).

Two parallel migrations to do:
1. **Old Deno Deploy → new Deno Deploy** — same playbook as labspace `da9020f` + `5bb6f18`.
2. **Coverflow URL + envelope dance** — finish the in-flight bump from `coverflow.deno.dev` to the canonical `coverflow.labspace.ai` (CF Worker proxy fronting coverflow-v3), and adopt `?envelope=v2`.

## Current

### Migration: old Deno Deploy → new Deno Deploy

Mirror `__active/labspace/da9020f` + `5bb6f18`. Verify each step with `yarn build` before moving on.

- [x] [done 2026-04-23] **Bump Astro stack** — match labspace versions:
  - `astro` 4.15 → 6.1.x
  - `@astrojs/svelte` 5.7 → 8.x
  - `@astrojs/mdx` 3.1 → 5.x
  - `@astrojs/tailwind` 5.1 → 6.x
  - `@deno/astro-adapter` 0.1.3 → 0.4.x
  - `svelte` 4.2 → 5.x
  - `svelte-persisted-store` 0.11 → 0.12
  - Add `svelte-preprocess` ^6 (labspace pattern)
  - Add `vite` ^6.4 explicit
  - Bumped `svelte-jsoneditor` 2.3.3 → 3.5 (Svelte 5 support)
  - Bumped `@astrojs/check` 0.7 → 0.9
- [x] [done 2026-04-23] **Drop React integration** — `@astrojs/react`, `react`, `react-dom`, `@radix-ui/react-icons`, `@radix-ui/react-slot`, `lucide-react`, `src/components/ui/button.tsx`. **Why:** Grepped src/ for `from 'react'` / `client:react` / `.tsx` imports — only hit is `button.tsx` itself, and nothing imports it. Avoiding @astrojs/react v4→v5 + React 18→19 churn for code that never renders. Easy to add back if needed.
- [x] [done 2026-04-23] **Drop `Masonry.svelte` + `svelte-masonry`** — orphan demo component, no page imports it. Stays in git history.
- [x] [done 2026-04-23] **`astro.config.mjs`** — dropped `start: true`, added image service noop, removed `react()`, added svelte-preprocess + onwarn suppress list mirroring labspace.
- [x] [done 2026-04-23] **`scripts/patch-deno-entry.ts`** — copied from labspace; build run confirmed `patch-deno-entry: removed adapter shim import from entry.mjs.`
- [x] [done 2026-04-23] **Update `build` script** — `astro build && deno run --allow-read --allow-write ./scripts/patch-deno-entry.ts`.
- [x] [done 2026-04-23: noop confirmed] **Switch yarn PnP → node-modules linker** — portfolio was already on yarn 1.22 classic, no `.yarnrc.yml` / `.pnp.*` files. Skipped — already using node_modules.
- [x] [done 2026-04-23] **`deno.json`** — added `nodeModulesDir: "manual"` + npm: import map (cribbed from labspace, kept the universally-needed ones); added `tasks` block with `build`, `deploy:dev`, `deploy:prod`, `logs`; replaced `deploy.entrypoint` with `deploy.org: yawnxyz` + `deploy.app: janzheng`.
- [x] [done 2026-04-23] **`package.json` `prod` script** — `npm run build && deno deploy --org yawnxyz --app janzheng --prod ./dist`. Dropped `deployctl`.
- [x] [done 2026-04-23] **Local build smoke** — `yarn build` green; `deno run ./dist/server/entry.mjs` listened on :8085, `/` returned 200 with full 2.4MB coverflow content (JanZheng + Jess sections render), `/resume` 200 (35KB), `/test` 200 (30KB). `[postPath]` 404 for `/janzheng` is expected (catchall is for blog sub-paths only). Also fixed a case-sensitivity bug Astro 6 caught: `pages/test.astro` imported `testproject.astro` but file is `TestProject.astro`.
- [x] [done 2026-04-23] **Deploy to new Deno Deploy** — live at `https://janzheng.yawnxyz.deno.net/` (200, 2.4MB, ~1.8s cold). App on org `yawnxyz` with default Astro preset. Three real fixes needed beyond the stack upgrade: (1) add `prismjs` as direct dep (transitive via cmdk-sv; deno install didn't hoist); (2) fix `BlogalogFooter.svelte` case-mismatched `SocialBox` → `Socialbox` import (macOS case-insensitive masked this); (3) bump app build timeout + memory to 20min / 4GiB (default 5min timed out at vite's 4m 2s). Full post-mortem in `../labspace/BRIEF-deno-deploy-astro-ssr.md`.
- [ ] **Verify env vars on new Deno Deploy app** — `SHEET_URL` (used by `emailSignup`); spot-check anything else `import.meta.env` references.
- [x] [done 2026-04-23] **DNS swap** — `janzheng.com` apex now serves from the new Deno Deploy (`CNAME @ → alias.deno.net`, CF orange-cloud on). Stale `_acme-challenge` record (old `.deno.dev` target) updated to new `.deno.net` target. Old deployctl A `34.120.54.55` + AAAA `2600:1901:0:6d85::` removed. Hit: "Verify" on Deno console issues the cert but doesn't attach the domain — separate step; skipping it leaves CF reaching Deno but Deno responding `DEPLOYMENT_NOT_FOUND`. MX/SPF (Mailgun) left alone. `www.janzheng.com` stays on Vercel for now (separate service). Old project `cdf5a87a-...` now fully dark.

### Coverflow URL + envelope dance

Eleven files were mid-edit (unstaged) bumping `coverflow.deno.dev` → `coverflow-v3.yawnxyz.deno.net`. Direct deno URL is now origin-hardened (`410 Gone` if you hit it without origin auth) — confirmed: `curl https://coverflow-v3.yawnxyz.deno.net/janzheng` returns `410 Gone`. Standardized on `coverflow.labspace.ai` (CF Worker proxy) instead.

- [x] [done 2026-04-23: chose coverflow.labspace.ai after confirming direct deno URL returns 410 Gone] **Decide canonical URL.** The labspace.ai hostname goes through CF Worker which preserves `X-Trace-Id`, sets origin auth, and edge-caches GETs.
- [x] [done 2026-04-23] **Update GET URLs** — bulk-rewrote all 11 source files: `[postPath].astro`, `JanZheng.astro`, `Sicamous.astro`, `pages/deno/index.astro`, `pages/reload/index.astro` (GETs) plus the 6 `moreWithLess` converters (POSTs). Verified upstream: `curl https://coverflow.labspace.ai/janzheng` returns 200 with 541KB JSON. SSR'd `/` returns full 2.4MB rendered page in local preview.
- [x] [done 2026-04-23] **Decide on POST URLs for moreWithLess converters** — chose option (c): proxy server-side via Astro action. Converters now call `actions.pipe({pipeline})` instead of browser-direct fetch.
- [x] [done 2026-04-23] **Adopt `?envelope=v2`** — wired into `src/lib/pipeline.ts` so the discriminated `body.ok` shape is used for all pipeline calls.
- [x] [done 2026-04-23] **Add a `lib/pipeline.ts`** — mirrors labspace pattern: central `executePipeline()` returning `PipelineResult` discriminated union. Pipe action uses it; converters use the action.
- [x] [done 2026-04-23] **Trace-id propagation** — `crypto.randomUUID()` per call, `X-Trace-Id` header out, logged at both action and pipeline.ts layers.
- [ ] **[BLOCKED on upstream]** — live pipe action returns `Forbidden` from `coverflow.labspace.ai/execute`, BUT labspace.ai's own pipe action returns the same error on the same test payload. This is a coverflow/CF-Worker-side issue, not janzheng's. When labspace's swyripa form starts working again, janzheng's converters will too without any code change. Track upstream fix in labspace/coverflow TASKS.

## Later

- [ ] **Replace `deployctl` references in README** — currently mentions old deploy flow, update post-cutover.

## Notes

- Old Deno Deploy project: `cdf5a87a-51b4-4150-9567-99caac4daaa2` (legacy `deployctl` flow, sunsetting platform).
- Labspace migration commits to mirror: `da9020f` (Astro 6 + adapter 0.4) and `5bb6f18` (yarn linker + image service noop).
- Labspace `BRIEF-deno-deploy-migration.md` has the full Discord-thread context and gotchas if anything misbehaves.
