# duaakhalid.com — portfolio site

Static single-page portfolio. Live at https://duaakhalid.com (also `www.` and
`duaakhalid-site.vercel.app`).

## How this site is built

`index.html` is a **bundled export from Claude Design** — a single self-contained
file (~294KB) with fonts and assets inlined, rendered client-side by JS. There is
no build step and no framework. `resume.pdf` sits next to it and is served at
`/resume.pdf`.

The real editing surface is Claude Design. Hand-editing `index.html` is for small
patches only — but see the journey sections below, which are hand-added and have no
Claude Design source.

### Bundle anatomy (measured, 2026-07-30)

`index.html` is ~400 lines. Two of them carry everything:

- **`<script type="__bundler/manifest">`** — gzipped base64 assets only: React
  18.3.1, react-dom, the dc-runtime, three woff2 fonts. **No content strings.**
  Never edit this.
- **`<script type="__bundler/template">`** — a single JSON string holding the whole
  page. All editable content is in here.

An earlier version of this file claimed strings appear once in the manifest and once
in the template. That is wrong — the manifest holds no copy. The real duplication is
*inside* the template:

| Region | Copies | Holds |
| --- | --- | --- |
| `<x-dc>` markup | **1** | hero H1 + sub, stat tiles, journey sections, About page, detail-view shells |
| author `<style>` block | **1** | `om-rise`, `body`, `a`, plus the hand-added `.dk-*` rules |
| `<script type="text/x-dc" data-dc-script>` | 1 of 2 | `projects()` data + `Component` class |
| `<script data-dc-script>` | 2 of 2 | byte-identical duplicate of the above |

So: **markup and CSS edits happen once; anything inside `projects()` or `Component`
must be applied to both script copies** or the page renders stale.

### How to edit it safely

Do not hand-edit the escaped template. It mixes two escaping conventions:

- Closing tags in the markup region are `</h1>`, not `</h1>`, because a raw
  `</script>` would terminate the script tag early.
- Apostrophes inside the single-quoted JS data strings are `\\u2019` in raw bytes.

Instead decode, edit as plain text, and re-encode. This round-trips byte-identically:

```python
import json, re
RX = re.compile(r'(<script type="__bundler/template">\n)(.*?)(\n  </script>)', re.S)
src = open('index.html', encoding='utf-8').read()
m = RX.search(src)
tpl = json.loads(m.group(2))                 # readable HTML + JS
# ... str.replace on tpl, asserting the expected occurrence count first ...
out = json.dumps(tpl, ensure_ascii=False).replace('</', '<\\u002F')   # REQUIRED
open('index.html', 'w', encoding='utf-8').write(src[:m.start(2)] + out + src[m.end(2):])
```

The `</` post-pass is mandatory: `json.dumps` emits `/` literally, and a bare
`</script>` inside the string breaks the page.

### Verifying an edit

**`grep -c` does not work here.** The template is one ~90KB line, so `grep -c`
returns 1 no matter how many matches exist. Always use:

```
grep -o '<string>' index.html | wc -l
```

Expect **1** for markup/CSS strings and **2** for anything in `projects()`.
Then confirm the JSON still parses:

```
python3 -c "import json,re;s=open('index.html',encoding='utf-8').read();\
m=re.search(r'__bundler/template\">\n(.*?)\n  </script>',s,re.S);print('ok',len(json.loads(m.group(1))))"
```

Greps prove nothing about what displays — the page is JS-rendered. Always finish with
a real browser check (`python3 -m http.server`, then Chromium at
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`).

## Re-export checklist (IMPORTANT)

A fresh export from Claude Design **overwrites the `<head>` customizations**.
After replacing `index.html`, re-apply all of these or they're silently lost:

**Head tags must go in TWO places.** The loader ends with
`document.documentElement.replaceWith(...)`, which throws away the outer `<head>`
entirely. Verified 2026-07-30 by dumping the rendered DOM: with the tags only in the
outer `<head>`, there was **no `<title>` and no icon link after render** — the browser
tab showed the URL instead of her name, and bookmarks/history saved it that way.

- The **template's `<helmet>`** copy is what a *visitor* sees (it is inside the document
  that replaces the original, so it survives).
- The **outer `<head>`** copy is what *crawlers and link-preview bots* see, since they
  read the raw HTML before JS runs. Social previews only ever worked because of this one.

Keep both. Items 1, 3 and 4 below belong in both places; item 2 only matters in the outer
`<head>`.

1. `<title>` — export ships as `Bundled Page`; should be `Duaa Khalid — Portfolio`.
   **Outer `<head>` alone has no effect on what a visitor sees.** After render the
   runtime rewrites it as `<title data-dc-tpl="1">`, so grep for `<title` not `<title>`.
2. `<meta name="viewport">` — **not in the export**; without it mobile renders zoomed-out
3. `<meta name="description">` + `og:title` / `og:description` / `og:type` / `og:url`
4. `<link rel="icon">` — `/favicon.ico` in the helmet, plus the inline SVG "DK" on
   `#ec3013` in the outer `<head>` for the pre-JS flash
5. `resumeUrl` default — export ships as `#resume-pdf-to-add`, must be `/resume.pdf`
6. Re-blank the placeholder fields listed below
7. The `<noscript>` content fallback in `<body>` (name, positioning, three projects
   with links, contact). Not in the export.
7b. **The About-page headshot `<img>`.** A fresh export restores the grey hatched
   `Headshot` placeholder. Re-apply by replacing that placeholder `<div>` with:
   `<img src="/duaa-milan.jpg" alt="Duaa Khalid at Dolce &amp; Gabbana Expert Week 2026"
   width="700" height="933" loading="lazy" style="display: block; width: 100%;
   height: 380px; object-fit: cover; object-position: 50% 20%;">`
   The photo file `duaa-milan.jpg` (700×933, 104KB) lives next to `index.html` and is
   served at `/duaa-milan.jpg`. It is a real file, not inlined — do not base64 it into
   the bundle. Source original: `~/Desktop/Duaa Milan.png`. Deliberately in colour,
   not the design system's `grayscale(1)` imagery treatment; it is the only human
   moment on the site and grayscale mutes it. Crop was checked at 8%/20%/35%
   `object-position`; 20% keeps the full "EXPERT WEEK 2026" backdrop visible, which is
   what contextualises the photo.
8. **The hero H1 must not say "AI systems."** See the note under Open items.

### 9. The hand-added journey sections (largest re-export risk)

These have **no Claude Design source** and a fresh export drops all of them. They are
the spine of the "why I'm moving to tech" argument, so losing them silently is the
worst failure mode in this repo. Re-apply from git history (`git log -p index.html`):

- **CSS**: the `.dk-*` rules at the end of the author `<style>` block — `.dk-mono`,
  `.dk-sheet`, `.dk-reveal`, `.dk-step`, and the two
  `.dk-mess:has(details[open]) tr.dup` highlight rules.
- **Thesis section** — the "Most of my work starts inside someone else's spreadsheet"
  paragraph promoted onto the home page, directly under the hero. It also still lives
  on the About page; both copies are intentional.
- **"Where my work starts"** — the `dk-mess` section: the illustrative export table
  and the `<details>` "Show me the pair" reveal. Interaction is pure CSS
  (`<details>` + `:has()`), no JS and no `Component` state, so it survives as long as
  the markup and the CSS are both restored. Restoring one without the other leaves a
  reveal that does nothing.
- **"Five years of other people's systems"** — the five journey rows that replaced the
  old Next / Now / Before / Region tile strip. Do not restore that strip; it argued
  nothing.

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

### 3. Homebase — `gap` — CLOSED 2026-07-30

Was `[To confirm: exact scope split with my co-founder.]`. Already answered by the
project's own "Team split" caveat: two person team, a professional engineer as the
other founder, and the UAE rental regulation model as the part that was distinctly
hers. No further copy needed; leave `gap` empty.

## Resolved, do not re-open

- **Résumé formatting** — two review rounds claimed broken strings in `resume.pdf`
  ("Enable commu / commu Custom", "Fragrance Brands —Account Management
  &Commercial Operations") and escalated them to "carelessness / red flag".
  **Verified false 2026-07-30** by decoding the PDF's ToUnicode CMaps directly.
  "Enable commu" does not exist; the text is `Enablement & Adoption: … executive-ready
  communication`. `&Commercial` has zero hits; the PDF reads `Account Management &
  Commercial Operations`. Every apparent missing space (`MiddleEast`, `ranlive`,
  `intoplacement`, `readycommunication`, `&Gabbana`) sits **exactly on a line
  boundary** — confirmed programmatically for all eight. They are artifacts of naive
  text extraction, not defects. The PDF is clean.
- **Advisor count, 18 vs ~20** — both figures are real and count different things.
  18 advisors in the January–April export; roughly 20 field users onboarded and
  trained, which includes people who moved off the team inside the window. Now stated
  explicitly on the page in the tracker's "18 live, about 20 onboarded" caveat.
- **JS-dependent rendering** — addressed by the `<noscript>` block in `<body>`. The
  loader ends with `document.documentElement.replaceWith(...)`, so it is only ever
  seen by crawlers that do not execute JS.

## Other open items

- **Hero must not claim "AI systems."** The H1 read *"I build AI systems that catch
  data problems…"* until 2026-07-30. Verified against the projects: the sales tracker
  has no model, Move-Out Sale has none, and Homebase's LLM path is opt-in
  (`USE_LLM_SCOPE=true`) behind a deterministic template default. It is now *"Luxury
  retail taught me what bad data costs…"*. Do not reintroduce a site-wide AI claim;
  the Homebase Evaluation section carries the honest AI signal on its own.
  - **Exception, added 2026-07-30 at Duaa's request:** the header carries a small role
    descriptor reading **"AI Product & GTM"**. This is deliberate and is *not* the same
    thing as the removed H1 claim. It names the domain and the roles she is targeting —
    consistent with the existing CTA "Hiring for a forward deployed or AI product
    role?" — rather than asserting that her three projects contain models. Do not
    delete it as an overclaim. If a future review wants zero AI framing anywhere, the
    agreed alternative wording is "Product · GTM · Data Systems", and that is Duaa's
    call, not a correctness fix.
- **Résumé is looser than the site in two places.** Cannot be fixed here (PDF only);
  fix at the next export from the résumé source:
  - Summary says *"drove daily adoption of an AI-assisted app I built (~20 users)"*.
    There is no model in that app. Suggest "a sales tracker I built".
  - Projects says Homebase *"automates RERA-compliant lease renewals"*. The site
    correctly states that layer is listed as out of scope in the same README, so it is
    spec, not product. Suggest scoping the bullet to what shipped.
  - Summary says "4+ years" where the site says "Five years". Earliest role is
    Oct 2021, so ~4y9m. Pick one and use it in both.
- **Sourced from Duaa, not the repo**: "18 advisors … who were never required to use
  it" (hero sub-headline, and the tracker's "Nobody was required to use it" adoption
  row). She confirmed this directly on 2026-07-30. Not derivable from the export, so
  do not flag it as unsupported — but do not extend it into an adoption *rate* either.
- **Needed for the "Where my work starts" table**: one real anonymised pair of
  duplicate rows from the Daxium export. The table currently uses illustrative rows
  with the verified column set and dedup key, and is labelled as such on the page.
  Swap the values in and drop the label once real rows exist.
- **Needed for Homebase Evaluation**: how many usability sessions were run, and which
  failure modes the log review actually surfaced. The résumé asserts both without
  specifics and the repo records neither, so the page deliberately claims no numbers.
- **Favicon — FIXED 2026-07-30.** The loader ends with
  `document.documentElement.replaceWith(...)` and the *template's* `<head>` has no icon
  link, so the inline-SVG `<link rel="icon">` in the outer `<head>` is dropped once JS
  runs. The fix was the no-code-change route: a real `favicon.ico` (1,075 bytes, 64×64
  PNG wrapped in an ICO container) now sits next to `index.html`, and the browser
  requests `/favicon.ico` automatically even after the document is replaced. The inline
  SVG link is still in `<head>` and still useful — it covers the pre-JS flash. Keep
  both. Regenerate the ico by rendering a 64×64 "DK on #ec3013" SVG in headless Chrome
  and wrapping the PNG with a 22-byte ICO header (no PIL on this machine).
- **Layout is desktop-fixed.** The root container is `min-width: 1080px`, so the page
  **cannot reflow** below that; mobile gets a scaled-down desktop layout and the
  viewport meta only sets the initial scale. Build new sections at fixed desktop
  width. A real mobile layout would mean rebuilding in Claude Design.
- **Move-Out Sale live defect**: `moveoutsale.vercel.app` renders "0 items available"
  from a hardcoded placeholder that the JS overwrites on a normal load; it should read
  11. Lives in a separate repo. The page discloses it as a caveat, which is the honest
  handling, but fixing it there would be better.
- **`/ask` assistant — see its own section below.** Shipped 2026-07-30, not yet linked
  or enabled.
- **`bm2515/homebase` link is broken for the public.** Verified 2026-07-30: the repo is
  **private**, so `https://github.com/bm2515/homebase` returns 404 to every visitor. It
  is the co-founder's repo, not Duaa's, so the fix is his to make: ask him to make it
  public, or drop the link. **This affects the résumés too** — all three carry the same
  URL as a clickable link. Same class of bug as the `moveoutsale` link that was fixed;
  an earlier check here wrongly concluded the link was fine because `gh` was
  authenticated as a user who has access.
- **Resume version**: currently the OpenAI/ADM variant, copied from
  `~/Desktop/Maven Mahesh Course/cv-enhancement/Duaa_Khalid_Resume_OpenAI_ADM.pdf`.
  Swap by replacing `resume.pdf` — no code change needed.

## The /ask assistant

A grounded Q&A bot at `/ask`. Answers only from what the site already says.

| File | Role |
| --- | --- |
| `ask.html` | The chat page. Hand-written, standalone, **not** a Claude Design export — copies the CSS tokens rather than importing them, so a re-export cannot break it. Unlike `index.html` it reflows properly on mobile. |
| `api/ask.js` | Vercel Node serverless function. The only place `ANTHROPIC_API_KEY` exists. |
| `api/context.md` | Generated fact sheet the bot answers from. **Committed** — no build step on Vercel. |
| `tools/build-context.py` | Regenerates `api/context.md` from `index.html`. |
| `package.json` | Just `@anthropic-ai/sdk`. |
| `vercel.json` | `cleanUrls: true`. Without it `/ask.html` serves but `/ask` 404s, and the nav links point at `/ask`. |

**Setup:** add `ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables.
Without it the endpoint returns 500 and the page shows an error; the rest of the site
is unaffected.

**After changing any site copy, regenerate the fact sheet:**

```
python3 tools/build-context.py   # then commit api/context.md
```

The point of generating it from `index.html` is that the bot **cannot claim something
the page doesn't**. Hand-editing `api/context.md` breaks that property — change the
site and regenerate instead.

### Not enabled yet — two open decisions

- **Nav links deliberately NOT added.** The cloud session's `index.html` had
  `<a href="/ask">Ask</a>` in the header nav plus a second `/ask` button in the red CTA.
  Both were withheld so a public link does not point at a feature that 500s until the
  key is set. Add them once the key is live.
- **No hard cost cap.** See the rate-limiting note below. A public page calling a paid
  API should have a real quota before it is linked from the nav.

### Known gap: the fact sheet does not cover the About page

`build-context.py` extracts the hero, thesis, journey rows, projects and contact — its
output has sections `Positioning`, `Career track`, `Projects`, `Contact` and nothing
else. Verified 2026-07-30: zero hits for `Istanbul`, `Thailand`, `Bologna`, `Rome`,
`commission`, `Expert Week`. So the bot cannot answer anything about the About-page
narrative — the seminar itinerary, the markets, or the "advisor whose commission it is"
line — even though all of it is on the site and factual. Regenerating does **not** fix
this; the extractor would need an About section added. Low priority while the bot is
disabled, but it means the bot currently knows less than the page.

### Design decisions worth not undoing

- **`thinking: {type: 'adaptive'}` with `effort: 'low'`, not `thinking: disabled`.**
  On Claude Opus 5, disabling thinking can leak `<thinking>` tags into the visible
  reply. Low effort is the cheaper lever and doesn't have that failure mode.
- **`cache_control: ephemeral` on the system block.** The fact sheet is ~3K tokens
  (measured: 12,012 chars / ~3,003 tokens) and identical every request, so after the
  first call most of the input bills at roughly a tenth of the rate. Opus 5 caches
  from 512 tokens.
- **`stop_reason` is checked before the answer is used.** On a refusal the content is
  empty or partial and must not be shown as a complete answer.
- **The system prompt forbids the AI overclaim explicitly**, mirrors the site's caveat
  discipline (if a number has a caveat, the bot gives both), and treats all visitor
  input as questions rather than instructions.
- **Rate limiting is in-memory and therefore best-effort** — serverless instances
  recycle, so it slows one abusive client rather than enforcing a quota. For a real
  limit, move `hits` to Vercel KV or Upstash.

Tests live in the scratchpad, not the repo: a stubbed-SDK suite over `api/ask.js`
(validation, streaming, refusal, truncation, transport error, rate limiting) and a
Chromium run of `ask.html` against a stub SSE endpoint that splits frames mid-chunk.
Re-create them if you change the streaming contract.

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
