# janzheng.com

Personal portfolio + blog. SSR Astro on Deno Deploy, Svelte components, Tailwind + SCSS.

## Stack

- **Framework:** [Astro](https://astro.build/) 6 (SSR)
- **UI:** Svelte 5 + MDX
- **Styling:** Tailwind + SCSS
- **Runtime:** Deno
- **Deployment:** [Deno Deploy](https://deno.com/deploy) (org `yawnxyz`, app `janzheng`)
- **Backend:** [coverflow](https://coverflow.labspace.ai/) for blog content + dynamic blog-post pipelines

## Development

```sh
yarn install
yarn dev        # http://localhost:4321
```

## Build & preview

```sh
yarn build
yarn preview    # serves the production build on :8085
```

## Deploy

```sh
yarn prod       # builds + deploys to Deno Deploy (production)
yarn test       # builds + deploys to a preview revision
```

⚠️ **Never pass `./dist` (or any positional path) to `deno deploy`** — see [`CLAUDE.md`](CLAUDE.md). Both `yarn prod` and `yarn test` are already correct; just don't run `deno deploy ./dist` ad-hoc.

## Docs

- [`RESUME.md`](RESUME.md) — how to update my resume (URL params, edit/save workflow, schema cheat sheet)
- [`CLAUDE.md`](CLAUDE.md) — Deno Deploy deploy discipline + cross-deploy gotchas (read before touching deploy scripts)
- [`TASKS.md`](TASKS.md) — current work + shipped log
- [`.brief/`](.brief/) — deeper technical briefs (resume system internals, etc.)
