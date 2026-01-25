# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-24)

**Core value:** Attendees leave understanding *how* to architect AI experiences — not just having followed a tutorial.
**Current focus:** Phase 2 - Project Paths Development

## Current Position

Phase: 2 of 5 (Project Paths Development)
Plan: 0 of 3 planned (02-01, 02-02, 02-03)
Status: Planning complete, ready for execution
Last activity: 2026-01-25 — Created Phase 2 execution plans

Progress: [██████░░░░] 0% (planning complete)

## Performance Metrics

**Velocity:**
- Total plans completed: 6
- Average duration: 5 minutes
- Total execution time: 31 minutes

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 6/6 | 31 min | 5 min |
| 02-project-paths | 0/3 | - | - |

**Recent Trend:**
- 01-01 completed in 4 minutes
- 01-02 completed in 6 minutes
- 01-03 completed in 6 minutes
- 01-04 completed in 6 minutes
- 01-05 completed in 5 minutes
- 01-06 completed in 4 minutes
- Trend: Consistent 4-6 min per plan (content creation modules)
- **Phase 1 complete:** All 6 modules delivered in 31 minutes total

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Workshop structure: Multiple mini-projects over one big build (shows breadth, prevents anyone getting stuck)
- Layered approach for mixed skill levels (different depths for different learners)
- Stockholm theme for local flavor and memorability
- Antigravity as primary tool (where "beyond chatbots" depth lives)
- Substance over spectacle (social elements shouldn't hide technical learning)

**From 01-01:**
- Freeform prompts only in Module 01 (establishes baseline before structured output in Module 02)
- Option A/B dual-path exercises (mixed skill levels self-select difficulty)
- "Going Further" sections for fast finishers (maintains engagement without instructor intervention)
- Screenshot placeholders deferred to Phase 5 dry-run (prevents rework if UI changes)

**From 01-02:**
- Description fields positioned as model instructions, not just documentation (critical insight for quality results)
- Schema enforcement vs prompt hacking distinction (fundamental mental model for structured output)
- Four edge case test scenarios in solutions (teaches robustness over single example)
- Common pitfall demonstration pattern (show what NOT to do cements learning)

**From 01-03:**
- Token cost awareness emphasized throughout (images ≤384px = 258 tokens for budget-conscious testing)
- Multimodal + structured output combination demonstrates feature composability (key learning outcome)
- File API vs inline data both shown (production optimization vs quick testing patterns)
- Three representative image types: chart (data), code (technical), UI (design)

**From 01-04:**
- 5-version progression pattern (unstructured → system instructions → XML tags → few-shot → +structured output)
- 2-3 examples optimal for few-shot (balances quality vs token cost, diminishing returns beyond)
- XML tags for structured delimiters (clear section boundaries in complex prompts)
- Context engineering + structured output combination = production-ready (schema enforces structure, few-shot ensures quality)
- Template pattern for reusable prompts (save, share, export to API code)

**From 01-05:**
- Grounding toggle demonstration over API-first (AI Studio UI more accessible for beginners)
- Four query types in exercise (current events, facts, Nobel Prize, stock prices) to illustrate selectivity
- Grounding vs RAG comparison table (positions grounding as modern alternative for public web info)
- Metadata structure shown in both UI and API contexts (full understanding for implementation)

**From 01-06:**
- Pre-built logic engine over code from scratch (20-minute constraint + mixed skill levels)
- Lambda functions for rules (conciseness and pattern clarity)
- Part 2 connection explicit throughout (46 mentions across all files)
- Option A/B exercise paths (guided discount rules vs independent domain selection)
- Vibe coding pattern demonstrated (describe intent → AI generates implementation)

**From Phase 2 Planning:**
- 3 parallel plans (Wave 1) for independent project paths (face-reactive, camera-game, custom)
- 60-70% scaffolding strategy: complete infrastructure + strategic TODOs (not prescriptive fill-in-blanks)
- Starter vs Reference separation: starter has TODOs, reference has complete implementation
- Extension challenges pattern: 15+ challenges at multiple difficulty levels for fast finishers
- Custom project path is truly blank canvas (optional helpers, not prescriptive implementation)
- Architecture decision guide for custom path (decision matrix, workflow, anti-patterns)
- Time budget validation: TODO time estimates ensure 60-75 minute completion window

### Pending Todos

None yet.

### Blockers/Concerns

**Phase 2 dependency:** Research summary flags need for phase-specific research on project branches (MediaPipe blendshape patterns, Three.js gesture controls, Firebase multiplayer state). Consider triggering `/gsd:research-phase` when planning Phase 2.

**Phase 5 timing validation:** Research notes dry-run needed 2 weeks before workshop (Jan 14, 2026) to validate 3.5-hour timing and identify friction points.

**API quota allocation:** Need to confirm Google Cloud quota strategy before Phase 4 (free tier is 250 req/day but unclear if per-account or per-project).

**From 01-01:**
- Screenshot placeholders: 6 placeholders in Module 01 demonstration.md need actual screenshots during Phase 5 dry-run
- UI verification: AI Studio interface should be verified 1 week before workshop (URL: aistudio.google.com)
- Module timing: 20-minute target needs real-world validation with pilot participant in Phase 5

**From 01-02:**
- Screenshot placeholders: 3 placeholders in Module 02 demonstration.md need actual screenshots during Phase 5 dry-run
- JSON Schema validation: Verify AI Studio schema editor still supports all features used (enum, minimum, maximum constraints)
- Description field quality: Solution examples should be tested in real AI Studio during Phase 5 to validate effectiveness

**From 01-03:**
- Actual image files needed: Replace placeholder references (chart.png, code-screenshot.png, ui-mockup.png) with real optimized images
- Image optimization: Ensure all sample images are ≤384px to minimize token costs during live workshop
- File API pre-upload: Consider uploading sample images to File API before workshop for reuse efficiency

**From 01-05:**
- Screenshot placeholders: 4 placeholders in Module 05 demonstration.md need actual screenshots during Phase 5 dry-run
- Grounding metadata visibility: Current AI Studio UI may not show full metadata - verify during dry-run, API code provided as backup
- Grounding trigger reliability: Test all exercise prompts 1 day before workshop to ensure consistent behavior
- Grounding + structured output: "Going Further" section mentions combination - test during Phase 5 to validate compatibility

**From 01-04:**
- Screenshot placeholders: 3 placeholders in Module 04 demonstration.md need actual AI Studio screenshots during Phase 5 dry-run
- Template validation: Prompt templates (structured-template.md, few-shot-examples.md) should be tested in real AI Studio during Phase 5
- Token cost emphasis: Few-shot examples add ~200 tokens per request - ensure this is demonstrated clearly in live session

**From 01-06:**
- Screenshot placeholders: 3 placeholders in Module 06 demonstration.md need actual Python code screenshots during Phase 5 dry-run
- Code execution validation: Test that all participants can run logic_engine.py in workshop environment
- Module timing: 20-minute target needs real-world validation with pilot participant in Phase 5

**From Phase 2 Planning:**
- MediaPipe CDN reliability: Verify cdn.jsdelivr.net/npm/@mediapipe/tasks-vision is stable, have backup CDN URL ready
- Firebase emulator setup: Document emulator installation and port configuration (9000) for workshop participants
- Browser compatibility: Test all three project paths in Chrome, Firefox, Safari (especially camera permissions on iOS Safari)
- Sample QR code generation: Create and test QR codes for camera-game demo before workshop
- Time estimates validation: TODO time estimates (15 min, 20 min, etc.) need real-world testing with pilot participants
- Extension challenges feasibility: Verify extension challenges are actually achievable in stated time ranges
- Custom project examples testing: Test at least 3 examples from EXAMPLES.md to ensure 60-75 min completion

## Session Continuity

Last session: 2026-01-25 (Phase 2 planning - COMPLETE)
Stopped at: Created 3 execution plans for Phase 2 (02-01, 02-02, 02-03)
Resume file: Ready for Phase 2 execution (Part 2 Project Paths)

---
*State initialized: 2026-01-24*
*Last updated: 2026-01-25*
