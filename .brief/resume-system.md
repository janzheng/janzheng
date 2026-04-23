# Resume system — how to use it

**Status:** ready (live, not documented before)
**From:** conversation
**Task:** `-> ../TASKS.md` (no active work — reference doc)

## Problem

I built a custom resume system into janzheng.com that lets me edit my CV through a split-pane JSON editor in the browser, save to a Google Sheet for live updates, render multiple resume versions per `?id=`, and print to PDF — but I never wrote down how to actually use it. Every time I want to update my resume I have to re-discover the URL params, the Cmd-S shortcut, the schema, where the sheet lives, etc.

## Investigation — how it actually works

### Architecture

Hybrid: **static `cv.json` baseline + live Google Sheet override per `?id=`**.

```
GET /resume                      → renders src/data/cv.json (the baseline)
GET /resume?id=jan-zheng         → fetches the "Resumes" sheet, finds row where Id=jan-zheng,
                                    parses its `Resume` column (a JSON string), renders that
GET /resume?id=jan-zheng&state=split  → same as above + opens the JSON editor pane
```

Server-side fetch happens in `src/pages/resume.astro` via `@yawnxyz/sheetlog` → Apps Script `exec` URL → "Resumes" tab. Falls back to `cv.json` if no `id` or sheet fetch fails.

### URL parameters

| Param | Values | What it does |
|---|---|---|
| `id` | string (e.g. `jan-zheng`, `jan-bio`, `jan-tech`) | Which row of the "Resumes" sheet to load. Omit → uses `cv.json` |
| `state` | `view` \| `json` \| `split` | UI mode. Omit → read-only render (no controls bar). With any value → controls bar appears with Save/Print buttons |
| `live` | truthy | Reserved (read but unused — for future "skip cache" semantics) |

### Edit + save workflow

1. Open `https://janzheng.com/resume?id=<your-id>&state=split` (or local `http://localhost:5175/resume?...` per the comment at the top of `Resume.svelte`).
2. Left pane: JSON editor (svelte-jsoneditor — supports text mode + visual mode + tree mode via the toolbar). Right pane: live preview.
3. Drag the gutter handle between the panes to resize.
4. Edit JSON → preview updates live → status shows "unsaved changes".
5. **Cmd-S** to save. Posts to the sheet's matching row via `sheet.update({Id, Resume}, {id, idColumn: "Id"})`. Status flips to "saved!".
6. Each `id` also writes to `localStorage` under `resumeText-${id}` (svelte-persisted-store) as a draft — but the canonical source after save is the Sheet, not localStorage.

**Gotcha:** Apps Script saves are sometimes silent — comment in `Resume.svelte:196` notes "SOMETIMES GOOGLE SHEETS DOESN'T SEEM TO SAVE? (or update the sheets interface?)". If you don't see your edit when you reload, hit Cmd-S again and check the Sheet directly.

### Print to PDF

1. Open `?state=view` (or just `/resume` for the cv.json baseline) — the controls bar is hidden via `print:hidden` so it doesn't pollute the PDF.
2. Click **Print** in the controls bar (or Cmd-P).
3. **Browser print settings:** "margins: minimum", uncheck headers/footers. (Hint shown in the controls bar.)

### Where the data lives

| Thing | Location |
|---|---|
| Baseline CV (no `?id=`) | `src/data/cv.json` |
| Live per-id resumes | Google Apps Script: `https://script.google.com/macros/s/AKfycbw_Vzxf_O4YaijlPK_bksDF9az8vs2PtspU_wZH6E-j1JurWNfPjP9kDQbpSOf4cgud/exec`, sheet tab `Resumes`, columns `Id` (key) + `Resume` (JSON-stringified body) |
| Local draft cache | `localStorage["resumeText-<id>"]` |
| Active code | `src/pages/resume.astro` (server fetch) + `src/components/Resume.svelte` (editor + render) |
| Compact variant | `src/components/ResumeCompact.svelte` (not currently routed; for embedding into other pages) |
| Sheet helper lib | `src/lib/sheetlogs.ts` (vendored copy of `@yawnxyz/sheetlog`) |
| Print styles | `src/styles/resume.scss` |

The Sheet URL is **hardcoded** in `resume.astro:15` and `Resume.svelte:37` (NOT pulled from `SHEET_URL` env var — which goes to a different sheet for the email signup form). If we ever rotate the resume sheet, change both spots.

## Recommendation — the workflow you'll forget

### Update your resume in 3 steps

1. **Open** `https://janzheng.com/resume?id=jan-zheng&state=split` (replace `jan-zheng` with whichever id you're editing).
2. **Edit** the JSON in the left pane. The right pane re-renders live.
3. **Cmd-S** to save → it's written to the Sheet, anyone hitting `/resume?id=jan-zheng` sees the new version on next load.

### Make a new variant (e.g. tech vs bio resume)

1. Open the Google Sheet, copy your existing row, change `Id` (e.g. `jan-tech`).
2. Open `https://janzheng.com/resume?id=jan-tech&state=split` and edit.
3. Share `https://janzheng.com/resume?id=jan-tech` (no `state` → clean read-only view).

### Print to PDF for sharing

1. `https://janzheng.com/resume?id=jan-zheng` (no `state` → clean view, no edit controls).
2. Cmd-P → margins: minimum, no headers/footers.

### Update the baseline (`cv.json`)

If a change is canonical/permanent (not just a per-id variant), edit `src/data/cv.json` directly and commit. That's what `/resume` shows when no `id=` is passed.

## Implementation Sketch — schema reference

The schema **extends** [jsonresume.org schema v1](https://jsonresume.org/schema/) with custom sections (`talks`, `writings`, `media`, `roles`, `projects`, `basics.about`, `basics.notes`) and a `meta` block for ordering / labels.

### Top-level shape

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "meta": {
    "version": "v1.0.0",
    "lastModified": "2026-04-23T00:00:00",
    "order": ["work", "projects", "education", "skills", ...],  // controls render order + TOC
    "sections": [
      { "name": "work", "label": "Work Experience", "titleClass": "optional-css-class" },
      { "name": "writings", "label": "Selected Writings" }
    ],
    "classes": "optional-css-classes-on-resume-container"
  },
  "basics": {
    "name": "Jan Zheng",
    "title": "PhD",                  // appended after name with comma
    "label": "ai design engineering", // tagline
    "image": "https://...",
    "email": "...",
    "phone": "...",
    "summary": "markdown supported here",
    "about": "longer markdown bio (renders in the 'about' section)",
    "notes": ["bullet 1", "bullet 2"],
    "location": { "address": "", "city": "", "region": "", "countryCode": "" },
    "profiles": [{ "network": "github", "url": "https://github.com/janzheng" }]
  },
  "work":         [{ "name", "position", "startDate", "endDate", "location", "description", "highlights": [], "media": [] }],
  "education":    [{ "institution", "area", "studyType", "startDate", "endDate", "location", "thesis": {"title", "url"}, "advisor" }],
  "skills":       [{ "name", "level", "description", "keywords": [], "subskills": [{"name","description","level","details","keywords"}] }],
  "publications": [{ "name", "publisher", "releaseDate", "doi", "url", "summary" /* OR */ "markdown" }],
  "awards":       [{ "title", "date", "awarder", "summary" }],
  "certificates": [{ "name", "issuer", "url", "date" }],
  "talks":        [{ "title", "event", "date", "location", "url" }],
  "writings":     [{ "title", "datePublished", "publisher", "url", "summary", "image", "keywords": [] }],
  "media":        [{ "title", "date", "platform", "url", "summary", "keywords": [] }],
  "interests":    [{ "name", "keywords": [] }],
  "languages":    [{ "language", "fluency" }],
  "volunteering": [{ "organization", "position", "url", "startDate", "endDate", "summary", "highlights": [] }],
  "roles":        [{ "organization", "position", "url", "startDate", "endDate", "summary", "highlights": [], "keywords": [] }],
  "projects":     [{ "name", "url", "startDate", "endDate", "entity", "type", "roles", "description", "highlights": [], "image", "keywords": [] }],
  "references":   [{ "name", "reference" }]
}
```

### Markdown is supported in

`basics.summary`, `basics.about`, `work[].highlights[]`, `awards[].summary`, `publications[].markdown`. Anywhere else, plain text. (`{@html md.render(...)}` calls in `Resume.svelte`.)

### `meta.order` controls render order + TOC

If `meta.order` is omitted, falls back to a hardcoded default in `Resume.svelte:207-224` (about → work → education → publications → certificates → awards → talks → writings → media → interests → skills → roles → volunteering → languages → projects → references).

To hide a section: omit it from `meta.order` AND don't include the key at the top level. (Sections with empty arrays render an empty header — leave the key off entirely if you don't want it.)

### `meta.sections` overrides labels per-section

```jsonc
"meta": {
  "sections": [
    { "name": "work", "label": "Work Experience" },
    { "name": "writings", "label": "Selected Writings" },
    { "name": "projects", "label": "Selected Projects" },
    { "name": "roles", "label": "Board & Advisory roles" }
  ]
}
```

If a section name isn't in `meta.sections`, the default label is used (defined in the section's `{@html ...}` block in `Resume.svelte`, e.g. "Work Experience", "Education", "Skills").

### Extending — adding a new section type

If you want a new section type (e.g. "patents"):
1. Add the data array to your JSON: `"patents": [{ ... }]`
2. Add it to `meta.order` so it renders.
3. Add a new `{#if key=='patents' && resumeJson[key]} ... {/if}` block in `Resume.svelte` near the others (~line 786 onward — copy the structure of `roles` or `projects`).
4. Optional: add to `meta.sections` for a custom label.

### Sections that are wired but unused right now

`certificates`, `talks`, `media`, `interests`, `languages`, `references` — all have full render blocks in `Resume.svelte` but `cv.json` doesn't currently include them. Add them to your JSON and they'll show up.

## Notes

- The Sheet URL in `resume.astro:15` and `Resume.svelte:37` is `PUBLIC_` — exposing it leaks the read+write Apps Script endpoint for the resume sheet. Lower-stakes than other secrets but still: don't fork this repo public without rotating that URL.
- `ResumeCompact.svelte` exists but isn't routed. It's a denser variant — could embed in a blog post or a "compact card" view. Currently dormant.
- The design intent was JSON-driven so an LLM (or any tooling) can rewrite/tailor the resume per audience by patching JSON. The split-pane editor is for hand-editing; the Sheet is for "save the variant" persistence.
