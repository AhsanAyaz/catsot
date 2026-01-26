# Phase 5: Dry-run & Validation - Research

**Researched:** 2026-01-26
**Domain:** Workshop validation, dry-run testing, content verification
**Confidence:** HIGH

## Summary

Phase 5 is about validating the workshop before delivery. The research identifies that this is primarily a process-oriented phase rather than a technology phase. The domain is "workshop dry-run testing" - ensuring all materials, timing, and learning outcomes work in practice before the January 28, 2026 workshop date.

Key findings reveal a CRITICAL issue: the `gemini-2.0-flash` model name used throughout the codebase is deprecated and will be shut down on March 31, 2026. However, since the workshop is January 28, 2026, this is not a blocking issue - but it is a concern for any follow-up materials or future use. Additionally, 19 screenshot placeholders need real screenshots, timing validation requires section-by-section tracking, and learning outcomes need self-assessment checkpoints.

The context decisions (from 05-CONTEXT.md) establish this as an internal dry-run by a single tester (user) with freeform exploration approach, simple stopwatch tracking, and immediate issue fixing. This research provides the patterns and checklists needed for effective validation.

**Primary recommendation:** Create a structured validation checklist covering 6 validation domains: (1) screenshots, (2) timing, (3) learning outcomes, (4) technical verification, (5) deployment testing, (6) cross-reference validation.

## Standard Stack

The established tools for this domain:

### Core
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Snagit or CleanShot X | Latest | Screenshot capture with annotations | Industry standard for documentation screenshots |
| Squoosh | Web app | Image optimization | Free, browser-based, supports WebP/PNG optimization |
| Stopwatch (browser/phone) | Any | Section timing | Simple, reliable, no setup needed |
| Browser DevTools | Chrome/Firefox | Technical validation | Check console errors, network issues |

### Supporting
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| TinyPNG | Web service | Batch image compression | After capturing multiple screenshots |
| Firebase Emulator | Latest | Local deployment testing | Validating Part 2 deployment flow |
| Multiple Google accounts | N/A | Persona testing | Simulating different attendee types |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Snagit | macOS Screenshot (Cmd+Shift+4) | Faster but no annotations |
| Squoosh | ImageOptim (Mac) | Local vs browser-based |
| Manual stopwatch | Session recording | More data but more overhead |

**No installation needed:** Phase 5 uses existing tools (browser, stopwatch, screenshot tool).

## Architecture Patterns

### Recommended Validation Structure
```
05-validation/
├── 05-RESEARCH.md           # This file
├── 05-PLAN.md               # Main plan with all tasks
├── validation-checklist.md  # Runtime checklist for dry-run
├── timing-log.md            # Section timing records
├── issue-log.md             # Issues found and fixed
└── screenshots/             # Captured screenshots (if stored locally)
```

### Pattern 1: Section-by-Section Validation
**What:** Validate each module/section independently before full run-through
**When to use:** Complex content with multiple interconnected pieces
**Approach:**
1. Complete Module 01 fully (demo + exercise + self-assessment)
2. Log timing for each sub-section
3. Fix any issues immediately
4. Move to Module 02
5. Repeat for all 6 modules, then Part 2

### Pattern 2: Checkpoint Self-Assessment
**What:** After each module, ask "Could I explain this concept to someone?"
**When to use:** Validating learning outcomes without formal testing
**Approach:**
- LEARN-01 (Context engineering): After Module 04
- LEARN-02 (Structured output): After Module 02
- LEARN-03 (Multimodal input): After Module 03
- LEARN-04 (MediaPipe): After Part 2 project completion

### Pattern 3: Fix-as-you-go
**What:** Fix issues immediately when found, don't batch them
**When to use:** Single-person dry-run with limited time
**Why:** Context is fresh, issue is clear, fix is fastest now

### Anti-Patterns to Avoid
- **Rushing through content:** Don't skip sections to "save time" - you'll miss issues
- **Batching fixes:** Batching loses context; fix immediately
- **Skipping self-assessment:** The learning outcome validation is the point of the dry-run
- **Not testing on clean environment:** Use incognito mode or separate browser profile

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manual resize in image editor | Squoosh/TinyPNG | Automated quality/size tradeoff |
| Screenshot capture | Print Screen + Paint | Snagit/CleanShot | Annotations, standardized output |
| Timing tracking | Memory/notes | Actual stopwatch with lap times | Accurate data for decision-making |
| Cross-reference validation | Manual file reading | grep commands from CROSS-REFERENCE-MATRIX.md | Consistent, repeatable |

**Key insight:** Dry-run validation is about systematic coverage, not creativity. Use existing tools and checklists to ensure nothing is missed.

## Common Pitfalls

### Pitfall 1: Model Name Currency
**What goes wrong:** Code examples use deprecated model names that fail during workshop
**Why it happens:** Model names change frequently; `gemini-2.0-flash` deprecated March 2026
**How to avoid:**
- Verify all model names against current API documentation during dry-run
- Update to `gemini-3-flash-preview` or `gemini-2.5-flash` where appropriate
**Warning signs:** API errors about unknown model, different behavior than expected

**CRITICAL FINDING:** 20+ files reference `gemini-2.0-flash` which is deprecated. However, the workshop date (Jan 28, 2026) is before the March 31, 2026 shutdown, so this is not blocking but should be noted for materials updates.

### Pitfall 2: Screenshot Staleness
**What goes wrong:** Screenshots don't match current UI, causing attendee confusion
**Why it happens:** AI Studio UI updates frequently
**How to avoid:**
- Capture screenshots maximum 3 days before workshop
- Use consistent browser zoom (100%)
- Annotate key areas with numbered callouts
**Warning signs:** Button names don't match, layout looks different

### Pitfall 3: Timing Compression
**What goes wrong:** Sections that "feel" 5 minutes actually take 12 minutes
**Why it happens:** Familiarity with content makes it seem faster
**How to avoid:**
- Use actual stopwatch, not estimates
- Include time for "getting unstuck" (attendees will hit issues)
- Add 20% buffer to all estimates
**Warning signs:** 20-minute module takes 25+ minutes in dry-run

### Pitfall 4: Self-Assessment False Confidence
**What goes wrong:** Tester thinks learning outcomes are clear because they wrote the content
**Why it happens:** Creator bias - you understand it because you created it
**How to avoid:**
- Ask specifically: "Would a beginner understand this?"
- Look for jargon without explanation
- Check that concepts build on previous modules
**Warning signs:** Unexplained acronyms, assumed prior knowledge

### Pitfall 5: MediaPipe Download Timeout
**What goes wrong:** 8MB model download hangs or times out on workshop WiFi
**Why it happens:** 40 simultaneous downloads saturate bandwidth
**How to avoid:**
- Test download speed at workshop venue if possible
- Verify backup CDN fallback works
- Consider pre-downloading model in workshop setup instructions
**Warning signs:** Download takes >30 seconds on good connection

### Pitfall 6: Cross-Reference Drift
**What goes wrong:** Links between slides, modules, and cheatsheet point to wrong sections
**Why it happens:** Content was reorganized but references weren't updated
**How to avoid:**
- Run validation commands from CROSS-REFERENCE-MATRIX.md
- Check all emoji-tagged cross-references work
**Warning signs:** "See Section X" points to wrong content

## Code Examples

### Screenshot Capture Guidelines
```
Recommended settings for documentation screenshots:

1. Browser zoom: 100%
2. Window size: 1280x800 (fits most displays)
3. Format: PNG for UI, JPEG for photos
4. Compression: Use Squoosh with quality 80-85
5. Naming: descriptive-name-001.png (numbered for ordering)
6. Annotation colors: Red for highlights, Blue for notes

Target file sizes:
- UI screenshots: 50-150KB after optimization
- Full-page captures: 100-300KB after optimization
- Total for 19 screenshots: ~2-4MB (acceptable)
```

### Timing Log Template
```markdown
# Dry-run Timing Log
**Date:** [date]
**Session:** Part 1 / Part 2

## Module 01: AI Studio Exploration
| Section | Target | Actual | Notes |
|---------|--------|--------|-------|
| Demo walkthrough | 5-7 min | | |
| Exercise Option A | 8-10 min | | |
| Going Further | 3-5 min | | |
| **Total** | **20 min** | | |

Self-assessment: Could I explain AI Studio basics? [Yes/No/Partial]

## Module 02: Structured Output
...
```

### Cross-Reference Validation Commands
```bash
# From CROSS-REFERENCE-MATRIX.md - run these before workshop

# Check all module references in slides exist
grep -o 'modules/[0-9][0-9]-[a-z-]*/[A-Z]*.md' slides/*.md | while read ref; do
  [ -f "$ref" ] && echo "OK $ref" || echo "MISSING: $ref"
done

# Check all part2 references in slides exist
grep -o 'part2/[a-z-]*/[a-z-]*/[A-Z]*.md' slides/*.md | while read ref; do
  [ -f "$ref" ] && echo "OK $ref" || echo "MISSING: $ref"
done

# Count cheatsheet references in modules
grep -c 'cheatsheet' modules/*/README.md
```

### Self-Assessment Questions by Learning Outcome
```markdown
## LEARN-01: Context Engineering (after Module 04)
1. Can I explain the difference between system instructions and user prompts?
2. Could I create a few-shot prompt with 2-3 examples?
3. Do I understand when to use XML tags for structure?

## LEARN-02: Structured Output (after Module 02)
1. Can I explain why descriptions are instructions, not just documentation?
2. Could I write a JSON schema with enum constraints?
3. Do I understand edge case handling for structured output?

## LEARN-03: Multimodal Input (after Module 03)
1. Can I explain inline data vs File API tradeoffs?
2. Do I understand token cost implications of image size?
3. Could I combine image analysis with structured output?

## LEARN-04: MediaPipe (after Part 2)
1. Can I explain how blendshapes map to emotions?
2. Do I understand the threshold values for expression detection?
3. Could I modify the particle behavior based on different emotions?
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `gemini-2.0-flash` | `gemini-3-flash-preview` | Jan 2026 | Model name in examples needs update |
| AI Studio + Vertex merged | AI Studio separated | Jan 2026 | Simpler billing, clearer separation |
| MediaPipe 0.10.15 | MediaPipe 0.10.3 pinned | Discovered Phase 4 | v0.10.15+ has WASM issues |
| Manual screenshots | Automated with Snagit | Ongoing | Faster capture and annotation |

**Deprecated/outdated:**
- `gemini-2.0-flash`: Shutdown March 31, 2026 - use `gemini-3-flash-preview` or `gemini-2.5-flash`
- MediaPipe v0.10.15+: WASM issues discovered in Phase 4 - pinned to v0.10.3

## Screenshot Locations

19 screenshot placeholders identified across modules:

| File | Count | Placeholders |
|------|-------|--------------|
| modules/01-ai-studio-exploration/demonstration.md | 6 | Landing page, Prompt type, Empty editor, Prompt entered, Response, Get code panel, Modified prompt |
| modules/02-structured-output/demonstration.md | 3 | Text response, Run settings panel, JSON response |
| modules/03-multimodal-input/demonstration.md | 0 | (No placeholders found in grep - verify manually) |
| modules/04-context-engineering/demonstration.md | 3 | Unstructured response, System instructions panel, Few-shot prompt |
| modules/05-grounding-search/demonstration.md | 4 | Non-grounded response, Tools panel, Grounded response, Metadata panel |
| modules/06-logic-engine/demonstration.md | 3 | (Per STATE.md - verify locations) |

**Total:** ~19 screenshots to capture during dry-run

## Validation Domains

Six domains requiring validation during dry-run:

### 1. Screenshot Capture
- [ ] Capture all 19 placeholder screenshots
- [ ] Verify AI Studio UI matches descriptions
- [ ] Optimize images (target <150KB each)
- [ ] Replace placeholder text in demonstration.md files

### 2. Timing Validation
- [ ] Part 1: 6 modules fit in 2 hours
- [ ] Part 2: Projects fit in 1.5 hours
- [ ] 15-minute buffer adequate
- [ ] Identify trimmable sections if overrun

### 3. Learning Outcomes
- [ ] LEARN-01: Context engineering self-assessment passes
- [ ] LEARN-02: Structured output self-assessment passes
- [ ] LEARN-03: Multimodal input self-assessment passes
- [ ] LEARN-04: MediaPipe integration self-assessment passes

### 4. Technical Verification
- [ ] AI Studio interface matches documentation
- [ ] Model names work (`gemini-3-flash-preview`)
- [ ] Code examples run without errors
- [ ] Grounding toggle produces expected behavior

### 5. Deployment Testing
- [ ] DELIV-01: Firebase deployment produces shareable URL
- [ ] DELIV-02: Showcase format works (3-4 demos)
- [ ] DELIV-03: Code export from Firebase Studio works
- [ ] MediaPipe loads via ES module (not script tag)

### 6. Cross-Reference Validation
- [ ] All slide references to modules resolve
- [ ] All cheatsheet references work
- [ ] Stockholm theming examples are current

## Open Questions

Things that couldn't be fully resolved:

1. **MediaPipe CDN reliability at workshop venue**
   - What we know: cdn.jsdelivr.net is the primary CDN, backup files exist locally
   - What's unclear: WiFi performance with 40 simultaneous 8MB downloads
   - Recommendation: Test at venue if possible, otherwise trust backup system

2. **Gemini API quota under workshop load**
   - What we know: 3-key rotation provides 3-5x safety margin
   - What's unclear: Actual usage patterns during exercises
   - Recommendation: Monitor with QuotaAwareAPI.printStats() during dry-run

3. **iOS Safari camera permissions**
   - What we know: Requires HTTPS or localhost
   - What's unclear: Workshop attendee device mix
   - Recommendation: Test on iOS Safari during dry-run, document workarounds

## Sources

### Primary (HIGH confidence)
- STATE.md - Accumulated project context and concerns
- 05-CONTEXT.md - User decisions for Phase 5 approach
- CROSS-REFERENCE-MATRIX.md - Validation commands and reference tracking
- Gemini API documentation (ai.google.dev) - Model names and deprecation

### Secondary (MEDIUM confidence)
- [Google AI Studio 2026 models](https://www.datastudios.org/post/google-ai-studio-all-models-available-gemini-3-general-availability-gemini-2-5-production-tiers-a) - Model availability and naming
- [Workshop dry-run best practices](https://academy.pega.com/topic/execution-successful-dry-run-session/v1) - Dry-run methodology
- [Image optimization guide](https://www.thecssagency.com/blog/best-web-image-format) - WebP vs PNG vs JPEG recommendations

### Tertiary (LOW confidence)
- [Stopwatch time study best practices](https://www.numberanalytics.com/blog/stopwatch-time-study-best-practices) - Timing methodology
- [Self-assessment in learning](https://pmc.ncbi.nlm.nih.gov/articles/PMC10401809/) - Learning outcome validation

## Metadata

**Confidence breakdown:**
- Validation methodology: HIGH - Based on existing project context and established patterns
- Screenshot requirements: HIGH - Counted from codebase grep
- Timing approach: HIGH - User-specified in CONTEXT.md
- Model name currency: HIGH - Verified with current Google documentation

**Research date:** 2026-01-26
**Valid until:** 2026-01-28 (workshop date - research is specifically for this event)

## Critical Actions for Phase 5 Planning

1. **Model name consistency check** - 20+ files have `gemini-2.0-flash`, some have `gemini-3-flash-preview`. Decide whether to update all to consistent naming before dry-run.

2. **Screenshot capture order** - Follow module order (01 through 06) to ensure UI exploration builds naturally.

3. **Timing safety margin** - 05-CONTEXT.md specifies 15-minute buffer. Given 20-minute module targets, this allows one module to run 75% over without affecting total time.

4. **Trimmable content priority** - If timing runs long, trim in order: (1) Extension challenges, (2) Module 05 Grounding, (3) Claude's discretion based on dry-run observations.

5. **Image file replacement** - Module 03 sample images (chart.png, code-screenshot.png, ui-mockup.png) need real files before dry-run.
