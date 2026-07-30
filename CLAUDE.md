# PM Interview Prep — Coaching Handoff

## Project Overview
Duaa is preparing for Product Manager interviews, working through the Exponent PM course (currently in the **Product Strategy** module) and doing live mock interviews with Claude acting as interviewer. The goal is to build the skills the course and top companies (Meta, OpenAI, Google DeepMind, frontier AI labs) actually grade for — not just structured answers, but answers with a defensible point of view.

Format that works: paste a course lesson or a real prompt, Claude breaks it down and/or runs a live mock with real pushback (interrupting, forcing tradeoffs, telling her when something is wrong rather than just polishing it).

## Current State
Just finished reading the **Growth Questions** lesson. Have not yet done a rep on it. The parked **OpenAI "memory machine — go to market"** strategy mock is still unrun. Also parked: a de-specified regulatory-strategy question ("how does a regulatory relationship become a competitive asset for an AI lab / how could government access restrictions create vendor asymmetry") available to run cold with no web search needed.

Web search status is **uncertain** — it may be off at the admin level. Past-chat search works (that's a different tool). For anything requiring current facts, verify via primary sources; do not rely on Claude's recall (training cutoff Jan 2026).

## Technical Constraints & Rules
- **Claude's knowledge cutoff is Jan 2026.** Any claimed news after that (e.g. a briefing citing "GPT-5.6," recent government/lab actions) is UNVERIFIED. Do not analyze on top of unverified premises — interrogate the premise first. This is itself a senior strategy move (framework Step 1).
- Claude is **not a neutral source on Anthropic, OpenAI, or their competitive standing** — flag this whenever claims about these companies come up, especially since Anthropic is on the interview target list.
- Keep pushback **real**, not flattering-refinement. Watch for the agreeable-AI trap: if every proposal comes back "great instinct, here's the better version," that's agreement in a smart voice, not friction. Human peer mocks (Pramp/Exponent) are recommended for live claim-under-pressure reps because an AI charitably fills gaps a confused human peer would expose.

## Decisions Made
### The through-line lesson: STATE THE CLAIM
Duaa's #1 recurring gap across every session: she *arrives* at the sharp insight but *under-states* it — murmurs the conclusion, wraps it back into a feature list, or changes the subject at the hard moment. It's a performance habit, not an aptitude gap. The fix, drilled repeatedly:
- **A claim = one sentence about what the real problem is, phrased so someone could disagree.** Shape: **"the real problem isn't X, it's Y."**
- The Y must be about the *user's pain*, not about a gap in the market's product catalog ("there's no fully-AI coach yet" is circular, not a claim).
- Say the claim BEFORE describing any feature. Features should read as consequences of the claim.
- "Why this company wins" is a *separate* second sentence, added only when the prompt names a company / is strategic. Don't force it.

### Skills established / drilled
- **Clarifying questions must FRAME, not just gather info.** Weak: "what kind of animal?" Strong: "is this A or B, *because* that changes X." Fork + why-clause. At least one clarifying question should carry this weight; don't over-narrate every one.
- **Anchor to business model, not mission** (strategy Step 2). Reason about what a company *optimizes for* (revenue engine), not its stated mission. But hold BOTH — don't cynically reduce everything to revenue, and don't replace user value with the company's business metric (her volunteering north-star mistake).
- **North-star metric test:** "could this number go up while my product fails at its thesis?" If yes, it's the wrong metric. Avoid the engagement/adoption reflex. Tie the metric to the user value claimed.
- **Guiding principles = constraints that RULE OUT options** (strategy Step 4 — her newest skill). Test: if it doesn't kill at least one named option, it's wallpaper. A real principle names a *deliberate sacrifice* ("we'll be bad at X on purpose to be unbeatable at Y"). Recipe: constraint + because + the option it eliminates.
- **Closing move** (strategy Step 6): make a specific call, name the strongest counter-argument, defeat it on merits, then flag the signal that would prove you wrong. A recommendation without a counter-argument is just a preference.

### Strategy framework (6 steps), mapped to her strengths/gaps
1. Clarify (frame not gather) — *started*
2. Anchor to business model — *forming*
3. Map landscape / "why now" (needs current-events homework — her thinnest, fixable via daily briefing habit) — *weakest, but did it cold on Apple privacy-vs-capability tension successfully*
4. Guiding principles — *newest, drilled today*
5. Generate & filter options (max 3 survive) — *decent*
6. Argue & close (name+defeat counter-argument) — *growth edge*

### Growth questions (just covered)
- **Diagnose before prescribe.** Model the business first, find which loop (acquisition/activation/retention/distribution) is actually constrained, THEN prescribe.
- **Turn the goal into an equation first** (the new technique): e.g. DAU = MAU × (DAU/MAU frequency). The equation exposes the weak term. Keep it simple and *right*, not complex.
- **Acquisition is the default-trap** — the growth version of a wallpaper claim. Distrust "get more users."
- **Retention is a moat, not a metric** — when constrained, it's upstream of acquisition (compounds into word-of-mouth, lower CAC).

## Next Steps (pick one)
1. **Growth Step-1 rep (recommended, no web search needed):** take "10x Duolingo" / "3x Airbnb users" — write ONLY the growth equation + which term is the constraint + why. No ideas/features. Isolates the new muscle.
2. **Full strategy mock:** run the parked OpenAI memory-machine ("go to market") end-to-end with real pushback. Rule to enforce: she must say "my claim is the real problem isn't ___, it's ___" BEFORE describing anything.
3. **De-specified regulatory-strategy question** (reps identical to the unverified GPT-5.6 briefing, but built on no unverified facts).
4. **Set up the daily briefing habit** (fixes Step 3 landscape gap): a calibrated prep Project + daily prompt with three drills folded in — (a) "why would [company] do [move] now?", (b) frame it as a claim, (c) one guiding principle it implies. Runs manually in-chat if scheduled-task automation isn't available; check support.claude.com for current feature availability.
