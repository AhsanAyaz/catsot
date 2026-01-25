# Architecture Decision Guide

## Introduction

Building a custom project means making architectural decisions. This guide helps you choose the right tools and patterns for YOUR idea.

**Time constraint:** You have 60-75 minutes. Make decisions quickly, execute confidently.

## Decision Matrix

Use this table to make quick architectural decisions:

| Your Project Needs... | Choose | Why | Helper Module |
|----------------------|--------|-----|---------------|
| 2D particles, shapes, drawings | Canvas 2D | Simpler API, better for 2D | `rendering.js` setupCanvas() |
| 3D objects, lighting, perspective | Three.js | WebGL power, 3D scene management | `rendering.js` setupThreeJS() |
| Face tracking, expressions | MediaPipe | 478 landmarks + 52 blendshapes | Research Pattern 1 |
| QR code scanning | html5-qrcode | Cross-platform camera handling | Research Pattern 4 |
| Multiplayer sync | Firebase Realtime DB | WebSocket-based live updates | `firebase.js` + emulator |
| Solo experience | Local state | No network complexity | Just JavaScript variables |
| Camera input | getUserMedia | Standard browser API | `camera.js` setupCamera() |
| Keyboard/mouse only | Event listeners | No camera needed | Standard DOM events |

## Key Decisions

### 1. Canvas 2D vs Three.js

**Choose Canvas 2D if:**
- Building 2D particle systems
- Drawing shapes, text, images
- Simple animations
- Comfort with immediate-mode rendering
- Example: Emotion-driven particle visualization

**Choose Three.js if:**
- Building 3D scenes
- Need lighting, shadows, materials
- Want perspective camera
- Comfort with scene graph
- Example: 3D floating objects controlled by gestures

**Time impact:**
- Canvas 2D: ~5 min setup, focus on logic
- Three.js: ~15 min setup (scene, camera, renderer), more complex logic

**Code comparison:**

Canvas 2D:
```javascript
const { canvas, ctx } = setupCanvas();
ctx.fillStyle = 'blue';
ctx.fillRect(100, 100, 50, 50);
```

Three.js:
```javascript
const { scene, camera, renderer } = setupThreeJS();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

### 2. Firebase vs Local State

**Choose Firebase if:**
- Multiple players interacting
- Need real-time sync across devices
- Want presence detection (who's online)
- Example: Collaborative drawing, multiplayer game

**Choose Local State if:**
- Solo experience
- No need for persistence
- Avoiding network complexity
- Example: Personal emotion visualizer

**Time impact:**
- Firebase: ~10 min setup (emulator, connection, listeners)
- Local state: ~2 min setup (just variables)

**Code comparison:**

Firebase:
```javascript
const db = await initFirebase();
await writeData('users/abc/score', 100);
listenToData('users/abc/score', (score) => {
  console.log('Score updated:', score);
});
```

Local state:
```javascript
let score = 100;
function updateScore(newScore) {
  score = newScore;
  console.log('Score updated:', score);
}
```

### 3. MediaPipe vs QR Codes vs Other Input

**Choose MediaPipe if:**
- Facial expressions drive interaction
- Hand gestures control elements
- Pose detection needed
- Example: Face-reactive visuals, gesture-controlled camera

**Choose QR Codes if:**
- Session creation/joining
- Physical object interaction
- Multiplayer matchmaking
- Example: Scan to join game, scan objects for effects

**Choose Other Input if:**
- Keyboard/mouse sufficient
- Voice input (Web Speech API)
- Device motion (accelerometer)
- Example: Typing game, voice-controlled, tilt-to-move

**Time impact:**
- MediaPipe: ~20 min (initialization, processing loop, mapping)
- QR Codes: ~10 min (scanner setup, session handling)
- Keyboard/mouse: ~5 min (event listeners)

## Decision Workflow

Follow this workflow to make decisions quickly:

```
START
  ↓
[Do you need multiplayer?]
  ├─ YES → Use Firebase (firebase.js)
  └─ NO → Use local state
  ↓
[Do you need camera input?]
  ├─ YES → Do you need face/hand detection?
  │         ├─ YES → Use MediaPipe
  │         └─ NO → QR codes? (html5-qrcode) or just video? (camera.js)
  └─ NO → Use keyboard/mouse events
  ↓
[Do you need 3D graphics?]
  ├─ YES → Use Three.js (rendering.js setupThreeJS)
  └─ NO → Use Canvas 2D (rendering.js setupCanvas)
  ↓
BUILD!
```

## Common Patterns

### Pattern: Face-Reactive Solo Experience
- **Stack:** MediaPipe + Canvas 2D
- **Time:** ~45 min implementation
- **Structure:** Face detection → emotion mapping → visual update
- **Example:** Particles change color/speed based on expressions

### Pattern: Multiplayer QR Game
- **Stack:** html5-qrcode + Firebase + Canvas 2D
- **Time:** ~50 min implementation
- **Structure:** QR scan → join session → sync state → render game
- **Example:** Speed clicker with live scoreboard

### Pattern: 3D Gesture Control
- **Stack:** MediaPipe Hand Landmarker + Three.js
- **Time:** ~60 min implementation
- **Structure:** Hand tracking → gesture recognition → 3D object manipulation
- **Example:** Rotate/scale 3D object with hand gestures

### Pattern: Voice-Controlled Visualization
- **Stack:** Web Speech API + Canvas 2D
- **Time:** ~40 min implementation
- **Structure:** Speech recognition → command parsing → visual effect
- **Example:** Say emotions, see visual changes

## Anti-Patterns to Avoid

### ❌ Using Everything
Don't import all helpers "just in case". Choose what you NEED.

**Bad:**
```javascript
import { setupCamera } from './camera.js';
import { initFirebase } from './firebase.js';
import { setupCanvas, setupThreeJS } from './rendering.js';
// Using none of these effectively
```

**Good:**
```javascript
import { setupCanvas } from './rendering.js';
// Focused on Canvas 2D visualization
```

### ❌ Overscoping
Don't try to build multiplayer + 3D + AI in 75 minutes.

**Bad:** "I'll make a multiplayer 3D game where AI generates levels based on facial expressions"

**Good:** "I'll make a 3D object that rotates based on detected facial expressions"

### ❌ Premature Optimization
Don't spend 30 minutes on object pooling before you have working visuals.

**Bad:** "Let me optimize particle allocation first..."

**Good:** "Let me get particles rendering first, optimize if needed"

## Time Budget Guidance

Break your 60-75 minutes like this:

- **0-10 min:** Decision making (use this guide)
- **10-20 min:** Infrastructure setup (camera, rendering, Firebase)
- **20-50 min:** Core feature implementation
- **50-60 min:** Testing and polish
- **60-75 min:** Extensions or bug fixes

**Checkpoint at 30 min:** Do you have SOMETHING working? (even if basic)
- ✅ YES → Continue building
- ❌ NO → Simplify scope NOW

## Getting Unstuck

**Stuck on MediaPipe?**
- Reference: 02-RESEARCH.md Pattern 1 (MediaPipe Face Landmarker)
- Fallback: Use simpler input (keyboard, mouse)

**Stuck on Firebase?**
- Check emulator is running: `firebase emulators:start --only database`
- Reference: 02-RESEARCH.md Pattern 2 (Firebase multiplayer)
- Fallback: Use local state, add Firebase later

**Stuck on Three.js?**
- Reference: 02-RESEARCH.md Pattern 3 (Canvas 2D) for simpler alternative
- Fallback: Switch to Canvas 2D, get it working, upgrade to Three.js if time

**Stuck on concept?**
- See EXAMPLES.md for project ideas
- Simplify: Pick ONE feature, make it work well

## Success Criteria

Your custom project is successful if:
- ✅ It works (no errors in console)
- ✅ It demonstrates ONE core feature well
- ✅ You can explain what it does
- ✅ You learned something new

NOT required:
- ❌ Perfect visuals
- ❌ Production-ready code
- ❌ All features you imagined
- ❌ Impressing others

**Remember:** Working prototype > ambitious failure.
