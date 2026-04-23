# Resume — how to update it

I built a custom resume system into this site. Edit JSON in the browser, save to a Google Sheet, render as many resume variants as I want, print to PDF. This is the doc I reach for when I forget how it works.

For the deep "how the system was built" reference (schema, rendering pipeline, code locations), see [`.brief/resume-system.md`](.brief/resume-system.md). This file is the workflow.

## Quick reference

| URL | What it does |
|---|---|
| `https://janzheng.com/resume` | Renders the baseline `src/data/cv.json`. Read-only. |
| `https://janzheng.com/resume?id=jan-zheng` | Loads the `jan-zheng` row from the Google Sheet. Read-only. |
| `https://janzheng.com/resume?id=jan-zheng&state=split` | Same as above + opens the JSON editor pane. **This is the editor.** |
| `https://janzheng.com/resume?id=jan-zheng&state=view` | Read-only but shows the controls bar (with Print button). |

`state` can be `view`, `json`, or `split`. Add it whenever you want the controls bar to appear.

## Update my resume

1. Go to `https://janzheng.com/resume?id=jan-zheng&state=split`.
2. Edit JSON in the left pane. The right pane re-renders live as you type.
3. **Cmd-S** to save → it's written to the Google Sheet.
4. Anyone hitting `https://janzheng.com/resume?id=jan-zheng` (no `state`) sees the new version on next load.

The status text next to the Save button shows "unsaved changes" / "saving" / "saved!".

**Gotcha:** the Apps Script save is sometimes silent (the request goes through but the Sheet doesn't visibly update for a few seconds, or occasionally not at all). If a reload doesn't show your edit, hit Cmd-S again and verify by opening the Sheet directly.

## Make a new resume variant

Different audiences want different framings — bio, tech, founder, academic, etc. Each gets its own row in the Sheet, its own `id`, its own URL.

1. Open the Google Sheet (the "Resumes" tab — Apps Script URL is in `src/pages/resume.astro:15` if you've forgotten).
2. Copy your existing row. Change the `Id` cell (e.g. `jan-tech`, `jan-bio`, `jan-founder`).
3. Open `https://janzheng.com/resume?id=jan-tech&state=split` and edit it down to the audience.
4. Share `https://janzheng.com/resume?id=jan-tech` (no `state` → clean read-only view).

## Print to PDF

1. Open `https://janzheng.com/resume?id=jan-zheng` (no `state` → controls hidden, clean view).
2. Cmd-P.
3. **Print settings:** "margins: minimum", uncheck headers/footers. Both are flagged in the controls bar.
4. Save as PDF.

## Update the baseline (`cv.json`)

If a change should be the canonical default — what `/resume` shows when no `?id=` is passed — edit `src/data/cv.json` directly and commit. The Sheet rows stay independent.

Use this when:
- You want the bare `/resume` URL (no params) to look right
- You're sharing the repo and want a meaningful baseline
- A change applies to *every* variant (e.g. moved cities — update once in cv.json, then rebase variants from it)

## Add a new section type

The schema supports a fixed list of section types: work, education, publications, awards, certificates, skills, talks, writings, media, interests, languages, volunteering, references, roles, projects, plus `basics.about`/`basics.notes`.

Some are wired in code but unused in current data (`certificates`, `talks`, `media`, `interests`, `languages`, `references`) — drop them in your JSON and they'll render automatically.

To add a section type that doesn't exist yet (e.g. "patents"), see the "Extending — adding a new section type" section in [`.brief/resume-system.md`](.brief/resume-system.md). Quick version: add an `{#if key=='patents' ...}` block in `Resume.svelte` near the others, and add `"patents"` to your `meta.order`.

## Schema cheat sheet

The schema extends [jsonresume.org v1](https://jsonresume.org/schema/) with extra sections. Top-level keys:

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "meta": {
    "order": ["work", "projects", "education", ...],     // controls render order + TOC
    "sections": [                                         // optional per-section overrides
      { "name": "work", "label": "Work Experience" },
      { "name": "writings", "label": "Selected Writings" }
    ]
  },
  "basics": { "name", "title", "label", "image", "email", "phone",
              "summary", "about", "notes", "location", "profiles" },
  "work":         [ ... ],
  "education":    [ ... ],
  "skills":       [ { "name", "level", "keywords": [], "subskills": [] } ],
  "publications": [ { "name", "publisher", "doi", "url", "summary" /* OR */ "markdown" } ],
  "awards":       [ ... ],
  "certificates": [ ... ],
  "talks":        [ ... ],
  "writings":     [ ... ],
  "media":        [ ... ],
  "interests":    [ ... ],
  "languages":    [ ... ],
  "volunteering": [ ... ],
  "roles":        [ ... ],
  "projects":     [ ... ],
  "references":   [ ... ]
}
```

Markdown is rendered (not just plain text) in: `basics.summary`, `basics.about`, `work[].highlights[]`, `awards[].summary`, `publications[].markdown`. Everywhere else is plain text.

For the full per-field shape of each section, see [`.brief/resume-system.md`](.brief/resume-system.md) §Implementation Sketch — schema reference.

## Where things live

| Thing | Path |
|---|---|
| The page | `src/pages/resume.astro` |
| The editor + renderer | `src/components/Resume.svelte` |
| Compact variant (not currently routed) | `src/components/ResumeCompact.svelte` |
| Baseline CV data | `src/data/cv.json` |
| Print styles | `src/styles/resume.scss` |
| Sheet helper lib | `src/lib/sheetlogs.ts` (vendored copy of `@yawnxyz/sheetlog`) |
| Apps Script URL | hardcoded in `src/pages/resume.astro:15` AND `src/components/Resume.svelte:37` (if you rotate the Sheet, change both) |

## Why a custom system instead of jsonresume themes / LinkedIn / etc.

- **JSON-first** so an LLM can rewrite/tailor it per audience by patching JSON, not parsing layouts.
- **Multiple variants per `?id=`** without duplicating files.
- **Live edit + save in the browser** for fast iteration without a local dev loop.
- **Print to PDF** via browser print, no PDF lib in the stack.
- **Schema is jsonresume-compatible** so the data is portable to any jsonresume theme if I ever want to leave.
