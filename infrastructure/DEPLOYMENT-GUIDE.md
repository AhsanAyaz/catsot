# Workshop Deployment Guide for Facilitators

Complete guide for deploying workshop projects to Firebase Hosting. Covers pre-workshop setup, during-workshop deployment workflow, and post-workshop cleanup.

## Pre-Workshop Setup (1 week before)

### 1. Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name: `code-speed-thought-workshop-[date]` (e.g., `code-speed-thought-workshop-20260128`)
4. Disable Google Analytics (not needed for workshop)
5. Note project ID (e.g., `workshop-stockholm-20260128`)

### 2. Configure Firebase Hosting

```bash
# From repository root
firebase init hosting
```

When prompted:
- **Project:** Select the workshop project created above
- **Public directory:** `part2/face-reactive/starter` (we'll add others via firebase.json)
- **Single-page app:** Yes (for face-reactive)
- **GitHub deployment:** No

The root `firebase.json` already contains all 5 hosting targets - verify configuration matches.

### 3. Set Up Hosting Targets

**IMPORTANT:** This step is required before first deploy. Run these commands to create the target-to-site mapping:

```bash
# Replace YOUR-PROJECT-ID with your actual project ID
firebase target:apply hosting face-reactive-starter YOUR-PROJECT-ID-face-starter
firebase target:apply hosting face-reactive-reference YOUR-PROJECT-ID-face-ref
firebase target:apply hosting camera-game-starter YOUR-PROJECT-ID-game-starter
firebase target:apply hosting camera-game-reference YOUR-PROJECT-ID-game-ref
firebase target:apply hosting custom-template YOUR-PROJECT-ID-custom

# Example with real project ID:
# firebase target:apply hosting face-reactive-starter workshop-stockholm-face-starter
```

**Verify:** `cat .firebaserc` shows all targets configured under your project ID.

### 4. Deploy Reference Implementations

Deploy the reference implementations so you can demo them during the workshop:

```bash
firebase deploy --only hosting:face-reactive-reference
firebase deploy --only hosting:camera-game-reference
firebase deploy --only hosting:custom-template
```

**Save the URLs** for demo during workshop:
- Face-reactive: `https://[project-id]-face-ref.web.app`
- Camera-game: `https://[project-id]-game-ref.web.app`
- Custom: `https://[project-id]-custom.web.app`

### 5. Enable Firebase Realtime Database (for camera-game)

The camera-game project uses Firebase Realtime Database for multiplayer sync:

1. Firebase Console -> Realtime Database
2. Click "Create database"
3. Select location (choose closest to workshop venue)
4. **Start in test mode** for workshop (allows read/write without auth)
5. Copy database URL: `https://[project-id]-default-rtdb.firebaseio.com`

**Update production config** in `part2/camera-game/reference/src/multiplayer.js`:

```javascript
const firebaseConfig = window.location.hostname === 'localhost'
  ? { databaseURL: "http://127.0.0.1:9000?ns=workshop-demo" }
  : {
      apiKey: "[from Firebase Console]",
      authDomain: "[project-id].firebaseapp.com",
      databaseURL: "https://[project-id]-default-rtdb.firebaseio.com",
      projectId: "[project-id]",
      storageBucket: "[project-id].appspot.com",
      messagingSenderId: "[from Firebase Console]",
      appId: "[from Firebase Console]"
    };
```

Get these values from: Firebase Console -> Project Settings -> General -> Your apps -> Web app

### 6. Test Deployment End-to-End

```bash
# Test local emulator
firebase emulators:start --only hosting

# Visit http://localhost:5000 and verify:
# - Face-reactive: Camera works, face detection functional
# - Camera-game: QR scanner works, multiplayer syncs
```

## Critical Deployment Notes

These issues were discovered during verification and **must be addressed**:

### MediaPipe ES Module Import

MediaPipe tasks-vision **must be imported as ES module in JavaScript**, not via script tag:

```javascript
// CORRECT - ES module import in your JavaScript file
import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs';

// WRONG - script tag import
// <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision"></script>
```

### MediaPipe Version Pinning

Use **MediaPipe v0.10.3** specifically for stability:
- Version 0.10.15+ has WASM file loading issues
- Version 0.10.16+ has missing file issues
- v0.10.3 is tested and working

### Backup Files Location

Backup files must be **copied into each project folder**, not referenced from root:

```
part2/face-reactive/starter/backup/
part2/face-reactive/reference/backup/
part2/camera-game/starter/backup/
part2/camera-game/reference/backup/
```

The `backup/` folder at repository root is for source files only.

### Firebase target:apply Required

The `firebase target:apply` command **must run before first deploy**:

```bash
# This MUST run before firebase deploy will work
firebase target:apply hosting face-reactive-starter your-site-name
```

## During Workshop

### Attendee Deployment Workflow

**Option A: Individual Firebase Projects (Recommended for <20 attendees)**

Each attendee creates their own Firebase project:

**Pros:**
- Full ownership - can modify after workshop
- No shared quota concerns
- Independent deployment

**Cons:**
- Requires Google account
- 5-10 min setup time
- Some attendees may struggle with CLI

**Instructions:** Direct attendees to `part2/[project]/DEPLOY.md`

**Option B: Shared Workshop Project (Recommended for 20+ attendees)**

All attendees deploy to workshop project with different site names:

**Pros:**
- No account creation needed
- Faster setup (2-3 min)
- Facilitator can help debug centrally

**Cons:**
- Attendees can't modify after workshop
- Quota shared across all attendees
- Requires adding attendees as Editors

**Setup:**
1. Add attendees as Editors to workshop Firebase project
2. Each attendee runs:
   ```bash
   firebase target:apply hosting my-project workshop-attendee-[name]
   firebase deploy --only hosting:my-project
   ```

### Common Deployment Issues

**Issue: "Firebase command not found"**

```bash
# Solution: Install Firebase CLI
npm install -g firebase-tools

# Verify installation
firebase --version
```

Backup: Use [Firebase Studio](https://firebasestudio.google.com) (browser-based, no CLI needed)

---

**Issue: "Permission denied" during deploy**

```bash
# Solution: Re-authenticate
firebase login

# Select correct Google account when browser opens
```

Verify: User has Editor role on Firebase project (Firebase Console -> Project Settings -> Users)

---

**Issue: "Error: No hosting target(s) defined"**

The target-to-site mapping is missing. Run `firebase target:apply` first:

```bash
# Must run before deploy
firebase target:apply hosting face-reactive-starter your-site-name
firebase deploy --only hosting:face-reactive-starter
```

---

**Issue: Deployed site shows blank page**

1. **Check browser console** (F12 -> Console tab) for errors
2. **Common causes:**
   - CDN blocked by corporate network -> Use local backup files
   - MediaPipe model 404 -> Check CDN version is 0.10.3
   - Firebase config missing -> Update multiplayer.js for camera-game

3. **Debug steps:**
   ```bash
   # Test locally first
   firebase emulators:start --only hosting
   # Visit http://localhost:5000
   ```

---

**Issue: Camera not working on deployed site**

1. **Verify HTTPS:** Firebase Hosting provides HTTPS automatically. URL should start with `https://`
2. **Check permissions:** Browser should prompt for camera access
3. **Test in incognito:** Clean permissions state, no cached denials
4. **iOS Safari:** Requires explicit user gesture (tap button) before camera access

---

**Issue: Multiplayer not syncing (camera-game)**

1. **Verify database created:** Firebase Console -> Realtime Database should show your database
2. **Check rules:** Database should be in "test mode" (read/write allowed)
3. **Update config:** `multiplayer.js` needs production Firebase config (not emulator URL)
4. **Test:** Open site in 2 browser tabs, verify data syncs

---

**Issue: Gemini API 429 errors (quota exhausted)**

```bash
# Switch to backup key
export GEMINI_API_KEY_2="AIza..."
# Or enable offline mock
window.GEMINI_OFFLINE_MODE = true
```

See `infrastructure/SETUP.md` for multi-key configuration.

---

**Issue: MediaPipe "Failed to load" error**

Specific to face-reactive project:

1. **Check import method:** Must use ES module import (see Critical Notes above)
2. **Check version:** Must use v0.10.3
3. **Check network:** CDN must be accessible
4. **Fallback:** Copy backup files to project folder, update paths

### Monitoring During Workshop

**Firebase Console Dashboard:**
- **Hosting:** Monitor request volume, bandwidth usage
- **Realtime Database:** Monitor concurrent connections (limit: 100 free tier)
- **Usage:** Check for approaching quota limits

**Expected Workshop Load:**
| Metric | Expected | Free Tier Limit |
|--------|----------|-----------------|
| Hosting bandwidth | ~500 MB | 10 GB/month |
| Database connections | 20-30 concurrent | 100 concurrent |
| Gemini API requests | 500-800 total | 15 RPM/key |
| Deployments | 40 sites | Unlimited |

**API Quota Management:**
- 3 API keys = 2,700 requests/hour capacity
- Workshop needs 500-800 = 3-5x safety margin
- Rotate keys if one exhausts: See `infrastructure/SETUP.md`

## Post-Workshop

### Attendee Access

**Individual projects (Option A):**
- Attendees retain full ownership
- They can deploy updates indefinitely
- No action needed from facilitator

**Shared project (Option B):**
- Export attendee sites before deletion
- Provide ZIP of deployed files to attendees

Export command:
```bash
# Clone a deployed site to local directory
firebase hosting:clone [source-site] ./archive/[attendee-name]
```

### Cleanup

1. **Archive workshop materials:**
   ```bash
   # Clone all reference implementations
   firebase hosting:clone workshop-face-ref ./archive/face-reactive/
   firebase hosting:clone workshop-game-ref ./archive/camera-game/
   ```

2. **Delete workshop Firebase project (optional):**
   - Firebase Console -> Project Settings -> Delete Project
   - **This is irreversible** - confirm all materials archived first

3. **Share final materials with attendees:**
   - GitHub repo URL: `https://github.com/[user]/code-at-speed-of-thought`
   - Reference implementation URLs (save before deleting project)
   - Cheatsheet PDF: `materials/cheatsheet.pdf`
   - Slide deck: `materials/slides/` (Marp source)

### Archival Checklist

- [ ] All reference implementations cloned locally
- [ ] Attendee feedback collected
- [ ] Any issues documented for next workshop
- [ ] GitHub repo updated with any fixes discovered
- [ ] Workshop Firebase project deleted (if desired)

## Troubleshooting Reference

Quick reference table for common issues:

| Symptom | Diagnosis | Fix |
|---------|-----------|-----|
| Blank deployed page | Path error | Check public directory in firebase.json |
| Camera permission denied | HTTPS missing | Verify URL starts with https:// |
| MediaPipe 404 | CDN version mismatch | Use v0.10.3, not 0.10.15+ |
| "Failed to load" MediaPipe | Wrong import | Use ES module import, not script tag |
| Firebase DB not syncing | Config missing | Update multiplayer.js with production config |
| "No hosting targets" | target:apply missing | Run `firebase target:apply` before deploy |
| Gemini API 429 errors | Quota exhausted | Switch to backup key or offline mock |
| Deploy command hangs | Network issue | Check WiFi, try `firebase deploy --debug` |
| Multiple 404s on deploy | Relative paths | Use paths relative to project root |
| iOS Safari camera fails | No user gesture | Require button tap before camera access |

## Workshop Venue Network Considerations

**Test 1 week before workshop day:**

1. **Firebase CLI works on venue WiFi:**
   ```bash
   firebase projects:list
   firebase deploy --only hosting:face-reactive-starter
   ```

2. **CDNs accessible:**
   - `cdn.jsdelivr.net` (MediaPipe)
   - `unpkg.com` (QR scanner)
   - `www.gstatic.com` (Firebase, Google fonts)

3. **Camera permissions work:**
   - Some corporate networks block WebRTC
   - Test camera access in browser

4. **Deploy speed acceptable:**
   - Should be <2 min per site
   - If slow, consider pre-deploying starter templates

**Backup Plan for Network Issues:**

| Problem | Backup |
|---------|--------|
| CDNs blocked | Use local backup files in each project |
| Firebase CLI blocked | Mobile hotspot for facilitator |
| Camera blocked by network | Use localhost only, no deployment |
| Slow network | Pre-deploy all templates, attendees work on deployed versions |

**Offline-Only Workshop Mode:**

If network is unreliable, run workshop with emulators only:

```bash
firebase emulators:start --only hosting,database
```

- All features work locally
- No shareable URLs (localhost only)
- Export project ZIPs for attendees to deploy later

## Related Documentation

- **Per-project guides:** `part2/*/DEPLOY.md` - Attendee-facing deployment instructions
- **API quota setup:** `infrastructure/SETUP.md` - Multi-key API configuration
- **Quota monitoring:** `infrastructure/quota-monitor.js` - Real-time quota tracking
- **Offline fallbacks:** `backup/` - CDN fallback libraries

---

*Last updated: 2026-01-26*
*Tested with: Firebase CLI 13.x, Node.js 20.x*
