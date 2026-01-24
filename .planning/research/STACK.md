# Technology Stack

**Project:** Code at the Speed of Thought - AI Workshop (Google Stockholm, Jan 28 2026)
**Researched:** 2026-01-24
**Workshop Duration:** 3.5 hours (2h foundations + 1.5h building)
**Participants:** 40 developers, mixed skill levels
**Constraint:** Zero pre-work, browser-based only

## Executive Recommendation

**Core Philosophy:** Zero-install, browser-native stack optimizing for immediate productivity. Participants open a URL and start coding within seconds.

**Stack Summary:** Google AI Studio (prototyping) → Firebase Studio (development) → Three.js r182 (3D graphics) → MediaPipe Tasks Vision (face/gesture detection) → Gemini 3 Flash (AI inference) → Firebase Hosting (deployment)

## Recommended Stack

### 1. AI Development Environment

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Google AI Studio** | Current (Jan 2026) | Prompt prototyping & testing | Browser-based playground for experimenting with Gemini prompts, multimodal inputs (text/image/video), structured output. No setup required. Participants test prompts before coding. | HIGH |
| **Firebase Studio** | Preview | Full-stack development IDE | Agentic cloud IDE with Gemini assistance, zero setup. Two modes: App Prototyping (no-code) and Code mode (full IDE). Includes Firebase emulators, in-browser preview, instant deployment. Replaces local dev entirely. | HIGH |
| **Antigravity IDE** | Public Preview | Alternative advanced IDE | Fork of VS Code with agent-first architecture. More powerful but requires download. **NOT RECOMMENDED for workshop** - adds setup friction, overkill for 3.5 hours. Reserve for post-workshop exploration. | MEDIUM |

**Rationale:** Firebase Studio eliminates all setup friction (no Node.js, no npm, no git), provides AI assistance for mixed skill levels, and offers seamless Firebase deployment. Google AI Studio serves as preliminary prompt playground before moving to code.

**Alternative Considered:** Local VS Code + Vite. **Why Not:** Requires pre-workshop installation of Node.js (v18+), npm, git, and code editor. With 40 participants and mixed OSes, setup troubleshooting consumes 30-60 minutes. Violates zero pre-work constraint.

### 2. AI Models & APIs

| Technology | Version/Model | Purpose | Why | Confidence |
|------------|---------------|---------|-----|------------|
| **Gemini 3 Flash** | Latest | Primary AI model for workshop | 10 RPM free tier, 250K tokens/min, 250 requests/day. Fast, multimodal (text/image/video), structured output via JSON Schema. Cost-effective for 40 participants. Flash balances speed and quality for creative coding. | HIGH |
| **Gemini 3 Flash-Lite** | Latest | Fallback for high-frequency use cases | 15 RPM, 1000 requests/day. For participants hitting rate limits or building real-time camera loops. Faster but lower quality. | HIGH |
| **Gemini 3 Pro** | Latest | Advanced demonstrations only | 5 RPM, 100 requests/day. World's best multimodal understanding but strict limits. Instructor demos only, not for participant exercises. | HIGH |

**Rate Limit Strategy:**
- Each participant uses personal Google account (free tier: 10-15 RPM)
- Gemini 3 Flash default: 250 requests/day sufficient for 3.5 hour workshop
- If participant exceeds limit: switch to Flash-Lite (1000 req/day) or share instructor API key for remainder

**API Access:**
- Via Google AI Studio: Get API key instantly (ai.google.dev)
- Via Firebase: Gemini in Firebase SDK (integrated in Firebase Studio projects)

**Alternatives Considered:**
- **OpenAI GPT-4o:** Requires credit card for API access. Non-starter for workshop.
- **Claude 3.5 Sonnet:** Excellent quality but no free tier API. Requires Anthropic account + payment.
- **Local LLMs (Ollama, etc.):** Requires installation, GPU for reasonable speed. Violates browser-only constraint.

**Why Gemini 3 Flash:** Only major LLM with generous free tier (250 req/day), multimodal native, structured output, and no credit card requirement. December 2025 limit reductions still leave sufficient quota for workshop usage.

### 3. 3D Graphics & Creative Coding

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Three.js** | r182 (latest) | 3D rendering engine | Industry standard WebGL/WebGPU library. r182 (Dec 2025) adds production-ready WebGPU with auto-fallback to WebGL2. Simple API, massive example library, perfect for "vibe coding" with AI. CDN import via esm.sh - no build step. | HIGH |
| **Canvas API** | Native | 2D drawing contexts | Browser-native 2D graphics. Use for overlays, UI elements, image manipulation before feeding to Gemini. No library needed. | HIGH |

**Three.js CDN Setup:**
```html
<script type="importmap">
{
  "imports": {
    "three": "https://esm.sh/three@0.182.0",
    "three/addons/": "https://esm.sh/three@0.182.0/examples/jsm/"
  }
}
</script>
<script type="module">
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  // Workshop code starts here
</script>
```

**Why Three.js over alternatives:**
- **vs p5.js:** p5.js excellent for 2D creative coding but limited 3D (webGL mode is wrapper). Workshop needs full 3D for face-reactive environments, gesture-controlled scenes. Three.js is purpose-built for 3D.
- **vs Babylon.js:** More game-focused, heavier API. Three.js simpler for beginners, better AI code generation (more training data).
- **vs raw WebGL:** Too low-level for 3.5 hours. Three.js abstracts complexity while remaining flexible.

**Why r182 specifically:**
- WebGPU support (2-10x performance on modern browsers)
- Modernized shadow mapping (no manual bias tweaking)
- Compatible with Safari 18+ (September 2025), Chrome, Edge, Firefox
- Auto-fallback ensures compatibility with older browsers

**Canvas API Use Cases:**
- Capture webcam frame → draw to canvas → convert to ImageData → send to Gemini
- Draw face landmark overlays from MediaPipe
- Create 2D UI for Three.js scenes

### 4. Computer Vision (Face & Gesture Detection)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **MediaPipe Tasks Vision** | 0.10.x | Real-time face/gesture detection | Google's official CV library. Detects 468 facial landmarks + hand gestures at 30+ FPS in browser. WebAssembly-optimized, runs locally (no API calls). Pre-trained models via CDN. Tremendously faster than TensorFlow.js. | HIGH |
| **MediaPipe Face Landmarker** | Included | Face detection & landmarks | 468 3D facial landmarks + blendshape scores. Perfect for face-reactive visuals. BlazeFace detector + lightweight tracking. | HIGH |
| **MediaPipe Gesture Recognizer** | Included | Hand gesture recognition | Recognizes 8 built-in gestures (👍, ✌️, ✊, etc.). Tracks up to 2 hands simultaneously. Workshop use: gesture-controlled Three.js cameras. | HIGH |

**MediaPipe CDN Setup:**
```html
<script type="module">
  import { FaceLandmarker, GestureRecognizer, FilesetResolver } from
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/vision_bundle.js';

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"
  );

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numFaces: 1
  });
</script>
```

**Performance Characteristics:**
- Desktop/Laptop: 60 FPS with full face mesh (468 landmarks)
- Mid-tier devices: 30 FPS (acceptable for workshop)
- iOS devices: Use TensorFlow.js fallback if needed (MediaPipe slower on Safari iOS)

**Why MediaPipe over alternatives:**
- **vs TensorFlow.js (face-api.js):** MediaPipe 3-5x faster on desktop/Android due to WASM optimization. TensorFlow.js only faster on iOS (workshop assumes majority non-iOS).
- **vs face-api.js:** Unmaintained since 2020. MediaPipe actively maintained by Google, new models quarterly.
- **vs tracking.js:** Ancient (2014), CPU-only, poor accuracy. MediaPipe GPU-accelerated.
- **vs clmtrackr:** Outdated, 66 landmarks vs MediaPipe's 468. Insufficient for detailed face tracking.

**Workshop Use Cases:**
1. **Face-reactive visuals:** Map mouth-open to particle emission, eyebrow raise to color shift
2. **Gesture controls:** Thumbs-up to spawn objects, peace sign to change scene
3. **Camera-based games:** Duck-hunt style where head movement aims, mouth-open shoots

### 5. Development Tools & Deployment

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **ESM via CDN** | Standard | Module imports | Import maps + esm.sh/jsDelivr for all libraries. No npm, no bundler. Browser-native ES modules. | HIGH |
| **Firebase Hosting** | Current | Static site deployment | One-click deploy from Firebase Studio. Global CDN, auto-SSL, 10GB free. Deploy workshop projects in <30 seconds. | HIGH |
| **Firebase Local Emulator** | Included in Studio | Local testing | Built into Firebase Studio. Test before deploy without consuming quotas. | MEDIUM |

**ESM CDN Recommendation: esm.sh**
- Automatic npm → ESM conversion
- TypeScript type headers (X-TypeScript-Types)
- Supports import maps (better than Skypack for version pinning)
- Powered by jsDelivr global CDN (faster than unpkg)

**Why CDN over bundler:**
- **vs Vite:** Vite excellent but requires npm install, local Node.js. Development uses native ESM (no bundling) but production requires build step. Adds complexity for browser-only workshop.
- **vs Webpack/Parcel:** Heavy build tools. Overkill for workshop, steep learning curve.
- **No build tools:** Participants edit HTML file, refresh browser. Instant feedback. AI-generated code works immediately.

**Firebase Hosting Deployment Flow:**
```bash
# In Firebase Studio terminal (or participants can use GUI)
firebase init hosting
firebase deploy
# Live URL in 10 seconds: https://project-name.web.app
```

## Supporting Libraries (Optional)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Tone.js** | 14.x | Audio synthesis | If workshop includes sound-reactive visuals. Import via CDN: `https://esm.sh/tone`. Warning: Adds complexity, defer to advanced module. | MEDIUM |
| **p5.js** | 1.11.x | Simple 2D sketches | For participants intimidated by Three.js. Alternative 2D-only track. Canvas mode via CDN. | LOW |
| **dat.GUI** | 0.7.x | Debug controls | Quick parameter tweaking UI. Useful for instructor demos. `https://esm.sh/dat.gui` | MEDIUM |

**Why NOT to use:**
- **React/Vue/Svelte:** Framework overhead for 3.5 hour workshop. Vanilla JS + Three.js sufficient.
- **TypeScript:** Type compilation adds build step. Use JSDoc for IDE hints instead.
- **TailwindCSS/Bootstrap:** CSS frameworks unnecessary. Inline styles or minimal `<style>` tag.

## Installation & Setup

### Participant Setup (5 minutes)

**Required:**
1. Modern browser (Chrome 100+, Edge 100+, Firefox 100+, Safari 18+)
2. Google account (for Firebase Studio + AI Studio)
3. Webcam (for computer vision exercises)

**Steps:**
1. Open https://aistudio.google.com → Get API key → Copy to clipboard
2. Open https://firebase.studio → Sign in → Create workspace → Select "Three.js + AI" template
3. Paste API key into `.env` file
4. Click "Preview" → Workshop begins

**Total setup time: < 5 minutes** (vs 30-60 minutes with local development)

### Instructor Pre-Workshop Checklist

- [ ] Create Firebase project for each major exercise (3-4 projects)
- [ ] Deploy starter templates to Firebase Hosting
- [ ] Test all CDN imports (esm.sh, jsdelivr, MediaPipe models)
- [ ] Verify Gemini API quotas (create backup API keys)
- [ ] Prepare offline fallback if venue WiFi fails (local model files on USB)

## Version Verification & Currency

| Technology | Current Version | Last Verified | Source |
|------------|-----------------|---------------|--------|
| Three.js | r182 | 2026-01-24 | [GitHub Releases](https://github.com/mrdoob/three.js/releases/tag/r182) |
| MediaPipe Tasks Vision | 0.10.22-rc | 2026-01-24 | [npm package](https://www.npmjs.com/package/@mediapipe/tasks-vision) |
| Gemini 3 Flash | Current | 2026-01-24 | [Gemini API Docs](https://ai.google.dev/gemini-api/docs/models) |
| Firebase Studio | Preview | 2026-01-24 | [Firebase Studio Docs](https://firebase.google.com/docs/studio) |
| Google AI Studio | Current | 2026-01-24 | [AI Studio](https://aistudio.google.com) |

**Training Data Warning:** Assistant training data ends January 2025. All version numbers verified via official documentation and WebSearch with 2026 date filters on 2026-01-24.

## Confidence Assessment

| Category | Confidence | Rationale |
|----------|------------|-----------|
| **AI Environment (Firebase Studio)** | HIGH | Official Google documentation, verified preview access, multiple confirmed use cases for workshops |
| **AI Models (Gemini 3)** | HIGH | Official API documentation, rate limits verified via multiple sources, free tier confirmed |
| **3D Graphics (Three.js r182)** | HIGH | Official GitHub release, version number verified, WebGPU support confirmed across browsers |
| **Computer Vision (MediaPipe)** | HIGH | Official Google library, npm package verified, performance benchmarks from multiple sources |
| **CDN Strategy (esm.sh)** | MEDIUM | Community-recommended solution, multiple confirming sources, but less "official" than other components |
| **Deployment (Firebase Hosting)** | HIGH | Official Firebase service, pricing/limits verified, widely used |

**Overall Stack Confidence: HIGH**

All core components (Firebase Studio, Gemini API, Three.js, MediaPipe) are official Google/Three.js Foundation products with verified 2026 currency. CDN approach is industry-standard practice for build-less development.

## What NOT to Use (and Why)

### Build Tools
- **Webpack, Rollup, Parcel:** Require local Node.js, npm install, configuration. Violates zero-install constraint.
- **Vite (local):** Excellent tool but needs npm. Reserve for post-workshop "next steps" guide.

### Alternative AI APIs
- **OpenAI GPT-4/GPT-4o:** Requires credit card. Non-negotiable blocker for workshop.
- **Anthropic Claude:** No free tier API. Excellent quality but paid-only.
- **Cohere, Together AI, etc.:** Smaller free tiers, less generous rate limits.

### Alternative Computer Vision
- **TensorFlow.js:** Slower than MediaPipe on most devices (except iOS). More complex API.
- **face-api.js:** Unmaintained since 2020, outdated models, security risks.
- **tracking.js, clmtrackr:** Ancient libraries (2014-2015), poor accuracy, no maintenance.

### Alternative 3D Libraries
- **Babylon.js:** Game-centric, heavier API surface. Three.js more beginner-friendly.
- **PlayCanvas:** Engine-first approach, requires editor. Not code-first.
- **Raw WebGL:** Too low-level for time-constrained workshop.

### Frameworks
- **React Three Fiber:** Adds React complexity. Vanilla Three.js sufficient and more AI-friendly.
- **Vue, Svelte, Angular:** Framework overhead for 3.5 hours. Stick to vanilla JS.

### TypeScript
- **TypeScript:** Requires compilation step (tsc or bundler). Use JSDoc for type hints in vanilla JS instead.

## Risk Mitigation

### Rate Limit Exhaustion
**Risk:** Participant exceeds 250 Gemini requests during workshop.
**Mitigation:**
1. Switch to Flash-Lite (1000 req/day)
2. Instructor shares backup API key for remainder
3. Implement client-side caching (store AI responses in localStorage)

### Venue WiFi Failure
**Risk:** 40 participants saturate venue network, CDN imports fail.
**Mitigation:**
1. Pre-deploy all starter code to Firebase Hosting (reduces live CDN requests)
2. Instructor brings offline package: USB with MediaPipe WASM files, Three.js bundle
3. Fallback: Pair programming (20 computers instead of 40)

### Browser Compatibility
**Risk:** Participant on older Safari/Firefox without WebGPU.
**Mitigation:** Three.js auto-fallback to WebGL2. MediaPipe supports WebGL backend. Workshop tested to IE11... just kidding, minimum Chrome 100/Safari 18.

### Mixed Skill Levels
**Risk:** Beginners struggle with Three.js, advanced users bored with basics.
**Mitigation:**
1. Gemini AI assistance (beginners ask AI to explain, advanced users ask for optimizations)
2. Tiered exercises: Core (everyone), Stretch (advanced), Simplified (2D with p5.js)
3. Firebase Studio App Prototyping mode for absolute beginners (no-code)

## Post-Workshop Recommendations

**For participants wanting to continue:**

1. **Migrate to local development:** Install Node.js + Vite for faster iteration, better debugging
2. **Explore Antigravity IDE:** Advanced AI agent workflows for production apps
3. **Upgrade to paid Gemini tier:** 1000+ requests/day for serious projects
4. **Add React Three Fiber:** Component-based 3D if building larger apps
5. **Explore Gemini 3 Pro:** Better quality for production (pay-per-token)
6. **Custom MediaPipe models:** Train gesture recognizer on custom hand signs

**Learning path:**
```
Workshop (browser-only)
  → Local Vite setup (npm + bundler)
  → TypeScript (type safety)
  → React Three Fiber (component architecture)
  → Production deployment (Vercel/Netlify/Firebase App Hosting)
```

## Sources

**AI Tools:**
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Firebase Studio Documentation](https://firebase.google.com/docs/studio)
- [Google AI Studio](https://aistudio.google.com)
- [Gemini API Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Google Antigravity IDE](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/)

**Graphics & Creative Coding:**
- [Three.js Official Site](https://threejs.org/)
- [Three.js r182 Release](https://github.com/mrdoob/three.js/releases/tag/r182)
- [Three.js WebGPU Documentation](https://threejs.org/docs/pages/WebGPURenderer.html)
- [Canvas API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

**Computer Vision:**
- [MediaPipe Tasks Vision](https://ai.google.dev/edge/mediapipe/solutions/guide)
- [MediaPipe Face Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js)
- [MediaPipe Gesture Recognizer](https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/web_js)
- [@mediapipe/tasks-vision npm](https://www.npmjs.com/package/@mediapipe/tasks-vision)

**CDN & Deployment:**
- [esm.sh Documentation](https://esm.sh/)
- [jsDelivr ESM CDN](https://www.jsdelivr.com/esm)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)

**Performance Comparisons:**
- [MediaPipe vs TensorFlow.js Performance](https://dj-ai.medium.com/mediapipe-1f6818a44c9)
- [Three.js WebGPU Performance](https://medium.com/@sudenurcevik/upgrading-performance-moving-from-webgl-to-webgpu-in-three-js-4356e84e4702)

**2026 Updates:**
- [Google AI Studio 2026 Review](https://aitoolanalysis.com/google-ai-studio-review/)
- [Firebase Studio Features](https://cloud.google.com/blog/products/application-development/firebase-studio-lets-you-build-full-stack-ai-apps-with-gemini)
- [Gemini 3 Release Notes](https://developers.googleblog.com/new-gemini-api-updates-for-gemini-3/)

---

**Last Updated:** 2026-01-24
**Next Review:** Before workshop (2026-01-28) - verify all CDN links, test API quotas, confirm Firebase Studio stability
