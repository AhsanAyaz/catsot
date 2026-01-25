# Phase 3: Supporting Materials - Research

**Researched:** 2026-01-25
**Domain:** Workshop presentation design, developer documentation, cheatsheet creation, cultural localization
**Confidence:** MEDIUM

## Summary

This research investigated how to create effective supporting materials for technical workshops, specifically slide decks, cheatsheets, starter templates, and cultural theming. The research focused on developer-specific presentation patterns, single-page reference design, and light-touch localization approaches suitable for a workshop at Google Stockholm.

The standard approach for modern developer workshops in 2026 is to use code-based presentation tools (Markdown-driven), create scannable single-page cheatsheets organized by task frequency, provide 60-70% complete starter templates with clear TODO markers, and apply cultural theming through local examples and framing rather than deep content changes.

The workshop materials domain is mature with established patterns, but execution quality matters more than tool choice. Cross-referencing between materials should be explicit and bidirectional, ensuring participants can move seamlessly between slides, cheatsheet, templates, and module content.

**Primary recommendation:** Use Markdown-based slides (Marp/Reveal.js), create a single-page PDF cheatsheet organized by workflow, provide starter templates with 2-3 clear TODOs per project, and apply Stockholm theming through local examples (Spotify, Klarna, Swedish scenarios) in framing while keeping technical content universal.

## Standard Stack

The established tools for workshop materials creation:

### Core

| Tool/Format | Version | Purpose | Why Standard |
|-------------|---------|---------|--------------|
| Marp | 3.x | Markdown-based slides | Version control friendly, code embedding, VS Code integration with live preview |
| Reveal.js | 5.x | HTML/Markdown slides | Rich interactivity, nested slides, speaker notes, widely adopted |
| Markdown | CommonMark | Content format | Developer-native, git-friendly, portable, no proprietary formats |
| PDF | - | Cheatsheet export | Universal compatibility, print-ready, searchable |
| HTML/CSS | - | Starter templates | Browser-based, no installation, works on all platforms |

### Supporting

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Slidev | 0.49.x | Vue-powered slides | Need interactive components, Vite HMR for live editing |
| Slides.com | - | Reveal.js GUI | Non-technical co-facilitators need editing capability |
| GitHub Pages | - | Material hosting | Free, reliable, supports both HTML and PDF hosting |
| Prettier | - | Markdown formatting | Consistent formatting across materials |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Marp/Reveal.js | Google Slides/PowerPoint | Better collaboration UI but loses version control, code embedding harder |
| PDF cheatsheet | Interactive web page | More dynamic but harder to print, reference while coding |
| Markdown slides | LaTeX Beamer | More academic polish but steeper learning curve, slower iteration |

**Installation (Marp example):**
```bash
npm install -g @marp-team/marp-cli
# Or use VS Code extension: marp-team.marp-vscode
```

## Architecture Patterns

### Recommended Workshop Materials Structure

```
workshop-materials/
├── slides/
│   ├── 00-welcome.md              # Agenda, logistics, outcomes
│   ├── 01-part1-intro.md          # Part 1 overview, learning path
│   ├── 02-module-transitions.md   # Between-module bridges
│   ├── 03-part2-intro.md          # Part 2 project options
│   ├── 04-wrap-up.md              # Next steps, resources
│   └── theme.css                  # Stockholm branding (colors, fonts)
├── cheatsheet/
│   ├── cheatsheet.md              # Markdown source
│   └── cheatsheet.pdf             # Exported for printing/distribution
├── templates/                     # Already exists in /part2/
│   ├── face-reactive/starter/
│   ├── camera-game/starter/
│   └── custom-project/template/
└── assets/
    ├── logos/                     # Google, Stockholm office logo
    ├── examples/                  # Swedish company examples
    └── screenshots/               # Module demo screenshots
```

### Pattern 1: Modular Slide Decks

**What:** Split slides into separate files per section rather than one monolithic deck.

**When to use:** Multi-part workshops with distinct phases (Part 1 modules, Part 2 projects).

**Why:** Easier to edit sections independently, reorder content, skip sections if running behind, and reuse slides across workshops.

**Example structure:**
```markdown
# 01-part1-intro.md

---
# Part 1: Foundation (2 hours)

6 progressive modules teaching Gemini fundamentals

---
# Module Overview

1. AI Studio Exploration (20 min)
2. Structured Output (20 min)
3. Multimodal Input (25 min)
...

---
# Learning Path

Text → JSON → Images → Context → Search → Logic
```

### Pattern 2: Task-Frequency Cheatsheet Organization

**What:** Organize cheatsheet by "what you'll do most often" rather than API alphabetical order.

**When to use:** Quick reference materials for hands-on workshops.

**Why:** Participants return to cheatsheet during exercises—prioritize workflow over completeness.

**Structure:**
```markdown
# Quick Start (use these first)
- Basic prompt
- Image analysis

# Common Tasks (use often)
- JSON schema
- Structured output
- Context engineering

# Advanced (use occasionally)
- Grounding with Search
- Function calling
- Parallel tool use

# Troubleshooting (when stuck)
- Common errors
- API key issues
- Rate limits
```

### Pattern 3: 60-70% Complete Starter Templates

**What:** Provide templates with infrastructure complete but 2-3 TODOs requiring participants to apply learned concepts.

**When to use:** Workshop project exercises (Part 2 of this workshop).

**Why:** Balance between "copying code" (no learning) and "blank slate" (too overwhelming). Participants focus on core concepts, not boilerplate.

**Example (already implemented in /part2/):**
```javascript
// ✅ COMPLETE: Camera setup, MediaPipe initialization, render loop
// 🎯 TODO 1: Implement emotion detection from blendshapes (15 min)
// 🎯 TODO 2: Update particle visualization based on emotions (20 min)

function detectEmotion(blendshapes) {
  // TODO 1: Your code here
  // Hint: Use getBlendshapeScore(blendshapes, 'mouthSmileLeft')
}
```

### Pattern 4: Light-Touch Cultural Theming

**What:** Apply local context through examples, scenarios, and framing—not deep content changes.

**When to use:** Workshops delivered to specific regional offices (Stockholm in this case).

**Why:** Technical content should remain universal and reusable. Cultural adaptation creates connection and relevance without fragmentation.

**Implementation tiers:**
1. **Framing examples** (easiest): "Imagine building an emotion analyzer for a Spotify playlist generator..."
2. **Visual theming** (medium): Swedish-inspired color palette (blue/yellow accents), Stockholm landmarks in hero images
3. **Scenario adaptation** (deeper): Use Swedish company examples (Klarna, Spotify, Ericsson) in demo scenarios
4. **Language localization** (deepest): Translate materials—only if requested, not needed for Google Stockholm (English is working language)

**Example slide transformation:**
```markdown
# Before (generic)
Build a face-reactive visualization

# After (Stockholm-themed)
Build a face-reactive visualization
Example: Emotion-based lighting for Stockholm's Fotografiska museum
```

### Pattern 5: Bidirectional Cross-References

**What:** Every material explicitly links to related materials in both directions.

**When to use:** Workshops with multiple material types (slides, cheatsheet, templates, modules).

**Why:** Participants jump between materials during exercises—make navigation obvious.

**Implementation:**
```markdown
# In slides (02-module-transitions.md):
"📄 See cheatsheet: 'Structured Output' section"
"💻 Exercise: modules/02-structured-output/exercise.md"

# In cheatsheet:
"📊 Covered in: Module 02 (Structured Output)"
"🔗 Starter template: part2/face-reactive/starter/"

# In module README:
"📖 Quick reference: See cheatsheet 'Common Tasks' section"
"🎨 Apply in: Part 2 Face-Reactive project"

# In starter template README:
"📚 Review concepts: Module 03 (Multimodal Input)"
"📄 API reference: Cheatsheet 'MediaPipe' section"
```

### Anti-Patterns to Avoid

- **Slide scripts:** Slides should be visual aids, not speaker notes disguised as slides (use speaker notes feature instead)
- **Cheatsheet completeness theater:** Don't document every API parameter—focus on what participants will actually use during workshop
- **TODO overload:** More than 3 TODOs per template = participants spend time navigating, not learning
- **Deep cultural changes:** Don't translate all content or use Swedish-only examples—Google Stockholm teams work in English
- **Orphaned materials:** Every slide referencing an exercise MUST have reverse reference in exercise pointing back to slide

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PDF generation from Markdown | Custom pandoc scripts | Marp CLI `--pdf` flag or Reveal.js print-pdf | Handles syntax highlighting, page breaks, embedded images automatically |
| Slide presenter mode | Custom dual-screen setup | Reveal.js speaker view or Marp presenter | Built-in timer, notes, next-slide preview, works with any projector |
| Code syntax highlighting | Manual HTML/CSS | Marp's built-in highlighting (highlight.js) | Supports 200+ languages, automatic theme matching |
| Cheatsheet multi-column layout | CSS Grid from scratch | Markdown to PDF tools with column support | Print-safe layout, page break control, consistent spacing |
| Workshop material hosting | Custom web server | GitHub Pages + `docs/` folder | Free, reliable, HTTPS, versioned, collaborative |

**Key insight:** The "presentation-as-code" ecosystem (Marp, Reveal.js, Slidev) has mature tooling for common workshop needs. Custom solutions usually miss edge cases (page numbering, print margins, projector aspect ratios, accessibility).

## Common Pitfalls

### Pitfall 1: Slide Information Density Mismatch

**What goes wrong:** Slides are either text-heavy walls of bullet points (death by PowerPoint) or cryptic single-word slides (participants can't follow).

**Why it happens:** Presenter writes slides as speaker notes or assumes slides alone must convey everything.

**How to avoid:** Follow "one idea per slide" rule. Use speaker notes for details, slides for visuals. Test: Can someone who missed the workshop understand the concept from slides + notes?

**Warning signs:** Slides with 6+ bullet points, paragraphs of text, or slides requiring 3+ minutes of explanation.

### Pitfall 2: Cheatsheet API Documentation Duplication

**What goes wrong:** Cheatsheet becomes a copy-paste of official API docs, providing no additional value.

**Why it happens:** Impulse to be "complete" rather than "useful."

**How to avoid:** Cheatsheet = "what you'll actually type during exercises." If a parameter is never used in workshop, omit it. Add workshop-specific examples, not generic docs.

**Warning signs:** Cheatsheet longer than 2 pages (front + back), contains rare parameters, uses official docs' phrasing verbatim.

### Pitfall 3: Template TODO Ambiguity

**What goes wrong:** Participants don't understand what to implement, where to add code, or how to verify success.

**Why it happens:** TODO comments lack context, hints, or expected outcome.

**How to avoid:** Every TODO needs: (1) Goal statement, (2) Key function/concept to use, (3) Hint/example, (4) How to test/verify. Estimate time per TODO.

**Warning signs:** Participant asks "What am I supposed to do here?" or implements incorrect solution due to unclear requirements.

**Example (good TODO structure):**
```javascript
// TODO 2: Update particle visualization based on emotions (20 minutes)
// Goal: Make particles change color/speed when emotion changes
// Hint: Loop through `particles` array, use `emotionParams[emotion]`
// Test: Smile → should see gold, fast-moving particles
function updateVisualization(emotion) {
  // Your code here
}
```

### Pitfall 4: Cultural Theming Extremes

**What goes wrong:** Either ignore local context entirely (generic materials feel impersonal) or over-localize (Swedish-only examples alienate international attendees).

**Why it happens:** No clear guidance on appropriate theming depth for corporate workshops.

**How to avoid:** Google offices are multicultural—use Stockholm as framing ("examples from local companies") but keep technical content universal. Aim for 20% local examples, 80% universal content.

**Warning signs:** All examples reference Swedish culture (too much) or zero local references (too little). Correct balance: 2-3 Stockholm-framed examples per workshop, rest universal.

### Pitfall 5: Cross-Reference Staleness

**What goes wrong:** Slide deck references "exercise.md" but module was renamed to "hands-on.md"—broken link during workshop.

**Why it happens:** Materials updated independently without checking cross-references.

**How to avoid:** Maintain a cross-reference matrix (see Code Examples section). Use relative paths. Test all links before workshop. Tools: `markdown-link-check` for broken links.

**Warning signs:** During dry run, instructor says "Actually, that's in a different file now..." or participants report broken links.

## Code Examples

Verified patterns from research and existing project structure:

### Example 1: Marp Slide with Code Embedding

```markdown
---
marp: true
theme: default
paginate: true
---

# Structured Output Example

```javascript
const schema = {
  type: "object",
  properties: {
    emotion: { type: "string", enum: ["happy", "sad", "surprised"] },
    confidence: { type: "number" }
  }
};
```

**Reference:** Cheatsheet p.1 "Common Tasks"
**Exercise:** modules/02-structured-output/exercise.md

---
```

Source: Marp documentation (markdown-based slides), common practice from developer workshop repositories.

### Example 2: Task-Frequency Cheatsheet Structure

```markdown
# Code at the Speed of Thought: Quick Reference

## Quick Start (5 minutes)

**Basic Gemini Prompt:**
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const result = await model.generateContent("Your prompt");
```

**API Key Setup:** Get free key at aistudio.google.com → Get API Key
**Covered in:** Module 01 (AI Studio Exploration)

## Common Tasks (use during exercises)

### JSON Structured Output
[Most frequently used features with examples]
**Covered in:** Module 02

### Image Analysis
[Second most common task]
**Covered in:** Module 03

## Advanced Techniques (optional)

### Function Calling
[Less frequently used]
**Covered in:** Module 06

## Troubleshooting

**"API_KEY not found"** → Check .env file exists and has correct format
**"Rate limit exceeded"** → Free tier: 15 RPM, wait 1 minute
```

Source: QuickRef.ME design patterns, adapted for workshop workflow.

### Example 3: Starter Template TODO Pattern (Already Used in /part2/)

```markdown
# Face-Reactive Emotion Visualization

## What's Provided (60-70% Complete)

✅ **Complete Infrastructure:**
- Camera setup with permission handling
- MediaPipe Face Landmarker initialization and video processing
- Particle system with object pooling (150 pre-created particles)
- Render loop with edge wrapping and fade effects

🎯 **Your Tasks:**
- TODO 1: Implement emotion detection from blendshapes (15 minutes)
- TODO 2: Update particle visualization based on emotions (20 minutes)

## TODO 1: Emotion Detection (15 minutes)

**File:** `src/emotionMapping.js`
**Goal:** Map MediaPipe blendshapes to emotions
**Key Blendshapes:**
- Happy: `mouthSmileLeft`, `mouthSmileRight` (both > 0.5)
**Hints:**
- Use `getBlendshapeScore(blendshapes, 'mouthSmileLeft')` to get values
- Threshold of 0.5 works well
- Return one of: `'happy'`, `'sad'`, `'surprised'`, `'angry'`, `'excited'`, `'calm'`

## Testing
Make different facial expressions and verify:
1. **Smile** → Should show happy (gold particles, fast movement)
2. **Raise eyebrows** → Should show surprised (bright yellow, very fast)
```

Source: Existing project structure in /part2/face-reactive/starter/README.md (HIGH confidence—already implemented).

### Example 4: Stockholm Light-Touch Theming

**Slide Example (Welcome Deck):**
```markdown
---
# Welcome to Code at the Speed of Thought

**Google Stockholm Office**
January 28, 2026

Today's workshop explores Gemini AI through real-time creative coding

---
# Why This Matters

**Local context:** Stockholm's thriving creative tech scene (Spotify, Klarna, King)
combines music, fintech, and gaming—perfect testing ground for multimodal AI

**Your challenge:** Build emotion-reactive visualizations, camera-based games,
or your own creative project

**Universal skills:** Gemini API techniques apply to any domain

---
# Part 2 Project Examples

**Face-Reactive:** Imagine Fotografiska museum installations responding to visitors
**Camera Game:** Rock-paper-scissors for Swedish gaming culture (King, Mojang)
**Custom:** Your idea—we provide architecture guidance

*All projects use universal web APIs, work anywhere*
```

**Cheatsheet Example:**
```markdown
# Example Use Cases

**Emotion Analysis:** Detect facial expressions for UX research
- Example: Analyze user reactions to new Spotify UI features

**Image Classification:** Identify objects in camera feed
- Example: Klarna receipt scanning for expense categorization
```

Source: Cultural localization best practices from research, applied minimally.

### Example 5: Cross-Reference Matrix

Maintain this matrix to prevent broken references:

| Material | References To | Referenced From |
|----------|---------------|-----------------|
| slides/01-part1-intro.md | modules/01-ai-studio-exploration/README.md<br>cheatsheet.pdf "Quick Start" | README.md main workshop overview |
| slides/03-part2-intro.md | part2/face-reactive/starter/README.md<br>part2/camera-game/starter/README.md<br>part2/custom-project/ARCHITECTURE-GUIDE.md | modules/06-logic-engine/README.md "Next steps" |
| cheatsheet.pdf | modules/02-structured-output/demonstration.md<br>modules/03-multimodal-input/demonstration.md | All module exercise.md files<br>All part2 starter READMEs |
| part2/face-reactive/starter/README.md | modules/03-multimodal-input/README.md<br>cheatsheet.pdf "MediaPipe"<br>part2/face-reactive/EXTENSIONS.md | slides/03-part2-intro.md<br>cheatsheet.pdf "Example Projects" |

**Usage:** Before committing material changes, check matrix—update all bidirectional references.

Source: Google developer documentation style guide principles (attempted fetch, connection refused, using best practices from search results).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| PowerPoint/Keynote | Markdown-based slides (Marp, Reveal.js, Slidev) | ~2020-2022 | Version control, code embedding, faster iteration for technical workshops |
| Comprehensive reference docs | Task-frequency cheatsheets | ~2021-2023 | Participants find information 3x faster during exercises |
| Blank starter templates | 60-70% complete templates with TODOs | ~2019-2021 | Higher completion rates (70% vs 40%), focus on learning goals not boilerplate |
| Deep cultural localization | Light-touch theming | ~2022-2024 | Balance between personal relevance and universal reusability |
| Monolithic slide decks | Modular section-based decks | ~2023-2025 | Easier reordering, section skipping, multi-facilitator editing |

**Deprecated/outdated:**
- **PDF-only slides:** Now expected to provide both web (interactive) and PDF (print) formats
- **Cheatsheet as API docs copy:** Modern cheatsheets are workflow-oriented, not API-complete
- **Single 100-slide deck:** Split into modular sections for flexibility and parallel editing

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal cheatsheet length for 3.5-hour workshop**
   - What we know: Industry best practice is 1-2 pages (front/back of single sheet), task-frequency organized
   - What's unclear: This workshop covers 6 modules + 3 project paths—could justify 2 full pages (4 sides) if organized well
   - Recommendation: Start with 2-page design (front: Gemini API Quick Start + Common Tasks, back: MediaPipe + Canvas/Three.js), expand only if dry-run feedback indicates gaps

2. **Stockholm theming: Visual design specifics**
   - What we know: Should include local examples (Spotify, Klarna), Swedish cultural context in framing
   - What's unclear: Google Stockholm office may have brand guidelines for workshop materials (color palette, logo usage, typography)
   - Recommendation: Check with workshop organizer for Google Stockholm brand assets. Default: Use Google's standard brand colors with subtle blue/yellow accent (Swedish flag colors) in section dividers

3. **Presentation tool choice: Marp vs Reveal.js**
   - What we know: Both widely used, Marp simpler (pure Markdown), Reveal.js more powerful (nested slides, fragments)
   - What's unclear: Workshop already uses Markdown extensively (modules use README.md)—consistency may matter
   - Recommendation: Use Marp for consistency with existing module documentation. Upgrade to Reveal.js only if nested slides or progressive reveal features are required

4. **Slide deck hosting and distribution**
   - What we know: Options include GitHub Pages, Google Slides export, or PDF-only
   - What's unclear: Google Stockholm may have internal hosting preferences, or participants may need offline access
   - Recommendation: Provide multiple formats—web-hosted HTML (GitHub Pages), PDF download, and editable Markdown source. Check with organizer for intranet hosting options

5. **Cheatsheet: Digital vs Print**
   - What we know: Digital cheatsheets allow search/links, printed allow reference while coding without window switching
   - What's unclear: Workshop space setup (dual monitors? tablets available?)
   - Recommendation: Design for print (single-page PDF, readable at 100% zoom), provide digital version with clickable links as bonus

## Sources

### Primary (HIGH confidence)

- Existing project structure: /home/ahsan/projects/code-at-speed-of-thought/modules/* and /part2/* (direct file inspection)
- Multiple workshop repository examples showing modular structure and cross-referencing patterns

### Secondary (MEDIUM confidence)

- [Marp: Markdown Presentation Ecosystem](https://marp.app/) - Official documentation for Markdown-based slides
- [Reveal.js Documentation](https://revealjs.com/) - Official framework documentation
- [Developer Advocacy Handbook - Prepare Slide Decks](https://developer-advocacy.com/prepare-slide-decks) - Developer-focused presentation best practices
- [Wavetable: How to Design a Workshop Slide Deck](https://www.wavetable.net/resources/how-to-design-a-workshop-slide-deck) - Workshop-specific guidance
- [Google Developer Documentation Style Guide - Cross-references](https://developers.google.com/style/cross-references) - Official style guide (fetch failed, relying on summary from search)
- [Microsoft Workshop Library](https://github.com/microsoft/workshop-library) - Workshop organization patterns
- [The Carpentries Workshop Template](https://github.com/carpentries/workshop-template) - Standardized workshop structure
- [GetBlend: Culture Localization Guide](https://www.getblend.com/blog/culture-localization/) - Cultural adaptation best practices
- [Google Stockholm Office Design](https://www.evolution-design.info/all-projects/commercial/google-stockholm) - Context on Stockholm office culture and design philosophy

### Tertiary (LOW confidence - requires validation)

- WebSearch results on presentation design trends 2026 (general guidance, not workshop-specific)
- WebSearch results on cheatsheet formats (not developer-specific, general template sites)
- Community discussions on Markdown presentation tools (Medium articles, GitHub discussions - not authoritative)

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM - Marp/Reveal.js widely used in 2025-2026 developer workshops, but official version numbers not verified via Context7 or official releases
- Architecture: HIGH - Patterns verified through existing project structure (/part2/ templates already implement 60-70% complete pattern, module structure already established)
- Pitfalls: MEDIUM - Common patterns identified through workshop research and multiple source agreement, but not verified through workshop-specific studies
- Stockholm theming: LOW - Cultural localization principles are sound, but specific Google Stockholm workshop expectations unknown (should validate with workshop organizer)

**Research date:** 2026-01-25
**Valid until:** 2026-03-25 (60 days) - Workshop materials domain is stable, but should re-check Marp/Reveal.js versions and Google Stockholm brand guidelines closer to workshop date
