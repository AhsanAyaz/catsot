# Deploying Custom Project to Firebase

Deploy your custom AI + camera project to Firebase Hosting.

## Prerequisites

- [ ] Node.js installed (v16+)
- [ ] Firebase CLI: `npm install -g firebase-tools`
- [ ] Google account (free tier works)
- [ ] **Your custom project built and working locally**

## Before You Deploy

This is a blank template. Before deploying:

1. **Build your project** - See [EXAMPLES.md](./EXAMPLES.md) for 15 project ideas
2. **Test locally** - Open `template/index.html` in browser
3. **Verify camera works** - Helper modules need testing
4. **Check API integration** - Gemini API calls functioning

## Quick Deploy (5 minutes)

### 1. Login to Firebase

```bash
firebase login
```

### 2. Create Firebase Project

```bash
firebase projects:create --display-name "My Custom AI Project"
```

Or visit [Firebase Console](https://console.firebase.google.com/).

### 3. Set Up Hosting Target

From the repository root:

```bash
firebase target:apply hosting custom-template my-custom-project
```

### 4. Deploy

```bash
firebase deploy --only hosting:custom-template
```

Expected output:
```
+  Deploy complete!

Hosting URL: https://my-custom-project.web.app
```

## Local Testing

### Simple HTTP Server

```bash
# Python 3
python -m http.server 8000 --directory part2/custom-project/template

# Node.js (npx)
npx serve part2/custom-project/template

# PHP
php -S localhost:8000 -t part2/custom-project/template
```

### Firebase Emulator

```bash
firebase emulators:start --only hosting
```

Visit: http://localhost:5000

## Project-Specific Notes

### Helper Modules

Your template includes three helper modules in `template/helpers/`:

| Module | Purpose | Verify |
|--------|---------|--------|
| `camera.js` | Camera access and frame capture | Camera shows video feed |
| `firebase.js` | Firebase Realtime Database | (Only if using multiplayer) |
| `rendering.js` | Canvas drawing utilities | Shapes render correctly |

**Test each module** before deploying:

```javascript
// In browser console
import { initCamera } from './helpers/camera.js';
const video = await initCamera();
console.log('Camera working:', video.readyState === 4);
```

### Gemini API Configuration

If your project uses Gemini API:

1. API key should NOT be hardcoded in deployed code
2. Options for production:
   - Cloud Functions proxy (recommended)
   - Environment variables with server-side rendering
   - Rate-limited API endpoint

For workshop purposes, direct API calls are acceptable.

### File Structure Requirements

Firebase Hosting needs these in your public directory:

```
template/
  index.html      # Required: entry point
  style.css       # Your styles
  app.js          # Your main logic
  helpers/        # Helper modules
    camera.js
    firebase.js
    rendering.js
```

Ensure `index.html` exists and loads your scripts correctly.

## Troubleshooting

### "Firebase command not found"

```bash
npm install -g firebase-tools
firebase --version
```

### Deployed site shows blank page

1. Check `index.html` exists in template folder
2. Open DevTools (F12) > Console for errors
3. Verify script paths are relative (./app.js not /app.js)

### Camera not working

1. Check HTTPS (Firebase provides this)
2. Allow camera permissions in browser
3. Test locally first with `file://` or localhost

### Helper modules fail to import

1. Check paths in index.html:
   ```html
   <script type="module" src="./helpers/camera.js"></script>
   ```
2. Verify module files exist in template/helpers/
3. Check browser supports ES modules (Chrome/Firefox/Safari OK)

### Gemini API errors on deployed site

1. Check API key is valid
2. Verify quota hasn't been exceeded
3. Check CORS headers if using proxy
4. See infrastructure/SETUP.md for multi-key configuration

### Firebase config errors

1. Check .firebaserc has correct project ID
2. Verify hosting target is set up:
   ```bash
   firebase target
   ```
3. Re-run target setup if needed

## Deployment Checklist

Before sharing your custom project:

- [ ] index.html loads without errors
- [ ] Camera works (if used)
- [ ] AI features work (if used)
- [ ] No API keys visible in source
- [ ] Works on mobile browsers
- [ ] No console errors

## Examples to Build

Not sure what to build? Check [EXAMPLES.md](./EXAMPLES.md) for ideas:

**Solo Projects (35-45 min)**
- AI Mood Lighting
- Smart Photo Filter
- Gesture-Controlled Presentation

**Multiplayer Projects (50-65 min)**
- Emotion Matching Game
- Collaborative Drawing
- Dance Battle

**Creative Projects (45-60 min)**
- AI Music Visualizer
- AR Sticker Creator
- Story Generator

## Architecture Reference

For complex projects, consult [ARCHITECTURE-GUIDE.md](./ARCHITECTURE-GUIDE.md):

- Decision matrix for architecture choices
- Common patterns for AI + camera apps
- Anti-patterns to avoid
- Integration strategies

## Next Steps

After deployment:
- Share your creation
- Document what you built
- Consider adding features from other project paths
- Contribute ideas back to workshop examples
