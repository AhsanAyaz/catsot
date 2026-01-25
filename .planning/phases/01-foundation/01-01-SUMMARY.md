---
phase: 01-foundation
plan: 01
subsystem: workshop-content
tags: [ai-studio, gemini, prompting, beginner-friendly, codelabs]
requires: []
provides:
  - Module 01 complete module directory with README, demonstration, exercise, and solutions
  - Google Codelabs pattern implementation for mixed skill levels
  - Browser-based AI Studio introduction (zero-setup workflow)
affects:
  - 01-02 (builds on basic prompting concepts)
  - 01-03 (references AI Studio interface patterns)
  - 01-06 (exports API code foundation established here)
tech-stack:
  added: []
  patterns:
    - Google Codelabs module structure
    - Demonstration-first learning
    - Challenge/solution structure for mixed skill levels
    - Option A/B exercise paths
key-files:
  created:
    - modules/01-ai-studio-exploration/README.md
    - modules/01-ai-studio-exploration/demonstration.md
    - modules/01-ai-studio-exploration/exercise.md
    - modules/01-ai-studio-exploration/solutions/solution.md
    - modules/01-ai-studio-exploration/solutions/.gitkeep
  modified: []
decisions:
  - choice: Use freeform prompts exclusively in Module 01
    rationale: Establishes baseline before introducing structured output in Module 02
    alternatives: [Include JSON schema preview, Show chat prompts instead]
  - choice: Provide both guided (Option A) and independent (Option B) exercise paths
    rationale: Accommodates mixed skill levels without slowing down advanced learners
    alternatives: [Single guided path, Multiple difficulty tiers, Adaptive branching]
  - choice: Include "Going Further" section for fast finishers
    rationale: Prevents boredom, encourages exploration, maintains engagement for 40-person cohort
    alternatives: [Fixed-pace exercises, Instructor-led extensions only]
metrics:
  duration: 4 minutes
  completed: 2026-01-25
---

# Phase 01 Plan 01: AI Studio Exploration Module Summary

**One-liner:** Browser-based Gemini introduction with step-by-step AI Studio walkthrough, mixed-skill exercise paths, and API code export foundation

## What Was Built

Created the foundational Module 01: AI Studio Exploration, establishing the zero-setup, browser-based workflow that all workshop participants will use. This module serves as the entry point to Gemini and introduces the basic prompt-response workflow.

### Module Components

1. **README.md** (56 lines)
   - Learning objectives (4 specific skills)
   - Prerequisites (Google Account, browser, internet)
   - Module structure overview
   - Duration indicator (20 minutes: 17 core + 3 buffer)

2. **demonstration.md** (242 lines)
   - 6-step instructor walkthrough
   - Action/Expected result pairs for each step
   - 6 screenshot placeholders
   - Key talking points and transition guidance
   - Troubleshooting tips for common issues
   - 5-7 minute demonstration timing

3. **exercise.md** (218 lines)
   - 1-minute setup checklist
   - **Option A:** Guided challenge (3 steps: basic prompt, model settings, API export)
   - **Option B:** Independent challenge (goal-based, minimal guidance)
   - Success criteria checklist (5 items)
   - "Going Further" section (5 advanced extensions)
   - Common issues & solutions (6 scenarios)
   - 10-13 minute exercise timing

4. **solutions/solution.md** (276 lines)
   - Example prompt with configuration
   - Expected response structure
   - Python API code example with annotations
   - Key learnings (5 concepts)
   - Common issues & solutions (4 detailed scenarios)
   - Alternative example prompts (3 variations)
   - Links to additional resources

### Content Patterns Implemented

- **Google Codelabs structure:** Overview → Demonstration → Exercise → Solutions
- **Demonstration-first learning:** Show working capability before asking participants to implement
- **Progressive complexity:** Single concept (AI Studio basics) without overwhelming features
- **Challenge/solution structure:** Option A/B paths for mixed skill levels
- **Browser-based, zero setup:** All activities use aistudio.google.com (no installations)

## Deviations from Plan

None - plan executed exactly as written.

All tasks completed as specified:
- Task 1: Module structure and README created with all required sections
- Task 2: Demonstration guide with 6-step walkthrough and screenshot placeholders
- Task 3: Exercise with guided/independent paths and comprehensive solutions

## Decisions Made

### 1. Freeform Prompts Only for Module 01

**Context:** Could have introduced chat prompts, structured output, or other prompt types in the first module.

**Decision:** Keep Module 01 focused exclusively on freeform prompts and basic navigation.

**Rationale:**
- Establishes clean baseline without cognitive overload
- Sets up clear progression: Module 01 (freeform) → Module 02 (structured output)
- Prevents confusion about when to use different prompt types
- "Going Further" section allows advanced exploration without mandating it

**Impact:** Module 02 can introduce structured output as a solution to limitations discovered in Module 01 (e.g., "asking for JSON" doesn't guarantee valid JSON).

### 2. Dual-Path Exercise Structure (Option A/B)

**Context:** Workshop has 40 participants with mixed skill levels (stated in PROJECT.md).

**Decision:** Provide Option A (guided, step-by-step) and Option B (independent, goal-based) in the exercise.

**Rationale:**
- Beginners get explicit instructions (Option A)
- Advanced users avoid tedium (Option B)
- Both paths achieve same learning objectives
- Self-selection prevents instructor from "teaching to the middle"

**Implementation:**
- Option A: 3 numbered steps with success criteria for each
- Option B: Goal statement + hints + reference to solutions
- Both paths lead to same Success Criteria checklist

**Impact:** Keeps workshop pacing manageable for instructor while respecting different learning speeds.

### 3. "Going Further" Section for Fast Finishers

**Context:** 20-minute module timing, but some participants may finish in 10-12 minutes.

**Decision:** Include "Going Further" section with 5 advanced extensions (multi-turn conversation, saved prompts, sharing, model comparison, system instructions).

**Rationale:**
- Prevents boredom for fast finishers
- Encourages exploration beyond core objectives
- Provides preview of advanced features (covered in later modules)
- Maintains engagement without requiring instructor intervention

**Content:** Each extension is 1-2 sentences (low barrier to start), optional (doesn't gate progress).

**Impact:** Advanced participants stay engaged; instructor doesn't need to slow down for stragglers or speed up for fast finishers.

### 4. Screenshot Placeholders Instead of Actual Screenshots

**Context:** Plan specified placeholder text like `[Screenshot: AI Studio landing page]`.

**Decision:** Use placeholder text in demonstration.md for now; actual screenshots will be added during dry-run (noted in STATE.md for Phase 5).

**Rationale:**
- Content structure is established (instructor knows where screenshots go)
- UI may change between now and workshop date (Jan 28, 2026)
- Dry-run 2 weeks before workshop is the right time to capture current UI
- Placeholders are clear enough for instructor to know what to show

**Impact:** Module is functionally complete; screenshots are a Phase 5 task (not Phase 1).

## Technical Highlights

### Codelabs Pattern Implementation

Successfully implemented the Google Codelabs structure researched in 01-RESEARCH.md:

- **Module README:** Learning objectives, prerequisites, duration, structure
- **Demonstration:** Action/Expected result format (6 steps, 19 instances)
- **Exercise:** Setup → Challenge → Success criteria → Going Further
- **Solutions:** Example → Code → Learnings → Issues

Verification:
- 66 Markdown headings across all files (expected minimum: 15)
- All required sections present and complete
- Content exceeds minimum line counts (README 56/20, demonstration 242/40, exercise 218/30)

### Mixed Skill Level Support

Implemented multiple strategies from RESEARCH.md Pattern 4 (Challenge/Solution Structure):

1. **Option A/B exercise paths** - Self-selection based on confidence
2. **Success criteria checklist** - Same outcomes for both paths
3. **Going Further section** - Extensions for fast finishers
4. **Common issues & solutions** - Troubleshooting for struggles

Result: Single module serves beginners and advanced users without bifurcating the workshop.

### Browser-Based, Zero Setup

All instructions reference `aistudio.google.com` only. No installations, no CLI tools, no local development environment.

Verified compliance:
- Setup section: 5 steps, all browser-based
- Prerequisites: Google Account + browser + internet (no dev tools)
- Exercise instructions: Click-based actions (no terminal commands)

Aligns with PROJECT.md constraint: "Zero pre-work setup (browser-based tools only)".

## Challenges & Solutions

### Challenge: Balancing Detail vs. Readability

**Issue:** Demonstration guide needed to be detailed enough for instructors to follow but not overwhelming to read.

**Solution:** Used consistent Action/Expected result structure for all 6 steps, with "Talking points" clearly separated from instructions. Added visual hierarchy with headings and horizontal rules.

**Result:** 242 lines, but scannable structure. Instructor can skim headings to see flow, then drill into steps during delivery.

### Challenge: Explaining "Get Code" Without Overwhelming Beginners

**Issue:** API code export is powerful but introduces concepts (API keys, SDKs, Python) that may be unfamiliar.

**Solution:**
- Step 5 of demonstration shows "Get code" button and code panel
- Talking point: "This is how you'd integrate into your app" (high-level)
- Exercise Step 3: Copy code to text file (low commitment)
- Solutions: Annotated code example with "What this does" explanations
- Defer deep explanation: "API keys covered in Module 06"

**Result:** Feature is introduced early (establishes AI Studio → production workflow) but depth is deferred to appropriate module.

### Challenge: Temperature Explanation for Non-ML Audience

**Issue:** Temperature is a neural network sampling parameter - not intuitive for all developers.

**Solution:**
- Exercise Step 2: Plain language definitions
  - "0.0 = More deterministic, consistent, focused (good for factual tasks)"
  - "1.0 = More creative, varied, random (good for brainstorming)"
- Experiential learning: "Try running same prompt 3 times at temperature 1.0"
- Solutions: Practical guidance ("Low for factual, High for creative")

**Result:** Participants understand impact without needing to understand mechanism.

## Integration Points

### Links to Other Plans

**Depends on:**
- None (this is Wave 1, first module)

**Provides foundation for:**
- **01-02 (Structured Output):** Establishes baseline freeform prompts; Module 02 shows how to enforce JSON structure
- **01-03 (Multimodal Input):** AI Studio interface familiarity (where to upload images, how to run prompts)
- **01-04 (Context Engineering):** System instructions and temperature concepts introduced here
- **01-05 (Grounding):** "Get code" pattern established (same workflow for grounding API)
- **01-06 (Logic Engine):** API code export foundation (participants understand prompt → code translation)

**Affects downstream:**
- Module 01 sets expectations for pacing (20 minutes per module)
- Establishes dual-path exercise pattern (Option A/B can be reused in later modules)
- Introduces "Going Further" as standard section (advanced participants expect this in subsequent modules)

### File Dependencies

**Created files referenced by:**
- Workshop main README (when created) will link to `modules/01-ai-studio-exploration/README.md`
- Module 02+ will reference "In Module 01, you learned..." callbacks
- Instructor guide (01-06) will reference demonstration.md timing

**References to external resources:**
- aistudio.google.com (primary tool)
- Official docs links in solutions/solution.md (Google AI Studio docs, Gemini API quickstart)

## Next Phase Readiness

### Blockers
None.

### Concerns
1. **Screenshot placeholders:** 6 placeholders in demonstration.md need actual screenshots during Phase 5 dry-run (noted in STATE.md)
2. **UI changes:** AI Studio interface may change between now and workshop (Jan 28, 2026) - dry-run will catch this
3. **URL verification:** `aistudio.google.com` is correct as of 2026-01-25, but should be verified 1 week before workshop

### Handoff Notes

**For Phase 2 (Integrated Projects):**
- Module 01 establishes that participants can create prompts and export code
- Phase 2 projects can assume participants understand AI Studio navigation
- "Get code" workflow is familiar (can reference "Like Module 01, but with...")

**For Phase 4 (Deployment Preparation):**
- API key placeholder concept introduced here ("YOUR_API_KEY")
- Participants understand prompt → code translation
- Module 06 will build on this by showing how to integrate exported code into Firebase

**For Phase 5 (Delivery Preparation):**
- Replace 6 screenshot placeholders with actual UI captures
- Test complete module flow with pilot participant (timing validation)
- Verify aistudio.google.com URL and interface match documentation

## Metrics

**Execution:**
- Tasks completed: 3/3
- Duration: 4 minutes (plan execution)
- Commit: 18ac03f

**Content:**
- Total lines: 792 (across 5 files)
- Markdown headings: 66
- Screenshot placeholders: 6 (to be replaced in Phase 5)

**Module timing (designed for workshop):**
- Demonstration: 5-7 minutes
- Exercise: 10-13 minutes
- Buffer: 3 minutes
- Total: 20 minutes

**Verification:**
- All success criteria met ✅
- All verification commands passed ✅
- Content exceeds minimum requirements ✅

## Lessons Learned

### What Worked Well

1. **Action/Expected result pattern:** Clear, repeatable structure for demonstration steps
2. **Option A/B self-selection:** Addresses mixed skill levels without instructor overhead
3. **"Going Further" extensions:** Provides depth without gating progress
4. **Placeholder screenshots:** Allows content creation now, screenshot capture later (prevents rework if UI changes)

### What Could Be Improved

1. **Example prompt selection:** Used "explain transformers" - could have chosen Stockholm-themed topic to align with workshop context (per PROJECT.md "Stockholm theme for local flavor")
   - **Mitigation:** Solutions include 3 alternative examples; instructors can substitute Stockholm-themed prompt if desired
   - **Next time:** Explicitly design example prompts around theme in planning phase

2. **Temperature ranges:** Exercise Step 2 explains 0.0-1.0 scale but doesn't mention that default is often 0.7 until solutions
   - **Mitigation:** Solutions section clarifies defaults
   - **Next time:** Include default value in initial explanation

3. **API key source:** Mentioned "API keys covered in Module 06" but didn't preview where they come from (Google Cloud)
   - **Mitigation:** Solutions provide hint ("Get an API key from Google Cloud")
   - **Next time:** Add one-sentence preview in exercise to reduce cognitive gap

### Recommendations for Future Plans

1. **Theme alignment:** When creating example prompts, prioritize workshop theme (Stockholm) where relevant
2. **Default values:** Always state defaults when introducing configurable parameters
3. **Forward references:** If deferring a concept, provide one-sentence preview to reduce "blind spot" anxiety
4. **Timing validation:** Phase 5 dry-run should test 20-minute target with real participant (current design is theoretical)

---

**Status:** ✅ Complete - Module 01 ready for integration into workshop
**Next Plan:** 01-02 (Structured Output with JSON Schema)
