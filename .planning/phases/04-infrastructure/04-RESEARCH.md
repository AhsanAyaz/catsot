# Phase 4: Infrastructure & Deployment - Research

**Researched:** 2026-01-25
**Domain:** Workshop Infrastructure, Firebase Deployment, Offline Fallbacks
**Confidence:** HIGH

## Summary

Infrastructure for a 40-person browser-based workshop using Firebase Studio requires three primary components: Firebase Local Emulator Suite for offline development, Firebase Hosting/App Hosting for one-click deployment, and CDN-based dependencies with local fallbacks. The research reveals that Firebase Studio (Google's browser-based IDE) provides native support for all workshop requirements without requiring npm installs or local setup.

The standard approach is Firebase Local Emulator Suite for offline/local development, Firebase App Hosting for one-click deployment from Firebase Studio, and CDN delivery (jsDelivr/unpkg) for dependencies with local copies as fallback. Firebase Realtime Database has built-in offline capabilities on web (automatic caching), though not full disk persistence like native platforms. API quota monitoring should use Google Cloud Console's real-time quota tracking with backup API keys in a round-robin fallback pattern.

Workshop-specific considerations are critical: Firebase Studio requires no pre-work (browser-only), emulators provide realistic Firebase behavior without production dependencies, and CDN-based architecture eliminates npm install entirely. For 40 simultaneous users with Gemini API, quota monitoring and backup keys are essential to prevent workshop interruptions.

**Primary recommendation:** Use Firebase Local Emulator Suite for offline fallbacks, Firebase App Hosting for one-click deployment from Firebase Studio, CDN-based dependencies with local copies bundled in project, and multiple Gemini API keys with round-robin fallback strategy.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Firebase Local Emulator Suite | Latest (2026) | Local Firebase development/testing | Official Google tool, production-grade emulation, zero cloud dependency |
| Firebase CLI | Latest | Deployment and project management | Official Firebase deployment tool, one-command deploy |
| Firebase App Hosting | Latest | Automated hosting with CDN | Integrated with Firebase Studio, one-click publish |
| Firebase Realtime Database | 10.7.1+ (modular) | Real-time data sync | Built-in offline caching, presence detection, CDN-available |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| html5-qrcode | 2.3.8 | QR code scanning | Camera-based multiplayer workshop projects |
| MediaPipe Tasks Vision | 0.10.16+ | Face detection/tracking | Face-reactive workshop projects |
| Firebase SDK (modular) | 10.7.1 | Firebase client SDK | Web projects using Firebase services |
| Three.js | r160+ | 3D graphics | 3D visualization projects |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Firebase Hosting | Vercel/Netlify | Firebase integrates with Studio, others require separate config |
| Firebase Emulators | Mock servers | Emulators provide realistic Firebase behavior, mocks are simpler but less accurate |
| CDN dependencies | Bundled npm packages | CDN eliminates build step, npm gives offline control but requires tooling |

**Installation (for local development outside Firebase Studio):**
```bash
npm install -g firebase-tools
firebase init
firebase emulators:start
```

**Workshop Setup (Firebase Studio - no installation required):**
Firebase Studio provides browser-based environment with Firebase tools pre-installed. Projects can import from GitHub or start from scratch with zero local setup.

## Architecture Patterns

### Recommended Project Structure
```
project/
├── index.html              # Entry point with CDN script tags
├── src/
│   ├── main.js            # App initialization
│   ├── firebase.js        # Firebase config (local emulator or production)
│   └── [feature].js       # Feature modules
├── firebase.json          # Emulator and hosting config
├── .firebaserc            # Firebase project aliases
└── backup/
    ├── libs/              # Local CDN fallback copies
    └── mock-api.js        # Offline API fallback (optional)
```

### Pattern 1: CDN with Local Fallback
**What:** Load dependencies from CDN with automatic fallback to local copies if CDN fails
**When to use:** Workshop environments where internet may be unreliable but initial load succeeded
**Example:**
```html
<!-- Primary: CDN -->
<script src="https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

<!-- Fallback: Local copy -->
<script>
  window.Html5Qrcode || document.write('<script src="backup/libs/html5-qrcode.min.js"><\/script>');
</script>
```

### Pattern 2: Firebase Emulator for Offline Development
**What:** Use Firebase Local Emulator Suite to simulate Firebase services without internet
**When to use:** Workshop setup, testing, offline development
**Example:**
```javascript
// firebase.json
{
  "emulators": {
    "database": { "port": 9000 },
    "ui": { "enabled": true, "port": 4000 }
  }
}

// src/firebase.js - Auto-detect environment
const firebaseConfig = window.location.hostname === 'localhost'
  ? { databaseURL: "http://127.0.0.1:9000?ns=workshop-demo" }
  : { /* production config */ };
```

### Pattern 3: Firebase Realtime Database Offline Capabilities
**What:** Leverage built-in offline caching and presence detection
**When to use:** Always for Firebase Realtime Database on web
**Example:**
```javascript
// Source: Firebase official docs - https://firebase.google.com/docs/database/web/offline-capabilities
import { ref, onValue, onDisconnect, serverTimestamp } from 'firebase/database';

// Monitor connection status
const connectedRef = ref(db, '.info/connected');
onValue(connectedRef, (snapshot) => {
  if (snapshot.val() === true) {
    console.log('Connected');
    // Set up presence detection
    const userStatusRef = ref(db, `/status/${userId}`);
    onDisconnect(userStatusRef).set({
      state: 'offline',
      last_changed: serverTimestamp()
    });
  }
});
```

### Pattern 4: API Key Round-Robin Fallback
**What:** Multiple API keys with automatic rotation and fallback on quota errors
**When to use:** Workshop with multiple participants hitting same API (Gemini)
**Example:**
```javascript
// Gemini API with backup keys
const API_KEYS = [
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3
];
let currentKeyIndex = 0;

async function callGeminiAPI(prompt) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      headers: { 'Authorization': `Bearer ${API_KEYS[currentKeyIndex]}` }
    });

    if (response.status === 429) { // Quota exceeded
      currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
      console.log(`Switching to backup key ${currentKeyIndex + 1}`);
      return callGeminiAPI(prompt); // Retry with next key
    }

    return response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
```

### Pattern 5: Firebase Studio One-Click Deployment
**What:** Deploy directly from Firebase Studio to Firebase App Hosting
**When to use:** Publishing workshop projects for participants
**Example:**
```bash
# CLI alternative (outside Firebase Studio)
firebase deploy --only hosting

# Firebase Studio: Click "Publish" button in IDE
# Automatically builds, deploys to App Hosting with CDN
```

### Anti-Patterns to Avoid
- **Hardcoding production Firebase config in workshop code:** Use environment detection to switch between emulator and production
- **Relying solely on CDN without fallback:** Always include local copies for critical dependencies
- **Single API key for 40 participants:** Guarantee quota exhaustion and workshop failure
- **No offline fallback for APIs:** Network issues will block all participants
- **Using npm dependencies in Firebase Studio projects:** Breaks browser-only constraint, requires build step

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| QR code scanning | Custom camera + detection algorithm | html5-qrcode library | Cross-browser camera access, format handling, error correction |
| Firebase offline detection | Custom ping/heartbeat system | Firebase `.info/connected` ref | Built-in, server-synced, handles edge cases |
| API quota monitoring | Manual request counting | Google Cloud Console quotas | Real-time tracking across all API keys, historical data |
| Local Firebase testing | Mock objects/stub responses | Firebase Local Emulator Suite | Realistic behavior, triggers, persistence, UI dashboard |
| CDN fallback loading | Custom script loader | Standard CDN fallback pattern | Browser-tested, handles timing issues, minimal code |
| API key rotation | Manual key switching | Round-robin with automatic fallback | Prevents downtime, distributes load, handles errors gracefully |

**Key insight:** Firebase and Google Cloud provide production-grade tooling for every infrastructure problem in this workshop. Custom solutions add complexity, bugs, and maintenance burden without benefit.

## Common Pitfalls

### Pitfall 1: Firebase Realtime Database Web Limitations
**What goes wrong:** Assuming web SDK has same offline capabilities as native (Android/iOS)
**Why it happens:** Documentation mentions "offline capabilities" but web has limited disk persistence
**How to avoid:** Use Firebase Local Emulator Suite for true offline development, rely on automatic caching (not full persistence) for production web apps
**Warning signs:** Expecting database queries to work fully offline without emulator; participants can't access data when WiFi drops

### Pitfall 2: CDN Dependency Failures Mid-Workshop
**What goes wrong:** CDN is blocked/slow/down, all 40 participants can't load dependencies
**Why it happens:** Assuming CDNs are 100% reliable; corporate/conference networks may block certain CDNs
**How to avoid:** Bundle local copies of all CDN dependencies in project; implement automatic fallback pattern; test on actual workshop network beforehand
**Warning signs:** Slow initial load times; console errors about failed script loads; projects work at home but not in workshop venue

### Pitfall 3: Gemini API Quota Exhaustion
**What goes wrong:** First 5-10 participants use API successfully, then 429 errors for everyone
**Why it happens:** Free tier Gemini API: 15 RPM, 1500 RPD - inadequate for 40 participants
**How to avoid:** Google-sponsored API keys (mentioned in project context), multiple backup keys with round-robin fallback, quota monitoring dashboard
**Warning signs:** Intermittent API failures; errors during peak usage; some participants work, others don't

### Pitfall 4: Firebase Studio Billing Requirements
**What goes wrong:** Participants can't deploy because Firebase App Hosting requires Cloud Billing account
**Why it happens:** Firebase Studio is free, but App Hosting integration requires billing enabled
**How to avoid:** Set up shared Firebase project with billing for workshop, or use Firebase Hosting (no billing required) instead of App Hosting, or deploy from CLI rather than Studio publish button
**Warning signs:** "Cloud Billing required" errors when clicking publish; deployment failures after successful builds

### Pitfall 5: Emulator Data Loss Between Sessions
**What goes wrong:** Participants restart emulator and lose all multiplayer session data
**Why it happens:** Emulators don't persist data by default unless configured
**How to avoid:** Document emulator persistence setup in workshop materials, or use production Firebase for shared multiplayer sessions
**Warning signs:** Multiplayer sessions disappear on refresh; QR codes become invalid after emulator restart

### Pitfall 6: Mixed HTTP/HTTPS Content Blocking
**What goes wrong:** HTTPS page loads, but Firebase emulator (HTTP) is blocked by browser
**Why it happens:** Browsers block mixed content (HTTP resources on HTTPS pages)
**How to avoid:** Run workshop projects on localhost (not HTTPS) when using emulators, or proxy emulator through HTTPS
**Warning signs:** Firebase connection errors only when deployed; emulator works locally but not on deployed site

## Code Examples

Verified patterns from official sources:

### Firebase Emulator Configuration
```json
// firebase.json
// Source: Firebase Local Emulator Suite docs
{
  "database": {
    "rules": "database.rules.json"
  },
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  },
  "emulators": {
    "database": {
      "port": 9000
    },
    "hosting": {
      "port": 5000
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

### Environment-Aware Firebase Config
```javascript
// Source: Existing project structure in part2/camera-game/reference/src/multiplayer.js
const firebaseConfig = window.location.hostname === 'localhost'
  ? {
      databaseURL: "http://127.0.0.1:9000?ns=workshop-demo"
    }
  : {
      apiKey: "...",
      authDomain: "...",
      databaseURL: "https://...",
      projectId: "...",
      storageBucket: "...",
      messagingSenderId: "...",
      appId: "..."
    };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
```

### Presence Detection with Offline Fallback
```javascript
// Source: Firebase Realtime Database offline capabilities docs
// https://firebase.google.com/docs/database/web/offline-capabilities
import { ref, onValue, onDisconnect, set, serverTimestamp } from 'firebase/database';

// Monitor connection
const connectedRef = ref(db, '.info/connected');
onValue(connectedRef, (snapshot) => {
  if (snapshot.val() === true) {
    console.log('Connected to Firebase');

    // Set up presence
    const userStatusRef = ref(db, `/status/${userId}`);

    // When I disconnect, mark as offline
    onDisconnect(userStatusRef).set({
      state: 'offline',
      last_changed: serverTimestamp()
    });

    // I'm online
    set(userStatusRef, {
      state: 'online',
      last_changed: serverTimestamp()
    });
  } else {
    console.log('Disconnected from Firebase');
  }
});
```

### CDN Loading with Automatic Fallback
```html
<!-- Source: Community best practices, verified across multiple sources -->
<!DOCTYPE html>
<html>
<head>
  <!-- Firebase SDK from CDN -->
  <script type="module">
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
    import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

    window.firebaseApp = initializeApp;
    window.firebaseDatabase = { getDatabase, ref, onValue };
  </script>

  <!-- html5-qrcode from CDN with fallback -->
  <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
  <script>
    window.Html5Qrcode || document.write('<script src="backup/libs/html5-qrcode.min.js"><\/script>');
  </script>

  <!-- MediaPipe from CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"></script>
</head>
</html>
```

### API Quota Monitoring Setup
```javascript
// Source: Google Cloud quotas best practices
// Real-time monitoring: Google Cloud Console > IAM & Admin > Quotas
// Programmatic access via Cloud Monitoring API

// Client-side quota-aware wrapper
class QuotaAwareAPI {
  constructor(keys) {
    this.keys = keys;
    this.currentIndex = 0;
    this.requestCounts = new Array(keys.length).fill(0);
    this.lastReset = Date.now();
  }

  async call(endpoint, options) {
    const MAX_RETRY = this.keys.length;
    let attempts = 0;

    while (attempts < MAX_RETRY) {
      const key = this.keys[this.currentIndex];

      try {
        const response = await fetch(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${key}`
          }
        });

        if (response.status === 429) {
          console.warn(`Quota exceeded for key ${this.currentIndex + 1}`);
          this.currentIndex = (this.currentIndex + 1) % this.keys.length;
          attempts++;
          continue;
        }

        this.requestCounts[this.currentIndex]++;
        return response;

      } catch (error) {
        console.error(`API call failed with key ${this.currentIndex + 1}:`, error);
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;
        attempts++;
      }
    }

    throw new Error('All API keys exhausted or failed');
  }

  getStats() {
    return {
      currentKey: this.currentIndex + 1,
      requestCounts: this.requestCounts,
      totalRequests: this.requestCounts.reduce((a, b) => a + b, 0)
    };
  }
}

// Usage
const geminiAPI = new QuotaAwareAPI([
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3
]);

const response = await geminiAPI.call('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
  method: 'POST',
  body: JSON.stringify({ prompt: '...' })
});

console.log('API Stats:', geminiAPI.getStats());
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Firebase SDK (compat) | Firebase SDK (modular) | v9.0.0 (2021) | Tree-shaking, smaller bundles, better for CDN |
| Project IDX | Firebase Studio | April 2025 | Rebranded, tighter Firebase integration |
| Firebase compat imports | ES modules from CDN | v9+ | Direct browser imports, no bundler needed |
| Manual emulator setup | Firebase Local Emulator Suite UI | 2020+ | Visual dashboard, easier debugging |
| Firebase Hosting only | Firebase App Hosting | 2025 | SSR support, better Studio integration |

**Deprecated/outdated:**
- **Firebase SDK v8 (compat):** Still works but larger bundle size, use modular v10+ for new projects
- **firebase-server (community):** Replaced by official Firebase Local Emulator Suite
- **Project IDX branding:** Now Firebase Studio (same product, new name as of April 2025)

## Open Questions

Things that couldn't be fully resolved:

1. **Firebase Studio workspace limits for workshop**
   - What we know: Free tier has workspace limits, Google Developer Program increases limits
   - What's unclear: Exact free tier limit, cost of Google Developer Program, whether 40 participants need individual workspaces or can share
   - Recommendation: Contact Google workshop support about educational/event workspace allocation; alternative is direct GitHub + Firebase CLI deployment bypassing Studio

2. **MediaPipe wasm files CDN reliability**
   - What we know: MediaPipe 0.10.16 had missing wasm folder on jsDelivr, previous versions worked
   - What's unclear: Whether issue is resolved, which version to recommend, reliability of wasm CDN delivery
   - Recommendation: Test specific MediaPipe version before workshop, bundle wasm files locally as backup, use version 0.10.15 or earlier if 0.10.16+ problematic

3. **Gemini API quota for Google-sponsored access**
   - What we know: Project context mentions "Google-sponsored API access" for workshop
   - What's unclear: Specific quota limits for sponsored keys, whether higher than standard tiers, how to monitor
   - Recommendation: Clarify with Google sponsor contact what quota limits apply; assume need backup keys regardless; implement quota monitoring before workshop

4. **Firebase Realtime Database web offline duration**
   - What we know: Web SDK has automatic caching but not full persistence
   - What's unclear: How long cached data persists, what triggers cache invalidation, whether sufficient for brief WiFi drops
   - Recommendation: Test offline behavior with actual workshop scenarios; use emulator for guaranteed offline access during development

## Sources

### Primary (HIGH confidence)
- Firebase Official Documentation
  - [Firebase Studio](https://firebase.google.com/docs/studio) - Updated 2026-01-21
  - [Firebase Studio Deployment](https://firebase.google.com/docs/studio/deploy-app)
  - [Firebase Hosting](https://firebase.google.com/docs/hosting) - Updated 2026-01-21
  - [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) - Updated 2026-01-21
  - [Firebase Realtime Database Offline Capabilities](https://firebase.google.com/docs/database/web/offline-capabilities) - Updated 2026-01-12
  - [Firebase Hosting Quickstart](https://firebase.google.com/docs/hosting/quickstart) - Updated 2026-01-21
  - [Firebase CLI Reference](https://firebase.google.com/docs/cli)

- Google AI/Gemini Documentation
  - [Gemini API Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
  - [Gemini API Quotas](https://developers.google.com/gemini-code-assist/resources/quotas)

- CDN Libraries
  - [html5-qrcode on cdnjs](https://cdnjs.com/libraries/html5-qrcode)
  - [html5-qrcode GitHub](https://github.com/mebjas/html5-qrcode)
  - [MediaPipe Tasks Vision on jsDelivr](https://www.jsdelivr.com/package/npm/@mediapipe/tasks-vision)

### Secondary (MEDIUM confidence)
- [Firebase Studio Educational Course - Great Learning](https://www.mygreatlearning.com/academy/learn-for-free/courses/firebase-studio-for-beginners-build-and-deploy-apps) (2026)
- [Firebase Studio: The Ultimate All-in-One Dev Tool](https://dev.to/proflead/googles-firebase-studio-the-ultimate-all-in-one-dev-tool-36jm)
- [API Key Rotation Best Practices](https://blog.gitguardian.com/api-key-rotation-best-practices/)
- [Gemini API Rate Limits Complete Guide 2026](https://www.aifreeapi.com/en/posts/gemini-api-rate-limits-per-tier)
- [jsDelivr vs unpkg vs cdnjs Comparison](https://blog.blazingcdn.com/en-us/jsdelivr-vs-unpkg-vs-cdnjs-best-free-cdn-for-open-source-projects)

### Tertiary (LOW confidence)
- [Use Gemini API with OpenAI Fallback](https://sometechblog.com/posts/try-gemini-api-with-openai-fallback/) - Good pattern but not officially documented
- [Firebase Realtime Database Web Offline Demo](https://github.com/dandv/firebase-db-web-offline) - Community example

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All recommendations from official Firebase/Google documentation updated in 2026
- Architecture patterns: HIGH - Patterns verified in official docs and existing project code
- Pitfalls: MEDIUM - Based on documented limitations plus community experiences, some workshop-specific scenarios untested
- API quotas: MEDIUM - Official quota docs exist, but Google-sponsored access details unclear

**Research date:** 2026-01-25
**Valid until:** 2026-02-25 (30 days - Firebase ecosystem relatively stable, but quota limits may change)

**Workshop-specific notes:**
- All findings assume Firebase Studio browser-based environment (zero local setup)
- CDN strategy critical for no-npm-install requirement
- Offline fallbacks tested against real workshop scenarios recommended
- Google sponsorship details should be confirmed with workshop organizer contact
