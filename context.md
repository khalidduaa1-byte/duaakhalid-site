# Facts about Duaa Khalid

Generated from index.html. Everything below is stated on her portfolio.

## Positioning
- Headline: Luxury retail taught me what bad data costs. I build the systems that catch it before it reaches the people making decisions.
- Summary: Five years in commercial and GTM at LVMH and Dolce & Gabbana. I shipped a tracker to 18 beauty advisors across 3 Egyptian markets who were never required to use it, and they used it daily. Incoming MEng, Data Science & Decision Analytics, Cornell Tech, August 2026.
- In her own words: Most of my work starts inside someone else's spreadsheet. A supervisor's export, a catalog price, a phone call assembled from memory. The model is rarely the interesting part. Deciding what counts as a valid row is, and so is getting a field team in another country to work the new way.

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
- Problem: Egypt beauty advisor performance reached me as a supervisor’s Daxium Excel export, with layouts that changed month to month and duplicate rows on the same advisor, date, store and shift. Duplicates double count sales and inflate Days Worked, so no daily KPI could be trusted, and advisor productivity could not be compared across cities until month end totals arrived weeks late.
- Her role: Framed the problem, defined the dedup key, built the ingest pipeline and the app, and ran the rollout across 3 markets.
- Outcome: 1,324 rows ingested, 0 rejected and 29 duplicates removed in one full run across January to April. Live with 18 advisors and presented to global beauty leadership.
- Link (Live app): https://sales-management-phi-blue.vercel.app
- Repository: https://github.com/khalidduaa1-byte/Sales_management
- Numbers: 1,324 = rows ingested in one full run, January to April; 0 = rows rejected; 29 = duplicates removed; 396 = attendance rows
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
    - A live defect: The site renders 0 items available from a hardcoded placeholder that the JS overwrites on a normal load. It should read 11. Not sold out.

### Homebase
- Context: Co-founded, two person team
- What it is: A fixed format context block that a voice agent uses to dispatch maintenance vendors. Deterministic template by default, model behind an opt-in flag.
- Problem: Dispatching a maintenance vendor by phone means a human assembling the same context every time: what is broken, which unit, when the tenant is free, and what else that vendor already has booked. Assembled ad hoc, it comes out differently on every call and details get dropped.
- Her role: Co-founder. Owned problem framing and the UAE rental regulation model the product was built around, including RERA bands, the 90 day notice rule, Ejari sequencing and the bilingual requirement.
- Outcome: A hackathon build with no production usage, so there is no impact number to claim. What is worth defending is the architecture.
- Link (No deployment, see repo): https://github.com/bm2515/homebase
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

## Contact
- Email: Khalidduaa1@gmail.com
- LinkedIn: https://linkedin.com/in/duaa-khalid
- GitHub: https://github.com/khalidduaa1-byte
- Resume: https://duaakhalid.com/resume.pdf
- Open to roles starting after Cornell Tech, and to part time work sooner.
