# Facts about Duaa Khalid

The verified fact sheet for duaakhalid.com. Everything below is stated on the site, and
nothing on the site should claim something that is not here. Maintained by hand: the
generator that used to build this file is gone, so **update this in the same commit as any
copy change**.

Last synced to the live site: 2026-07-30.

## Positioning
- Headline: I get software into companies that are not ready for it.
- Lead: Five years in luxury beauty, an industry that blocks AI on employee laptops and licenses tools its own account owners cannot configure. I built what we needed anyway, at no cost, and the field team used it every day without being told to. That is the job I want next.
- **Never frame the build as going around management.** "Without asking for a budget" was retired
  on 2026-08-06: Duaa flagged that it reads as reckless and that it is inaccurate. The correct and
  stronger framing is that **building it cost nothing but her own time, so there was no spend to
  approve and no case to make.** The contrast with a per-seat licence is the point.
- Role descriptor: AI Product + GTM. This names the roles she is targeting, not a claim that her projects contain models.
- Status: Incoming MEng, Data Science & Decision Analytics, Cornell Tech, August 2026. Dubai to New York.
- Target roles, in her words: forward-deployed AI, enterprise side. The site is written for hiring managers.
- The AI-blocking claim is stated at **industry level only**. Never attribute it to Dolce & Gabbana or any named employer. Decided with Duaa on 2026-08-06.
- In her own words: Most of my work starts inside someone else's spreadsheet. A supervisor's export, a catalog price, a phone call assembled from memory. Deciding what counts as a valid row is the interesting part, and so is getting a field team in another country to work the new way.
- **Retired phrasing, do not reuse:** "The model is rarely the interesting part." Duaa explicitly rejected this wording on 2026-08-06.

## Stat row on the home page
- 6x, the Egypt account over roughly 18 months. Growth multiple only. **Absolute revenue figures are never published.** Source: Duaa, 2026-08-06, who authorised the multiple and declined the absolutes.
- 18, advisors logging daily, nobody required to. Verified against the January to April export.
- 2 days, from the decision to build to a running site. Source: Duaa, 2026-08-06.

## Career track (each step: the system that was broken, then what she did)
- Oct 2021 LVMH Fragrance Brands || Out of stocks and aged inventory tracked by hand across MENA accounts. || Monitored stock and logistics flows and aligned replenishment to the promotional calendar.
- May 2022 LVMH, Givenchy and Kenzo || Placing one account order took 45 minutes, across 30 plus MENA locations. || Became internal product owner for the sell-in decision support tool and got it to 5 minutes. What that took Defining the requirements, prioritising the roadmap, and running feedback loops for two years with the account managers who used the tool every day. It was the first time I was the single point of contact across retailers, marketing, demand planning and supply chain.
- Mar 2024 Dolce & Gabbana Beauty || A 13 market portfolio with no way to see which accounts were going wrong until it had happened. || Built the health monitoring layer that benchmarks accounts and flags the at-risk ones. What that took It is now the primary decision input across all 13 markets. Alongside it I designed and delivered sales enablement workshops for a 30 plus person beauty advisor team, built the curriculum, ran the live sessions and tracked performance.
- Jan 2026 Egypt, travel retail || Advisor performance arrived as a supervisor export whose layout changed month to month, with duplicate rows quietly inflating every KPI. || Framed the problem, defined the dedup key, built the ingest pipeline and the app, and ran the rollout. What that took Live with 18 advisors across Cairo, Sharm and Hurghada, none of whom were required to use it. 1,324 rows ingested, 0 rejected, 29 duplicates removed in one full run, and presented to global beauty leadership.
- Aug 2026 Cornell Tech || MEng in Data Science & Decision Analytics. Going to build these properly.

## Projects

### Beauty Advisor Sales Tracker
- Context: Dolce & Gabbana Beauty, Travel Retail MEA
- What it is: A PWA where 18 beauty advisors log daily sales, behind an ingest pipeline that de-duplicates the supervisor export before any KPI is calculated.

#### How it came to exist. Source: Duaa, interview 2026-08-06.
This is the origin story the site did not previously tell, and it is now the spine of the case
study. Every item here is from Duaa directly.

- **Egypt was her account and it was growing.** Roughly 6x over about 18 months. Publish the
  multiple, never the absolute figures.
- **The manual state:** advisors sent daily sales over WhatsApp and she retyped them into Excel.
- **Build vs buy.** The company already licensed a field-sales platform. It worked for the large
  markets and not for hers. Loading a monthly target meant emailing the vendor's IT team and
  waiting. The dashboard did not show what she needed. The per-seat cost could not be justified
  for a market that size. **Building the replacement cost nothing but her own time, so there was
  no spend to approve. She built it.** It was a judgement call by the person accountable for the
  numbers, not a brief she was handed, and not a decision taken around anyone.
- **Never name the vendor and never publish its contract value.** Say "the field-sales platform
  we already licensed". Decided with Duaa on 2026-08-06.
- **Two days** from decision to a running site. Supabase behind it. She learned Supabase on this
  project.
- **No native app.** The advisors were on phones, so she had them add the site to the home screen
  from the browser instead of shipping through an app store.
- **Staged pilot:** 3 advisors plus the sales supervisor for about a week. The supervisor got the
  dashboard with automatic commission and target calculation. Feedback gathered, app improved,
  then launched to everyone.
- **The rollout wall was not technical.** Advisors could not complete an email signup. In her
  words: "It was not that the app was faulty. It was more like, not everyone knows how to access
  emails, not everyone knows how to register somewhere."
- **She ran WhatsApp and the app in parallel for a month** rather than force the change, then
  reconciled the two channels so nothing double-counted.
- **Where the 29 duplicates actually came from. Confirmed by Duaa 2026-08-06, previously open.**
  Not the export's layout drift. Staggered registration. She backfilled everything up to launch,
  then advisors came online on different dates because of the signup wall. While an advisor was
  locked out she entered that advisor's sales herself. Once they registered they began logging
  their own, **with no visibility into what was already in the system**, so they re-entered days
  she had already covered and sometimes skipped days she then had to add. Every advisor had a
  different start date, so the overlap had to be tracked person by person. In her words: "They
  don't have visibility into my system. They don't know if I see it... I had to manually add that
  and make sure that, for each of the BAs, I was not duplicating them."
  The honest framing, which the site now uses: **this was a product gap, not a data hygiene one.**
  Duaa gave the mechanism using a hypothetical ("let's say on 1 June"), so describe the mechanism
  and never invent dates or per-advisor start dates.
- **The export's layout drift is a separate, still-true fact.** The 38, 38, 40 and 37 column
  counts across four consecutive monthly sheets are verified and remain publishable. They are
  structure, not commercial data, and they are **not** the cause of the 29 duplicates.
- **January to March was backfilled by hand.** She launched in April and loaded the earlier months
  into Supabase by writing SQL herself. So daily self-logging by advisors describes April onward,
  and the 1,324-row figure covers a window whose first three months she entered from existing
  records. Both facts are real and they count different things.
- Presented to management about a month after full launch.

- Problem: Egypt beauty advisor performance reached me as a supervisor's Excel export, with layouts that changed month to month and duplicate rows on the same advisor, date, store and shift. Duplicates double count sales and inflate Days Worked, so no daily KPI could be trusted, and advisor productivity could not be compared across cities until month end totals arrived weeks late.
- Her role: Framed the problem, defined the dedup key, built the ingest pipeline and the app, and ran the rollout across 3 markets.
- Outcome: 1,324 rows ingested, 0 rejected and 29 duplicates removed in one full run across January to April. Live with 18 advisors and presented to global beauty leadership.
- Link (Live app): https://sales-management-phi-blue.vercel.app
- Repository: https://github.com/khalidduaa1-byte/Sales_management
- Numbers: 1,324 = rows ingested in one full run, January to April; 0 = rows rejected; 29 = duplicates removed; 396 = attendance rows
- Dedup key, verified against the pipeline output: advisor + date + store + shift. The real column names are `ba_name`, `entry_date`, `store`, `shift`, `sales_amount`, `items_sold`, `working_days`.
- Layout drift, verified: the same supervisor export arrived with 38, 38, 40 and 37 columns across four consecutive monthly sheets (Jan26, Feb26, march, APRIL). Column counts are structure, not commercial data, so this is safe to state publicly.
- The duplicate-pair table on the home page uses **invented values and an invented advisor name** on the real column shape. It is labelled as illustrative on the page. No real advisor row is published.
- The dashboard on the home page is **demo data**, recreated in HTML with invented figures and invented advisor names.
- Adoption:
    - 18 advisors, 3 markets: Cairo 12, Sharm 3, Hurghada 3, read off the January to April export. Presented to global beauty leadership in June 2026.
    - Markets, not doors: The data holds 3 distinct store values at city level, so coverage is stated at market level. No door count is claimed.
    - Nobody was required to use it: The tracker was not mandated. Eighteen advisors across Cairo, Sharm and Hurghada logged their own sales in it daily through the January to April window. Adoption is the number that matters here, not headcount.
    - The rollout was training, not a link: Onboarding and training covered roughly 20 field users into sustained daily use, on top of sales enablement workshops built and delivered for a 30 plus person advisor team at Dolce & Gabbana. The tracker landed inside an existing training relationship, which is why it stuck.
- Caveats and limitations:
    - Removed, not rejected: The 29 were valid rows that collapsed as duplicates. Nothing was rejected.
    - Two snapshots, one number: The January to April Excel splits the 18 advisors 12 Cairo / 3 Sharm / 3 Hurghada; the live database through 3 June splits 11 / 3 / 4. Same 18 advisors, different snapshots. This page cites the Excel.
    - No cycle time measured: The turnaround improvement is real but unquantified in the repo, so it is left as a placeholder.
    - 18 live, about 20 onboarded: The January to April export holds 18 advisors. Onboarding and training covered roughly 20 field users, a figure that includes people who moved off the team inside the window. Both are real and they count different things.

### Move-Out Sale Site & Tracker
- Context: Personal build, Dubai
- What it is: One Python script generates the buyer facing catalog and the internal profit tracker from a single item list, so the listing and the accounting cannot disagree.
- Problem: Selling 31 pieces of furniture meant re-answering the same questions item by item over WhatsApp, and pricing everything off store catalog pages that turned out to be wrong by more than double. One dresser was recorded at AED 1,100 when it had actually cost 499, which put a phantom discount badge on a live page.
- Her role: Wrote the generator, set the pricing rules, and ran the sale end to end.
- Outcome: 20 of 31 items sold in 30 days. AED 8,400 recovered against AED 10,688 paid for those items, a 78.6% recovery rate.
- Link (Live site): https://moveoutsale.vercel.app
- Repository: https://github.com/khalidduaa1-byte/moveout-sale
- Numbers: 20 / 31 = items sold in 30 days, site launched 29 June 2026; AED 8,400 = recovered against AED 10,688 paid; 78.6% = recovery on the items sold; AED 4,900 = still on the table across 11 items
- Design decisions:
    - Why not just post it on Dubizzle: Thirty one items on a marketplace is thirty one listings and thirty one separate threads answering the same three questions about size, condition and whether the price moves. One catalog answers all of it once and the link is the only thing you send. The marketplace also has no accounting side. It tells you an item is gone. It does not tell you whether you recovered what you paid for it.
    - Why not just keep the Excel tracker: A sheet has no buyer facing surface, so prices get retyped into listings and the two versions drift apart within days. Here the catalog and the tracker are two outputs of one run over one item list, so a correction cannot land in one place and be missed in the other. Deploy is one push, which means the price fix and the accounting update happen in the same action.
    - The pricing rule no platform enforces: Nothing on a marketplace checks that the price you crossed out is what you actually paid. That is how a dresser recorded at AED 1,100 that had really cost 499 ended up with a phantom discount badge on a live page. The generator prices against purchase price, so a saving cannot be displayed unless it is real.
- The rules, not the site:
    - A catalog price is not a purchase price: Learned twice. The dresser, and a dining table recorded at 1,499 when the 2,100 already included four chairs.
    - Bundles carry cost on the bundle line: No invented per item split. If a purchase was a bundle, the whole cost sits on the bundle row.
    - Unallocated cost stays visible: Curtains, 2,100 across two rooms, deliberately left unallocated, with a written note that real recovery is worse than the tracker shows until it is resolved.
- Caveats and limitations:
    - The sheet says 21 of 32: A COUNTIF counts rows, not objects. One row is a synthetic Dining Set Bundle whose table and chairs are also listed individually. The honest figure is 20 of 31.
    - What 78.6% measures: Recovery against what was paid for the items sold, not against total apartment spend.
    - Where the dates come from: Git history, which records when an item was marked sold rather than when money changed hands. The Excel has a Sold Date column the script never writes, so per item days to sell is not in the tracker.
    - A defect, disclosed and then fixed: the catalog's availability counter could show 0 items available instead of the real count. **Fixed, confirmed 2026-08-06.** The served page carries `<b id="navail">0</b>` as a pre-script placeholder and the inline script sets it from the data: `document.getElementById('navail').textContent = DATA.filter(d=>!d.sold).length`. The embedded data holds 32 rows, 21 sold, 11 unsold, so a visitor sees 11. That count also independently confirms the "sheet says 21 of 32" caveat above, from the live data. The site keeps the entry and marks it fixed rather than deleting it, because the disclosure-then-fix cycle is worth more than a clean list.

### Homebase
- Context: Co-founded, two person team
- What it is: A fixed format context block that a voice agent uses to dispatch maintenance vendors. Deterministic template by default, model behind an opt-in flag.
- Problem: Dispatching a maintenance vendor by phone means a human assembling the same context every time: what is broken, which unit, when the tenant is free, and what else that vendor already has booked. Assembled ad hoc, it comes out differently on every call and details get dropped.
- Her role: Co-founder. Owned problem framing and the UAE rental regulation model the product was built around, including RERA bands, the 90 day notice rule, Ejari sequencing and the bilingual requirement.
- Outcome: A hackathon build with no production usage, so there is no impact number to claim. What is worth defending is the architecture.
- Link (Concept page): https://homebase-labs.lovable.app/
- Do not link `https://github.com/bm2515/homebase`. It is the co-founder's repo, it is private, and it 404s for every visitor.
- The concept page advertises impact stats ("98% tenant satisfaction", "<2s response time", "94% faster issue resolution") for a build with no production usage. Those figures are not repeated on the site, and the committed screenshot is cropped above them.
- Scope note: What shipped in roughly 3.5 hours is a CRUD app over six Firestore collections with seed data, no auth and test mode rules. The README also carries a vision layer of RERA band checks, Smart Rental Index lookups, bilingual WhatsApp notices and a tenant facing agent. That layer is listed as out of scope in the same README, so it is spec, not product. This page covers only what shipped.
- Design decisions:
    - Static prompt, structured context: The voice agent’s system prompt stays static and per call variation is injected as a context block with fixed fields, so the prompt is not rewritten on every call.
    - The model is opt-in: The default path is a deterministic template builder. The LLM path only runs with USE_LLM_SCOPE=true, because a string template was sufficient for the job.
- Evaluation:
    - Tested with real users, not demoed: The build went in front of real users in structured usability sessions rather than being demoed. The session count is not recorded in the repo, so no number is claimed here.
    - Reviewed the logs, not just the happy path: Output logs from the vendor call flow were read back to find where the generated context block went wrong, and the failure modes that surfaced drove the next iteration.
- Caveats and limitations:
    - Team split: Two person team, with a professional engineer as the other founder. The UAE rental regulation model is the part that was distinctly mine.
    - Unsourced README stats: The README cites 70% of manager time spent on compliance and 40% of tenant disputes arising from move out terms, with no source. Neither figure is repeated here until it is sourced.
    - Scope of what shipped: No auth, test mode Firestore rules, seed data. Not production hardened.

## Field notes page (`/notes`)

Added 2026-08-06. Three sections, all sourced from the interview of the same date. The page is
the site's main differentiator: it is written from the position of having been the *customer* of
a failed enterprise rollout, which is the thing a forward-deployed hiring manager cannot get from
a candidate who has only ever sold in.

### The five walls
Each is stated as a category of constraint in luxury retail, sourced to her own experience.
**None of them is attributed to Dolce & Gabbana, LVMH, or any named employer, and the vendor is
never named.** Both rules were decided with Duaa on 2026-08-06.

1. AI blocked at device level. Real privacy and security reasons. Effect: the work moves to
   personal hardware and personal time.
2. The licensed platform was the ceiling. Loading a monthly target meant emailing the vendor's IT
   team. The account owner could not configure her own targets.
3. Per-seat pricing could not be justified for the smallest market, which is where the manual
   work is heaviest. **State no headcount here**, the figure is unresolved.
4. The user could not sign up. Registration needed an email. Duaa's own miss, and stated as such.
5. The ask was more expensive than the build, so she never made it.

### The rollout log
Dated sequence, all from the interview: Day 0 the decision not to ask, Day 2 a running site on
Supabase, Week 1 a pilot with 3 advisors plus the sales supervisor, April launch plus the manual
SQL backfill of January to March, the signup wall days later, a month of WhatsApp running
alongside with daily reconciliation, then June 2026 presented to global beauty leadership.
The only figures used are the already-verified 1,324 in, 0 rejected, 29 removed.

### Point of view: "They do not work for the brand. They work for you."
Her argument, from the interview. Field teams do not adopt because a tool exists or because
leadership endorsed it, they adopt because of the relationship with the person who brought it.
Evidence is the tracker, which nobody was required to use. Applied to forward-deployed work,
where you ship to people who do not report to you. **No team headcount is stated**, pending the
55 vs 30-plus question. The "two years" of relationship refers to her time at Dolce & Gabbana.

## Now note (home page), August 2026
Source: Duaa, 2026-08-06. Packing up a life in Dubai. Her nephew was born a couple of months
ago and she is spending August with him and her family before leaving. Everything she has saved
is going into the move. Reading only PM books at the moment, nothing for pleasure. Nervous about
the unknown. Update or remove this once it stops being true.

## Open, do not publish until Duaa confirms
Conflicts between this file, the live site, and the 2026-08-06 interview. Each blocks only the
specific claim it touches.

**Resolved 2026-08-06:** the origin of the 29 duplicates. It was staggered registration, not the
export's layout drift. See "How it came to exist" above. The site has been corrected in three
places: the PROOF caption, the rollout log, and the FAQ answer on the dedup key.

**Resolved 2026-08-06:** team size. **55 is the real headcount** of the beauty advisor team Duaa
was responsible for at Dolce & Gabbana, confirmed by her. It is now published in the `#about`
lead and in the point-of-view piece. The separate "30 plus person advisor team" figure attached
to the **sales enablement workshops** is untouched, because she did not contradict it and it
describes a different thing: 55 is who she was accountable for, 30 plus is who went through the
workshops. Do not collapse the two into one number.

**Resolved 2026-08-06:** Egypt headcount, and the decision is **not to publish 19.** Duaa
confirmed 19 as the rough Egypt team size and asked whether it was needed. It is not, and adding
it would do harm. Three real numbers already describe this team: **18** appear in the January to
April export, **roughly 20** were onboarded across the window including people who moved off the
team, and **19** is the approximate headcount. The site publishes 18, which is the only one the
data supports directly, and the FAQ already explains 18 against roughly 20 as two figures counting
different things. Introducing a third number between them muddies the most carefully caveated
claim on the site, and 19 is the least precise of the three. Recorded here so the figure is not
lost, deliberately absent from the page.

1. **The 45 minutes to 5 minutes claim.** This file, the `#faq` section's first answer, and the résumés attach it to
   the Givenchy and Kenzo sell-in ordering tool. In the interview Duaa described something
   different, automating sell-out report consolidation from retailer data. The claim is live on
   the site and has been left untouched, and **no new copy was built on top of it.**
2. **Move-out, the sofa.** The interview describes a sofa listed at 1600 that she had paid 1200
   for. This file documents a dresser at 1,100 that cost 499 and a dining table at 1,499 that was
   2,100 with chairs. The site uses the dresser. The sofa is not published.

## Contact
- Email: dk947@cornell.edu
- LinkedIn: https://linkedin.com/in/duaa-khalid
- GitHub: https://github.com/khalidduaa1-byte
- Resume: https://duaakhalid.com/resume.pdf
- Open to roles starting after Cornell Tech, and to part time work sooner.
