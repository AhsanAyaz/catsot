# Workshop Validation Checklist

**Workshop:** Code at the Speed of Thought
**Date:** January 28, 2026
**Validation Date:** _______________
**Validator:** _______________

---

## Technical Verification

### AI Studio Interface
- [ ] AI Studio accessible at aistudio.google.com
- [ ] Interface matches documentation screenshots
- [ ] Model selection works (gemini-flash-latest)
- [ ] System instructions panel visible
- [ ] Structured output toggle present
- [ ] Grounding toggle present

### Code Examples
- [ ] Module 01 code examples run without errors
- [ ] Module 02 JSON schemas work correctly
- [ ] Module 03 sample images load and analyze
- [ ] Module 04 few-shot examples produce consistent results
- [ ] Module 05 grounding toggle produces expected behavior
- [ ] Module 06 logic engine Python code executes

### Part 2 Infrastructure
- [ ] MediaPipe loads correctly (face-reactive path)
- [ ] Camera permissions work in browser
- [ ] Firebase emulator starts successfully
- [ ] Firebase deployment completes
- [ ] Deployed URL is accessible
- [ ] QR code scanning works (camera-game path)

### Offline Support
- [ ] CDN fallback scripts present
- [ ] MediaPipe backup files available
- [ ] Gemini mock mode functional

---

## Learning Outcomes (Self-Assessment)

### LEARN-01: Context Engineering
*Assessed after Module 04*
- [ ] Can explain what system instructions do
- [ ] Can explain few-shot prompting purpose
- [ ] Can explain when to use each technique
- [ ] Self-assessment: "Could I teach this?" [ ] Yes [ ] Partially [ ] No

### LEARN-02: Structured Output
*Assessed after Module 02*
- [ ] Can explain JSON schema purpose
- [ ] Can explain description field importance
- [ ] Can explain when structured output helps
- [ ] Self-assessment: "Could I teach this?" [ ] Yes [ ] Partially [ ] No

### LEARN-03: Multimodal Input
*Assessed after Module 03*
- [ ] Can explain image token costs
- [ ] Can explain multimodal + structured combination
- [ ] Can explain when to use image input
- [ ] Self-assessment: "Could I teach this?" [ ] Yes [ ] Partially [ ] No

### LEARN-04: MediaPipe Integration
*Assessed after Part 2*
- [ ] Can explain face landmark detection
- [ ] Can explain blendshape scores
- [ ] Can integrate MediaPipe with Gemini responses
- [ ] Self-assessment: "Could I teach this?" [ ] Yes [ ] Partially [ ] No

---

## Delivery Requirements

### DELIV-01: Firebase Deployment
- [ ] Deployment command works
- [ ] Shareable URL generated
- [ ] URL accessible to anonymous users
- [ ] Project loads correctly on deployed URL

### DELIV-02: Showcase Format
- [ ] Demo presentation format tested
- [ ] Screen sharing works
- [ ] 3-4 demo simulation runs smoothly
- [ ] Time allocation adequate (2-3 min per demo)

### DELIV-03: Code Export
- [ ] Code export from Firebase Studio works
- [ ] Exported code runs locally
- [ ] Attendees understand they own the code

---

## Timing Validation

### Part 1 Timing
- [ ] Part 1 fits in 2 hours (120 min)
- [ ] 15-minute buffer preserved
- [ ] Trimmable sections identified:
  - [ ] Module 05 (Grounding) can be cut if needed
  - [ ] Extension challenges can be cut if needed

### Part 2 Timing
- [ ] Part 2 fits in 1.5 hours (90 min)
- [ ] Setup phase adequate (10 min)
- [ ] Implementation phase adequate (45 min)
- [ ] Deployment phase adequate (15 min)

### Overall Workshop
- [ ] Total time under 3.5 hours
- [ ] Coffee break timing works (15:00-15:30)
- [ ] Showcase timing adequate (10 min)

---

## Cross-Reference Validation

### Slide References
- [ ] Slides reference correct module numbers
- [ ] Code examples in slides match module code
- [ ] Speaker notes have accurate timing guidance

### Cheatsheet References
- [ ] Cheatsheet sections match module content
- [ ] Quick reference URLs are correct
- [ ] Troubleshooting section covers common issues

### Quick Reference Sections
- [ ] Module READMEs have Quick Reference sections
- [ ] Cross-references are bidirectional
- [ ] Links work correctly

---

## Final Status

### Checklist Completion
- Technical Verification: ___/14 items
- Learning Outcomes: ___/16 items (4 sections x 4 checks)
- Delivery Requirements: ___/12 items
- Timing Validation: ___/10 items
- Cross-Reference Validation: ___/8 items
- **Total:** ___/60 items

### Overall Status

**status:** _______________

Options:
- **PASSED** - All items checked, ready for workshop
- **PASSED WITH NOTES** - Minor items noted but workshop ready
- **NEEDS ATTENTION** - Blocking issues require resolution

### Notes

_______________
_______________
_______________

---

*Validation completed: _______________*
