---
phase: quick-001
plan: 01
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
  - part2/face-reactive/EXTENSIONS.md
  - part2/camera-game/EXTENSIONS.md
  - part2/custom-project/EXAMPLES.md
autonomous: true
must_haves:
  truths:
    - "Module READMEs reference correct slide files"
    - "Module numbering matches workshop flow"
    - "Cheatsheet reflects current module structure"
    - "Part 2 cross-references point to existing modules"
  artifacts:
    - path: "modules/*/README.md"
      provides: "Updated cross-references to slides-content/"
    - path: "cheatsheet/cheatsheet.md"
      provides: "Aligned module references"
  key_links:
    - from: "modules/*/README.md"
      to: "slides-content/content/*.md"
      via: "Quick Reference section"
---

<objective>
Align all workshop content (modules, cheatsheet, Part 2 projects) with the new slides structure in slides-content/

Purpose: The slides were created last and represent the final workshop flow. All other materials reference old slide files (slides/01-part1-intro.md, slides/02-module-transitions.md) that are now prefixed with old_*. Need to update cross-references throughout.

Output: Updated modules/, cheatsheet/, and part2/ with correct slide references
</objective>

<execution_context>
@/Users/amu1o5/.claude/get-shit-done/workflows/execute-plan.md
@/Users/amu1o5/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
# Critical Reference - Current Slides Structure

The slides-content/content/ directory contains the final workshop structure:
- 00-welcome.md - Welcome and workshop overview
- 01-ai-studio.md - AI Studio (Module 02 in slides, ~25 min)
- 02-notebooklm.md - NotebookLM (~20 min)
- 03-antigravity.md - Antigravity agent-first development (~35 min)
- 04-gemini-cli.md - Gemini CLI terminal power (~15 min)
- 05-transition.md - Part 1 recap and coffee break
- 06-firebase-intro.md - Part 2 Firebase Studio intro
- 07-ai-centric-view.md - AI-Centric View deep dive (~20 min)
- 08-pro-code-mode.md - Pro Code Mode (~15 min)
- 09-firebase-services.md - Firebase services integration (~25 min)
- 10-build-time.md - Build time project selection
- 11-showcase.md - Workshop showcase and wrap-up

Old files (prefixed old_*) should NOT be referenced.

# Current Modules (to be aligned)

modules/ contains 7 modules:
- 01-ai-studio-exploration
- 02-structured-output
- 03-multimodal-input
- 04-context-engineering
- 05-grounding-search
- 06-logic-engine
- 07-vibe-coding-tools

# Alignment Strategy

The modules cover API fundamentals that ARE taught in slides (just organized differently):
- Slides 01-ai-studio.md covers: structured output, multimodal, grounding, system instructions
- Slides 03-antigravity.md mentions NotebookLM MCP integration
- Slides 07-vibe-coding-tools maps to Module 07

Update cross-references to point to the NEW slide files, NOT the old_ prefixed ones.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update Module README cross-references</name>
  <files>
    modules/01-ai-studio-exploration/README.md
    modules/02-structured-output/README.md
    modules/03-multimodal-input/README.md
    modules/04-context-engineering/README.md
    modules/05-grounding-search/README.md
    modules/06-logic-engine/README.md
    modules/07-vibe-coding-tools/README.md
  </files>
  <action>
    In each module README.md, update the "Quick Reference" section to point to correct slide files:

    For ALL modules 01-06, update the slides reference from:
    `slides/01-part1-intro.md and slides/02-module-transitions.md`
    TO:
    `slides-content/content/01-ai-studio.md` (covers structured output, multimodal, grounding, context)

    The 01-ai-studio.md slide covers ALL the API fundamentals taught in modules 01-06:
    - Structured output (lines 39-78)
    - Multimodal input (lines 81-99)
    - Grounding with Google Search (lines 102-128)
    - System instructions (lines 131-148)

    For Module 07 (vibe-coding-tools), update to:
    `slides-content/content/03-antigravity.md` (covers Antigravity pillars) and
    `slides-content/content/06-firebase-intro.md` through `11-showcase.md` (covers Firebase Studio)

    Also update any mention of "Part 2" or project paths to ensure they reference existing part2/ directories.
  </action>
  <verify>
    grep -r "slides/01-part1" modules/ should return 0 results
    grep -r "slides/02-module" modules/ should return 0 results
    grep -r "slides-content" modules/ should return results
  </verify>
  <done>
    All 7 module READMEs reference slides-content/ instead of old slides/ paths
  </done>
</task>

<task type="auto">
  <name>Task 2: Update cheatsheet module references</name>
  <files>
    cheatsheet/cheatsheet.md
  </files>
  <action>
    Update cheatsheet.md to align with current structure:

    1. In section comments like "Covered in: Module 01 (AI Studio Exploration)", verify module names match actual module folder names

    2. At the bottom "Quick Links by Module" section (around line 533-540), verify the module descriptions match:
       - Module 01: AI Studio basics, freeform prompts (01-ai-studio-exploration)
       - Module 02: Structured output, JSON schemas (02-structured-output)
       - Module 03: Multimodal input, image analysis (03-multimodal-input)
       - Module 04: Context engineering, few-shot examples (04-context-engineering)
       - Module 05: Grounding with Google Search (05-grounding-search)
       - Module 06: Logic engines, vibe coding patterns (06-logic-engine)
       - Module 07: Antigravity, Firebase Studio, MCP servers (07-vibe-coding-tools)

    3. Add reference to slides at top of cheatsheet after header:
       `**Slides:** See slides-content/content/ for presentation materials`

    4. In Vibe Coding section (section 5), update reference from:
       "Covered in: Module 07" to include slide reference:
       "Covered in: Module 07 | Slides: slides-content/content/03-antigravity.md, 06-firebase-intro.md"
  </action>
  <verify>
    Module names in cheatsheet match actual folder names in modules/
    No references to old slide paths
  </verify>
  <done>
    Cheatsheet references correct module names and includes slide reference
  </done>
</task>

<task type="auto">
  <name>Task 3: Update Part 2 project cross-references</name>
  <files>
    part2/face-reactive/EXTENSIONS.md
    part2/camera-game/EXTENSIONS.md
    part2/custom-project/EXAMPLES.md
  </files>
  <action>
    Check each Part 2 project file for references to modules or slides and update:

    1. If any file references "slides/" path, update to "slides-content/content/"
    2. If any file references module numbers, verify they still exist (01-07)
    3. Ensure any "Related Workshop Materials" or cross-reference sections point to:
       - modules/XX-name/README.md (correct folder names)
       - cheatsheet/cheatsheet.md
       - slides-content/content/ (new slide location)

    The Part 2 projects connect back to Part 1 learning. Ensure the connections are valid.

    Note: part2/ folders may not have explicit slide references. If so, add a brief reference:
    "See slides-content/content/10-build-time.md for project selection guidance"
  </action>
  <verify>
    grep -r "slides/" part2/ shows only slides-content/ paths (or no results)
    All module references in part2/ point to existing modules (01-07)
  </verify>
  <done>
    Part 2 project files reference correct module and slide locations
  </done>
</task>

</tasks>

<verification>
After all tasks complete:
1. `grep -rn "slides/01-part1\|slides/02-module" modules/ cheatsheet/ part2/` returns no results
2. `grep -rn "slides-content/content" modules/` returns 7+ results (one per module)
3. All cross-references point to existing files
</verification>

<success_criteria>
- All module READMEs reference slides-content/content/*.md
- No references to old slides/01-part1-intro.md or slides/02-module-transitions.md anywhere
- Cheatsheet module list matches actual module folder names
- Part 2 projects have valid cross-references to modules and slides
</success_criteria>

<output>
After completion, create `.planning/quick/001-align-all-workshop-content-modules-cheat/001-SUMMARY.md`
</output>
