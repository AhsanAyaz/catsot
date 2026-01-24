# Architecture Patterns: AI Workshop Materials & Structure

**Domain:** Creative coding workshop for AI applications
**Researched:** 2026-01-24
**Confidence:** MEDIUM (based on verified workshop patterns, Google resources, and creative coding best practices)

## Executive Summary

Successful AI workshops in 2026 follow a **layered, hub-and-spoke architecture** where a central repository provides navigation to independent, self-contained projects. Workshop materials are organized into three tiers: **starter templates** (scaffolded with TODO comments), **reference implementations** (complete working examples), and **quick reference guides** (cheatsheets for API syntax). "Choose your own path" sections work best when each branch has identical learning outcomes but different creative outputs, allowing skill-level differentiation through optional extensions rather than separate tracks.

## Recommended Architecture

### Three-Tier Material Structure

```
workshop-repo/
├── README.md                    # Central hub with navigation
├── CHEATSHEET.md               # Quick reference (always open)
├── slides/                     # Presentation materials
│   ├── part-1-foundations.md
│   └── part-2-choose-path.md
├── shared/                     # Reusable utilities
│   ├── utils.js
│   └── api-helpers.js
├── foundations/                # Part 1: Everyone follows
│   ├── 01-ai-studio/
│   │   ├── starter/           # Empty template with TODOs
│   │   ├── reference/         # Complete working version
│   │   └── README.md          # Step-by-step guide
│   ├── 02-structured-outputs/
│   │   ├── starter/
│   │   ├── reference/
│   │   └── README.md
│   └── 03-logic-engine/
│       ├── starter/
│       ├── reference/
│       └── README.md
└── choose-your-path/           # Part 2: Branching projects
    ├── README.md              # Helps choose + shows outcomes
    ├── face-reactive/
    │   ├── starter/
    │   ├── reference/
    │   ├── extensions/        # For advanced learners
    │   └── README.md
    ├── gesture-controlled/
    │   ├── starter/
    │   ├── reference/
    │   ├── extensions/
    │   └── README.md
    └── camera-game/
        ├── starter/
        ├── reference/
        ├── extensions/
        └── README.md
```

**Source:** Adapted from [google-gemini/workshops](https://github.com/google-gemini/workshops) pattern and [workshop-template structure](https://github.com/sagikazarmark/workshop-template)

### Material Types Explained

| Type | Purpose | When Used | Confidence |
|------|---------|-----------|------------|
| **Starter Code** | Scaffolded template with TODO comments, structure in place but core logic missing | Participants code along during workshop | HIGH |
| **Reference Implementation** | Complete, working, well-commented code | Participants reference when stuck; instructors use for demos | HIGH |
| **Extensions** | Optional advanced features beyond base requirements | Advanced participants finish early and want more depth | MEDIUM |
| **Cheatsheet** | Single-page API syntax, common patterns, keyboard shortcuts | Always open in second tab during coding | HIGH |
| **Shared Utilities** | Reusable helper functions (API calls, canvas setup, etc.) | Pre-written to save time on boilerplate | HIGH |

**Key Pattern:** Starter templates should be 60-70% complete. Too empty = beginners overwhelmed. Too full = boredom and no learning. The "goldilocks zone" has structure, imports, and UI in place, but core logic is TODO comments.

**Source:** [Code scaffolding best practices](https://medium.com/nontechcompany/the-laypersons-guide-to-code-scaffolding-750aa299e904)

## Component Boundaries

### 1. Central Hub (README.md)

**Responsibility:** Navigation, context, and decision support

**Must include:**
- Workshop timeline with timestamps (13:00-15:00, etc.)
- Visual diagram of project options with screenshots
- "Which project should I choose?" decision tree
- Links to all materials organized by when they're used
- Prerequisites/setup (even if zero-setup, confirm browser compatibility)

**Anti-pattern:** Don't make participants hunt for materials. The README is their map.

**Source:** [SessionLab workshop planning guide](https://www.sessionlab.com/blog/planning-a-workshop/)

### 2. Foundations Modules (Sequential)

**Responsibility:** Build shared mental models and setup for Part 2

**Structure per module:**
```markdown
## Module: Structured Outputs with Gemini

**Time:** 20 minutes
**Outcome:** Generate type-safe JSON from natural language prompts

### What You'll Build
[Screenshot of final result]

### Steps
1. Open AI Studio at [link]
2. Configure response schema...
3. Test with example prompt...

### Starter Code
📂 `foundations/02-structured-outputs/starter/`

### Reference Solution
📂 `foundations/02-structured-outputs/reference/`

### Common Issues
- "Schema validation failed" → Check your JSON syntax
- "Model returns null" → Temperature too high, lower to 0.2
```

**Key Pattern:** Each module has clear time budget, visual outcome, and troubleshooting section. Participants should self-rescue before asking for help.

**Source:** [Creative Coding workshop structures](https://www.code-art.com/cc101/) and [Happy Coding semester guide](https://happycoding.io/teaching/guides/semester)

### 3. Choose Your Path Hub

**Responsibility:** Help participants select project that matches interest + skill level

**Must include:**

```markdown
# Choose Your Path

You have **90 minutes** to build and deploy one of these projects. All use the same core concepts (Gemini API, MediaPipe, Canvas rendering), but with different creative outputs.

## Decision Matrix

| If you like... | Choose | Difficulty | Tech Focus |
|----------------|--------|------------|-----------|
| Abstract art, emotion visualization | Face Reactive | ⭐⭐ Moderate | MediaPipe Face Mesh, particle systems |
| Interactive installations, motion control | Gesture Controlled | ⭐⭐⭐ Challenging | MediaPipe Hands, Three.js |
| Game mechanics, competitive play | Camera Game | ⭐⭐ Moderate | Face Detection, game loops, multiplayer |

**Note for Advanced Learners:** All projects have extension challenges. If you finish early, try the "Extensions" folder.

**Note for Beginners:** All projects have working starter code. Focus on understanding the core loop, not perfection.

## Learning Outcomes (Same for All Paths)

By the end, you will:
- ✅ Integrate a browser-based ML model (MediaPipe)
- ✅ Send data to Gemini for creative AI responses
- ✅ Render visual output (Canvas or Three.js)
- ✅ Deploy a shareable web app to Firebase
```

**Key Pattern:** Emphasize that **all paths achieve the same learning outcomes** but with different creative expressions. This prevents FOMO and lets participants choose based on genuine interest.

**Source:** [Choose Your Own Adventure educational model](https://catlintucker.com/2020/10/choose-your-own-adventure/) and [tiered workshop activities](https://hogonext.com/how-to-develop-workshops-for-different-skill-levels/)

### 4. Project Branches (Parallel)

**Responsibility:** Independent, self-contained projects with starter → reference → extensions progression

**Structure per project:**

```
face-reactive/
├── README.md                 # Project-specific guide
├── starter/
│   ├── index.html           # Complete UI, empty <script>
│   ├── styles.css           # Fully styled
│   └── app.js               # Scaffolded with TODO comments
├── reference/
│   ├── index.html
│   ├── styles.css
│   └── app.js               # Fully implemented
└── extensions/
    ├── 01-particle-trails.md
    ├── 02-emotion-history.md
    └── 03-multiplayer-sync.md
```

**Starter Code Pattern:**

```javascript
// app.js (starter version)
import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { generateContent } from './shared/gemini-api.js';

// Configuration (pre-filled for them)
const API_KEY = 'YOUR_API_KEY_HERE';
const MODEL = 'gemini-2.0-flash';

// TODO 1: Initialize MediaPipe Face Landmarker
// Hint: Use FaceLandmarker.createFromOptions()
// Reference: See CHEATSHEET.md section "MediaPipe Setup"

async function setupFaceDetection() {
  // YOUR CODE HERE
}

// TODO 2: Capture video frame and detect face
// Hint: Use faceLandmarker.detectForVideo()

function detectFace(videoElement) {
  // YOUR CODE HERE
}

// TODO 3: Send face landmarks to Gemini for emotion interpretation
// Hint: Use the generateContent helper with a structured schema

async function interpretEmotion(landmarks) {
  // YOUR CODE HERE
}

// TODO 4: Render particles based on emotion
// Canvas context already set up below ↓

function renderParticles(emotion, intensity) {
  // YOUR CODE HERE
}

// ✅ Already implemented for you: Video stream setup
setupVideoStream();
```

**Anti-pattern:** Don't leave beginners guessing. Each TODO should have:
1. What to implement
2. Which function/API to use
3. Where to find documentation (cheatsheet section)

**Source:** [Code scaffolding for educational contexts](https://dl.acm.org/doi/10.1145/3677619.3677634)

### 5. Extensions (Optional Depth)

**Responsibility:** Challenge advanced participants without blocking beginners

**Structure:**

```markdown
# Extension 01: Particle Trails

**Difficulty:** ⭐⭐⭐ Advanced
**Time:** +15 minutes
**Requires:** Completed base project

## What You'll Add
Instead of particles disappearing, they leave trails that fade over time, creating flowing organic patterns.

## Implementation Hints
1. Store particle history in a buffer
2. Render with decreasing opacity
3. Use `globalCompositeOperation = 'lighter'` for glow effect

## Stretch Goal
Make trail length responsive to emotion intensity.

## Reference
See `extensions/reference/01-particle-trails.js`
```

**Key Pattern:** Extensions are self-contained markdown files, not code you need to integrate. This prevents advanced participants from breaking their working project while exploring.

**Source:** [Codecademy p5.js progressive learning structure](https://www.codecademy.com/learn/learn-p5js)

## Data Flow Architecture

### Workshop Progression Flow

```
Participant arrives
    ↓
Opens README (central hub)
    ↓
Follows Part 1: Foundations (linear sequence)
    ├→ Module 01: AI Studio exploration
    ├→ Module 02: Structured outputs
    └→ Module 03: Vibe-code logic engine
    ↓
Coffee break ☕
    ↓
Opens Choose Your Path hub
    ↓
Reads decision matrix → selects project
    ↓
Opens project-specific README
    ↓
Clones starter code to Firebase Studio
    ↓
Codes along, referencing:
    ├→ CHEATSHEET.md (always open)
    ├→ Reference implementation (when stuck)
    └→ Extensions (if finished early)
    ↓
Deploys to Firebase → shares URL
```

### Technical Data Flow (Example: Face Reactive Project)

```
Browser webcam stream
    ↓
MediaPipe Face Landmarker (client-side)
    ↓
Face landmarks (468 3D points)
    ↓
Gemini API call with structured output schema
    ↓
JSON response: { emotion: "joy", intensity: 0.8, color: "#FFD700" }
    ↓
Canvas rendering engine
    ↓
Visual output (particles, colors, animations)
    ↓
Firebase hosting → shareable URL
```

**Key Architectural Decision:** All ML inference happens client-side (MediaPipe in browser). Gemini is only for creative interpretation, not computer vision. This keeps it fast and free of backend complexity.

**Source:** [MediaPipe Web solutions](https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/web_js) and [Firebase Studio browser-based architecture](https://firebase.google.com/docs/studio)

## Patterns to Follow

### Pattern 1: Progressive Disclosure

**What:** Reveal complexity gradually. Part 1 builds shared foundation. Part 2 adds creative divergence.

**When:** Workshops with mixed skill levels and limited time.

**Why it works:** Beginners aren't overwhelmed by options at the start. Advanced learners get depth in Part 2 through extensions.

**Example:**
```
Hour 1: Everyone learns Gemini structured outputs (same activity)
Hour 2: Apply to different creative contexts (choose your path)
```

**Source:** [Google Gemini Cookbook tiered approach](https://github.com/google-gemini/cookbook) - "Foundation → Features → Demos"

### Pattern 2: Identical Outcomes, Different Expressions

**What:** All project branches achieve the same learning objectives but produce different creative outputs.

**When:** "Choose your own path" sections where you can't afford to teach three completely different tech stacks.

**Why it works:** Participants choose based on creative interest, not fear of missing out on better learning. All paths use MediaPipe + Gemini + Canvas, just applied differently.

**Example:**
```
All paths teach:
✅ Browser-based ML model integration
✅ Gemini API structured outputs
✅ Real-time rendering
✅ Firebase deployment

But create different things:
🎨 Face Reactive → Emotion visualization
🖐️ Gesture Controlled → Motion-controlled art
🎮 Camera Game → QR + selfie multiplayer
```

**Source:** [Choose Your Own Adventure learning pathways](https://catlintucker.com/2020/10/choose-your-own-adventure/)

### Pattern 3: Starter as Reference Minus Implementation

**What:** Generate starter code by taking reference implementation and replacing core logic with TODO comments. Don't write starter and reference separately—they drift.

**When:** Creating scaffolded templates for live coding workshops.

**Why it works:** Guarantees starter code structure actually works. No mismatched function signatures or missing imports.

**Example workflow:**
```bash
# 1. Build complete reference implementation
# 2. Copy to starter/ directory
# 3. Replace function bodies with TODO comments
# 4. Add hints pointing to cheatsheet sections
```

**Anti-pattern:** Writing starter code from scratch leads to subtle bugs (missing imports, wrong function names) that derail workshops.

**Source:** [Code scaffolding workflow patterns](https://medium.com/slalom-build/stop-waiting-for-developers-utilize-code-scaffolding-and-get-ahead-e7c6015ae655)

### Pattern 4: Cheatsheet as Second Tab

**What:** Single-page reference document participants keep open in adjacent browser tab during entire workshop.

**When:** Workshop introduces new APIs/tools participants haven't memorized.

**Why it works:** Reduces cognitive load. Participants don't need to remember syntax; they just need to know where to look.

**Structure:**
```markdown
# Workshop Cheatsheet

## Quick Links
- AI Studio: https://aistudio.google.com
- Firebase Studio: https://firebase.studio
- MediaPipe Docs: https://ai.google.dev/edge/mediapipe

## Gemini Structured Output (Copy-Paste Ready)
```javascript
const result = await model.generateContent({
  contents: [{ role: 'user', parts: [{ text: 'Analyze this...' }] }],
  generationConfig: {
    temperature: 0.2,
    responseMimeType: 'application/json',
    responseSchema: { /* your schema */ }
  }
});
```

## MediaPipe Face Landmarker Setup
[Code snippet...]

## Canvas Particle System
[Code snippet...]

## Common Errors
[Troubleshooting...]
```

**Key:** Code snippets are copy-paste ready, not pseudocode. Participants modify values, not rewrite from memory.

**Source:** [Technical workshop best practices](https://dev.to/rossellafer/planning-your-first-technical-workshop-2iig) and [cheatsheet collections](https://quickref.me/)

### Pattern 5: Extensions as Markdown, Not Starter Code

**What:** Advanced features documented as challenges with hints, not pre-scaffolded code.

**When:** Advanced participants finish base project early.

**Why it works:** Prevents breaking working code. Participants read markdown, implement themselves, learn through problem-solving.

**Example:**
```markdown
❌ BAD: extensions/01-particle-trails/starter/app.js
✅ GOOD: extensions/01-particle-trails.md with implementation hints
```

**Source:** [Tiered workshop activities](https://hogonext.com/how-to-develop-workshops-for-different-skill-levels/)

## Anti-Patterns to Avoid

### Anti-Pattern 1: Branching Too Early

**What goes wrong:** Offering "choose your path" before shared foundation → participants pick different tools → can't help each other, instructor juggles three workshops.

**Why it happens:** Desire to let participants "follow their passion" from the start.

**Consequences:** No shared vocabulary. Debugging becomes 1:1 consulting, not group problem-solving.

**Prevention:** Part 1 (60% of workshop) = everyone together. Part 2 (40%) = branching with shared tech stack.

**Detection:** If you can't demo a solution to the whole room because half the participants chose a different path, you branched too early.

**Source:** Observed anti-pattern from workshop literature review

### Anti-Pattern 2: Reference Code Without Inline Comments

**What goes wrong:** Reference implementations that work perfectly but don't explain *why*. Participants copy-paste without learning.

**Why it happens:** Developers write production-quality code for workshops, forgetting it's educational material.

**Consequences:** Participants have working projects but can't modify or debug them.

**Prevention:** Reference code should be MORE commented than production code, not less. Every non-obvious line needs a "why this matters" comment.

**Example:**
```javascript
// ❌ BAD (works but doesn't teach)
particles.forEach(p => p.update());

// ✅ GOOD (explains the pattern)
// Update each particle's position based on emotion intensity
// Higher intensity = faster movement, creating more energetic visuals
particles.forEach(particle => particle.update(emotionIntensity));
```

**Source:** [Creative coding pedagogy](https://wonderfulidea.co/blog/2019/5/6/creative-coding-pd-crafting-computational-identities)

### Anti-Pattern 3: "Figure It Out" Extensions

**What goes wrong:** Extensions that say "Add multiplayer support" without hints on WebSockets, state sync, or conflict resolution.

**Why it happens:** Assumption that advanced = can Google everything themselves.

**Consequences:** Advanced participants spend 45 minutes researching Firebase Realtime Database docs instead of 15 minutes implementing a clever feature.

**Prevention:** Extensions should narrow the search space. Point to specific APIs, libraries, or docs sections.

**Example:**
```markdown
❌ BAD: "Add multiplayer support"

✅ GOOD:
# Extension: Multiplayer Emotion Sync

Use Firebase Realtime Database to sync emotion states across browsers.

**Implementation Path:**
1. Initialize Firebase: `firebase.database().ref('emotions/')`
2. On emotion detection, write: `ref.set({ emotion, intensity, timestamp })`
3. Listen for changes: `ref.on('value', snapshot => { ... })`
4. Render other players' emotions as ghost particles

**Docs:** [Firebase Realtime Database Web Guide](https://firebase.google.com/docs/database/web/start)
```

**Source:** [Workshop preparation best practices](https://www.smashingmagazine.com/2023/03/organizing-design-workshops-checklist/)

### Anti-Pattern 4: One Repository Per Branch

**What goes wrong:** Separate repos for face-reactive, gesture-controlled, camera-game → participants clone wrong one, instructor shares six different links.

**Why it happens:** GitHub's mental model encourages separate repos for separate projects.

**Consequences:** Fragmented materials, broken links, "which repo was I supposed to clone?" confusion.

**Prevention:** Monorepo with clear directory structure. One URL to clone, navigation via README.

**Structure:**
```
✅ GOOD:
workshop-repo/
├── foundations/
└── choose-your-path/
    ├── face-reactive/
    ├── gesture-controlled/
    └── camera-game/

❌ BAD:
face-reactive-workshop/
gesture-workshop/
camera-game-workshop/
```

**Source:** [Google Gemini workshops monorepo pattern](https://github.com/google-gemini/workshops)

### Anti-Pattern 5: PDF Slide Decks

**What goes wrong:** Static slides that participants can't search, copy code from, or access on mobile.

**Why it happens:** PowerPoint/Keynote is the default presentation tool.

**Consequences:** Participants photograph code snippets, introducing typos. Can't CMD+F to find "that slide about structured outputs."

**Prevention:** Markdown slides (RevealJS, Quarto) published to GitHub Pages. Searchable, linkable, code is copy-paste ready.

**Example:**
```markdown
✅ GOOD: slides/ folder with .md files → GitHub Pages
❌ BAD: workshop-slides.pdf in Google Drive
```

**Source:** [Workshop template with RevealJS slides](https://github.com/sagikazarmark/workshop-template)

## Scalability Considerations

### At 10 Participants (Small Workshop)

**Approach:** Instructor can provide 1:1 debugging help. Less emphasis on self-service materials.

**Material needs:**
- Starter code with TODOs
- Verbal explanation > written docs
- Live-code everything, participants follow along

### At 40 Participants (Medium Workshop — Your Context)

**Approach:** Impossible to debug 40 browsers individually. Materials must enable self-rescue.

**Material needs:**
- ✅ Comprehensive README navigation
- ✅ Cheatsheet always open
- ✅ "Common Issues" section in each module
- ✅ Reference implementation accessible when stuck
- ✅ Clear visual outcomes so participants self-verify
- ✅ Async help channel (Discord/Slack) for non-blocking questions

**Key pattern:** When you can't reach every participant, your materials become the primary teacher.

**Source:** [AAAI workshop guidelines](https://aaai.org/conference/aaai/aaai-26/workshops-call/) recommend 25-65 participants with "ample time for general discussion"

### At 100+ Participants (Massive Workshop)

**Approach:** Materials-first, instructor is live narrator. Teaching assistants cover breakout rooms.

**Material needs:**
- All of 40-person needs +
- ✅ Video recordings of Part 1 (for catch-up)
- ✅ Automated environment setup (avoid "works on my machine")
- ✅ Pre-built Firebase projects (fork instead of code from scratch)
- ✅ Community moderation (Discord channels per project branch)

## Suggested Preparation Order

Based on your 3.5-hour workshop timeline (Jan 28, 2026), build materials in this order:

### 4 Weeks Before: Core Architecture

**What to build:**
1. Repository structure (monorepo with foundations/ and choose-your-path/)
2. Reference implementations for ALL projects (face-reactive, gesture-controlled, camera-game)
3. Cheatsheet (draft version)

**Why this order:** Reference code informs everything else. Build it first, test it thoroughly. If gesture detection doesn't work reliably in Firefox, you'll know now, not during the workshop.

**Confidence checkpoint:** Can you demo all three project branches live, right now?

### 3 Weeks Before: Scaffolding

**What to build:**
1. Starter templates (copy reference, replace logic with TODOs)
2. Module READMEs for Part 1 (foundations/)
3. Choose Your Path hub with decision matrix

**Why this order:** You can't write good TODOs until reference code is solid. Test that starter → reference path actually works.

**Confidence checkpoint:** Can a colleague complete a project using ONLY starter code + cheatsheet, without asking you questions?

### 2 Weeks Before: Extensions & Polish

**What to build:**
1. Extension challenges (3 per project branch)
2. Finalize cheatsheet
3. Slide deck (markdown)
4. Troubleshooting sections

**Why this order:** Extensions are lowest priority. If time runs short, skip them. Core workshop works without extensions.

**Confidence checkpoint:** Run a dry-run with 2-3 people. Where did they get stuck? Update materials.

### 1 Week Before: Logistics

**What to build:**
1. Firebase Studio template projects (pre-configured, ready to fork)
2. API keys & quotas (ensure Google-sponsored access works)
3. Backup plans (offline copies of critical dependencies)
4. GitHub Pages deployment of slides + README

**Why this order:** Technical setup failures kill workshops. Test everything with fresh browser profiles.

**Confidence checkpoint:** Can participants access materials with zero setup? Try on mobile browser.

### Day Before: Final Checks

**Checklist:**
- [ ] All links in README work (no 404s)
- [ ] Code snippets in cheatsheet copy-paste without errors
- [ ] Slides render correctly on projector resolution
- [ ] Firebase Studio projects load without login issues
- [ ] Reference implementations deploy successfully
- [ ] "In case of fire" contingency plan documented

**Source:** [Workshop preparation checklist](https://www.smashingmagazine.com/2023/03/organizing-design-workshops-checklist/)

## How "Choose Your Path" Branching Works in Practice

### Pre-Workshop Setup

**Instructor preparation:**
- Build all three project branches fully (reference implementations)
- Test that each branch takes ~60-75 minutes for average participant
- Verify all branches use same dependencies (MediaPipe, Gemini API, Firebase)
- Create visual "menu" in Choose Your Path README with screenshots

### During Workshop (Part 2 Transition)

**Timing: 15:00 (end of Part 1) → 15:30 (start of Part 2)**

**Instructor script:**
```
"You've built the foundation—Gemini structured outputs, API calls,
basic rendering. Now you'll apply these to a creative project.

Open the 'choose-your-path' folder in your repo. You'll see three options:
[show screenshots on projector]

All three teach the same concepts—MediaPipe for browser ML, Gemini for
creative AI, Canvas for visuals. They just express it differently.

Face Reactive is good if you like abstract art and emotion visualization.
Gesture Controlled is more challenging—3D graphics with Three.js.
Camera Game is the most game-like—competitive multiplayer.

You have 5 minutes to browse the READMEs and pick one. Choose based on
what sounds fun, not what sounds easiest. You have reference code if you
get stuck.

Advanced folks: If you finish early, check the 'extensions' folder in your
chosen project.

Go!"
```

### Participant Experience

**Choosing (5 minutes):**
1. Opens `choose-your-path/README.md`
2. Reads decision matrix
3. Clicks into project folder (e.g., `face-reactive/`)
4. Scans project README
5. Decides

**Building (60 minutes):**
1. Opens starter code in Firebase Studio
2. Follows project README steps
3. Codes core logic (TODO 1, 2, 3, 4...)
4. References cheatsheet when stuck on syntax
5. Peeks at reference implementation when stuck on logic
6. Tests incrementally (doesn't wait until the end)

**Deploying (15 minutes):**
1. One-click deploy from Firebase Studio
2. Gets shareable URL
3. Tests on phone
4. (Optional) Shares in group chat

**Extending (if time):**
1. Opens `extensions/` folder
2. Reads extension 01 markdown
3. Implements challenge
4. Repeats

### Instructor During Branching

**Challenge:** 40 participants split across three projects. You can't live-code all three simultaneously.

**Solution: Roaming + Projection Pattern**

**First 20 minutes:**
- Project reference implementations on projector, rotating every 5 minutes
- Roam the room, glance at screens, identify common blockers
- If 3+ people stuck on same thing → address to whole room

**Middle 20 minutes:**
- Shift to "office hours" mode
- Participants raise hands for 1:1 debugging
- Most issues self-resolve via reference code by now

**Final 20 minutes:**
- Deployment support (Firebase-specific issues)
- Encourage early finishers to help neighbors
- Tease extensions for advanced folks

**Fallback:** If one branch is clearly more popular (30+ people), treat it as the "main path" and give that branch more attention. Other branches self-serve via materials.

### Post-Workshop

**Sharing:**
- Create shared doc where participants paste deployed URLs
- Optional: Gallery view of all projects (screenshot + link)
- Highlight interesting variations

**Source:** [Workshop facilitation patterns](https://ctb.ku.edu/en/table-of-contents/structure/training-and-technical-assistance/workshops/main) and observed best practices

## Firebase Studio Specific Patterns

### Why Firebase Studio is Ideal for This Workshop

**Zero setup:** No Node.js, no npm install, no "works on my machine" debugging.
**Vibe coding:** Participants can modify with natural language prompts, then see the code changes.
**One-click deploy:** From browser IDE to shareable URL in <30 seconds.
**Free tier:** No credit card required during workshop.

**Source:** [Firebase Studio browser-based development](https://firebase.google.com/docs/studio) and [Medium article on no-setup workshops](https://medium.com/@proflead/how-i-built-a-web-app-in-my-browser-with-firebase-studio-no-setup-needed-42c29fe98d79)

### Material Structure for Firebase Studio

**Approach:** Provide Firebase Studio project templates participants can fork.

**Workflow:**
1. **Pre-workshop:** Instructor creates three Firebase Studio projects (one per branch)
2. **During workshop:** Participants visit project link → "Fork this project" → instant copy
3. **Benefit:** Dependencies pre-installed, folder structure in place, no package.json debugging

**Example links:**
```
Face Reactive: https://firebase.studio/project/face-reactive-starter
Gesture Controlled: https://firebase.studio/project/gesture-starter
Camera Game: https://firebase.studio/project/camera-game-starter
```

**Anti-pattern:** Don't make participants manually create Firebase projects and copy-paste files. Forking is faster and eliminates setup errors.

### Vibe Coding Integration

**Use case:** Participants want to tweak visuals but aren't confident with Canvas API.

**Pattern:**
```
Participant: "Make the particles bigger and add a glow effect"
Firebase Studio AI: [Modifies particle rendering code]
Participant: Reviews diff → Accepts or modifies
```

**When to encourage:** After core logic works. Vibe coding for polish, not for learning fundamentals.

**When to discourage:** Part 1 foundations. Participants should write Gemini API calls manually to understand structured outputs.

## Quality Checklist for Your Materials

Before Jan 28, verify:

### Structure
- [ ] Clear mono-repo structure (foundations/ and choose-your-path/)
- [ ] Central README with visual navigation
- [ ] Each module/project has standalone README
- [ ] Cheatsheet fits on one page (or one continuous scroll)

### Starter Code
- [ ] 60-70% complete (structure in place, core logic is TODOs)
- [ ] TODO comments include hints and cheatsheet references
- [ ] All imports present and correct
- [ ] Runs without errors even before TODOs are filled

### Reference Code
- [ ] Works perfectly (tested in multiple browsers)
- [ ] Heavily commented (educational, not production style)
- [ ] Matches starter code structure exactly
- [ ] Deploy-ready (no environment variables missing)

### Choose Your Path
- [ ] All branches take similar time (~60-75 minutes)
- [ ] All branches achieve same learning outcomes
- [ ] Decision matrix helps participants choose based on interest
- [ ] Screenshots show expected visual outcomes
- [ ] Extensions available for early finishers

### Mixed Skill Levels
- [ ] Beginners can complete base project with reference code
- [ ] Advanced learners have extensions to explore
- [ ] Cheatsheet reduces memorization burden for newcomers
- [ ] Common issues section prevents repeated questions

### Zero Setup
- [ ] Everything accessible via browser
- [ ] Firebase Studio projects forkable
- [ ] No API keys to configure (Google-sponsored access)
- [ ] Works on macOS, Windows, Linux, ChromeOS

### Practical for 3.5 Hours
- [ ] Part 1 fits in 2 hours (tested with dry run)
- [ ] Part 2 projects completable in 60 minutes (tested)
- [ ] Buffer time for Q&A, debugging, coffee break
- [ ] Deploy step < 5 minutes per participant

## Sources

### High Confidence (Official Docs & Verified Resources)

- [Firebase Studio Documentation](https://firebase.google.com/docs/studio)
- [Google Gemini Workshops Repository](https://github.com/google-gemini/workshops)
- [Google Gemini Cookbook](https://github.com/google-gemini/cookbook)
- [Gemini Structured Outputs Guide](https://ai.google.dev/gemini-api/docs/structured-output)
- [MediaPipe Gesture Recognition Web Guide](https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/web_js)
- [GitHub Template Repository Guide](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)

### Medium Confidence (Educational Best Practices)

- [Choose Your Own Adventure Learning Model](https://catlintucker.com/2020/10/choose-your-own-adventure/)
- [Workshop Template Structure](https://github.com/sagikazarmark/workshop-template)
- [Happy Coding Semester Guide (p5.js)](https://happycoding.io/teaching/guides/semester)
- [Codecademy p5.js Learning Path](https://www.codecademy.com/learn/learn-p5js)
- [Technical Workshop Planning Guide](https://dev.to/rossellafer/planning-your-first-technical-workshop-2iig)
- [Organizing Design Workshops Checklist](https://www.smashingmagazine.com/2023/03/organizing-design-workshops-checklist/)
- [Code Scaffolding Best Practices](https://medium.com/nontechcompany/the-laypersons-guide-to-code-scaffolding-750aa299e904)

### Low Confidence (Community Insights, Needs Validation)

- [Tiered Workshop Activities](https://hogonext.com/how-to-develop-workshops-for-different-skill-levels/)
- Workshop duration recommendations from [Symonds Research](https://symondsresearch.com/workshop-structure-plan-length/)
- Extension patterns observed across creative coding workshops

## Open Questions

Areas where research was inconclusive or needs phase-specific investigation:

1. **Optimal TODO granularity:** How many TODOs per module before it becomes overwhelming? Testing needed with actual participants.

2. **Firebase Studio fork limits:** Can 40 people simultaneously fork projects during workshop without hitting rate limits? Needs load testing.

3. **MediaPipe performance at scale:** Does Face Mesh work reliably on low-end laptops in a room with poor lighting? Needs venue testing.

4. **Extension completion rates:** What % of participants actually attempt extensions? Informs how much effort to invest in creating them.

5. **Branch distribution:** Will participants split evenly across three paths, or will one dominate? Affects instructor attention strategy.

These should be validated during dry-run and refined based on actual workshop data.

---

**Overall Confidence: MEDIUM**

**Why Medium:**
- ✅ HIGH confidence in Firebase Studio zero-setup approach (official docs)
- ✅ HIGH confidence in monorepo structure (Google workshops pattern)
- ✅ HIGH confidence in starter/reference/extensions pattern (educational best practices)
- ⚠️ MEDIUM confidence in 3.5-hour timing (needs dry-run validation)
- ⚠️ MEDIUM confidence in branch difficulty parity (needs testing with real participants)
- ⚠️ LOW confidence in optimal TODO granularity (no authoritative source found, needs experimentation)

**Recommendation:** Proceed with proposed architecture. Plan dry-run 2 weeks before workshop to validate timing and identify friction points.
