# Changelog

## Unreleased

- Converter callers now select reviewed server-owned operations; arbitrary browser
  pipelines/model/tool overrides and foreign origins are rejected.
- Signup awaits a request-local writer. Resume saves verify acknowledgement, block
  overlap and retain drafts on unknown outcomes; sensitive resume logs removed.
  Verified with23offline cases and actual fake-provider HTTPS/browser interactions.
- Prepared a separate read-only staging candidate in Labspace. AI demos are disabled
  for the first release by user choice. No portfolio deployment or domain change.


- Fixed server rendering of posts containing embeds, constrained portfolio cover
  images to their containers and stacked the resume editor on mobile screens.
- Bounded content GETs to15seconds and8MiB; redirects/error responses cannot poison
  the cache, and provider error details are hidden. Cache/refresh semantics remain.
- Verified locally in workerd:20route/content cases,10desktop/mobile browser cases
  and11fake-provider transport/caller tests. No deployment or dependency changes.

Evidence: [.brief/cloudflare-continuity.md](.brief/cloudflare-continuity.md).
