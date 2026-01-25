---
marp: true
theme: default
paginate: true
class: invert
---

<!--
Speaker Notes:
- Part 2 is choose-your-own-path (1.5 hours)
- Encourage choosing based on interest, not just difficulty
- Remind: extension challenges exist (15-26 per path)
- Goal: working prototype, not polished product
- Deployment is part of time budget
-->

# Part 2: Build Your Project

**Choose Your Creative Path**
15:30 - 17:00 (1.5 hours)

Apply foundations from Part 1 to real projects

---

# Part 2 Structure

**Time Budget:**
- Project setup: 5 minutes
- Core implementation: 35 minutes (2-3 TODOs)
- Polish and testing: 15 minutes
- Deployment to Firebase: 10 minutes
- Extensions (optional): 15+ minutes

**Total: 60-75 minutes** to working, deployed app

**Choose based on:**
- What interests you (not just difficulty)
- What you want to learn
- What you might build after workshop

---

# Three Project Paths

| Path | Focus | Key Tech | Best For |
|------|-------|----------|----------|
| **Face-Reactive** | Emotion-driven visualization | MediaPipe + Canvas | Visual creativity, animation |
| **Camera Game** | Multiplayer QR-based game | Firebase + html5-qrcode | Multiplayer mechanics, real-time sync |
| **Custom Project** | Your own idea | Your choice | Advanced builders, specific goals |

**All paths:**
- Include starter templates (60-70% complete)
- Have clear TODOs with time estimates
- Provide extension challenges for fast finishers
- Deploy to Firebase with public URL

---

# Path 1: Face-Reactive Visualization

**Concept:**
Emotion-driven particle visualization using facial expressions

**Stockholm example:**
Imagine Fotografiska museum installations responding to visitors

**What's provided (60-70% complete):**
✅ Camera setup with permission handling
✅ MediaPipe Face Landmarker initialization
✅ Particle system with object pooling (150 particles)
✅ Render loop with edge wrapping, fade effects

**Your tasks:**
🎯 TODO 1: Implement emotion detection from blendshapes (15 min)
🎯 TODO 2: Update particle visualization based on emotions (20 min)

---

# Face-Reactive: Technical Details

**Tech stack:**
- MediaPipe Face Landmarker (emotion detection)
- Canvas 2D (particle rendering)
- Blendshape mapping (6 emotions: happy, sad, surprised, angry, excited, calm)

**Key concepts from Part 1:**
- Multimodal input (Module 03) — camera video processing
- Logic engine (Module 06) — emotion-to-visual mapping

**Files:**
- Starter: `part2/face-reactive/starter/README.md`
- Reference: `part2/face-reactive/reference/` (complete implementation)
- Extensions: `part2/face-reactive/EXTENSIONS.md` (20 challenges)

**Time estimate:** 35 min core work + 15 min polish

---

# Path 2: Camera-Based Multiplayer Game

**Concept:**
QR code scanning for session joining, multiplayer real-time game

**Stockholm example:**
Swedish gaming culture (King, Mojang) — social, competitive

**What's provided (60-70% complete):**
✅ Firebase Realtime Database setup (local emulator)
✅ QR code scanning with html5-qrcode
✅ Session join/create infrastructure
✅ Real-time score sync

**Your tasks:**
🎯 TODO 1: Implement game logic (rock-paper-scissors) (20 min)
🎯 TODO 2: Add scoring and winner detection (15 min)

---

# Camera Game: Technical Details

**Tech stack:**
- html5-qrcode (QR scanning)
- Firebase Realtime Database (multiplayer sync)
- Camera API (browser permissions)

**Key concepts from Part 1:**
- Structured output (Module 02) — game state format
- Multimodal input (Module 03) — camera access
- Logic engine (Module 06) — game rules

**Files:**
- Starter: `part2/camera-game/starter/README.md`
- Reference: `part2/camera-game/reference/` (speed clicker example)
- Extensions: `part2/camera-game/EXTENSIONS.md` (26 challenges)

**Time estimate:** 35 min core work + 15 min polish

---

# Path 3: Custom Creative Project

**Concept:**
Blank canvas with architecture guidance — build what YOU want

**What's provided:**
✅ Complete helper modules (camera.js, firebase.js, rendering.js)
✅ Architecture decision guide
✅ 15 example project ideas with time estimates
✅ Zero TODOs in template — fully customizable

**Your responsibility:**
- Choose an idea (or create your own)
- Plan implementation
- Build using helpers + Part 1 concepts
- Deploy

**Best for:** Advanced participants with specific goals

---

# Custom Project: Decision Matrix

**Architecture guide helps you choose:**

| Dimension | Options | Considerations |
|-----------|---------|----------------|
| **Interaction** | Solo vs Multiplayer | Multiplayer needs Firebase |
| **Input** | Camera, Text, Both | Camera requires permissions |
| **Output** | 2D Canvas, 3D (Three.js), DOM | Canvas simplest, Three.js more powerful |
| **AI Role** | Generation, Analysis, Logic | Affects which Gemini features to use |

**Files:**
- Template: `part2/custom-project/template/`
- Guide: `part2/custom-project/ARCHITECTURE-GUIDE.md`
- Examples: `part2/custom-project/EXAMPLES.md` (15 ideas, 35-65 min each)

**Time estimate:** 60-75 min (depends on scope)

---

# Decision Matrix: Which Path?

**Choose Face-Reactive if:**
- You enjoy visual creativity and animation
- You want to work with MediaPipe (emotion detection)
- You prefer guided TODOs over blank canvas

**Choose Camera Game if:**
- You're interested in multiplayer mechanics
- You want to learn Firebase real-time sync
- You enjoy game design and competitive experiences

**Choose Custom Project if:**
- You have a specific idea you want to build
- You're comfortable with architectural decisions
- You want maximum creative freedom

**No wrong choice** — all paths teach core concepts

---

# Example Ideas (Custom Project)

**Solo + Creative:**
- Gesture-controlled music visualizer (45 min)
- Emotion-based color palette generator (35 min)
- Hand-pose drawing tool (50 min)

**Multiplayer + Competitive:**
- Reaction time battle (40 min)
- Collaborative drawing canvas (55 min)
- Emoji reaction voting (35 min)

**AI-Driven:**
- Real-time image style transfer (60 min)
- Voice-to-visual mood board (65 min)
- Context-aware notification system (50 min)

**See:** `part2/custom-project/EXAMPLES.md` for full list

---

# Time Budget Breakdown

**All paths follow same structure:**

| Phase | Time | What You're Doing |
|-------|------|-------------------|
| Setup | 5 min | Clone starter, install dependencies, verify camera/Firebase |
| Core Work | 35 min | Complete 2-3 TODOs (or build from scratch for Custom) |
| Testing | 15 min | Try edge cases, fix bugs, polish UX |
| Deployment | 10 min | Deploy to Firebase, get public URL |
| Extensions | 15+ min | (Optional) Explore extension challenges |

**Total: 60-75 minutes** to deployed app

**Timing tip:** Focus on "working" over "perfect" — polish in extensions

---

# Extension Challenges

**After completing core TODOs:**

Each path includes 15-26 extension challenges at multiple difficulty levels

**Face-Reactive:** 20 challenges
- Beginner: Add sound effects based on emotion (10 min)
- Intermediate: Implement emotion history graph (25 min)
- Advanced: Three.js 3D particle system (45+ min)

**Camera Game:** 26 challenges
- Beginner: Add countdown timer (15 min)
- Intermediate: Implement best-of-3 rounds (20 min)
- Advanced: Add AI opponent using Gemini (45+ min)

**Custom Project:** Depends on your implementation

---

# Deployment to Firebase

**All projects deploy to Firebase:**

1. Initialize Firebase project (web UI or CLI)
2. Configure hosting (`firebase.json`)
3. Deploy: `firebase deploy --only hosting`
4. Get public URL: `your-project.web.app`

**Result:**
- Shareable link
- Works on mobile
- No server management

**Time:** ~10 minutes (included in 60-75 min budget)

**Note:** Firebase Local Emulator used for development, production deploy optional

---

# Choose Your Path Now

**Decision time:**

1. Review starter templates (5 minutes)
2. Ask questions if unsure
3. Open your chosen path's README.md
4. Start building

**Paths:**
- Face-Reactive: `part2/face-reactive/starter/README.md`
- Camera Game: `part2/camera-game/starter/README.md`
- Custom Project: `part2/custom-project/ARCHITECTURE-GUIDE.md`

**Cheatsheet:** Keep `/cheatsheet/cheatsheet.pdf` open for API reference

Let's build.

---

<!--
Speaker Notes - During Part 2:
- Circulate to answer questions
- Check if anyone is stuck (offer hints, not solutions)
- At 16:30, remind participants to start wrapping up for deployment
- At 16:45, encourage deployment to get public URLs
- Identify 3-4 volunteers for showcase demos

Time check:
- 15:30: Start Part 2
- 16:00: Check progress (should be mid-TODO completion)
- 16:30: Remind about deployment
- 16:45: Start wrapping up
- 17:00: Showcase
-->

---

<!-- Next: slides/04-wrap-up.md -->
