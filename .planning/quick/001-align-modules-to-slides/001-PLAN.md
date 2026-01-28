---
phase: quick
plan: 001
type: execute
wave: 1
depends_on: []
files_modified:
  - modules/01-ai-studio-exploration/README.md
  - modules/02-structured-output/README.md
  - modules/03-multimodal-input/README.md
  - modules/04-context-engineering/README.md
  - modules/05-grounding-search/README.md
  - modules/06-logic-engine/README.md
  - modules/07-vibe-coding-tools/README.md
  - cheatsheet/cheatsheet.md
autonomous: true

must_haves:
  truths:
    - "Module READMEs reference actual slide content (not non-existent files)"
    - "Module 06 status is clarified (archived or retained with warning)"
    - "Cheatsheet module references match current module structure"
    - "Cross-references between modules are accurate"
  artifacts:
    - path: "modules/*/README.md"
      provides: "Updated Quick Reference sections with accurate slide info"
    - path: "cheatsheet/cheatsheet.md"
      provides: "Updated Quick Links section"
  key_links:
    - from: "modules/*/README.md"
      to: "slide content"
      via: "Quick Reference section"
---

<objective>
Align module READMEs and cheatsheet to reflect actual slide content structure.

Purpose: Slides are the source of truth for workshop flow. Modules and cheatsheet currently reference non-existent slide paths (`slides/01-part1-intro.md`, `slides/02-module-transitions.md`) that don't exist. This creates confusion for workshop delivery.

Output: Updated READMEs and cheatsheet with accurate cross-references. Module 06 (Logic Engine) gets a deprecation notice since it's not represented in slides.
</objective>

<execution_context>
@/home/ahsan/.claude/get-shit-done/workflows/execute-plan.md
@/home/ahsan/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/home/ahsan/projects/code-at-speed-of-thought/.planning/PROJECT.md
@/home/ahsan/projects/code-at-speed-of-thought/cheatsheet/cheatsheet.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update Module README Quick Reference sections</name>
  <files>
    modules/01-ai-studio-exploration/README.md
    modules/02-structured-output/README.md
    modules/03-multimodal-input/README.md
    modules/04-context-engineering/README.md
    modules/05-grounding-search/README.md
    modules/07-vibe-coding-tools/README.md
  </files>
  <action>
    In each module README, update the "Quick Reference" section:

    1. REMOVE the line referencing non-existent slides:
       - DELETE: `Slides: Covered in slides/01-part1-intro.md and slides/02-module-transitions.md`

    2. REPLACE with a note about workshop integration:
       - ADD: `Workshop: This module is part of the hands-on workshop. See instructor slides during live session.`

    3. Keep the cheatsheet reference and "Apply in Part 2" sections unchanged.

    Pattern to find and update in each file:
    - Look for `## Quick Reference` section
    - Find line starting with `Slides:` (may have emoji prefix)
    - Replace that single line
  </action>
  <verify>
    grep -r "slides/01-part1-intro.md" modules/ returns no results
    grep -r "slides/02-module-transitions.md" modules/ returns no results
  </verify>
  <done>
    All 6 module READMEs have updated Quick Reference sections without broken slide references
  </done>
</task>

<task type="auto">
  <name>Task 2: Archive Module 06 (Logic Engine) with deprecation notice</name>
  <files>modules/06-logic-engine/README.md</files>
  <action>
    Module 06 teaches Python rule-based systems but is NOT represented in current slide structure.

    1. Add a prominent deprecation notice at the TOP of the README (after the title):

    ```markdown
    > **Note:** This module is currently under review. The Logic Engine content may be integrated
    > into other modules or delivered as optional advanced material. Check with the instructor
    > for the latest workshop structure.
    ```

    2. Update the Quick Reference section same as Task 1 (remove broken slide reference).

    3. In the "Next Steps" section at the bottom, update references to Module 06 in other modules' paths:
       - Change "Module 06" references to reflect it's optional/advanced
  </action>
  <verify>
    grep "under review" modules/06-logic-engine/README.md returns the deprecation notice
    grep -r "slides/" modules/06-logic-engine/ returns no results
  </verify>
  <done>
    Module 06 README has deprecation notice and no broken slide references
  </done>
</task>

<task type="auto">
  <name>Task 3: Update cheatsheet Quick Links section</name>
  <files>cheatsheet/cheatsheet.md</files>
  <action>
    Update the "Quick Links by Module" section (around line 533-541) to:

    1. Add "(optional)" or "(advanced)" tag to Module 06 entry:
       - Change: `Module 06: Logic engines, vibe coding patterns`
       - To: `Module 06: Logic engines (optional/advanced)`

    2. Verify Module 07 description matches its actual content:
       - Current: `Module 07: Antigravity, Firebase Studio, MCP servers, agent skills`
       - This is accurate - keep as is

    3. In the main body, verify any references to Module 06 have appropriate context.
       - Line 88-89 references Module 06 in Quick Reference - check if context is clear
  </action>
  <verify>
    grep "Module 06" cheatsheet/cheatsheet.md shows "(optional" or "(advanced" tag
    Cheatsheet still parses correctly as valid markdown
  </verify>
  <done>
    Cheatsheet Quick Links section accurately reflects module structure with Module 06 marked as optional
  </done>
</task>

</tasks>

<verification>
After all tasks:
1. `grep -r "slides/01-part1-intro.md" modules/ cheatsheet/` returns empty (no broken refs)
2. `grep -r "slides/02-module-transitions.md" modules/ cheatsheet/` returns empty (no broken refs)
3. Module 06 README has clear deprecation/review notice
4. Cheatsheet Module 06 entry is marked as optional/advanced
</verification>

<success_criteria>
- Zero references to non-existent slide paths in modules/ and cheatsheet/
- Module 06 clearly marked as under review / optional
- Cheatsheet Quick Links updated to reflect current module status
- No breaking changes to module content itself (only metadata/references updated)
</success_criteria>

<output>
After completion, create `.planning/quick/001-align-modules-to-slides/001-SUMMARY.md`
</output>
