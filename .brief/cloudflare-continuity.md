# Portfolio Cloudflare continuity

Status: local caller safety fix only; not migrated or deployed. 2026-10-09.
Owner: codex-continuity-01a122b8 (Labspace chat).

Jan explicitly requested continuing migration for janzheng.com, jess.bio and Phage Directory subpages. This is the separate janzheng app; never deploy its artifact to Labspace.

Ported the existing Labspace single-attempt pipeline caller. A synthetic successful write followed by a dropped response previously issued four writes; now one. Redirects/gateway failures/dropped bodies report WRITE_OUTCOME_UNKNOWN without retry. Logs and errors omit raw provider payloads. Direct/Val Town proxy routing is preserved, including the portfolio's existing DEV behavior. Settings cannot replace the explicit pipeline argument. No other actions, frontend code or dependency versions changed; existing deno.json edit preserved.

Verification: Labspace tests/portfolio-caller-safety.test.mjs failed before the fix and passes four tests against the candidate. Repeat against this actual file with PORTFOLIO_PIPELINE set to its absolute path. Tests fake every fetch and never submit real forms.

Remaining: isolated Astro/Workers build for this app; compatible Svelte/Tailwind and svelte-jsoneditor dependency qualification; server binding/secret isolation; resume and other route behavior; public action authorization; live content/assets and cache/outage/rollback qualification. Source remains Deno-adapter based. Production routing, deployment and Deno retirement are not completed by this patch.

## Coordinator qualification and fixes — LCF016–017, 2026-10-09

Owner codex-lcf-g01-20261009. Separate source copied into isolated unchanged-lock
Astro/workerd experiments. Found and fixed undefined browser reference in embed SSR,
mobile cover-image overflow and fixed-width split resume overflow. Content GETs now
have a15second total deadline and8MiB streamed cap; errors/redirects never populate
the cache, response bodies cancel, and provider details stay out of thrown errors.
TTL, refresh intent and endpoints are unchanged.

20/20built workerd route/content checks,10/10desktop/mobile browser cases and
7GET+4caller fake-provider tests pass. Resume storage was a no-write fixture;
converter actions were blocked. No dependencies, production routes or deployment
changed. Root deno.json and prior pipeline/task edits preserved.

Evidence: ../labspace/docs/audits/portfolio-qualification-2026-10-09.md and the
linked source/artifact manifests. Existing package/lock hashes match the baseline.
JCF002 stays open: reproducible deploy target/service bindings, authenticated refresh
that updates shared public cache, reviewed converter definitions and real resume
provider read/write recovery contracts still need qualification. Public staging
refresh is intentionally400; it must not be silently discarded or freely exposed.

## Caller contracts and read-only target — LCF018–019

Server-owned converter selectors now replace arbitrary browser pipelines. Inputs,
HTTPS host/origin and fixed models/tools are checked; calls are single-attempt.
Signup awaits a request-local Sheet and checks acknowledgement. Resume save has
single-flight/unknown locking, known UPSERT acknowledgement checks and draft
retention. Resume payload debug logs removed; per-request/component Sheet instances
avoid shared configuration.23offline tests plus actual fake HTTPS actions and fake
browser Save double-click/drop-response checks pass. No real provider writes.

Jan explicitly chose disabled AI demos for the first release. The independently
locked candidate is ../labspace/platform/cloudflare-portfolio: homepage,15posts and
baseline resume, content service binding, no action credentials, allPOST503,
query modes400 and refresh503. The source application keeps its editable features;
only the generated first-release staging candidate restricts them. Root dependency
files are unchanged. No deployment or janzheng.com routing change is authorized.

Live resume transport/redirect/auth/reconciliation, authenticated refresh and future
AI restoration/cost limits remain separate gates. See ../labspace/docs/audits/
portfolio-contracts-2026-10-09.md and portfolio-target-manifest-2026-10-09.json.
