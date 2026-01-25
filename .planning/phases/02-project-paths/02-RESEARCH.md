# Phase 2: Project Paths Development - Research

**Researched:** 2026-01-25
**Domain:** Interactive web applications (MediaPipe face detection, Firebase multiplayer, Canvas/Three.js visualization)
**Confidence:** MEDIUM-HIGH

## Summary

Research focused on five key domains for creating three Part 2 project options: (1) MediaPipe face detection with blendshapes for emotion-driven visuals, (2) Firebase Realtime Database for multiplayer camera-based games, (3) Canvas/Three.js visualization patterns, (4) starter template design for 60-75 minute completion, and (5) custom project guidance structure.

The standard approach combines established libraries with minimal setup overhead: MediaPipe Face Landmarker for facial tracking (478 landmarks + 52 ARKit blendshapes), Firebase Realtime Database for real-time state synchronization with presence detection, and either native Canvas 2D or Three.js r182+ for visualization. For QR code scanning, html5-qrcode provides cross-platform camera access without custom implementation.

Starter templates should provide 60-70% complete scaffolding with clear TODO comments, structured functions with missing logic, and working infrastructure (camera access, Firebase connection, rendering loop). The workshop's 60-75 minute timeframe requires pre-configured environments and minimal setup steps.

**Primary recommendation:** Use MediaPipe @mediapipe/tasks-vision for face detection, Firebase Realtime Database with emulator for multiplayer, Three.js r182 or Canvas 2D for visuals, html5-qrcode for QR scanning, and scaffold templates with working infrastructure + strategic TODOs.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @mediapipe/tasks-vision | Latest (CDN or npm) | Face landmark detection with 478 points + 52 blendshapes | Official Google solution, ARKit-compatible, production-ready web support |
| Firebase Realtime Database | v10+ | Real-time multiplayer state sync | WebSocket-based live updates, presence detection via onDisconnect, minimal setup |
| Three.js | r182 (Dec 2024) | 3D visualization and advanced canvas effects | Industry standard, active development, WebGL/WebGPU support |
| html5-qrcode | Latest | QR code scanning via camera | Cross-platform, handles getUserMedia permissions, supports multiple barcode formats |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @react-three/fiber | Latest | React wrapper for Three.js | If using React, provides declarative 3D scene management |
| @react-three/drei | Latest | Three.js helpers and abstractions | Reduces boilerplate for common 3D patterns (cameras, controls, effects) |
| Firebase Local Emulator Suite | Latest | Local Firebase testing | Development/workshop environment without production database access |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Three.js | Canvas 2D API | Canvas 2D is simpler for 2D particle systems, but Three.js offers better performance for complex visuals |
| html5-qrcode | jsQR or instascan | jsQR requires manual camera handling, instascan doesn't support iOS Safari |
| Firebase Realtime DB | Firebase Firestore | Firestore has better querying but Realtime DB is simpler for game state sync |

**Installation:**
```bash
# MediaPipe (CDN recommended for workshops)
# Add to HTML: <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"></script>

# Or via npm
npm install @mediapipe/tasks-vision

# Firebase
npm install firebase

# Three.js
npm install three

# React Three Fiber (optional)
npm install three @react-three/fiber @react-three/drei

# QR Code scanning
npm install html5-qrcode

# Firebase Emulator Suite (for local development)
npm install -g firebase-tools
```

## Architecture Patterns

### Recommended Project Structure
```
project/
├── index.html              # Main entry point
├── src/
│   ├── core/
│   │   ├── camera.js       # getUserMedia setup
│   │   ├── firebase.js     # Database connection & listeners
│   │   └── renderer.js     # Canvas/Three.js rendering loop
│   ├── features/
│   │   ├── faceDetection.js    # MediaPipe Face Landmarker wrapper
│   │   ├── qrScanner.js        # QR code scanning logic
│   │   ├── multiplayer.js      # Player state & presence
│   │   └── visualization.js    # Emotion-driven visual effects
│   └── utils/
│       ├── blendshapeMap.js    # Map 52 blendshapes to emotions
│       └── colorMapping.js     # Emotion to color/visual mapping
└── firebase.json           # Emulator configuration
```

### Pattern 1: MediaPipe Face Detection with Blendshapes
**What:** Initialize MediaPipe Face Landmarker in VIDEO mode, process each frame to extract 478 landmarks and 52 ARKit blendshapes, map blendshapes to simplified emotions (happy, sad, surprised, angry, neutral, relaxed).

**When to use:** Face-reactive experience (PATH-01).

**Example:**
```javascript
// Source: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js
const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);

const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    delegate: "GPU"
  },
  runningMode: "VIDEO",
  numFaces: 1,
  minFaceDetectionConfidence: 0.5,
  outputFaceBlendshapes: true,  // Enable blendshape extraction
  outputFacialTransformationMatrixes: false
});

// Video processing loop
let lastVideoTime = -1;
function detectFaces() {
  const video = document.getElementById("webcam");

  if (video.currentTime !== lastVideoTime) {
    const result = faceLandmarker.detectForVideo(video, performance.now());

    if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
      const blendshapes = result.faceBlendshapes[0].categories;
      // Example blendshape access:
      // blendshapes[0] = { categoryName: "browInnerUp", score: 0.0-1.0 }
      processEmotions(blendshapes);
    }

    lastVideoTime = video.currentTime;
  }

  requestAnimationFrame(detectFaces);
}
```

**52 ARKit Blendshapes Categories:**
MediaPipe outputs ARKit-compatible blendshapes including: browDownLeft, browDownRight, browInnerUp, browOuterUpLeft, browOuterUpRight, cheekPuff, cheekSquintLeft, cheekSquintRight, eyeBlinkLeft, eyeBlinkRight, eyeLookDownLeft, eyeLookDownRight, eyeLookInLeft, eyeLookInRight, eyeLookOutLeft, eyeLookOutRight, eyeLookUpLeft, eyeLookUpRight, eyeSquintLeft, eyeSquintRight, eyeWideLeft, eyeWideRight, jawForward, jawLeft, jawOpen, jawRight, mouthClose, mouthDimpleLeft, mouthDimpleRight, mouthFrownLeft, mouthFrownRight, mouthFunnel, mouthLeft, mouthLowerDownLeft, mouthLowerDownRight, mouthPressLeft, mouthPressRight, mouthPucker, mouthRight, mouthRollLower, mouthRollUpper, mouthShrugLower, mouthShrugUpper, mouthSmileLeft, mouthSmileRight, mouthStretchLeft, mouthStretchRight, mouthUpperUpLeft, mouthUpperUpRight, noseSneerLeft, noseSneerRight, and tongueOut.

### Pattern 2: Firebase Realtime Database Multiplayer with Presence
**What:** Structure game state with denormalized data (sessions/{sessionId}/players/{playerId}), use onDisconnect for presence detection, listen to real-time updates via on("value"), handle concurrent writes with last-write-wins.

**When to use:** Camera-based multiplayer game (PATH-02).

**Example:**
```javascript
// Source: Firebase Realtime Database documentation + community patterns
import { getDatabase, ref, set, onValue, onDisconnect, serverTimestamp } from "firebase/database";

const db = getDatabase();
const sessionId = "game-123";
const playerId = "player-abc";

// Data structure (denormalized for performance)
const gameState = {
  sessions: {
    [sessionId]: {
      status: "active",
      createdAt: timestamp,
      players: {
        [playerId]: {
          name: "Player 1",
          score: 0,
          position: { x: 0, y: 0 },
          online: true,
          lastSeen: timestamp
        }
      },
      gameData: {
        currentRound: 1,
        targetQR: "qr-code-123"
      }
    }
  }
};

// Join session and setup presence
const playerRef = ref(db, `sessions/${sessionId}/players/${playerId}`);
await set(playerRef, {
  name: "Player 1",
  score: 0,
  online: true,
  joinedAt: serverTimestamp()
});

// Presence detection: mark offline when disconnected
onDisconnect(playerRef).update({
  online: false,
  lastSeen: serverTimestamp()
});

// Listen to all players in session
const playersRef = ref(db, `sessions/${sessionId}/players`);
onValue(playersRef, (snapshot) => {
  const players = snapshot.val();
  updateGameUI(players);
});

// Update player state (last-write-wins for concurrent updates)
function updateScore(points) {
  const scoreRef = ref(db, `sessions/${sessionId}/players/${playerId}/score`);
  set(scoreRef, points);
}
```

**Connection monitoring:**
```javascript
// Monitor connection status
const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snapshot) => {
  if (snapshot.val() === true) {
    console.log("Connected to Firebase");
  } else {
    console.log("Disconnected from Firebase");
  }
});
```

### Pattern 3: Canvas 2D Particle System for Emotion Visualization
**What:** Create particle system with object pooling (reuse particles instead of creating new objects), map emotions to visual parameters (color, velocity, size), use requestAnimationFrame for 60fps rendering.

**When to use:** Face-reactive experience emotion-driven visuals (PATH-01).

**Example:**
```javascript
// Source: Community best practices + performance optimization patterns
class ParticleSystem {
  constructor(canvas, maxParticles = 200) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    // Object pooling: create particles once, reuse them
    this.particles = [];
    for (let i = 0; i < maxParticles; i++) {
      this.particles.push({
        x: 0, y: 0,
        vx: 0, vy: 0,
        size: 0,
        color: '',
        alpha: 0,
        active: false
      });
    }

    this.activeCount = 0;
  }

  // Emotion to visual mapping (Russell's circumplex model)
  emotionToVisual(emotion) {
    const map = {
      happy: { color: '#FFD700', velocity: 3, size: 8 },      // Warm yellow, fast
      excited: { color: '#FF6B35', velocity: 5, size: 10 },   // Orange, very fast
      calm: { color: '#6B9BD1', velocity: 1, size: 6 },       // Cool blue, slow
      sad: { color: '#4A4A8A', velocity: 0.5, size: 4 },      // Dark blue, very slow
      angry: { color: '#D32F2F', velocity: 4, size: 12 },     // Red, fast, large
      surprised: { color: '#FFEB3B', velocity: 6, size: 7 }   // Bright yellow, erratic
    };
    return map[emotion] || map.calm;
  }

  emit(emotion, x, y, count = 10) {
    const visual = this.emotionToVisual(emotion);

    for (let i = 0; i < count && this.activeCount < this.particles.length; i++) {
      // Find inactive particle and reuse it (object pooling)
      const particle = this.particles.find(p => !p.active);
      if (!particle) break;

      particle.active = true;
      particle.x = x;
      particle.y = y;
      particle.vx = (Math.random() - 0.5) * visual.velocity;
      particle.vy = (Math.random() - 0.5) * visual.velocity;
      particle.size = visual.size;
      particle.color = visual.color;
      particle.alpha = 1;

      this.activeCount++;
    }
  }

  update(deltaTime) {
    for (let particle of this.particles) {
      if (!particle.active) continue;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.alpha -= 0.01;

      // Deactivate when faded
      if (particle.alpha <= 0) {
        particle.active = false;
        this.activeCount--;
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let particle of this.particles) {
      if (!particle.active) continue;

      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.alpha;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
  }
}

// Usage
const canvas = document.getElementById('canvas');
const particles = new ParticleSystem(canvas, 200);

function animate() {
  particles.update(1/60);
  particles.render();
  requestAnimationFrame(animate);
}

// Emit particles based on detected emotion
function onEmotionDetected(emotion, faceX, faceY) {
  particles.emit(emotion, faceX, faceY, 15);
}
```

### Pattern 4: QR Code Camera Scanning with html5-qrcode
**What:** Use Html5QrcodeScanner for end-to-end scanning with default UI, or Html5Qrcode for custom UI, handle camera permissions and facingMode (front/back), process scanned codes in callback.

**When to use:** Camera-based game for QR matchmaking (PATH-02).

**Example:**
```javascript
// Source: https://github.com/mebjas/html5-qrcode
import { Html5QrcodeScanner } from "html5-qrcode";

// Option 1: End-to-end scanner with default UI
const scanner = new Html5QrcodeScanner(
  "reader",  // div id
  {
    fps: 10,  // Frames per second for scanning
    qrbox: { width: 250, height: 250 },  // Scanning box size
    aspectRatio: 1.0,
    rememberLastUsedCamera: true,
    facingMode: "environment"  // Prefer back camera
  }
);

scanner.render(onScanSuccess, onScanError);

function onScanSuccess(decodedText, decodedResult) {
  console.log(`QR Code detected: ${decodedText}`);
  // Join game session based on QR code
  joinSession(decodedText);
  scanner.clear();  // Stop scanning
}

function onScanError(errorMessage) {
  // Handle scan error (usually too frequent, can be ignored)
}

// Option 2: Custom UI with Html5Qrcode
import { Html5Qrcode } from "html5-qrcode";

const html5QrCode = new Html5Qrcode("reader");

async function startScanning() {
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  try {
    await html5QrCode.start(
      { facingMode: "environment" },  // Camera constraints
      config,
      onScanSuccess,
      onScanError
    );
  } catch (err) {
    console.error("Unable to start scanning", err);
  }
}

async function stopScanning() {
  await html5QrCode.stop();
}
```

### Pattern 5: Starter Template Design (60-70% Complete)
**What:** Provide complete infrastructure (HTML boilerplate, camera setup, Firebase config, rendering loop) with TODO comments in strategic locations for core logic, use clear function signatures with missing implementations, include working examples for reference.

**When to use:** All three project paths.

**Example structure:**
```javascript
// ============================================
// INFRASTRUCTURE (COMPLETE - DON'T MODIFY)
// ============================================

// Camera setup - COMPLETE
async function setupCamera() {
  const video = document.getElementById('webcam');
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user' }
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => resolve(video);
  });
}

// Rendering loop - COMPLETE
function startRenderLoop(updateFn, renderFn) {
  let lastTime = performance.now();

  function loop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    updateFn(deltaTime);
    renderFn();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

// ============================================
// YOUR CODE (TODO - IMPLEMENT THESE)
// ============================================

// TODO 1: Map blendshapes to emotion (10 minutes)
// HINT: Check which blendshapes are > 0.6 threshold
// HINT: mouthSmileLeft + mouthSmileRight = happy
// HINT: browInnerUp + eyeWideLeft/Right = surprised
function detectEmotion(blendshapes) {
  // TODO: Implement emotion detection logic
  // Return one of: 'happy', 'sad', 'surprised', 'angry', 'neutral'

  return 'neutral';  // Replace this
}

// TODO 2: Update particle colors based on emotion (15 minutes)
// HINT: Use the emotionToColor map below
// HINT: Update existing particles, don't create new ones
const emotionToColor = {
  happy: '#FFD700',
  sad: '#4A4A8A',
  surprised: '#FFEB3B',
  angry: '#D32F2F',
  neutral: '#CCCCCC'
};

function updateVisualization(emotion) {
  // TODO: Update particle system or canvas visualization

}

// TODO 3: Test your implementation (5 minutes)
// Try making different facial expressions and verify:
// - Smiling shows happy (yellow particles)
// - Raised eyebrows shows surprised (bright yellow)
// - Frowning shows sad (dark blue)

// ============================================
// WORKING EXAMPLE REFERENCE
// ============================================

// Example: How to access blendshape values
function exampleBlendshapeAccess(blendshapes) {
  // Each blendshape has: { categoryName: string, score: 0.0-1.0 }
  const smileLeft = blendshapes.find(b => b.categoryName === 'mouthSmileLeft')?.score || 0;
  const smileRight = blendshapes.find(b => b.categoryName === 'mouthSmileRight')?.score || 0;

  if (smileLeft > 0.6 && smileRight > 0.6) {
    return 'happy';
  }

  return 'neutral';
}
```

### Anti-Patterns to Avoid

- **Creating objects in animation loops:** Don't create new Vector3, particle objects, or any objects inside requestAnimationFrame - use object pooling to reuse existing objects.
- **Deep Firebase data nesting:** Avoid paths like `/games/{gameId}/rounds/{roundId}/players/{playerId}/state/position/history` - keep structure shallow (max 2-3 levels).
- **Blocking UI thread with MediaPipe:** Don't run face detection synchronously on main thread for video - use web workers or ensure non-blocking patterns.
- **Ignoring camera permissions:** Always provide user feedback for camera permission requests and handle rejection gracefully.
- **Security rules set to true:** Never deploy Firebase with `.read: true` and `.write: true` even for workshops - use emulator for open access.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| QR code detection from camera | Custom image processing with getUserMedia + canvas analysis | html5-qrcode library | Cross-platform camera handling, iOS Safari compatibility, multiple barcode format support, permission edge cases |
| Face landmark detection | OpenCV.js with Haar cascades or manual feature detection | MediaPipe Face Landmarker | 478 landmark accuracy, 52 ARKit blendshapes, GPU acceleration, production-tested on millions of devices |
| Real-time multiplayer sync | Custom WebSocket server + message queue + state reconciliation | Firebase Realtime Database | Handles connection drops, provides onDisconnect, automatic reconnection, serverTimestamp, conflict resolution |
| Particle system physics | Manual vector math and collision detection | Three.js or established Canvas patterns with object pooling | Optimized rendering, GPU utilization, cross-browser compatibility, proven performance |
| Emotion classification from facial features | Custom ML model training | Map MediaPipe blendshapes to Russell's circumplex model | ARKit blendshapes are designed for expression capture, mapping is well-established in research |

**Key insight:** Workshop time constraints (60-75 minutes) make reliability and quick setup critical. Custom implementations of camera access, real-time sync, or facial detection would consume the entire workshop just for debugging. Established libraries provide immediate functionality, letting participants focus on creative implementation rather than infrastructure.

## Common Pitfalls

### Pitfall 1: MediaPipe Detection Blocking UI Thread
**What goes wrong:** Running faceLandmarker.detectForVideo() synchronously in the render loop causes frame drops and unresponsive UI, especially on low-end devices.

**Why it happens:** MediaPipe's detect methods are synchronous and CPU/GPU intensive. Processing every frame at 60fps without throttling overwhelms the browser.

**How to avoid:**
- Check `video.currentTime !== lastVideoTime` to avoid processing duplicate frames
- Consider reducing detection frequency (every 2-3 frames instead of every frame)
- For production apps, move detection to a Web Worker

**Warning signs:** Laggy video feed, dropped frames, unresponsive controls.

```javascript
// WRONG: Processes every frame
function loop() {
  const result = faceLandmarker.detectForVideo(video, performance.now());
  processResult(result);
  requestAnimationFrame(loop);
}

// CORRECT: Processes only new frames
let lastVideoTime = -1;
function loop() {
  if (video.currentTime !== lastVideoTime) {
    const result = faceLandmarker.detectForVideo(video, performance.now());
    processResult(result);
    lastVideoTime = video.currentTime;
  }
  requestAnimationFrame(loop);
}
```

### Pitfall 2: Firebase Security Rules Left Open
**What goes wrong:** Setting `.read: true` and `.write: true` for entire database allows anyone to read/write all data, creating instant security vulnerabilities even in workshop/testing scenarios.

**Why it happens:** Default Firebase rules are restrictive, requiring authentication. Developers disable security for quick testing and forget to re-enable.

**How to avoid:**
- Use Firebase Local Emulator Suite for workshops (no security concerns locally)
- If using production Firebase, create session-specific rules: allow read/write only to specific session paths
- Add rule that denies writes to critical paths (like `/config`, `/users`)

**Warning signs:** Firebase console shows "Rules allow public access" warning, unexpected data modifications.

```javascript
// WRONG: Completely open database
{
  "rules": {
    ".read": true,
    ".write": true
  }
}

// BETTER: Session-specific access
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": true,
        ".write": true
      }
    }
  }
}

// BEST: Use emulator for workshops
// firebase emulators:start --only database
```

### Pitfall 3: Three.js Asset Loading Without Optimization
**What goes wrong:** Loading large uncompressed textures (PNG/JPEG) and models (OBJ/COLLADA) causes long load times and high memory usage, especially on mobile.

**Why it happens:** Developers export assets in default formats without considering GPU memory. A 200KB PNG decompresses to 20MB+ in VRAM.

**How to avoid:**
- Use compressed texture formats (KTX2, Basis)
- Use glTF instead of OBJ/COLLADA for 3D models
- Limit texture resolution (512x512 or 1024x1024 for most cases)
- Limit max pixel ratio to 2 on mobile: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`

**Warning signs:** Long initial load, memory warnings, crashes on mobile devices.

```javascript
// WRONG: Unlimited pixel ratio on mobile
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);  // Can be 3-5 on modern phones

// CORRECT: Limit pixel ratio
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

### Pitfall 4: Camera Permission Handling Without User Feedback
**What goes wrong:** Calling getUserMedia() without UI feedback leaves users staring at blank screen when permission prompt appears or is denied.

**Why it happens:** Browser permission prompts are asynchronous and non-blocking, but app continues rendering empty video element.

**How to avoid:**
- Show loading state during permission request
- Provide clear error message if permission denied
- Offer "retry" button to request permission again
- Test on iOS Safari (has stricter permission requirements)

**Warning signs:** Users report "nothing happens" or "black screen", especially on mobile Safari.

```javascript
// WRONG: No feedback
async function init() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

// CORRECT: Clear feedback
async function init() {
  const statusEl = document.getElementById('status');

  try {
    statusEl.textContent = 'Requesting camera access...';
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    statusEl.textContent = 'Camera ready!';
  } catch (err) {
    statusEl.textContent = 'Camera access denied. Please allow camera access and click retry.';
    showRetryButton();
  }
}
```

### Pitfall 5: Object Creation in Animation Loop
**What goes wrong:** Creating new objects (Vector3, Color, particles) inside requestAnimationFrame causes garbage collection pauses, leading to frame drops.

**Why it happens:** JavaScript garbage collector must periodically clean up unused objects. High allocation rate triggers frequent GC pauses.

**How to avoid:**
- Create objects once during initialization
- Reuse objects with `.set()`, `.copy()`, or direct property assignment
- Use object pooling for particle systems
- Monitor performance with DevTools Performance profiler

**Warning signs:** Periodic frame drops every few seconds, "sawtooth" pattern in memory graph, GC warnings in console.

```javascript
// WRONG: Creates new object every frame (60 times per second)
function animate() {
  particles.forEach(p => {
    const velocity = new THREE.Vector3(p.vx, p.vy, p.vz);  // NEW OBJECT
    p.position.add(velocity);
  });
  requestAnimationFrame(animate);
}

// CORRECT: Reuses single object
const tempVector = new THREE.Vector3();  // Created once
function animate() {
  particles.forEach(p => {
    tempVector.set(p.vx, p.vy, p.vz);  // Reuses existing object
    p.position.add(tempVector);
  });
  requestAnimationFrame(animate);
}
```

### Pitfall 6: Workshop Scaffolding Too Complex or Too Simple
**What goes wrong:** Too much scaffolding leaves no creative work (participants just fill blanks), too little scaffolding requires building infrastructure instead of core features.

**Why it happens:** Misjudging participant skill level or time constraints.

**How to avoid:**
- Provide complete infrastructure (camera, Firebase, rendering loop)
- Leave 3-4 strategic TODOs that represent core learning objectives
- Include working example code for reference (commented out or in separate file)
- Test template completion time with someone unfamiliar with the code

**Warning signs:** Workshop participants finish in 20 minutes (too much scaffolding) or still debugging camera setup after 40 minutes (too little scaffolding).

```javascript
// TOO MUCH SCAFFOLDING (bad)
function detectEmotion(blendshapes) {
  // TODO: Return the result (everything already computed)
  const smile = blendshapes.smileLeft + blendshapes.smileRight;
  const frown = blendshapes.frownLeft + blendshapes.frownRight;
  const surprise = blendshapes.browInnerUp + blendshapes.eyeWide;

  if (smile > 1.2) return 'happy';
  if (frown > 1.0) return 'sad';
  if (surprise > 1.0) return 'surprised';
  // TODO: Return 'neutral' here
}

// TOO LITTLE SCAFFOLDING (bad)
// TODO: Implement entire face detection system with MediaPipe
// TODO: Setup Firebase Realtime Database
// TODO: Create particle system
// TODO: Connect everything together

// GOLDILOCKS (good - 60-70% complete)
function detectEmotion(blendshapes) {
  // TODO: Implement emotion detection (15 min)
  // HINT: Access blendshape scores with blendshapes.find(b => b.categoryName === 'mouthSmileLeft')
  // HINT: Threshold of 0.6 works well for most expressions
  // HINT: Check mouthSmileLeft + mouthSmileRight for happiness

  return 'neutral';  // Replace this
}
```

## Code Examples

Verified patterns from official sources:

### Complete MediaPipe Face Landmarker Setup
```javascript
// Source: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

async function initFaceLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numFaces: 1,
    minFaceDetectionConfidence: 0.5,
    minFacePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: false
  });

  return faceLandmarker;
}

// Video processing
const video = document.getElementById("webcam");
const faceLandmarker = await initFaceLandmarker();
let lastVideoTime = -1;

function processVideoFrame() {
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const result = faceLandmarker.detectForVideo(video, performance.now());

    if (result.faceLandmarks && result.faceLandmarks.length > 0) {
      const landmarks = result.faceLandmarks[0];  // 478 points, each with {x, y, z}
      // landmarks[0] = nose tip
      // landmarks[33] = right eye
      // landmarks[263] = left eye
      // landmarks[61] = mouth center
    }

    if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
      const blendshapes = result.faceBlendshapes[0].categories;  // 52 ARKit blendshapes
      // blendshapes[i] = { categoryName: string, score: 0.0-1.0 }
      console.log(blendshapes);
    }
  }

  requestAnimationFrame(processVideoFrame);
}

processVideoFrame();
```

### Firebase Realtime Database Multiplayer Session
```javascript
// Source: Firebase documentation + multiplayer patterns
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, onDisconnect, serverTimestamp, push } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  databaseURL: "https://your-project.firebaseio.com"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Create or join session
async function joinGameSession(sessionCode, playerName) {
  const sessionRef = ref(db, `sessions/${sessionCode}`);

  // Generate unique player ID
  const playersRef = ref(db, `sessions/${sessionCode}/players`);
  const newPlayerRef = push(playersRef);
  const playerId = newPlayerRef.key;

  // Set player data
  await set(newPlayerRef, {
    name: playerName,
    score: 0,
    online: true,
    joinedAt: serverTimestamp()
  });

  // Setup presence: mark offline on disconnect
  onDisconnect(newPlayerRef).update({
    online: false,
    leftAt: serverTimestamp()
  });

  // Listen to all players
  onValue(playersRef, (snapshot) => {
    const players = snapshot.val();
    updatePlayerList(players);
  });

  return playerId;
}

// Update game state
function updatePlayerScore(sessionCode, playerId, newScore) {
  const scoreRef = ref(db, `sessions/${sessionCode}/players/${playerId}/score`);
  set(scoreRef, newScore);
}

// Monitor connection status
const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snapshot) => {
  const isConnected = snapshot.val();
  updateConnectionStatus(isConnected);
});
```

### Blendshape to Emotion Mapping
```javascript
// Source: MediaPipe blendshapes + Russell's circumplex model research
// https://medium.com/@samiratra95/mediapipe-blendshapes-recording-and-filtering-29bd6243924e

function mapBlendshapesToEmotion(blendshapes) {
  // Helper: get blendshape score by name
  const getScore = (name) => {
    const shape = blendshapes.find(b => b.categoryName === name);
    return shape ? shape.score : 0;
  };

  // Extract key blendshape values
  const smileLeft = getScore('mouthSmileLeft');
  const smileRight = getScore('mouthSmileRight');
  const frownLeft = getScore('mouthFrownLeft');
  const frownRight = getScore('mouthFrownRight');
  const browInnerUp = getScore('browInnerUp');
  const eyeWideLeft = getScore('eyeWideLeft');
  const eyeWideRight = getScore('eyeWideRight');
  const jawOpen = getScore('jawOpen');
  const browDownLeft = getScore('browDownLeft');
  const browDownRight = getScore('browDownRight');

  // Emotion detection thresholds (0.0-1.0 scale)
  const THRESHOLD = 0.5;

  // Happy: symmetrical smile
  if (smileLeft > THRESHOLD && smileRight > THRESHOLD) {
    return { emotion: 'happy', confidence: (smileLeft + smileRight) / 2 };
  }

  // Surprised: raised eyebrows + wide eyes
  if (browInnerUp > THRESHOLD && (eyeWideLeft > THRESHOLD || eyeWideRight > THRESHOLD)) {
    return { emotion: 'surprised', confidence: browInnerUp };
  }

  // Sad: frown + lowered brows
  if ((frownLeft > THRESHOLD || frownRight > THRESHOLD) && browInnerUp < 0.2) {
    return { emotion: 'sad', confidence: (frownLeft + frownRight) / 2 };
  }

  // Angry: furrowed brows
  if (browDownLeft > THRESHOLD && browDownRight > THRESHOLD) {
    return { emotion: 'angry', confidence: (browDownLeft + browDownRight) / 2 };
  }

  // Excited: wide smile + raised brows + jaw open
  if ((smileLeft + smileRight) > 1.0 && jawOpen > 0.4) {
    return { emotion: 'excited', confidence: 0.8 };
  }

  // Default: calm/neutral
  return { emotion: 'calm', confidence: 0.5 };
}
```

### Canvas 2D Emotion-Driven Visualization
```javascript
// Source: Community best practices for particle systems
class EmotionVisualization {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 150;

    // Pre-create particles (object pooling)
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: 0, vy: 0,
        size: 5,
        color: '#CCCCCC',
        alpha: 1,
        active: true
      });
    }
  }

  setEmotion(emotion) {
    // Emotion to visual parameters (color, movement, size)
    const emotionMap = {
      happy: {
        color: '#FFD700',
        velocityMultiplier: 2.0,
        sizeMultiplier: 1.2,
        particleCount: 100
      },
      sad: {
        color: '#4A4A8A',
        velocityMultiplier: 0.3,
        sizeMultiplier: 0.8,
        particleCount: 50
      },
      excited: {
        color: '#FF6B35',
        velocityMultiplier: 3.5,
        sizeMultiplier: 1.5,
        particleCount: 150
      },
      calm: {
        color: '#6B9BD1',
        velocityMultiplier: 0.8,
        sizeMultiplier: 1.0,
        particleCount: 80
      },
      surprised: {
        color: '#FFEB3B',
        velocityMultiplier: 4.0,
        sizeMultiplier: 1.0,
        particleCount: 120
      },
      angry: {
        color: '#D32F2F',
        velocityMultiplier: 2.5,
        sizeMultiplier: 1.8,
        particleCount: 100
      }
    };

    const params = emotionMap[emotion] || emotionMap.calm;

    // Update existing particles (don't create new ones)
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];
      p.active = i < params.particleCount;
      p.color = params.color;
      p.size = 5 * params.sizeMultiplier;
      p.vx = (Math.random() - 0.5) * params.velocityMultiplier;
      p.vy = (Math.random() - 0.5) * params.velocityMultiplier;
    }
  }

  update(deltaTime) {
    for (let p of this.particles) {
      if (!p.active) continue;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
    }
  }

  render() {
    // Clear with slight fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw particles
    for (let p of this.particles) {
      if (!p.active) continue;

      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}

// Usage
const viz = new EmotionVisualization('canvas');

function animate() {
  viz.update(1/60);
  viz.render();
  requestAnimationFrame(animate);
}

// Update based on detected emotion
function onEmotionChange(emotion) {
  viz.setEmotion(emotion);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| MediaPipe legacy solutions (Python/C++) | MediaPipe Tasks (JavaScript/Web) | 2023-2024 | Web-native implementation with CDN delivery, no Python backend required |
| Firebase v8 SDK (namespaced API) | Firebase v9+ modular SDK | 2021 | Tree-shaking reduces bundle size by 80%, modern import syntax |
| Three.js WebGL only | Three.js WebGPU + WebGL fallback | r171 (2024) | GPU-accelerated rendering on modern browsers, automatic fallback for compatibility |
| Manual QR detection (jsQR) | html5-qrcode with camera UI | 2020-2023 | Cross-platform camera handling, iOS Safari support, built-in UI |
| ARKit blendshapes (40) | ARKit blendshapes (52) | 2019 | More accurate expression capture including tongue and nuanced mouth shapes |

**Deprecated/outdated:**
- **MediaPipe Legacy Solutions (Python)**: Use MediaPipe Tasks for web instead - JavaScript-native with better browser integration
- **Firebase Realtime Database REST API for real-time updates**: Use WebSocket-based SDK instead - automatic reconnection and presence detection
- **Three.js CanvasRenderer**: Removed in r163, use WebGLRenderer with `renderer.setPixelRatio(1)` for retro look if needed
- **Instascan for QR codes**: Not maintained, doesn't support iOS Safari well - use html5-qrcode instead

## Open Questions

Things that couldn't be fully resolved:

1. **MediaPipe Performance on Low-End Devices**
   - What we know: Face detection runs at 30fps on CPU according to community tutorials, GPU delegate improves performance
   - What's unclear: Exact performance benchmarks for workshop target devices (laptops vs. tablets vs. phones), whether detection should be throttled for 60-75 minute battery life
   - Recommendation: Test on lowest-spec device available, provide fallback that processes every 3rd frame if performance is poor

2. **Firebase Emulator vs. Production for Workshop**
   - What we know: Firebase Emulator Suite runs locally, no internet required, no security concerns, supports all Realtime Database features
   - What's unclear: Network setup logistics for 40 developers connecting to shared emulator instance vs. each running local emulator
   - Recommendation: Provide both options - local emulator for offline/independent work, shared production database with session-scoped rules for multiplayer testing between participants

3. **Optimal Blendshape Thresholds for Emotion Detection**
   - What we know: 0.5-0.6 threshold commonly used in tutorials, varies by individual facial structure and camera angle
   - What's unclear: Whether fixed thresholds work across diverse participants or if per-user calibration is needed
   - Recommendation: Start with 0.5 threshold, allow participants to adjust via UI slider for personalization, document threshold values as part of TODO guidance

4. **Custom Project Path Guidance Depth**
   - What we know: Advanced attendees want freedom to build original projects, need some scaffolding to finish in time
   - What's unclear: Whether to provide multiple starter templates (e.g., "gesture-controlled game", "AR face filter", "collaborative drawing") or single blank template with architecture guidance
   - Recommendation: Provide single "blank canvas" template with working camera/Firebase/rendering infrastructure + architecture decision guide (Canvas vs Three.js, face detection vs QR codes, single player vs multiplayer)

## Sources

### Primary (HIGH confidence)
- MediaPipe Face Landmarker Web Documentation: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js
- Firebase Realtime Database Documentation: https://firebase.google.com/docs/database/web/structure-data
- Firebase Realtime Database Presence Detection: https://firebase.google.com/docs/database/web/offline-capabilities
- Three.js GitHub Releases: https://github.com/mrdoob/three.js/releases (r182, December 2024)
- html5-qrcode GitHub: https://github.com/mebjas/html5-qrcode
- Firebase Emulator Suite: https://firebase.google.com/docs/emulator-suite

### Secondary (MEDIUM confidence)
- [Face landmark detection guide for Web | MediaPipe](https://developers.google.com/mediapipe/solutions/vision/face_landmarker/web_js)
- [A Comprehensive Survey and Evaluation of MediaPipe Face Mesh for Human Emotion Recognition](https://ieeexplore.ieee.org/document/10775188/)
- [Firebase Multiplayer Game & Matchmaking in Unity](https://medium.com/firebase-developers/firebase-multiplayer-game-matchmaking-in-unity-1d2d04989426)
- [100 Three.js Best Practices (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- [Building Efficient Three.js Scenes: Optimize Performance](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/)
- [Firebase Realtime Database Rules - Common Mistakes](https://moldstud.com/articles/p-firebase-realtime-database-rules-common-mistakes-to-avoid-for-enhanced-security)
- [React Three Fiber Introduction](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Drei Helpers Documentation](https://drei.docs.pmnd.rs/getting-started/introduction)

### Tertiary (LOW confidence)
- [MediaPipe Blendshapes recording and filtering](https://medium.com/@samiratra95/mediapipe-blendshapes-recording-and-filtering-29bd6243924e) - Medium article, single source
- [Workshop planning best practices](https://www.sessionlab.com/templates/workshop-planning-template) - General guidance, not code-specific
- [Emotion visualization color mapping research](https://www.cedricscherer.com/2021/06/08/colors-and-emotions-in-data-visualization/) - 2021 research, may be outdated

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - MediaPipe, Firebase, Three.js, html5-qrcode all verified from official documentation
- Architecture: MEDIUM-HIGH - Patterns verified from official docs, some community best practices for workshop scaffolding
- Pitfalls: MEDIUM - Verified from official docs (security rules, performance) and recent community posts (2025-2026)

**Research date:** 2026-01-25
**Valid until:** 2026-04-25 (90 days - MediaPipe and Firebase are stable, Three.js releases quarterly)
