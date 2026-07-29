# duaakhalid.com — portfolio site

Static single-page portfolio. Live at https://duaakhalid.com (also `www.` and
`duaakhalid-site.vercel.app`).

## How this site is built

`index.html` is a **bundled export from Claude Design** — a single self-contained
file (~294KB) with fonts and assets inlined, rendered client-side by JS. There is
no build step and no framework. `resume.pdf` sits next to it and is served at
`/resume.pdf`.

Because it's a compiled bundle, content lives inside an escaped JS template in
`<script type="__bundler/template">`. Strings appear **twice** — once in the
`__bundler/manifest` section and once in `__bundler/template`. Any edit must
replace **both copies** or the page renders stale content.

The real editing surface is Claude Design. Hand-editing `index.html` is for small
patches only.

## Re-export checklist (IMPORTANT)

A fresh export from Claude Design **overwrites the `<head>` customizations**.
After replacing `index.html`, re-apply all of these or they're silently lost:

1. `<title>` — export ships as `Bundled Page`; should be `Duaa Khalid — Portfolio`
2. `<meta name="viewport">` — **not in the export**; without it mobile renders zoomed-out
3. `<meta name="description">` + `og:title` / `og:description` / `og:type` / `og:url`
4. `<link rel="icon">` — inline SVG "DK" favicon on `#ec3013`
5. `resumeUrl` default — export ships as `#resume-pdf-to-add`, must be `/resume.pdf`
6. Re-blank the placeholder fields listed below

## Open content items (removed from the live page 2026-07-30)

These were bracketed TODOs showing publicly. They were blanked, not deleted —
the render logic is `showGap: showGaps && !!p.gap`, so an empty string hides the
block cleanly with no layout gap. Restore by putting real text back in the same
field.

### 1. BA sales tracker — `gap` (was)
> `[To fill: who pulled the export, how often, and how late it landed.]`

Needed: who actually pulled the Daxium supervisor export, on what cadence, and
how late it typically landed. Context already on the page: month-end totals
"arrived weeks late."

### 2. BA sales tracker — `gap2` (was)
> `Month end review turnaround went from [before] to [after]. No cycle time figure
> exists in the repo, so this stays a placeholder rather than an estimate.`

Needed: real before/after month-end review turnaround. **Do not estimate this.**
No cycle-time figure exists in the repo, and the page's whole credibility rests
on not inventing numbers. Leave blank until measured.

### 3. Homebase — `gap` (was)
> `[To confirm: exact scope split with my co-founder.]`

Needed: the precise ownership boundary between Duaa and her co-founder. Page
currently claims problem framing + the UAE rental regulation model (RERA bands,
90-day notice, Ejari sequencing, bilingual requirement) as distinctly hers.

## Other open items

- **Advisor count**: page says "18 beauty advisors"; other project notes say ~20
  active BAs. Confirm which is correct for the Jan–Apr window and make consistent.
- **JS-dependent rendering**: the page requires JavaScript, so crawlers and some
  link-preview bots may see an empty page. The OG tags in `<head>` are static, so
  social previews work, but indexed body text may be thin. Fix would need a
  static text fallback in `<noscript>`.
- **Resume version**: currently the OpenAI/ADM variant, copied from
  `~/Desktop/Maven Mahesh Course/cv-enhancement/Duaa_Khalid_Resume_OpenAI_ADM.pdf`.
  Swap by replacing `resume.pdf` — no code change needed.

## Deploying

Auto-deploys on push to `main` via Vercel (project `duaakhalid-site`).

```
git add -A && git commit -m "..." && git push
```

Manual deploy without a push: `vercel --prod`

## Gotchas

- **Cloudflare proxy must stay OFF** (grey cloud) on the `duaakhalid.com` and
  `www` A records → `76.76.21.21`. Cloudflare's default "Flexible" SSL + Vercel
  causes an infinite redirect loop. To enable the proxy, switch Cloudflare
  SSL/TLS mode to **Full (strict)** first.
- After a DNS change, the local router (`192.168.8.1`) may cache the old answer
  for up to 30 min (Cloudflare negative TTL 1800s). Verify with
  `dig +short A duaakhalid.com @1.1.1.1`, not the local resolver.
- There is a **separate** Next.js portfolio at `~/Desktop/portfolio/`. Unrelated
  to this deploy. If the domain ever moves there, detach it from this project first.
