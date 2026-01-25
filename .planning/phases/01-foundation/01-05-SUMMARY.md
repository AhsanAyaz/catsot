---
phase: 01-foundation
plan: 05
subsystem: workshop-content
tags: [grounding, google-search, citations, rag-alternative, real-time-data]
requires: [01-01]
provides:
  - Grounding with Google Search module
  - Citation metadata understanding
  - RAG vs Grounding comparison
  - Real-time information access pattern
affects: []
tech-stack:
  added: []
  patterns:
    - Automatic grounding decision-making
    - Citation extraction from groundingMetadata
    - Grounding vs RAG tradeoff analysis
key-files:
  created:
    - modules/05-grounding-search/README.md
    - modules/05-grounding-search/demonstration.md
    - modules/05-grounding-search/exercise.md
    - modules/05-grounding-search/solutions/solution.md
  modified: []
decisions:
  - Grounding toggle demonstration over API-first (AI Studio UI more accessible for beginners)
  - Four query types in exercise (current events, facts, Nobel Prize, stock prices) to illustrate selectivity
  - Grounding vs RAG comparison table (positions grounding as modern alternative for public web info)
  - Metadata structure shown in both UI and API contexts (full understanding for implementation)
metrics:
  duration: 5 minutes
  completed: 2026-01-25
---

# Phase 1 Plan 05: Grounding with Google Search Module Summary

**One-liner:** Grounding with Google Search enables real-time web information with automatic citations, eliminating manual RAG for public data.

## What Was Built

Created Module 05: Grounding with Google Search, teaching participants how to use Gemini's built-in grounding feature to access current web information with source attribution. This module completes the AI Studio foundations by showing the modern alternative to manual RAG implementation.

**Key Components:**
1. **Module README** - Comprehensive overview explaining knowledge cutoff problem, grounding vs RAG, and when to use each approach
2. **Demonstration guide** - Step-by-step walkthrough showing grounding toggle in AI Studio, before/after comparison, and metadata structure
3. **Hands-on exercise** - Testing with four query types (current events, facts, Nobel Prize, stock prices) to understand automatic grounding
4. **Complete solutions** - Reference examples with full metadata structure, API code (Python/Node.js), and real-world use cases

**Learning Objectives Addressed:**
- Understanding grounding as real-time information access (vs knowledge cutoff)
- Enabling grounding in AI Studio (Tools panel toggle)
- Interpreting grounding metadata (groundingChunks, groundingSupports, webSearchQueries)
- Recognizing when grounding is appropriate vs when training data suffices

**Workshop Integration:**
- 20-minute module (5-7 min demo, 10-13 min exercise)
- Builds on Module 01 (AI Studio basics)
- Complements Module 02 (can combine structured output + grounding)
- Sets foundation for understanding when AI needs external data

## Technical Decisions Made

### Decision 1: Demonstration-First with AI Studio UI
**Choice:** Show grounding toggle in AI Studio UI before API code
**Rationale:**
- AI Studio grounding toggle is one-click (vs API configuration)
- Visual before/after comparison is immediately clear
- Reduces cognitive load for mixed skill levels
- Free tier in AI Studio enables unlimited experimentation
**Alternative considered:** API-first approach (requires setup, less accessible)
**Impact:** Faster participant onboarding, lower barrier to entry

### Decision 2: Four Query Types in Exercise
**Choice:** Test current events, timeless facts, Nobel Prize, and stock prices
**Rationale:**
- **Current events** - Shows grounding at its best (recent API updates)
- **Timeless facts** - Demonstrates selectivity (capital of France)
- **Nobel Prize** - Recent event with authoritative sources
- **Stock prices** - Real-time dynamic data
- Coverage spans the spectrum from "never needs grounding" to "always needs grounding"
**Alternative considered:** Single query type (less illustrative of automatic decision-making)
**Impact:** Participants understand grounding is selective, not automatic for all queries

### Decision 3: Grounding vs RAG Comparison Table
**Choice:** Include detailed comparison table in solutions
**Rationale:**
- Positions grounding as modern solution (not just another feature)
- Clarifies when to use each approach (public web vs proprietary data)
- Prevents overgeneralization (grounding isn't always the answer)
- Real-world decision-making guidance
**Alternative considered:** Focus only on grounding (misses architectural context)
**Impact:** Participants can make informed decisions about when to use grounding in production

### Decision 4: Metadata Structure in Both UI and API
**Choice:** Show metadata in demonstration (UI), then full structure in solutions (API)
**Rationale:**
- UI metadata visibility varies (can't guarantee what participants see)
- API access is canonical (always available)
- Progressive disclosure (simple → complete)
- Prepares for implementation in participant apps
**Alternative considered:** API-only (excludes non-coders), UI-only (incomplete)
**Impact:** All participants see citation extraction, advanced users have implementation code

## What Works

### Strong Points

**Clear Knowledge Cutoff Problem:**
- "Who won Euro 2024?" example immediately resonates
- Participants understand the limitation before seeing the solution
- Motivates the need for grounding (not just "cool feature")

**Side-by-Side Comparison:**
- Same prompt with/without grounding shows clear value
- Demonstrates that grounding isn't always triggered (important learning)
- Visual proof reduces need for explanation

**Metadata Structure Examples:**
- Complete JSON examples with annotations
- Maps groundingSupports to groundingChunks (non-obvious relationship)
- API code shows how to extract citations programmatically

**Real-World Use Cases:**
- News summarization, fact-checking, market data, documentation
- Concrete examples help participants envision applications
- Positions grounding as production-ready (not experimental)

### Dependencies Validated

**From Module 01:**
- AI Studio navigation (creating prompts, running queries)
- Tools panel location (grounding toggle is in Tools)
- "Get code" feature (for API export)

**Knowledge Cutoff Concept:**
- Participants need to understand LLM training data limitations
- Covered in Module 01 (AI Studio Exploration)
- Essential context for grounding value proposition

## What to Watch

### Potential Issues

**Grounding Metadata Visibility:**
- **Risk:** AI Studio UI may not show full metadata for all participants
- **Why:** UI changes frequently, metadata display varies by rollout
- **Mitigation:** Solutions include API code as fallback, troubleshooting section addresses this
- **Phase 5 action:** Verify current AI Studio UI during dry-run (1 week before workshop)

**Expectation Mismatch on Automatic Grounding:**
- **Risk:** Participants expect grounding to search for every prompt
- **Why:** Not understanding "automatic decision-making" means model chooses when to search
- **Mitigation:** Common Pitfall section explicitly addresses this, exercise tests it
- **Phase 5 action:** Emphasize in instructor notes "grounding is selective, not universal"

**Cost Confusion:**
- **Risk:** Participants worry about costs during workshop
- **Why:** Grounding pricing is mentioned ($35/1K queries)
- **Mitigation:** README and demonstration both emphasize "Free in AI Studio for testing"
- **Phase 5 action:** Include cost FAQ in instructor guide

### Open Questions for Phase 5

**Question 1: Current AI Studio Grounding UI**
- What does the metadata panel look like as of Jan 28, 2026?
- Is webSearchQueries visible?
- How are sources displayed?
- **Action:** Capture screenshots during dry-run, update demonstration.md placeholders

**Question 2: Grounding Trigger Reliability**
- Do the example prompts consistently trigger grounding?
- Are there queries that worked in testing but fail in workshop?
- **Action:** Test all exercise prompts 1 day before workshop, document any changes

**Question 3: Grounding + Structured Output Compatibility**
- Does combining grounding (Module 05) with JSON schema (Module 02) work reliably?
- Mentioned in "Going Further" section - should be tested
- **Action:** Test combination during Phase 5, update if issues found

## Deviations from Plan

None - plan executed exactly as written.

All specified files created with content matching plan requirements:
- README.md (20+ lines, learning objectives, grounding vs RAG)
- demonstration.md (40+ lines, grounding toggle, metadata structure)
- solutions/solution.md (35+ lines, grounding metadata examples, API code)

Verification criteria exceeded:
- Grounding mentions: 35 (required: 15)
- Automatic/selective mentions: 16 (required: 5)
- RAG comparison: 10 (required: 3)

## Integration Points

### Backward Integration (What This Builds On)

**Module 01 (AI Studio Exploration):**
- AI Studio navigation and prompt creation
- Understanding of LLM capabilities and limitations
- Tools panel familiarity
- "Get code" feature for API export

**Conceptual:**
- Knowledge cutoff concept (LLMs trained on historical data)
- Free tier vs paid API usage
- Browser-based workflow (zero setup)

### Forward Integration (What This Enables)

**Module 06 (Logic Engine):**
- Could use grounding for real-time business rules (e.g., "latest regulations")
- Demonstrates when AI needs external data vs when logic suffices

**Part 2 Projects:**
- Grounding could power current information in Firebase Studio apps
- Citation extraction useful for research/fact-checking features
- RAG vs grounding decision-making for project architecture

**General:**
- Understanding of when to augment AI with external data
- Citation extraction pattern (applicable beyond grounding)
- Cost awareness for production planning

## Metrics

**Execution:**
- Duration: 5 minutes
- Tasks completed: 3/3
- Files created: 5
- Commits: 1 (c629c5a)

**Content:**
- README: 82 lines
- Demonstration: 298 lines
- Exercise: 228 lines
- Solutions: 791 lines
- Total: 1,399 lines of workshop content

**Coverage:**
- Learning objectives: 4
- Demonstration steps: 6
- Exercise query types: 4 (Option A) + open-ended (Option B)
- Solution examples: 4 query types + API code + use cases
- Real-world use cases: 6

## Next Steps

**Immediate (Phase 1):**
- Module 06 (Logic Engine) is final foundation module
- Completes AI Studio exploration sequence

**Phase 5 (Dry-run):**
- Replace screenshot placeholders (4 placeholders in demonstration.md)
- Test all exercise prompts (verify grounding triggers as expected)
- Verify grounding metadata visibility in current AI Studio UI
- Test grounding + structured output combination ("Going Further" section)
- Capture actual grounding costs if participants use API (for FAQ)

**Workshop Day:**
- Emphasize "free in AI Studio" during demonstration (cost concern mitigation)
- Watch for grounding trigger confusion (be ready to explain selective nature)
- Monitor metadata visibility issues (API code as backup)

## Files Created

All files in `modules/05-grounding-search/`:

1. **README.md** - Module overview (learning objectives, grounding vs RAG, key concepts)
2. **demonstration.md** - Instructor guide (6 steps, metadata structure, talking points)
3. **exercise.md** - Hands-on practice (4 query types, Option A/B paths, Going Further)
4. **solutions/solution.md** - Complete reference (examples, metadata, API code, use cases)
5. **solutions/.gitkeep** - Directory placeholder

Commit: c629c5a

---

**Phase 1 Progress:** 4 of 6 plans complete (Modules 01, 02, 03, 05)
**Next:** Module 04 (Context Engineering) or Module 06 (Logic Engine)
