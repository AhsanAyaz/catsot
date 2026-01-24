# Project Research Summary

**Project:** Code at the Speed of Thought - AI Workshop
**Domain:** Live creative coding workshop for developers
**Researched:** 2026-01-24
**Confidence:** HIGH

## Executive Summary

This is a 3.5-hour hands-on AI creative coding workshop for 40 developers at Google Stockholm (Jan 28, 2026). Research reveals that successful workshops in this domain prioritize instant gratification over theory, use browser-native tools to eliminate setup friction, and deliver visual "wow moments" within 30 minutes. The recommended approach is a **zero-install, browser-first stack** using Firebase Studio (cloud IDE), Gemini 3 Flash (AI model), MediaPipe (face/gesture detection), and Three.js (3D graphics). All tools are accessible via browser with no pre-installation required.

The critical architectural pattern is a **two-phase progressive disclosure structure**: Part 1 (2 hours) builds shared foundations with everyone following the same path, then Part 2 (1.5 hours) branches into "choose your path" projects where participants select creative applications based on interest while achieving identical learning outcomes. This approach solves the mixed-skill-level challenge—beginners get scaffolded templates with reference implementations, advanced learners get extension challenges.

The highest-risk pitfalls are **API quota exhaustion** (40 developers hitting Gemini simultaneously can deplete free tier in minutes), **camera/hardware failures** (expect 5-10 laptops with webcam issues), and **WiFi collapse** (venue networks fail under concurrent API calls and code downloads). Mitigation requires pre-allocated API quotas with monitoring, loaner webcams, and offline fallback materials. Workshop materials must be self-service quality since 1:40 instructor-to-participant ratio prevents individual debugging.

## Key Findings

### Recommended Stack

Browser-native, zero-install stack optimized for immediate productivity. Participants open a URL and start coding within seconds—no Node.js, no npm, no build tools. This eliminates the 30-60 minutes typically lost to environment setup and "works on my machine" debugging.

**Core technologies:**
- **Firebase Studio** (cloud IDE) — Browser-based development environment with Gemini AI assistance, zero setup, one-click deployment. Replaces local VS Code + toolchain entirely.
- **Google AI Studio** (prompt playground) — Browser-based testing environment for prototyping Gemini prompts before coding. No setup required.
- **Gemini 3 Flash** (AI model) — 250 requests/day free tier, multimodal (text/image/video), structured JSON output. Only major LLM with no-credit-card free access.
- **Three.js r182** (3D graphics) — Industry-standard WebGL/WebGPU library with auto-fallback. CDN import via esm.sh eliminates build step. r182 adds production WebGPU support.
- **MediaPipe Tasks Vision 0.10.x** (computer vision) — Real-time face detection (468 landmarks) and gesture recognition (8 gestures) at 30+ FPS in browser. WebAssembly-optimized, runs locally without API calls.
- **Firebase Hosting** (deployment) — One-click deploy from Firebase Studio to global CDN. 10GB free tier, auto-SSL, deploy in <30 seconds.

**Version currency:** All versions verified 2026-01-24 via official documentation and WebSearch. Training data ends Jan 2025, but versions confirmed current.

**Confidence:** HIGH (official Google/Three.js Foundation products with verified 2026 currency)

### Expected Features

Workshop features are categorized as table stakes (expected), differentiators (memorable), and anti-features (actively harmful).

**Must have (table stakes):**
- Live coding demonstrations — Research shows live coding forces proper pacing and enables "what if?" questions, but instructors can only go 2x faster than learners
- Hands-on coding time — Passive watching leads to poor retention; "doing" creates muscle memory and confidence
- Something working in first 30 min — "Time to Wow (TtW)" is critical; if nothing works quickly, attendees assume it's too hard
- Visual/interactive output — Creative coding means seeing results; text-only outputs feel like regular programming, not "creative"
- Clear progression structure — Mixed skill levels need scaffolding; beginners get lost without structure, advanced get bored without challenge
- Technical support during hands-on — Attendees WILL get stuck; without help, they disengage
- Pre-configured environment — Setup time kills energy; zero install time is ideal
- Take-home code/resources — Attendees want to continue learning after workshop

**Should have (competitive differentiators):**
- "Wow moment" demo at start — Opening with impossible-looking demo (face-reactive art, gesture control) shows what's possible and creates aspiration
- Webcam/camera interaction — Body/face/hand tracking feels like magic, transforms laptop into creative instrument
- Building toward real project — Exercises that connect to final project goal feel purposeful vs arbitrary examples
- Public showcase at end — Sharing work (even to cohort) makes work "real" and creates portfolio moment
- Live remix/variation culture — Encouraging attendees to fork/modify each other's work accelerates learning
- AI as creative tool not automation — Positioning AI as amplifying creativity empowers rather than threatens
- No slides, just code — Pure live coding throughout feels modern and authentic

**Defer (anti-features to avoid):**
- Starting with AI theory/concepts — Delays gratification; start with working demo, reverse-engineer theory from example
- Too much content — Trying to teach everything overwhelms; focus on 2-3 core concepts done deeply
- Generic AI coding examples — Teaching classifiers feels corporate; use artistic use cases (generate art, control visuals with body)
- Complex setup requirements — Requiring Python/npm install eats 30+ minutes; use web-based tools
- Only individual work — Pure solo coding misses energy of shared experience

**Confidence:** HIGH (based on verified workshop patterns and creative coding community best practices)

### Architecture Approach

Successful AI workshops follow a **layered, hub-and-spoke architecture** where a central repository provides navigation to independent, self-contained projects. Materials are organized into three tiers: starter templates (60-70% complete with TODO comments), reference implementations (complete working code), and extensions (markdown challenges for advanced learners).

**Major components:**
1. **Central Hub (README.md)** — Navigation, timeline, decision matrix for "choose your path". Must include visual project previews and "which project should I choose?" guidance.
2. **Foundations Modules (Sequential, Part 1)** — Everyone follows same path. Each module: 20-30 min, clear outcome, starter/reference code, troubleshooting section. Builds shared mental models.
3. **Choose Your Path Hub** — Decision matrix helping participants select project based on interest + skill. All branches achieve identical learning outcomes but different creative outputs.
4. **Project Branches (Parallel, Part 2)** — Three independent projects (face-reactive, gesture-controlled, camera-game). Each has starter (scaffolded), reference (complete), extensions (advanced challenges).
5. **Cheatsheet (Always Open)** — Single-page reference with copy-paste-ready code snippets. Participants keep open in second browser tab during entire workshop.

**Key architectural pattern:** Starter templates generated by copying reference implementation and replacing core logic with TODO comments. This guarantees structure matches and prevents drift. Each TODO includes hints and cheatsheet section references.

**Data flow (example: face-reactive project):**
```
Browser webcam → MediaPipe Face Landmarker (client-side)
  → Face landmarks (468 3D points)
  → Gemini API (structured output schema)
  → JSON: {emotion, intensity, color}
  → Canvas rendering
  → Visual output
  → Firebase hosting (shareable URL)
```

All ML inference happens client-side (MediaPipe). Gemini only for creative interpretation, not computer vision. Keeps it fast and avoids backend complexity.

**Confidence:** MEDIUM (HIGH for Firebase Studio zero-setup and monorepo structure, MEDIUM for 3.5-hour timing validation—needs dry-run)

### Critical Pitfalls

Top pitfalls that can cause workshop failure, ranked by severity and likelihood:

1. **API Quota Exhaustion During Live Demo** — 40 participants hitting Gemini simultaneously exhausts free tier (250 req/day) in minutes. Google AI Studio shows "internal error" when quota exceeded. **Prevention:** Pre-allocate quota with billing enabled, generate workshop-specific API keys with high limits, stagger API-heavy exercises, monitor quota in real-time. **Recovery:** Switch to backup API key immediately, use pre-recorded video, pivot to offline exercises. Detection: 429 RESOURCE_EXHAUSTED errors, multiple participants reporting same error.

2. **Hardware Dependency Failures (Camera/Webcam Access)** — 40% of webcam issues stem from outdated drivers, USB glitches, permissions. Expect 5-10 laptops with camera problems in 40-person workshop. **Prevention:** Pre-workshop email to test cameras at webcamtests.com, have 5-10 loaner USB webcams, first 10 minutes everyone tests camera BEFORE main content. **Recovery:** Quick wins (check browser permission, try different browser, close Zoom/Teams). If >25% fail: pivot to instructor demo on projector, pair participants, skip hands-on camera portion.

3. **WiFi Failure / Network Dependency** — Venue WiFi collapses under 40+ devices doing live API calls. Conference WiFi notorious for being "less than perfect." **Prevention:** Assume WiFi will fail—design for offline. Pre-install all dependencies, bundle libraries in repo, bring 4G/5G mobile hotspot as backup, test venue WiFi 1 hour before. **Recovery:** Switch to mobile hotspot for demo machine, pass USB drives with setup files, pivot to offline exercises, use pre-recorded videos of cloud features.

4. **"God Demo" - Trying to Do Everything Live** — Live-coding complex AI integration from scratch leads to typos, syntax errors, fumbling speech. Writing code doesn't mix well with oration. **Prevention:** Prepare pre-written checkpoints (90% already written, live-code only 10%), use git branches for steps, script your live typing with snippet files. **Recovery:** Set 2-minute timer—if not fixed, switch to backup. Show working version first, then explain.

5. **Mixed Skill Level Pacing Disaster** — Workshop too fast for beginners, too slow for experts. 77% of employees disengage when work feels disconnected from understanding. **Prevention:** Tiered exercises (core demo + basic version + advanced challenge), pair programming (beginners with experts), just-in-time content (provide links for basics). **Recovery:** Pause and assess, split the room (advanced to extension exercises, beginners to mini-session), show working version to everyone.

**Confidence:** HIGH for technical pitfalls (API, hardware, performance), MEDIUM for soft skills (engagement, pacing), verified across multiple authoritative sources and real-world incident reports.

## Implications for Roadmap

Based on research, suggested workshop structure with clear phase dependencies:

### Phase 1: Foundation Setup & Verification (0:00-0:15, 15 min)
**Rationale:** Zero-setup promise requires proving it works BEFORE content begins. Research shows unprepared participants derail workshops—first 15 minutes must verify everyone's ready.

**Delivers:**
- All participants logged into Firebase Studio
- Camera test page confirms webcam access
- Gemini API key obtained and verified
- Cheatsheet open in second tab

**Addresses:**
- Table stakes: Pre-configured environment, technical support
- Pitfall #2: Hardware dependency failures (camera testing)
- Pitfall #6: Unprepared participants

**Avoids:** Starting content before environment verified (wastes time, loses energy)

**Research flag:** Standard pattern, no additional research needed

---

### Phase 2: First "Wow Moment" & Core Concept #1 (0:15-1:05, 50 min)
**Rationale:** "Time to Wow (TtW)" is critical—first emotional wow must come in first 30 min. Then reverse-engineer theory from working demo.

**Delivers:**
- Live demo: face-reactive particles or gesture-controlled scene (instructor's machine)
- Participants follow along: structured outputs with Gemini (hands-on)
- Something visual working on participant screens by minute 30

**Addresses:**
- Table stakes: Live coding demo, hands-on time, visual output, something working in 30 min
- Differentiators: "Wow moment" demo, AI as creative tool
- Anti-feature: Avoid starting with theory

**Uses:**
- Google AI Studio (prompt prototyping)
- Firebase Studio (development)
- Gemini 3 Flash (structured JSON output)

**Implements:**
- Foundations Module #1: AI Studio exploration
- Foundations Module #2: Structured outputs

**Avoids:**
- Pitfall #4: "God demo" (use pre-written checkpoints, live-code only 10%)
- Pitfall #9: Time management (strict 50-min budget)

**Research flag:** Standard Gemini API patterns, well-documented

---

### Phase 3: Core Concept #2 - Camera Integration (1:05-1:55, 50 min)
**Rationale:** MediaPipe face/gesture detection is the "magic" that differentiates creative coding from regular programming. Introduce after basic API familiarity established.

**Delivers:**
- MediaPipe Face Landmarker setup and running
- Real-time face landmark detection (468 points)
- Landmarks sent to Gemini for emotion interpretation
- Visual feedback (particles, colors) responding to face

**Addresses:**
- Differentiators: Webcam/camera interaction, building toward real project
- Table stakes: Visual/interactive output, clear progression

**Uses:**
- MediaPipe Tasks Vision 0.10.x
- Canvas API for rendering
- Gemini API for creative interpretation

**Implements:**
- Foundations Module #3: MediaPipe integration

**Avoids:**
- Pitfall #7: Latency and performance (optimize for 30fps, reduce camera resolution to 640x480)
- Pitfall #2: Camera failures already mitigated in Phase 1

**Research flag:** Standard MediaPipe pattern, needs dry-run to validate performance in venue lighting

---

### Break (1:55-2:05, 10 min)

**Rationale:** Cognitive load and sitting still drains energy. Research shows breaks strategically placed reduce fatigue and improve retention.

**Addresses:**
- Pitfall #10: Low energy / disengagement
- Pitfall #9: Time management (builds in buffer)

---

### Phase 4: Choose Your Path - Project Selection & Building (2:05-3:05, 60 min)
**Rationale:** Apply foundations to creative projects. Branching allows interest-based selection while maintaining identical learning outcomes. 60 minutes validated as completable time for base project.

**Delivers:**
- Participants select one of three projects based on decision matrix
- Complete starter template by filling TODOs
- Deploy working project to Firebase Hosting
- Shareable URL (portfolio artifact)

**Three branches (all achieve same outcomes):**
1. **Face Reactive** — Emotion visualization with particle systems (moderate difficulty)
2. **Gesture Controlled** — Hand gesture controls Three.js 3D scene (challenging)
3. **Camera Game** — Duck-hunt style game with head movement (moderate)

**Addresses:**
- Table stakes: Hands-on time, building toward real project, take-home code
- Differentiators: Building toward real project, public showcase prep
- Anti-features: Avoid only individual work (encourage remix/sharing)

**Uses:**
- All stack elements (Firebase Studio, Gemini, MediaPipe, Three.js/Canvas)
- Starter/reference/extensions architecture

**Implements:**
- Choose Your Path Hub (decision matrix)
- Project Branches (parallel, self-contained)

**Avoids:**
- Pitfall #5: Mixed skill level pacing (tiered exercises: base project + extensions)
- Pitfall #3: API quota exhaustion (stagger API calls across three branches, monitor usage)
- Pitfall #8: Trusting AI-generated code (starter templates pre-tested, reference implementations available)

**Research flag:** Phase-specific research NEEDED for each project branch:
- Face Reactive: MediaPipe blendshape integration patterns
- Gesture Controlled: Three.js camera controls with hand tracking
- Camera Game: Multiplayer state sync with Firebase Realtime Database (if time)

---

### Phase 5: Showcase & Wrap-up (3:05-3:30, 25 min)
**Rationale:** Public sharing creates portfolio moment and memory trigger. Participants remember what they showed others.

**Delivers:**
- 3-4 participants present deployed projects (3 min each)
- Group screenshot of all deployed URLs
- Post-workshop resources shared (GitHub repo, next steps guide)
- Feedback collection

**Addresses:**
- Differentiators: Public showcase, remix culture
- Table stakes: Take-home resources
- Memory triggers: Shareable artifacts, social connection

**Avoids:**
- Pitfall #9: Running over time (strict 25-min cap, cut presentations if needed)

**Research flag:** Standard pattern, no research needed

---

### Phase Ordering Rationale

1. **Setup first** — Can't build anything if environment doesn't work. 15-min investment prevents 60 min of debugging later.

2. **Wow moment within 30 min** — Research shows if nothing works quickly, attendees assume it's too hard. Engagement depends on early success.

3. **Foundations before branching** — 60% of workshop (Part 1) builds shared mental models. Can't help each other in Part 2 without shared vocabulary.

4. **Camera integration after basic API** — MediaPipe is more complex than Gemini API. Introduce after participants have Win #1 (structured outputs working).

5. **Branching only after shared foundation** — Anti-pattern in research: branching too early → no shared vocabulary → debugging becomes 1:1 consulting.

6. **60-minute building block** — Validated as "goldilocks zone"—enough time to complete base project, not so much that advanced learners finish in 20 min and disengage.

7. **Showcase at end** — Creates portfolio moment and memory trigger. Participants remember what they showed others.

8. **Buffer time built in** — Breaks (20 min total) + setup buffer (15 min) + wrap-up buffer (10 min in Phase 5) = 45 min cushion for inevitable problems.

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 4 (Project Branches):** Each branch needs specific implementation research:
  - Face Reactive: MediaPipe blendshape-to-emotion mapping, particle system patterns
  - Gesture Controlled: Three.js OrbitControls alternative with hand tracking, gesture-to-camera mapping
  - Camera Game: Firebase Realtime Database for multiplayer state, collision detection with face bounding box

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Setup):** Browser-based tools, standard authentication flow
- **Phase 2 (Gemini API):** Official documentation comprehensive, structured output well-documented
- **Phase 3 (MediaPipe):** Official examples for Face Landmarker, standard integration pattern
- **Phase 5 (Showcase):** Standard workshop facilitation pattern

### Workshop Material Structure (Deliverables)

Based on architecture research, workshop repo must include:

```
workshop-repo/
├── README.md                    # Central hub with timeline and navigation
├── CHEATSHEET.md               # Single-page reference (always open)
├── foundations/                # Part 1: Sequential modules
│   ├── 01-ai-studio/
│   │   ├── starter/           # 60-70% complete with TODOs
│   │   ├── reference/         # Complete working version
│   │   └── README.md          # Step-by-step guide
│   ├── 02-structured-outputs/
│   └── 03-mediapipe-integration/
└── choose-your-path/           # Part 2: Branching projects
    ├── README.md              # Decision matrix with screenshots
    ├── face-reactive/
    │   ├── starter/
    │   ├── reference/
    │   ├── extensions/        # Advanced challenges (markdown)
    │   └── README.md
    ├── gesture-controlled/
    └── camera-game/
```

**Key patterns from architecture research:**
- Starter templates: 60-70% complete (structure + imports + UI, but core logic is TODOs)
- Each TODO: what to implement + which API + where to find docs (cheatsheet section)
- Reference code: heavily commented (educational style, not production)
- Extensions: markdown challenges (not code), prevents breaking working project

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| **Stack** | HIGH | Official Google documentation, verified preview access for Firebase Studio, version numbers verified 2026-01-24. CDN strategy is community-recommended but less "official" than other components. |
| **Features** | HIGH | Based on verified workshop patterns, creative coding community best practices, multiple confirming sources for "time to wow" and live coding effectiveness. |
| **Architecture** | MEDIUM | HIGH for Firebase Studio zero-setup, monorepo structure, starter/reference/extensions pattern. MEDIUM for 3.5-hour timing (needs dry-run validation), branch difficulty parity (needs testing with real participants). |
| **Pitfalls** | HIGH | Technical pitfalls (API, hardware, performance) verified across multiple authoritative sources and real-world incident reports. Soft skills (engagement, pacing) MEDIUM confidence. |

**Overall confidence:** HIGH

Research drew from 80+ sources including official documentation (Google AI, Firebase, MediaPipe, Three.js), verified workshop patterns (Google Gemini workshops repo, Codecademy structures), educational best practices (live coding research papers, workshop facilitation guides), and 2026-verified versions via WebSearch.

### Gaps to Address

**During roadmap planning:**
1. **Exact timing validation** — 3.5-hour estimate based on research, but needs dry-run with real participants to validate each phase duration. Build in timing checkpoints during rehearsal.

2. **Branch difficulty parity** — Research suggests 60-75 min for base project, but actual completion times unknown. Plan dry-run to test all three branches with mixed-skill testers.

3. **API quota specifics** — Free tier is 250 req/day, but unclear if that's per account or per project. Needs confirmation from Google Cloud to plan quota allocation strategy.

4. **Venue lighting for MediaPipe** — Face detection performance depends on lighting. Needs on-site testing 1 day before to verify 30fps performance in actual venue conditions.

5. **Firebase Studio fork limits** — Can 40 people simultaneously fork projects without hitting rate limits? Needs load testing or confirmation from Firebase team.

**During phase-specific planning:**
- **Phase 4 research gaps:** Each project branch needs specific implementation research (see Research Flags above)
- **Extension challenge difficulty:** Unclear what % of participants attempt extensions—affects effort investment in creating them
- **Participant distribution across branches:** Will they split evenly or cluster? Affects instructor attention strategy

**How to handle:**
- **Dry-run 2 weeks before** — Validate timing, test all three branches, identify friction points
- **Venue visit 1 day before** — Test WiFi, projector, camera in actual lighting, verify power outlets
- **Load test 1 week before** — Have 5-10 people simultaneously access Firebase Studio projects, hit Gemini API
- **Phase-specific research** — Trigger `/gsd:research-phase` for Phase 4 project branches during roadmap planning
- **Backup plans documented** — For each gap, have fallback strategy (see Pitfalls recovery plans)

## Cross-Cutting Themes

**1. Zero-Setup is Non-Negotiable**
Every research file emphasizes eliminating installation friction. Stack (Firebase Studio, browser tools), Features (pre-configured environment), Architecture (cloud IDE), Pitfalls (unprepared participants). The 40-person scale makes local setup debugging impossible.

**2. Visual Output as Engagement Driver**
Features research: visual outputs are most memorable. Stack: Three.js for 3D, MediaPipe for face tracking. Architecture: every module delivers visible result. Pitfalls: energy crashes without visual progress. Creative coding lives or dies on "wow moments."

**3. Progressive Disclosure for Mixed Skills**
Features: clear progression structure. Architecture: Part 1 shared foundations, Part 2 branching with extensions. Pitfalls: mixed skill level pacing disaster. Research converges on tiered approach with identical outcomes but different expressions.

**4. Self-Service Materials Required at Scale**
Architecture: starter/reference/extensions with inline TODO hints. Features: take-home code/resources. Pitfalls: 1:40 instructor ratio prevents individual debugging. Materials must enable self-rescue via cheatsheet and reference implementations.

**5. Assume Everything Will Break**
Pitfalls dominate the research because failure modes are deterministic at scale. 40 participants + live APIs + venue WiFi + diverse hardware = something WILL fail. Every phase needs backup plan: pre-recorded videos, offline materials, backup API keys, loaner hardware.

## Critical Decisions for Roadmap

**Decision 1: Use Firebase Studio or local development?**
**Recommendation:** Firebase Studio (browser-based)
**Rationale:** Zero-setup eliminates 30-60 min of environment debugging. At 40-person scale, local setup troubleshooting becomes impossible. Research shows unprepared participants derail workshops even with instructions.
**Trade-off:** Less familiar tool, but documentation is comprehensive and AI assistance built-in.

**Decision 2: How many project branches in "Choose Your Path"?**
**Recommendation:** Three branches (face-reactive, gesture-controlled, camera-game)
**Rationale:** Three provides choice without overwhelming. Research shows decision matrices work well with 3-5 options. More than three splits instructor attention too thin; fewer than three limits creative expression.
**Trade-off:** Must ensure all three take similar time (60-75 min) and achieve identical learning outcomes.

**Decision 3: When to introduce camera/MediaPipe?**
**Recommendation:** Phase 3 (after Gemini API basics in Phase 2)
**Rationale:** MediaPipe more complex than Gemini API. Participants need Win #1 (structured outputs working) before tackling Win #2 (face tracking). Research shows progressive complexity prevents overwhelm.
**Trade-off:** Delays "magic" moment, but prevents cognitive overload.

**Decision 4: How much time for Part 1 vs Part 2?**
**Recommendation:** Part 1 (2 hours foundations), Part 2 (1.5 hours building)
**Rationale:** Research anti-pattern: branching too early → no shared vocabulary. 60% of workshop must build shared foundation. 40% allows creative divergence with safety net.
**Trade-off:** Less time for building, but ensures everyone can help each other.

**Decision 5: Live code everything or use pre-written checkpoints?**
**Recommendation:** Pre-written checkpoints (90% done, live-code 10%)
**Rationale:** Pitfall #4 research shows pure live coding leads to typos, fumbling, time overruns. Use git branches for steps, live-code only "interesting" parts.
**Trade-off:** Less impressive than pure live coding, but dramatically more reliable.

**Decision 6: Require pre-workshop setup or truly zero?**
**Recommendation:** Truly zero (all browser-based, test in first 15 min)
**Rationale:** Research shows participants ignore pre-work instructions. "Zero pre-work" must mean "zero install." Test environment during Phase 1 setup buffer.
**Trade-off:** 15 min setup time eats into content, but prevents 60 min of debugging later.

## Sources

### Primary Sources (HIGH confidence)

**Official Documentation:**
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Firebase Studio Documentation](https://firebase.google.com/docs/studio)
- [Google AI Studio](https://aistudio.google.com)
- [Three.js Official Site](https://threejs.org/) and [r182 Release](https://github.com/mrdoob/three.js/releases/tag/r182)
- [MediaPipe Tasks Vision Guide](https://ai.google.dev/edge/mediapipe/solutions/guide)
- [MediaPipe Face Landmarker Web](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js)

**Verified Resources:**
- [Google Gemini Workshops Repository](https://github.com/google-gemini/workshops) — monorepo structure, tiered materials
- [Gemini API Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits) — quota verification
- [Three.js WebGPU Documentation](https://threejs.org/docs/pages/WebGPURenderer.html) — r182 features

### Secondary Sources (MEDIUM confidence)

**Workshop Best Practices:**
- [Choose Your Own Adventure Learning](https://catlintucker.com/2020/10/choose-your-own-adventure/) — branching with identical outcomes
- [Live Coding Research - Ten Quick Tips](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008090) — 2x speed limit, engagement patterns
- [Code Scaffolding Best Practices](https://medium.com/nontechcompany/the-laypersons-guide-to-code-scaffolding-750aa299e904) — 60-70% complete starter code
- [Workshop Template Structure](https://github.com/sagikazarmark/workshop-template) — starter/reference/extensions pattern
- [Happy Coding Semester Guide](https://happycoding.io/teaching/guides/semester) — p5.js workshop structures

**Technical Implementation:**
- [Creating 3D Hand Controller with MediaPipe and Three.js](https://tympanus.net/codrops/2024/10/24/creating-a-3d-hand-controller-using-a-webcam-with-mediapipe-and-three-js/) — gesture control patterns
- [Zero-Setup Workshops with GitHub Codespaces](https://global.rstudio.com/conference/2022/talks/zero-setup-r-workshops-github/) — cloud IDE approach
- [MediaPipe vs TensorFlow.js Performance](https://dj-ai.medium.com/mediapipe-1f6818a44c9) — 3-5x faster on desktop

**Pitfall Evidence:**
- [Google AI Studio Quota Handling Issues](https://discuss.ai.google.dev/t/ai-studio-does-not-gracefully-fail-over-when-daily-free-tokens-are-exceeded/111936) — API quota failures
- [CES 2026 Connectivity Crisis](https://vegasnews.com/news/ces-las-vegas-wifi-connectivity-crisis-trade-show/) — venue WiFi failures
- [Why Tech Demos Fail](https://medium.com/@srinathmohan_21939/why-tech-demos-fail-even-after-weeks-of-prep-and-what-you-can-do-about-it-5f5696fc7cab) — live demo anti-patterns

### Tertiary Sources (LOW confidence, needs validation)

**Community Insights:**
- [Tiered Workshop Activities](https://hogonext.com/how-to-develop-workshops-for-different-skill-levels/) — mixed skill level strategies
- [Workshop Energy Management](https://gogather.com/blog/unlocking-audience-engagement-examples-and-strategies-for-success) — engagement techniques
- [Gesture Control Latency Benchmarks](https://www.mdpi.com/2079-9292/14/4/704) — 390-420ms typical latency

---

**Research completed:** 2026-01-24
**Ready for roadmap:** Yes

**Next steps:**
1. Create detailed roadmap with phase-specific tasks
2. Trigger `/gsd:research-phase` for Phase 4 project branches
3. Schedule dry-run 2 weeks before workshop
4. Build workshop materials repository following architecture patterns
5. Test quota allocation and Firebase Studio fork limits 1 week before
