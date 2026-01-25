# Workshop Materials Cross-Reference Matrix

**Purpose:** Track all cross-references between slides, cheatsheet, modules, and projects to prevent broken links during updates.

**Last Updated:** 2026-01-25 (Phase 3 completion)

## Matrix

| Material | References To | Referenced From |
|----------|---------------|-----------------|
| **slides/00-welcome.md** | modules/01-06 (overview)<br>cheatsheet.md ("Quick Start") | README.md (main workshop overview) |
| **slides/01-part1-intro.md** | modules/01-06 (individual READMEs)<br>cheatsheet.md ("Quick Start", "Common Tasks") | slides/02-module-transitions.md |
| **slides/02-module-transitions.md** | modules/01-06 (exercise.md files)<br>cheatsheet.md (section-specific) | slides/01-part1-intro.md<br>slides/03-part2-intro.md |
| **slides/03-part2-intro.md** | part2/face-reactive/starter/README.md<br>part2/camera-game/starter/README.md<br>part2/custom-project/ARCHITECTURE-GUIDE.md | slides/02-module-transitions.md<br>slides/04-wrap-up.md |
| **slides/04-wrap-up.md** | part2/*/EXTENSIONS.md<br>ai.google.dev/gemini-api/docs | slides/03-part2-intro.md |
| **cheatsheet/cheatsheet.md** | modules/01-06 (demonstration.md)<br>part2/face-reactive/<br>part2/camera-game/ | All module README.md files<br>All part2 README files<br>slides/01-part1-intro.md |
| **modules/01-ai-studio-exploration/README.md** | cheatsheet.md "Quick Start"<br>slides/01-part1-intro.md | cheatsheet.md<br>modules/02-structured-output/README.md |
| **modules/02-structured-output/README.md** | cheatsheet.md "Common Tasks: JSON"<br>part2/face-reactive/ (emotion JSON) | cheatsheet.md<br>part2/face-reactive/README.md<br>modules/01, 03 |
| **modules/03-multimodal-input/README.md** | cheatsheet.md "Common Tasks: Image Analysis"<br>part2/camera-game/ (camera patterns) | cheatsheet.md<br>part2/face-reactive/README.md<br>part2/camera-game/README.md |
| **modules/04-context-engineering/README.md** | cheatsheet.md "Common Tasks: Few-Shot"<br>All part2 paths (prompt quality) | cheatsheet.md<br>part2/custom-project/ARCHITECTURE-GUIDE.md |
| **modules/05-grounding-search/README.md** | cheatsheet.md "Advanced: Grounding"<br>part2/camera-game/ (trivia extension) | cheatsheet.md<br>part2/camera-game/EXTENSIONS.md |
| **modules/06-logic-engine/README.md** | cheatsheet.md "Part 2 Essentials"<br>All part2 paths (foundation) | All part2 README files<br>part2/custom-project/ARCHITECTURE-GUIDE.md |
| **part2/face-reactive/starter/README.md** | modules/02, 03 (concepts)<br>cheatsheet.md "MediaPipe", "Canvas"<br>EXTENSIONS.md | slides/03-part2-intro.md<br>cheatsheet.md<br>modules/02 README |
| **part2/camera-game/starter/README.md** | modules/03, 06 (concepts)<br>cheatsheet.md "Firebase"<br>EXTENSIONS.md | slides/03-part2-intro.md<br>cheatsheet.md<br>modules/03 README |
| **part2/custom-project/ARCHITECTURE-GUIDE.md** | modules/04, 06 (architecture)<br>cheatsheet.md "Advanced"<br>EXAMPLES.md | slides/03-part2-intro.md<br>cheatsheet.md |

## Validation Commands

Run these before workshop to verify all references are valid:

```bash
# Check all module references in slides exist
grep -o 'modules/[0-9][0-9]-[a-z-]*/[A-Z]*.md' slides/*.md | while read ref; do
  [ -f "$ref" ] && echo "✓ $ref" || echo "✗ MISSING: $ref"
done

# Check all part2 references in slides exist
grep -o 'part2/[a-z-]*/[a-z-]*/[A-Z]*.md' slides/*.md | while read ref; do
  [ -f "$ref" ] && echo "✓ $ref" || echo "✗ MISSING: $ref"
done

# Check cheatsheet references in modules
grep -c '📄.*[Cc]heatsheet' modules/*/README.md

# Check module references in part2 projects
grep -c 'Module [0-9][0-9]' part2/*/README.md part2/*/ARCHITECTURE-GUIDE.md
```

## Update Protocol

When modifying any material:

1. **Before editing:** Check this matrix for incoming/outgoing references
2. **During editing:** If renaming files or sections, update ALL references
3. **After editing:** Run validation commands above
4. **Before workshop:** Full validation 1 week before (Phase 5 dry-run)

## Stockholm Theming Locations

Stockholm-specific content (update if customizing for other locations):

- slides/00-welcome.md: "Why Stockholm?" section with Spotify, Klarna, King, Mojang
- slides/03-part2-intro.md: Fotografiska museum example, Swedish gaming culture
- cheatsheet/cheatsheet.md: "Example Use Cases (Stockholm Context)" section

**To generalize:** Replace Stockholm examples with local examples while maintaining structure.
