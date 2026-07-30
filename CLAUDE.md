# duaakhalid.com

Duaa Khalid's portfolio. Live at https://duaakhalid.com (also `www.` and
`duaakhalid-site.vercel.app`).

## Architecture

Three hand-written static HTML pages sharing one stylesheet and one script. **No build
step, no framework, no dependencies.** Edit a file, push, it deploys.

| File | Role |
| --- | --- |
| `index.html` | Home: hero, stat row, three project blocks each with a PROBLEM / BUILD / PROOF / IMPACT body, through-line, capabilities, CTA |
| `about.html` | Portrait, bio, how-I-work, career path, capabilities |
| `faq.html` | Ten hand-written Q&As, native `<details>` accordions, no page-specific JS (it loads the shared `script.js` only for the footer dock) |
| `styles.css` | Every rule for all three pages |
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
3. **Homebase is not a shipped product.** A hackathon build, roughly 3.5 hours, a CRUD app
   over six Firestore collections with no auth and test-mode rules. The RERA compliance
   layer is **specified, not shipped**. Never label it "live product".
4. **Never link `github.com/bm2515/homebase`.** It is the co-founder's repo and it is
   private, so it 404s for every visitor. It was live on the site and in all three
   résumés before this was caught.
5. **Contact is `dk947@cornell.edu`** everywhere, including link text. A case-sensitive
   find-and-replace once missed an all-caps `KHALIDDUAA1@GMAIL.COM` button label while
   correctly fixing its `href`. Search case-insensitively.
6. **No em dashes.** Stated preference. Commas or full stops.
7. **Every outbound link opens in a new tab** (`target="_blank" rel="noopener"`).
8. **The caveats live on `/faq`, not on the home page.** Attaching them to the stat tiles
   suffocated the design. They are answered more fully on the FAQ, so nothing is lost.

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
the commission slab percentages are **hardcoded** at `web_app/manager.html:1813`, so demo
data alone does not hide them.

### It is interactive

Pick a city, enter a target, press Save. `script.js` recalculates attainment, remaining,
the progress bar and the On Track / Behind Target pill, then persists to `localStorage`
under `dk.targets.v1`. There is a Reset link. Threshold for On Track is **95%**.

`.dashboard-window` uses `zoom: 1.22` to enlarge it. **Use `zoom`, not
`transform: scale()`** — scale would move the visual position of the dropdown and input
without moving their hit targets, silently breaking the interaction. Zoom drops to `1`
below 900px.

## The case-study bodies

Each project block carries a `.cs` block of four `.row` pairs: PROBLEM, BUILD, PROOF,
IMPACT. The label is the existing `.m.red` mono token (`.m.light` inside the dark Homebase
band), so the rows inherit the design system rather than introducing new type.

Each project's original one-line summary paragraph **stays above** the fold. Duaa asked for
these to be additions, not replacements. An earlier pass folded the summaries into BUILD and
had to restore them; BUILD now carries mechanism the summary does not state.

**The whole `.cs` block is collapsed inside a `<details class="cs-fold">`, closed by
default.** Expanded inline, the four rows made every project block roughly twice as tall and
broke the scannable layout, which Duaa flagged. A modal was considered and rejected: it needs
JS, a focus trap and an escape hatch, and it reads badly on mobile. Native `<details>` gets
keyboard support and no-JS behaviour for free and reuses the `/faq` pattern.

The summary label advertises what is inside, including the interactive bits ("RUN THE DEDUP",
"TRY IT"), because otherwise the two demos are invisible behind a closed fold. **Keep these
labels to one line**; at 12px mono in the Homebase column, anything longer than about 52
characters wraps and pushes the `+` off centre. All three bars should measure 50px tall.

The rows cascade in on open via a `cs-in` keyframe animation, staggered 65ms by
`script.js`. This is an **animation, not a transition out of a hidden base state**, and that
distinction is load-bearing: the rows' resting style is fully visible and the hidden frame
exists only inside the keyframes, so a stalled animation or a dead script cannot strand the
content invisible. Do not "simplify" this back to `opacity: 0` plus a transition. An earlier
version used `IntersectionObserver`, which cannot work here at all, because a closed
`<details>` is `display: none` and its rows never intersect.

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

Three families, not two. Setting body copy in Bricolage makes every paragraph read too
heavy; that was a real bug.

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
- **A live defect on moveoutsale.vercel.app**: renders "0 items available" from a
  hardcoded placeholder that JS overwrites on a normal load. Should read 11. Still present
  as of 2026-07-30. Separate repo, so it is disclosed as FAQ item 10 rather than fixed here.
- **`Sales_management` attainment bug**: for `team_total` cities the Target column shows
  the *team* target beside an individual's sales, so the percentage is not that advisor's
  attainment. Affects production, feeds commission tiers.
- **Possible additions**: scroll-reveal on section enter via `IntersectionObserver`
  (no library needed). Deliberately **not** adopting Lenis smooth scroll or GSAP; the site
  currently ships zero dependencies and that is worth keeping.
