# duaakhalid.com

Duaa Khalid's portfolio. Live at https://duaakhalid.com (also `www.` and
`duaakhalid-site.vercel.app`).

## Architecture

**One hand-written page.** No build step, no framework, no dependencies. Edit a file, push,
it deploys.

> **August 2026: the site became a single page.** It used to be three separate pages. Duaa
> asked for everything on one page with the header links jumping to sections, and for About to
> come before the case studies. `about.html`, `notes.html` and `faq.html` are now **redirect
> stubs only**. Do not put content back into them: two copies of the same copy will drift, and
> keeping the fact sheet honest depends on there being exactly one copy.

| File | Role |
| --- | --- |
| `index.html` | The whole site. Hero (split: copy left, rollout stepper right), then `#about`, `#work`, `#notes`, `#faq`, CTA. The now note lives in the footer |
| `about.html`, `notes.html`, `faq.html` | Redirect stubs to `/#about`, `/#notes`, `/#faq`. `canonical` + `noindex, follow` + meta refresh + `location.replace`. They exist so older inbound links and any printed résumé URLs still land somewhere |
| `styles.css` | Every shared rule. Page-specific CSS lives in the `<style>` block in `index.html` |
| `script.js` | Stat count-up, card tilt, interactive dashboard, dedup toggle, Homebase context generator, case-study scroll reveal |
| `context.md` | **The verified fact sheet. The only source for factual claims.** |
| `vercel.json` | `cleanUrls: true` so `/about` and `/faq` work without `.html` |
| `package.json` | Metadata only. No deps, no scripts. Nothing reads it. |

> **History:** this replaced a compiled Claude Design bundle in July 2026. Earlier versions
> of this file documented a `__bundler/template` JSON round-trip and an eight-item re-export
> checklist. **All of that is obsolete.** Do not go looking for a bundler template; the HTML
> is plain and directly editable.

## Non-negotiables

These were each decided deliberately, several after getting them wrong first. Do not
undo them while chasing a visual or a quick edit.

1. **Never publish real advisor or commercial data.** The dashboard on the home page is
   recreated in HTML with **invented** figures. It has been shipped with real production
   data twice by accident. See "The dashboard is demo data" below.
2. **No site-wide AI claim.** Duaa does not "build AI systems". The sales tracker and the
   move-out generator contain no model; Homebase's model path is opt-in behind a flag.
   The hero, the meta description and the OG tags must all stay clear of this. A role
   descriptor (`AI Product + GTM`, "open to forward-deployed AI roles") is fine and
   intended: it names what she is targeting, not what her projects contain.
3. **Homebase is not a shipped product.** Roughly 3.5 hours of build, a CRUD app over six
   Firestore collections with no auth and test-mode rules. The RERA compliance layer is
   **specified, not shipped**. Never label it "live product". As of 2026-08-29 the site does
   not use the words **"hackathon"** or **"two person team"**: Duaa asked for both gone. The
   facts stay in `context.md`, and the honesty is carried by what remains on the page (three
   and a half hours, six collections, no production usage, compliance layer only specified).
   Do not put either phrase back while tidying copy.
4. **Never link `github.com/bm2515/homebase`.** It is the co-founder's repo and it is
   private, so it 404s for every visitor. It was live on the site and in all three
   résumés before this was caught.
5. **Contact is `dk947@cornell.edu`** everywhere, including link text. A case-sensitive
   find-and-replace once missed an all-caps `KHALIDDUAA1@GMAIL.COM` button label while
   correctly fixing its `href`. Search case-insensitively.
6. **No em dashes.** Stated preference. Commas or full stops.
7. **Every outbound link opens in a new tab** (`target="_blank" rel="noopener"`).
8. **The caveats live in the `#faq` section, not up beside the stat tiles.** Attaching them to
   the tiles suffocated the design. They are answered more fully in the FAQ, so nothing is lost.
   This still holds now that the FAQ is a section rather than a page.
9. **Section order is About, then Work, then Notes, then FAQ.** Duaa asked for About first and
   the case studies second. Do not reorder while tidying.
10. **Anchor offsets are responsive.** `.anchor` carries `scroll-margin-top: 92px`, and `124px`
    below 900px where the six nav items wrap and the header grows from ~67px to ~99px. Change
    the nav item count or the header padding and you must re-measure both, or sections land
    underneath the sticky header. Verified with a real browser at 1440px and 390px.
11. **Never name the field-sales vendor, and never publish its contract value.** The build-vs-buy
   story is the spine of case study 01 and of `/notes`, and it is told as "the field sales
   platform we already licensed". Naming a vendor her employer contracts with, and publishing
   what they paid, are both out. Decided 2026-08-06.
12. **Never say AI was blocked, restricted or banned, at any level.** This rule got stricter
    twice. It began as "never attribute it to a named employer", then the industry-level version
    ("an industry that blocks AI on employee laptops") ran as the hero for a while. On
    2026-08-06 Duaa asked for it gone from the whole site: even as an industry observation it
    reads as a complaint about an employer's IT policy, and it invites a question she does not
    want asked. Use neutral framings about where the industry is with AI instead, for example
    "an industry still working out what AI is for". The related wall in `#notes` is now about
    software being procured and installed centrally, which is the true and unloaded version of
    the same constraint.
13. **No absolute revenue figures.** The Egypt account growth is published as a multiple only,
    "roughly 6x over 18 months". Duaa explicitly chose the multiple over the absolutes.
14. **No AI-twin chatbot, ever.** It needs a stored API key, a serverless function, a rate
    limiter and a per-visitor bill a stranger can inflate, against a site whose whole property is
    five static files with no backend and no secrets. It is also commodity now: several SaaS
    products generate one from an uploaded résumé in minutes. The grounded pre-written answer set
    is `/faq`, which already exists and costs nothing.

## The dashboard is demo data

`index.html` recreates the Beauty Advisor tracker's "Targets & Commissions" view in HTML
and CSS. The figures are invented, and the arithmetic is internally consistent so a
technical reader can check it:

| City | Sales | Target | Attainment | Status |
| --- | --- | --- | --- | --- |
| Cairo | 38,916 | 39,400 | 98.8% | On Track |
| Hurgadah | 41,972 | 39,500 | 106.3% | On Track |
| Sharm | 26,875 | 30,800 | 87.3% | Behind Target |

Every attainment equals sales ÷ target, and the city totals are the sums of eight
invented advisors (`Yasmin K.`, `Tarek S.`, `Hana M.`, `Adam R.`, `Lina F.`, `Ziad H.`,
`Maya N.`, `Omar D.`). Use only those names.

**Real figures that must never reappear:** `$104.3k`, `of $110k target`, `$56.8k`,
`of $51k target`, `Jun 2026`, and any of `Mohamed`, `Mamdouh`, `Rehab`, `Veronia`, `Nada`.

If the dashboard needs regenerating from the real app, do **not** run
`Sales_management/deck_assets/seed_demo_data.sql` against production: its
`monthly_targets` insert conflicts on `(month_key, team)` and would overwrite real
Cairo/Sharm/Hurgadah targets. Stub the Supabase client locally instead. Note also that
the commission slab percentages are **hardcoded in two places**: the logic in
`commissionRateFromPct()` at `web_app/manager.html:1301-1307`, and again as a visible label
string at `web_app/manager.html:1813` ("Slabs: 70%=0.8%, 80%=1.0%, 90%=1.1%, 100%=1.3%"). Demo
data alone does not hide either. Verified 2026-08-06.

### It is interactive

Pick a city, enter a target, press Save. `script.js` recalculates attainment, remaining,
the progress bar and the On Track / Behind Target pill, then persists to `localStorage`
under `dk.targets.v1`. There is a Reset link. Threshold for On Track is **95%**.

`.dashboard-window` uses `zoom: 1.22` to enlarge it. **Use `zoom`, not
`transform: scale()`**. Scale would move the visual position of the dropdown and input
without moving their hit targets, silently breaking the interaction. Zoom drops to `1`
below 900px.

## The hero is split, and the rollout stepper lives in it

`.hero-grid` puts the copy left and the seven-step rollout sequence right, side by side above
the fold, collapsing to one column below 1000px. It was originally a section in `#notes`, about
two thirds down the page, and Duaa could not find it. **Do not move it back down.** The whole
point is that the proof is the first thing a reader meets.

The stepper is **progressive enhancement**. `#rollout-log` ships as a plain stacked list of seven
dated rows and `script.js` upgrades it by adding `.is-stepper`. With JS off you get the full list,
which is the honest fallback. Do not invert this by hiding rows in CSS by default.

`script.js` finds the component by `id`, so the markup can move without breaking it. The
container is pinned to the tallest step measured **before** anything is hidden, so advancing
cannot jump the page.

## The case studies are a carousel

> **August 2026, second restructure.** The case studies used to be three `<details class="cs-fold">`
> blocks, each holding six labelled `.row` pairs (PROBLEM, WHAT IT ACTUALLY WAS, BUILD, PROOF,
> WHAT BROKE, IMPACT). **All of that is gone.** Duaa's objection was simple and correct: "you have
> to do expand or people are not noticing it", and nobody reading a portfolio knows there is
> anything behind a closed fold. Do not reintroduce the folds, and do not go looking for `.cs-fold`
> or the six-row schema. The reframes those rows carried now live in the `.cw-body` prose.

`#cw` shows **one slide at a time** with a transport bar at the bottom: PREV, three numbers, an
"Up next" label, and NEXT. `script.js` finds it by `id`, adds `.is-carousel`, and builds the
transport, so **with JS off all three slides stack and there is no transport.** That is the honest
fallback. Do not invert it by hiding slides in CSS by default.

**All three slides share one shape**, and the sharing is what stops NEXT from feeling like a
different page each time:

| | Row 1, left | Row 1, right | Row 2, full width |
| --- | --- | --- | --- |
| 01 Tracker | narrative | the dedup table `#dupt` | the interactive dashboard |
| 02 Homebase | narrative | the context generator `#hb-out` | the Homebase screenshot |
| 03 Move-out | narrative | the catalog screenshot | none |

**Which piece goes where is decided by its shape, not its type.** The dedup table and the
generator are built for a narrow column; the dashboard and the screenshots are wide. Slide 3 has
no row 2 because it has no interactive payload, and Duaa asked for it to stay simple: "its only a
personal project ... the picture of the site thats it keep this case study simple pls." **Do not
add a demo to slide 3 to make it match.**

This is done with `display: contents` on `.cw-main`, `.cw-demo` and `.cw-demo-grid`, so the slide
itself becomes the grid. **No markup was moved to achieve it**, which is why every `id`, the
source order and the no-JS stacking all still work.

**There are no metrics columns.** Slide 1 used to carry "1,324 rows ingested, 0 rejected", "29
duplicates removed", "18 advisors daily, none required to" and "2 days". They measured the
pipeline's own hygiene rather than anything Duaa did, they led with the smallest number so the
first impression was a small dataset, and the first three were already stated twice more on the
same slide. Homebase's four went the same way, but its honest ones (three and a half hours, six
Firestore collections, **no production usage**) moved into the body copy and must stay there under
non-negotiable #3. **Do not add metrics columns back.**

### The slides are different heights, and that is animated, not fixed

At 1440px they measure 937, 1038 and 488. At 390px, 1567, 1251 and 890. Three real case studies of
different lengths cannot be made equal without padding one out with filler.

So `go()` in the carousel IIFE **animates the track between the two heights** instead of letting
the page snap: measure `.cw-track` before the class swap, swap, measure after, then set the old
height, force a reflow, and set the new one. `.cw-track` carries
`transition: height 320ms cubic-bezier(0.16, 1, 0.3, 1)` and `.is-sizing` adds `overflow: hidden`
so a shrink clips rather than spills.

Three details are load-bearing:
- **`go(0)` on init must not animate.** The flag is the second argument; only the three transport
  handlers and the arrow keys pass `true`.
- **The inline height is always released**, on `transitionend` and again on a 500ms timer, because
  `transitionend` does not fire for an interrupted transition or a backgrounded tab, and a track
  stuck at a fixed height clips the next slide.
- **A resize while `.is-sizing` is set clears it**, or the track strands at a stale pixel value.

**Pinning the track to the tallest slide was considered and rejected.** It would leave roughly
550px of dead cream under slide 3 at desktop and 789px at 360px. The rollout stepper reached the
same conclusion for the same reason.

Two interactive pieces, both zero-dependency:

**The duplicate-pair table (`#dupt`).** Press RUN DEDUP and the duplicate row is struck
through and faded while three KPI chips correct themselves: rows 2 to 1, sales counted
4,150 to 1,840, days worked 2 to 1. It toggles back. The row is struck through rather than
deleted, which matches the site's own "removed, not rejected" language.

- **The values and the advisor name are invented**, on the real column shape. This is
  deliberate, see non-negotiable #1. Only `Hana M.` from the approved list appears. The
  real duplicate groups in `normalized_daily_sales.csv` are on `Nada`, `Mary` and `Marwa`,
  and `Nada` is a forbidden name, so a real export excerpt cannot be used here.
- **Six columns is the maximum that fits.** The table sits in a half-band column about
  408px wide. `working_days` and `items_sold` were dropped because at eight columns
  `status` was pushed out of view, which hides the kept/removed tags that are the whole
  point. The days-worked inflation is carried by the KPI chip instead. If you add a column,
  re-measure `scrollWidth` against `clientWidth` on `.dupt-wrap` and confirm it is equal.
- The `38, 38, 40 and 37 columns` line is a **real, verified** fact from
  `Sales_management/sales_data.xlsx`. Column counts are structure, not commercial data.

**The Homebase context generator (`#hb-out`).** Two selects, and the block re-renders with
the same eight fields every time. That invariance *is* the demonstration, so if you add a
field to one branch, add it to all of them. Built on the `.hb-terminal` classes that were
already in `styles.css` and previously unused.

Both demos sit inside the collapsed fold, so remember to open it before checking either one
in a browser.

## Images

| File | Used | Source |
| --- | --- | --- |
| `duaa-portrait.jpg` | about.html | `IMG_3483.JPG`, cropped to the black wall only, 1200x1247 |
| `moveout-catalog.jpg` | index.html | Live capture of moveoutsale.vercel.app |
| `homebase-shot.jpg` | index.html | homebase-labs.lovable.app, cropped above the fabricated stats |
| `favicon.ico` | all | 64x64 "DK" on `#F03419` |
| `duaa-dg-sign.jpg`, `duaa-milan.jpg`, `homebase-concept.jpg`, `sales-dashboard.jpg` | **unused** | earlier versions. Kept on disk on purpose: Duaa asked for additions rather than deletions, and they cost nothing unreferenced. Do not delete without asking. |

**The Homebase crop matters.** `homebase-labs.lovable.app` advertises "98% Tenant
satisfaction", "<2s Response time" and "94% faster issue resolution" for a build with no
production usage, plus a free-trial strip and a Lovable watermark. The committed crop
stops above all of it. Do not re-capture without re-cropping.

**The portrait must not be re-cropped by CSS.** Something upstream forced a 3:4 wrapper
with `object-fit: cover`, which sliced the D&G sign off at both edges. The override at the
end of `styles.css` lets the file's own ratio drive the height. Keep the `<img>`
`width`/`height` attributes matching the file exactly.

## Design system

Measured from the Framer original (`duaakhalid.framer.website`) by reading computed
styles, not by eye. An earlier pass guessed and every value was slightly wrong.

| Token | Value |
| --- | --- |
| Background | `#F3F1EC` |
| Ink | `#171716` |
| Accent | `#F03419` |
| Hairline | `#B8B5AE` |
| Display font | Bricolage Grotesque 700/800 |
| Label font | IBM Plex Mono 500, 12px, `0.08em`, uppercase |
| **Body font** | **Inter** 400, 18px/1.45 |
| Band | `max-width: 1200px`, 40px gutters |
| `--sec` | `clamp(56px, 5vw, 72px)`, the space above and below **every** top-level section |
| `--sec-half` | `calc(var(--sec) / 2)`, the step *inside* a section |
| `--measure` | `62ch`, the one reading measure, about 70 characters a line |
| `--r` | `4px`, the one editorial corner radius |

Three families, not two. Setting body copy in Bricolage makes every paragraph read too
heavy; that was a real bug.

**Use the four tokens. Never write a raw `padding-block` on a section again.** The page once
carried nine distinct section top paddings and nine bottom ones, because several `<section>`s wore
an inline `padding-block: 60px` on top of a component that already had its own `clamp()`. The
paddings stacked, and the worst adjacency measured 130 + 130 against 60 elsewhere. Duaa spotted the
result as "awkward space". Apply `.sec`, or `.sec-t` / `.sec-b` where one section supplies the top
of a pair and the next supplies the bottom. A boundary is then always `2 x --sec` rather than the
sum of two unrelated values.

Same story for the other three. `.lead` carried five different max-widths (560px, 640px twice,
68ch, 800px) and the FAQ answers, the caveat list and the timeline bodies ran at 85 to 123
characters a line. There were eight border-radius values. **The 3px, 5px and 8px radii still in the
file belong to the dashboard mockup**, which is imitating a real web app, and are correct there.

**The FAQ cards must not be `#FFFFFF`.** Pure white was a fifth surface on a four-colour page and
read noticeably cooler than everything around it. They are hairline cards on the page's own ground,
matching `.cs-fold` and `.hw-row`, with a 2.5% accent wash marking the open one. Their divider was
`#f1f5f9`, a slate near-white borrowed from the mockup's palette, and is now `var(--rule)`.

**All three pages must share one band width.** They once had 1200px, 1240px and 760px,
so the header appeared to jump between pages. The FAQ holds its reading measure on the
prose (`74ch`) rather than on the container.

The header and footer are one shared component (`.sitehead` / `.sitefoot`), identical
markup on every page, five nav links: Work, About, FAQ, Resume, Email.

## Deploying

Auto-deploys on push to `main` via Vercel (project `duaakhalid-site`).

```
git add -A && git commit -m "..." && git push
```

## Gotchas, all learned the hard way

- **Count your tags after any structural edit.** Splicing HTML by raw string offsets
  broke `index.html` once (104 open `<div>` vs 107 close). Check
  `grep -o '<div' | wc -l` against `</div>` before committing.
- **`sips --cropOffset` crops from the centre, not the top left.** It cost several
  attempts. For a deterministic crop, render the image inside a fixed-size
  `overflow: hidden` div in headless Chrome and screenshot that.
- **Headless Chrome clamps its window to ~500px wide.** `--window-size=390,x` silently
  *crops* instead of reflowing, which looks exactly like a horizontal-overflow bug. Load
  the page in a 390px-wide iframe to get a true mobile layout viewport.
- **Vercel bot-challenges heavy scripted traffic.** After many `curl` checks in one
  session you get `HTTP 403` with `x-vercel-mitigated: challenge`, even from headless
  Chrome. Nothing is broken; wait, or check in a real browser.
- **Cloudflare proxy must stay OFF** (grey cloud) on the `duaakhalid.com` and `www` A
  records pointing at `76.76.21.21`. Flexible SSL plus Vercel causes a redirect loop.
  Switch Cloudflare SSL/TLS to Full (strict) first if you ever want the proxy on.
- **Local DNS can lag.** Verify with `dig +short A duaakhalid.com @1.1.1.1`, not the
  local resolver.
- **Greps prove nothing about what renders.** Always finish with a real browser check.

## Open items

- **Résumé variants**: three exist under
  `~/Desktop/Maven Mahesh Course/cv-enhancement/` (ADM, CSM, PM), all regenerated with
  the Cornell address and the dead Homebase link removed. `/resume.pdf` serves the ADM
  variant. Regenerate with `scratchpad/build.py` then print to PDF via headless Chrome.
- **PM variant job title unconfirmed**: it says "Key Account Manager & Internal Product
  Owner"; ADM and CSM say "Customer Success & Key Account Manager". The site uses the
  latter. Confirm against contract/LinkedIn before sending the PM variant.
- **Real cycle-time figure**: the tracker's month-end turnaround improvement is real but
  unmeasured. Left blank deliberately. **Do not estimate it.**
- **Homebase evaluation specifics**: session count and the failure modes the log review
  surfaced are not recorded in the repo, so no numbers are claimed.
- ~~**A live defect on moveoutsale.vercel.app**~~ **FIXED, confirmed 2026-08-06.** The
  availability counter could show "0 items available" instead of the real count. Verified against
  the served page: `<b id="navail">0</b>` is a pre-script placeholder and the inline script sets
  it from the data with `DATA.filter(d=>!d.sold).length`. The embedded data holds 32 rows, 21
  sold, 11 unsold, so a visitor sees 11. **The site keeps the FAQ entry and marks it fixed rather
  than deleting it.** A limitations register that only ever lists open problems says less than one
  that shows what happened to them, and the disclose-then-fix cycle is the point. Do not quietly
  remove resolved entries.
- ~~**`Sales_management` attainment bug**~~ **RETRACTED 2026-08-06. The note was wrong.** It
  claimed that for `team_total` cities an individual's sales were divided by the team target,
  producing a false attainment that fed commission tiers. Checked against the repo and against a
  real June 2026 commission export. It does not do that.
  - `manager.html:1615` and `:1714` divide **team** sales by the **team** target.
  - `manager.html:1736` divides an **individual's** sales by that individual's prorated target,
    for `per_ba` teams.
  - `manager.html:1727` deliberately gives every member of a `team_total` team the **team's**
    attainment and the **team's** rate, then pays `own sales * team rate`.
  - Correct by design, and the design is stated in `web_app/sql/add_team_month_total_fn.sql`:
    "Hurgadah's monthly target is `target_type = 'team_total'` (commission is team-based, not
    per-BA)."
  - Confirmed against a real commission export, which is **not reproduced here**: for a Hurgadah
    row the displayed attainment was several times what that advisor's own sales divided by the
    basis would give. That is only possible if the figure is the team's attainment rather than
    hers, and her commission came out as her own sales times the team rate. Both consistent with
    the design, neither consistent with the retracted claim.
  - The only thing left is a **labelling** nit: a column headed Attainment showing a team figure
    beside an individual's sales row can be misread by someone who does not know the design. Not
    a defect. Not going on the site.
  - **A real bug of this shape did exist and was already fixed.** The same SQL file records it:
    the BA app used to divide the team goal by headcount and show each BA their own slice, which
    broke as the team grew ("45,000 / 4 = 11,250 made no sense for a team commission"). This note
    was most likely a garbled memory of that, written after the fix.
- **Possible additions**: scroll-reveal on section enter via `IntersectionObserver`
  (no library needed). Deliberately **not** adopting Lenis smooth scroll or GSAP; the site
  currently ships zero dependencies and that is worth keeping.
