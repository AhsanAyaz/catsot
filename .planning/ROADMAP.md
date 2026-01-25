# Roadmap: Code at the Speed of Thought Workshop

## Overview

This roadmap delivers all materials needed for the January 28, 2026 workshop at Google Stockholm. Starting with foundational content (Part 1 modules), then building creative project paths (Part 2 options), followed by supporting materials (slides, cheatsheet, templates), infrastructure setup (offline fallbacks, deployment), and culminating in a dry-run validation to ensure all learning outcomes and delivery requirements are met before the live workshop.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Workshop Content Foundation** - Create Part 1 foundations modules (AI Studio, structured outputs, multimodal, context engineering, grounding, logic engine)
- [x] **Phase 2: Project Paths Development** - Build Part 2 project options (face-reactive, camera-game, custom) with starter/reference code
- [x] **Phase 3: Supporting Materials** - Create slide deck, cheatsheet, starter templates, and Stockholm theming
- [ ] **Phase 4: Infrastructure & Deployment** - Setup offline fallbacks and Firebase deployment path
- [ ] **Phase 5: Dry-run & Validation** - Test all materials, validate learning outcomes, and ensure delivery requirements

## Phase Details

### Phase 1: Workshop Content Foundation
**Goal**: Part 1 modules are complete with demonstrations and hands-on exercises
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06
**Success Criteria** (what must be TRUE):
  1. AI Studio exploration segment exists with clear demonstrations of Gemini playground basics
  2. Structured output demonstration works (Gemini returns JSON responses reliably)
  3. Multimodal input demonstration works (image uploads produce text analysis)
  4. Context engineering segment exists with prompt crafting exercises and system instruction examples
  5. Grounding demonstration works (search-augmented responses visible)
  6. "Vibe code" logic engine exercise is complete and sets up Part 2 foundation
**Plans**: 6 plans in 3 waves

Plans:
- [x] 01-01-PLAN.md — AI Studio Exploration module (README, demonstration, exercise, solutions)
- [x] 01-02-PLAN.md — Structured Output module with JSON Schema examples
- [x] 01-03-PLAN.md — Multimodal Input module with sample images
- [x] 01-04-PLAN.md — Context Engineering module with prompt templates
- [x] 01-05-PLAN.md — Grounding with Google Search module
- [x] 01-06-PLAN.md — Logic Engine build (starter template + solutions)

### Phase 2: Project Paths Development
**Goal**: All three Part 2 project options are ready with starter templates, reference implementations, and extension challenges
**Depends on**: Phase 1
**Requirements**: PATH-01, PATH-02, PATH-03
**Success Criteria** (what must be TRUE):
  1. Face-reactive experience option exists with MediaPipe face detection integration and emotion-driven visuals
  2. Camera-based game option exists with multiplayer mechanics and QR-based flow (like Karachi Run)
  3. Custom project option exists for advanced attendees with clear guidance on building original projects
  4. Each project has starter template (60-70% complete with TODOs), reference implementation (fully working), and extension challenges
  5. All three projects can be completed within 60-75 minutes by target skill level
**Plans**: 3 plans in 1 wave

Plans:
- [x] 02-01-PLAN.md — Face-reactive experience (MediaPipe + emotion visualization)
- [x] 02-02-PLAN.md — Camera-based multiplayer game (QR + Firebase)
- [x] 02-03-PLAN.md — Custom project template with architecture guide

### Phase 3: Supporting Materials
**Goal**: All workshop materials are ready (slides, cheatsheet, templates, theming)
**Depends on**: Phase 1, Phase 2
**Requirements**: MAT-01, MAT-02, MAT-03, MAT-04
**Success Criteria** (what must be TRUE):
  1. Slide deck exists covering concepts and demo flow for entire workshop
  2. Cheatsheet exists as single-page quick reference (Gemini API, MediaPipe, Canvas/Three.js)
  3. Starter templates exist with TODOs for each Part 2 project option
  4. Stockholm light-touch theming is applied (framing, examples) while keeping projects universal
  5. All materials reference each other correctly (slides link to cheatsheet, templates reference slides)
**Plans**: 3 plans in 1 wave

Plans:
- [x] 03-01-PLAN.md — Modular Marp slide deck with Stockholm theming
- [x] 03-02-PLAN.md — Task-frequency cheatsheet (Markdown + PDF)
- [x] 03-03-PLAN.md — Stockholm theming and cross-reference network

### Phase 4: Infrastructure & Deployment
**Goal**: Infrastructure is ready with offline fallbacks and Firebase deployment path
**Depends on**: Phase 2
**Requirements**: INFRA-01, INFRA-02
**Success Criteria** (what must be TRUE):
  1. Offline fallbacks exist (local mocks) if API or WiFi fails
  2. Firebase deployment path works (one-click deploy tested and documented)
  3. All dependencies are bundled or CDN-accessible (no npm install required)
  4. API quota monitoring is setup with backup keys ready
**Plans**: 3 plans in 2 waves

Plans:
- [ ] 04-01-PLAN.md — Offline fallbacks (CDN + local copies, API mocks)
- [ ] 04-02-PLAN.md — API quota monitoring (multi-key rotation, stats dashboard)
- [ ] 04-03-PLAN.md — Firebase deployment path (docs, testing, one-click deploy)

### Phase 5: Dry-run & Validation
**Goal**: Workshop is fully validated with dry-run testing and all delivery/learning outcomes verified
**Depends on**: Phase 1, Phase 2, Phase 3, Phase 4
**Requirements**: DELIV-01, DELIV-02, DELIV-03, LEARN-01, LEARN-02, LEARN-03, LEARN-04
**Success Criteria** (what must be TRUE):
  1. Dry-run completed with real participants showing attendees can deploy projects to Firebase with shareable URLs
  2. End-of-workshop showcase format tested (3-4 volunteer demos work smoothly)
  3. Attendees in dry-run successfully export code they own from Firebase Studio
  4. Dry-run validates attendees understand context engineering (prompt structure, grounding, system instructions)
  5. Dry-run validates attendees understand structured output (getting reliable JSON from Gemini)
  6. Dry-run validates attendees understand multimodal input (images as context)
  7. Dry-run validates attendees can integrate MediaPipe for camera-based interactions
  8. Timing validated: Part 1 fits in 2 hours, Part 2 fits in 1.5 hours, with coffee break buffer
**Plans**: TBD

Plans:
- [ ] 05-01: TBD during planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Workshop Content Foundation | 6/6 | Complete | 2026-01-25 |
| 2. Project Paths Development | 3/3 | Complete | 2026-01-25 |
| 3. Supporting Materials | 3/3 | Complete | 2026-01-25 |
| 4. Infrastructure & Deployment | 0/3 | Planned | - |
| 5. Dry-run & Validation | 0/TBD | Not started | - |

---
*Roadmap created: 2026-01-24*
*Last updated: 2026-01-25 after Phase 4 planning*
