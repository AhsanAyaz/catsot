# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-24)

**Core value:** Attendees leave understanding *how* to architect AI experiences — not just having followed a tutorial.
**Current focus:** Phase 5 - Validation & Testing (next)

## Current Position

Phase: 4 of 5 (Infrastructure & Deployment) - COMPLETE
Plan: 3 of 3 completed
Status: Phase complete
Last activity: 2026-01-26 — Completed 04-03-PLAN.md (Firebase Deployment Documentation)

Progress: [███████████████████░] 15/15 plans (100% of Phases 1-4)

## Performance Metrics

**Velocity:**
- Total plans completed: 15
- Average duration: 5.3 minutes
- Total execution time: 80 minutes

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 6/6 | 31 min | 5 min |
| 02-project-paths | 3/3 | 18 min | 6 min |
| 03-materials | 3/3 | 16 min | 5.3 min |
| 04-infrastructure | 3/3 | 15 min | 5 min |

**Recent Trend:**
- 03-03 completed in 6 minutes
- 04-01 completed in 4 minutes
- 04-02 completed in 6 minutes
- 04-03 completed in 5 minutes (continuation after checkpoint)
- Trend: Consistent 4-6 min per plan
- **Phase 1 complete:** All 6 modules delivered in 31 minutes total
- **Phase 2 complete:** All 3 project paths delivered in 18 minutes total
- **Phase 3 complete:** All 3 supporting materials delivered in 16 minutes total
- **Phase 4 complete:** All 3 infrastructure plans delivered in 15 minutes total

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

**From 02-01:**
- MediaPipe emotion detection using 6-category simplified mapping (happy, sad, surprised, angry, relaxed, neutral)
- Three.js over Canvas 2D for face-reactive path (better performance for particle systems) — NOTE: Research recommended Canvas 2D for beginners, implementation chose Canvas 2D
- Circular particles over complex shapes (teaches fundamentals before advanced techniques)
- 20 extension challenges spanning beginner to advanced (comprehensive learning path)

**From 02-02:**
- QR code scanning for session joining (camera interaction fits theme, more engaging than text input)
- Firebase Local Emulator Suite for workshop (no production DB, no internet, no security concerns)
- Speed clicker reference implementation (demonstrates multiplayer without complex game logic)
- Last-write-wins pattern for score updates (simpler than transactions, teaches real-world tradeoffs)
- 26 extension challenges created (exceeds 15-19 planned for comprehensive coverage)

**From 02-03:**
- Blank canvas over prescriptive scaffolding for advanced attendees (creative freedom vs fill-in-blanks)
- Single template with decision guide over multiple starters (teach decision-making process)
- Complete helper modules (camera, Firebase, rendering) with zero TODOs in template
- 15 diverse example ideas covering solo/multiplayer/creative categories with time estimates

**From Phase 3 Planning:**
- Marp for slide deck (Markdown-based, version control friendly, code embedding)
- Modular slide structure (5 files: welcome, part1-intro, transitions, part2-intro, wrap-up)
- Task-frequency cheatsheet organization (Quick Start → Common → Advanced → Troubleshooting)
- 2-page cheatsheet constraint (front/back of single sheet, ~150-200 lines Markdown)
- Stockholm theming via examples (Spotify, Klarna, Fotografiska, King, Mojang)
- 20% local context, 80% universal technical content
- Bidirectional cross-references (slides ↔ cheatsheet ↔ modules ↔ projects)
- Cross-reference matrix for validation and future updates

**From 03-01:**
- Marp over Reveal.js for slide framework (consistency with Markdown-based module documentation)
- Modular slide structure (5 separate files) over monolithic deck (easier editing, reordering, reuse)
- Light-touch Stockholm theming: 20% local (Spotify, Klarna, Fotografiska), 80% universal technical content
- Embedded code examples in slides (14 JavaScript blocks) for visual reference during demos
- Speaker notes in HTML comments (15+ blocks) with timing guidance, common questions, Q&A prompts
- 58 slides total covering 3.5-hour workshop flow (welcome, Part 1, transitions, Part 2, wrap-up)

**From 03-02:**
- Task-frequency organization for cheatsheet (Quick Start → Common → Advanced → Troubleshooting)
- 2-page constraint (front/back single sheet, ~150-200 lines Markdown)
- Code examples with inline comments for self-contained reference
- Performance tips and blendshape thresholds for Part 2 implementation
- 6 main sections covering full workshop scope (Quick Start through Troubleshooting)

**From 03-03:**
- Light-touch Stockholm theming: 20% local examples, 80% universal technical content
- All Stockholm examples include explicit "Universal application" notes to maintain universality
- Bidirectional cross-references using emoji icons (📄 cheatsheet, 📚 modules, 📊 slides, 🔗 projects)
- Cross-reference matrix created for validation and future updates
- Stockholm company examples: Spotify (music + AI), Klarna (fintech), Fotografiska (museum), King/Mojang (gaming)
- Quick Reference sections in all module READMEs (cheatsheet → slides → Part 2 application)
- Related Workshop Materials sections in all Part 2 project READMEs (modules → cheatsheet → slides → extensions)

**From 04-01:**
- MediaPipe v0.10.15 specifically (v0.10.16+ have missing WASM file issues)
- window global check for CDN fallback detection (FaceLandmarker for MediaPipe, Html5Qrcode for QR)
- document.write() fallback pattern for synchronous script loading
- Keyword-based mock response selection for Gemini API mock (simple, predictable, covers workshop scenarios)
- CDN URLs updated to include explicit version numbers matching local backups

**From 04-03:**
- MediaPipe must use ES module import from vision_bundle.mjs, not script tag
- Version pin MediaPipe to v0.10.3 (0.10.15+ has WASM issues, verified during deployment testing)
- Backup files must be copied into each project folder, not referenced from root
- firebase target:apply required before first deployment
- Human-verified deployment workflow: Firebase emulator serves projects, MediaPipe loads via ES module, face detection working

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
- MediaPipe model download (8MB): May require workshop WiFi optimization for 40 simultaneous downloads
- Firebase emulator setup: Document emulator installation and port configuration (9000) for workshop participants
- Browser compatibility: Test all three project paths in Chrome, Firefox, Safari (especially camera permissions on iOS Safari)
- iOS Safari camera permissions: Requires HTTPS (document localhost setup or ngrok for workshop)
- Sample QR code generation: Create and test QR codes for camera-game demo before workshop
- Time estimates validation: TODO time estimates (15 min, 20 min, etc.) need real-world testing with pilot participants
- Extension challenges feasibility: Verify extension challenges are actually achievable in stated time ranges
- Custom project examples testing: Test at least 3 examples from EXAMPLES.md to ensure 60-75 min completion
- Blendshape threshold calibration: Threshold 0.5 may need adjustment for individual facial structures (add as extension)

**From 02-01:**
- MediaPipe Face Landmarker with GPU delegate: 30fps+ on CPU, 60fps on GPU (validate across workshop devices)
- Three.js particle performance: 5000 particles at 60fps on modern GPUs (test on workshop target devices) — NOTE: Implementation uses Canvas 2D with 150 particles
- Extension challenges time validation: Beginner (10-15 min), intermediate (20-30 min), advanced (45+ min) need real testing

**From 02-02:**
- Firebase emulator installation: Requires Node.js + npm, may take 2-3 min download (include in setup time)
- html5-qrcode CDN reliability: Verify unpkg.com availability, have cdn.jsdelivr.net backup ready
- QR scanning on iOS Safari: Requires HTTPS or localhost, document both approaches for workshop
- Multiplayer testing setup: Need 2+ devices or browser tabs, validate sync performance with 10+ concurrent players
- Last-write-wins race condition: Two players can win simultaneously (intentional, document as learning moment)
- 6-emotion model chosen (happy, sad, surprised, angry, excited, calm): balances expressiveness vs complexity
- Object pooling for 150 particles: prevents GC pauses, maintains 60fps
- Threshold 0.5 for blendshape scores: works across diverse faces but may need per-person calibration
- Canvas 2D over Three.js for PATH-01: simpler for beginners, Three.js offered in extensions
- Strategic TODOs: emotion detection (15 min) + particle updates (20 min) = 35 min core work

**From 02-03:**
- Architecture guide references 02-RESEARCH.md: Ensure research file accessible to attendees or inline key patterns
- Example difficulty ratings: 15 examples vary 35-65 min - consider adding explicit difficulty markers
- Custom path validation: Test template with pilot participant to verify blank canvas approach works
- Helper module browser compatibility: Verify camera.js, firebase.js, rendering.js work across Chrome/Firefox/Safari

**From Phase 3 Planning:**
- Marp CLI installation: Verify @marp-team/marp-cli is available or use VS Code extension (marp-team.marp-vscode)
- Cross-reference validation: Run validation commands from CROSS-REFERENCE-MATRIX.md before workshop
- Stockholm theming consistency: Verify Swedish company examples (Spotify, Klarna, etc.) are current and appropriate

**From 03-01:**
- Marp rendering verification: Test rendering slides to HTML/PDF during Phase 5 to catch formatting issues
- Stockholm theming assets missing: No Google Stockholm logo file, feedback QR code placeholder, WiFi credentials need filling
- Code example currency: Examples use `gemini-2.0-flash` model - verify model name current before workshop
- Slide density concern: Some slides have 6+ bullet points - consider splitting during dry-run if pacing rushed
- Code example font size: 20px in pre blocks may be too small for rear of room - test projector visibility

**From 03-03:**
- Cross-reference validation: Run validation commands from CROSS-REFERENCE-MATRIX.md before workshop (1 week before)
- Stockholm examples currency: Verify Spotify, Klarna, Fotografiska, King, Mojang examples remain appropriate
- Navigation flow testing: During Phase 5 dry-run, verify participants can navigate between materials using cross-references
- Cheatsheet section names: Module cross-references use specific section names - verify they match actual cheatsheet structure

**From 04-01:**
- MediaPipe WASM files still load from CDN even with local bundle - full offline requires hosting WASM files locally (out of scope for workshop)
- Gemini mock requires manual flag (window.GEMINI_OFFLINE_MODE = true) - not automatic fallback
- CDN fallback pattern resolves earlier concern about unpkg.com reliability

**From 04-02:**
- QuotaAwareAPI as single wrapper class for all Gemini API calls (consistency across modules)
- Python equivalent in logic_engine_ai.py (no cross-language import, self-contained)
- Fallback responses in geminiIntegration.js when API unavailable (graceful degradation)
- createFromEnv() helper for auto-loading keys from environment (simpler initialization)
- 3 keys = 2,700 requests/hour capacity vs 500-800 needed = 3-5x safety margin
- API quota concern from earlier phases RESOLVED: multi-key rotation handles free tier limits

## Session Continuity

Last session: 2026-01-26 (Phase 4 complete)
Stopped at: Completed 04-03-PLAN.md (Firebase Deployment Documentation)
Resume file: None (Phase 4 complete, awaiting Phase 5 planning)

---
*State initialized: 2026-01-24*
*Last updated: 2026-01-26*
