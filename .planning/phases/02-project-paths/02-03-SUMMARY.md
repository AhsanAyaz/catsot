---
phase: 02-project-paths
plan: 03
subsystem: workshop-content
tags: [custom-project, architecture-guide, template, blank-canvas, workshop-path]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Module structure and workshop patterns
  - phase: 02-project-paths
    provides: Research on MediaPipe, Firebase, Three.js patterns
provides:
  - Blank canvas template with optional helpers (camera, Firebase, rendering)
  - Architecture decision guide with decision matrix and workflow
  - 15 example project ideas across solo/multiplayer/creative categories
affects: [03-integration, 05-dry-run]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Optional helper module pattern (import only what you need)
    - Architecture decision workflow for custom projects
    - Project categorization (solo, multiplayer, creative)

key-files:
  created:
    - part2/custom-project/template/index.html
    - part2/custom-project/template/src/main.js
    - part2/custom-project/template/src/camera.js
    - part2/custom-project/template/src/firebase.js
    - part2/custom-project/template/src/rendering.js
    - part2/custom-project/template/README.md
    - part2/custom-project/ARCHITECTURE-GUIDE.md
    - part2/custom-project/EXAMPLES.md
    - part2/custom-project/firebase.json
  modified: []

key-decisions:
  - "Truly blank canvas approach: minimal structure, no prescriptive implementation"
  - "Complete helper modules (not TODO-driven like other paths)"
  - "Decision guide over multiple starter templates (teach decision-making skills)"
  - "15 example ideas covering diverse input/output combinations"

patterns-established:
  - "Optional helper pattern: commented imports, use only what you need"
  - "Time estimate inclusion: every example has realistic completion time"
  - "Mix-and-match encouragement: combine ideas to create unique projects"

# Metrics
duration: 4min
completed: 2026-01-25
---

# Phase 2 Plan 3: Custom Project Template Summary

**Blank canvas template with complete optional helpers (camera, Firebase, rendering), architecture decision guide with workflow, and 15 example project ideas across solo/multiplayer/creative categories**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-25T05:47:43Z
- **Completed:** 2026-01-25T05:51:27Z
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments
- Created minimal template with optional infrastructure helpers (no prescriptive implementation)
- Built comprehensive architecture decision guide with decision matrix, workflow, and time budgets
- Documented 15 detailed project examples with implementation hints and time estimates
- Established truly blank canvas approach (unlike prescriptive paths 02-01 and 02-02)

## Task Commits

Plan completed in single atomic commit (all tasks related to custom project option):

1. **All Tasks: Custom Project Template** - `d53c56c` (feat)
   - Task 1: Blank canvas template with optional helpers
   - Task 2: Architecture decision guide
   - Task 3: Example project ideas document

## Files Created/Modified

**Template infrastructure:**
- `part2/custom-project/template/index.html` - Minimal HTML5 boilerplate with commented CDN scripts
- `part2/custom-project/template/src/main.js` - Empty initialization with commented helper imports
- `part2/custom-project/template/src/camera.js` - Complete getUserMedia wrapper (45 lines)
- `part2/custom-project/template/src/firebase.js` - Complete Firebase Realtime DB helper (55 lines)
- `part2/custom-project/template/src/rendering.js` - Complete Canvas 2D and Three.js setup (70 lines)
- `part2/custom-project/template/README.md` - Quick start guide

**Guidance documents:**
- `part2/custom-project/ARCHITECTURE-GUIDE.md` - Decision matrix, workflow, patterns, anti-patterns (257 lines)
- `part2/custom-project/EXAMPLES.md` - 15 project ideas with implementation hints (389 lines)

**Configuration:**
- `part2/custom-project/firebase.json` - Firebase emulator configuration

## Decisions Made

**Blank canvas over prescriptive scaffolding:**
- Rationale: Advanced attendees need creative freedom, not fill-in-blanks
- Implementation: Complete helper modules (ready to use) with no TODOs in template
- Difference from PATH-01/02: Those have strategic TODOs for learning, this has zero TODOs

**Single template with decision guide over multiple starters:**
- Rationale: Teach decision-making process, not just provide pre-made choices
- Implementation: Decision matrix + workflow diagram + time impact estimates
- Alternative considered: Multiple templates (gesture-game, AR-filter, etc.) rejected as too prescriptive

**Complete helpers over partial implementations:**
- Rationale: Advanced attendees know how to use helpers, just need infrastructure done
- Implementation: camera.js, firebase.js, rendering.js all fully working
- Benefit: Attendees can focus on creative implementation, not boilerplate

**15 diverse examples over deep single-domain guidance:**
- Rationale: Show breadth of possibilities, let attendees find their own direction
- Implementation: Solo (5), Multiplayer (4), Creative (6) categories
- Pattern: Each has concept, stack, core feature, hints, extensions, time estimate

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - straightforward content creation based on research patterns.

## Next Phase Readiness

**Ready for Phase 3 (Integration):**
- Custom project path complete (PATH-03 of 3)
- All three project paths now exist (face-reactive, camera-game, custom)
- Phase 2 Wave 1 complete

**Phase 5 validation needed:**
- Test template with pilot participant to verify 60-75 minute completion
- Validate example project ideas are achievable in stated time ranges
- Verify Firebase emulator setup works smoothly in workshop environment
- Test browser compatibility (Chrome, Firefox, Safari) for all helper modules

**Concerns for next phases:**
- Architecture guide references 02-RESEARCH.md patterns - ensure that file is accessible to attendees
- Example ideas vary widely in difficulty (35-65 min estimates) - may need difficulty ratings
- Custom path success depends on attendee self-direction - consider adding "getting unstuck" checkpoints

---
*Phase: 02-project-paths*
*Completed: 2026-01-25*
