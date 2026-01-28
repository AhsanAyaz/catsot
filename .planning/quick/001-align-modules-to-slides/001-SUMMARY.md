# Quick Task 001: Align Modules to Slides

**Date:** 2026-01-28
**Status:** Complete

## Objective

Align workshop modules and cheatsheet to match slide content structure (slides are source of truth).

## Problem

The slides follow a tool-focused structure (AI Studio → NotebookLM → Antigravity → Gemini CLI → Firebase Studio) while module READMEs referenced non-existent slide paths (`slides/01-part1-intro.md`, `slides/02-module-transitions.md`). Module 06 (Logic Engine) exists but is not represented in the current slide structure.

## Changes Made

### Task 1: Update Module README Quick Reference sections
Updated 6 module READMEs to remove broken slide references:
- `modules/01-ai-studio-exploration/README.md`
- `modules/02-structured-output/README.md`
- `modules/03-multimodal-input/README.md`
- `modules/04-context-engineering/README.md`
- `modules/05-grounding-search/README.md`
- `modules/07-vibe-coding-tools/README.md`

**Change:** Replaced `📊 **Slides:** Covered in slides/01-part1-intro.md and slides/02-module-transitions.md` with `📊 **Workshop:** This module is part of the hands-on workshop. See instructor slides during live session.`

### Task 2: Archive Module 06 with deprecation notice
- Added deprecation/review notice at top of `modules/06-logic-engine/README.md`
- Updated Quick Reference section to remove broken slide reference

### Task 3: Update cheatsheet Quick Links section
- Updated `cheatsheet/cheatsheet.md` line 539
- Changed `Module 06: Logic engines, vibe coding patterns` to `Module 06: Logic engines (optional/advanced)`

## Verification

```
✓ grep -r "slides/01-part1-intro.md" modules/ cheatsheet/ → No results
✓ grep -r "slides/02-module-transitions.md" modules/ cheatsheet/ → No results
✓ Module 06 has "under review" deprecation notice
✓ Cheatsheet Module 06 marked as "(optional/advanced)"
```

## Files Modified

| File | Change |
|------|--------|
| modules/01-ai-studio-exploration/README.md | Updated Quick Reference |
| modules/02-structured-output/README.md | Updated Quick Reference |
| modules/03-multimodal-input/README.md | Updated Quick Reference |
| modules/04-context-engineering/README.md | Updated Quick Reference |
| modules/05-grounding-search/README.md | Updated Quick Reference |
| modules/06-logic-engine/README.md | Added deprecation notice + Updated Quick Reference |
| modules/07-vibe-coding-tools/README.md | Updated Quick Reference |
| cheatsheet/cheatsheet.md | Module 06 marked optional |

## Notes

- Slides remain source of truth - no changes to slide content
- Module content preserved - only metadata/cross-references updated
- Module 06 content retained but flagged for instructor discretion
