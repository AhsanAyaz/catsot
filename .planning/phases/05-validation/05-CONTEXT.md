# Phase 5: Dry-run & Validation - Context

**Phase Goal:** Workshop is fully validated with dry-run testing and all delivery/learning outcomes verified

**Gathered:** 2026-01-26

## Discussion Summary

### Dry-run Participants
- **Scope:** Internal only (no external participants)
- **Tester:** Single person (user) testing with multiple accounts/personas
- **Approach:** Section by section walkthrough
- **Structure:** Freeform exploration (not scripted scenarios)

### Timing Validation
- **Method:** Simple stopwatch tracking per section
- **Overrun strategy:** Trim content if sections run long
- **Trimmable content (priority order):**
  1. Extension challenges (first to cut)
  2. Grounding module (Module 05)
  3. Claude decides based on dry-run observations
- **Buffer:** 15 minutes built into schedule

### Learning Outcome Verification
- **Method:** Self-assessment after each module
- **Question:** "Could I explain this concept to someone?"
- **No formal checklist** - gut check approach

### Issue Handling
- **Approach:** Fix immediately as issues are found
- **No batching** - address each issue before continuing

## Success Criteria (from ROADMAP.md)

1. Dry-run completed with real participants showing attendees can deploy projects to Firebase with shareable URLs
2. End-of-workshop showcase format tested (3-4 volunteer demos work smoothly)
3. Attendees in dry-run successfully export code they own from Firebase Studio
4. Dry-run validates attendees understand context engineering (prompt structure, grounding, system instructions)
5. Dry-run validates attendees understand structured output (getting reliable JSON from Gemini)
6. Dry-run validates attendees understand multimodal input (images as context)
7. Dry-run validates attendees can integrate MediaPipe for camera-based interactions
8. Timing validated: Part 1 fits in 2 hours, Part 2 fits in 1.5 hours, with coffee break buffer

## Requirements Coverage

| Requirement | Description | Validation Approach |
|-------------|-------------|---------------------|
| DELIV-01 | Attendees deploy projects to Firebase with shareable URLs | Test deployment flow in Part 2 dry-run |
| DELIV-02 | End-of-workshop showcase with volunteer demos | Simulate showcase format at end |
| DELIV-03 | Code export from Firebase Studio | Test export workflow |
| LEARN-01 | Context engineering understanding | Self-assessment after Module 04 |
| LEARN-02 | Structured output understanding | Self-assessment after Module 02 |
| LEARN-03 | Multimodal input understanding | Self-assessment after Module 03 |
| LEARN-04 | MediaPipe integration capability | Self-assessment after Part 2 project |

## Key Concerns from STATE.md

Carry forward from earlier phases:

1. **Screenshot placeholders:** 19 total across modules need real screenshots
2. **UI verification:** AI Studio interface should be verified (aistudio.google.com)
3. **Module timing:** 20-minute targets need validation
4. **Image files:** Replace placeholder references with real optimized images
5. **Grounding behavior:** Test exercise prompts for consistent behavior
6. **MediaPipe download:** 8MB model may need WiFi optimization for 40 simultaneous downloads
7. **Code example currency:** Verify `gemini-2.0-flash` model name is current
8. **Slide density:** Some slides have 6+ bullet points - may need splitting

## Dry-run Structure

Based on discussion, recommended structure:

### Part 1 Dry-run (Target: 2 hours)
1. Module 01: AI Studio Exploration (~20 min)
2. Module 02: Structured Output (~20 min)
3. Module 03: Multimodal Input (~20 min)
4. Module 04: Context Engineering (~20 min)
5. Module 05: Grounding with Search (~15 min) *trimmable*
6. Module 06: Logic Engine (~25 min)

*Self-assessment after each module*

### Part 2 Dry-run (Target: 1.5 hours)
1. Project selection and setup (~10 min)
2. Core implementation (~45 min)
3. Extension challenges (~20 min) *trimmable*
4. Deployment to Firebase (~15 min)

### Showcase Simulation (~10 min)
- Practice demo format
- Test screen sharing flow

---
*Context gathered: 2026-01-26*
*Ready for: /gsd:plan-phase 5*
