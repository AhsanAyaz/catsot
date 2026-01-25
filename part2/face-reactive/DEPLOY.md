# Deploying Face-Reactive Project to Firebase

Deploy your emotion-reactive particle system to Firebase Hosting and get a shareable URL.

## Prerequisites

- [ ] Node.js installed (v16+)
- [ ] Firebase CLI: `npm install -g firebase-tools`
- [ ] Google account (free tier works)
- [ ] Project code working locally

## Quick Deploy (5 minutes)

### 1. Login to Firebase

```bash
firebase login
```

Opens browser for Google account authentication. Allow Firebase CLI access.

### 2. Create Firebase Project (first time only)

```bash
firebase projects:create --display-name "My Face Reactive App"
```

Or visit [Firebase Console](https://console.firebase.google.com/) and click "Add project".

### 3. Set Up Hosting Target

From the repository root:

```bash
# Apply hosting target
firebase target:apply hosting face-reactive-starter my-face-reactive-app

# Or for reference implementation
firebase target:apply hosting face-reactive-reference my-face-reactive-reference
```

### 4. Deploy

```bash
# Deploy your starter project
firebase deploy --only hosting:face-reactive-starter

# Or deploy the reference implementation
firebase deploy --only hosting:face-reactive-reference
```

Expected output:
```
+  Deploy complete!

Project Console: https://console.firebase.google.com/project/[project-id]/overview
Hosting URL: https://my-face-reactive-app.web.app
```

### 5. Share Your Project

Copy the Hosting URL and share it. Anyone with the link can try your project.

## Local Testing Before Deploy

Test your project locally with Firebase Emulator:

```bash
# From repository root
firebase emulators:start --only hosting
```

Visit: http://localhost:5000

This lets you catch issues before deploying.

## Project-Specific Notes

### MediaPipe Model Download

**First load may be slow** - MediaPipe face detection model is ~8MB.
- Initial load: 10-30 seconds depending on connection
- Subsequent loads: Cached by browser (instant)
- The loading indicator shows download progress

### Camera Permissions

**HTTPS is required for camera access.** Firebase Hosting provides HTTPS automatically.

If camera doesn't work:
1. Check browser shows lock icon in URL bar (HTTPS)
2. Click camera icon in address bar to check permissions
3. Allow camera access when prompted
4. Refresh page after granting permission

### SPA Routing

This project uses Single-Page App (SPA) configuration:
- All routes redirect to index.html
- This is configured in firebase.json `rewrites` section
- Correct behavior for client-side routing

### CDN Fallback

The project loads dependencies from CDN with local fallbacks:
- MediaPipe: cdn.jsdelivr.net with backup in `/backup/libs/`
- If CDN fails, local copies load automatically
- Check browser console for "Loaded from backup" messages

## Troubleshooting

### "Firebase command not found"

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Verify installation
firebase --version
```

### "Permission denied" during deploy

```bash
# Re-authenticate
firebase login --reauth

# Verify you have access to the project
firebase projects:list
```

### "Deployment fails with hosting errors"

1. Verify public directory exists:
   ```bash
   ls part2/face-reactive/starter/index.html
   ```

2. Check firebase.json configuration:
   ```bash
   cat firebase.json | grep face-reactive
   ```

3. Force redeploy:
   ```bash
   firebase deploy --only hosting:face-reactive-starter --force
   ```

### Deployed site shows blank page

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Common issues:
   - **MediaPipe 404**: Check CDN URL version matches backup (0.10.15)
   - **CORS errors**: Verify all assets use relative paths
   - **Camera blocked**: Check HTTPS and permissions

### Camera shows black/frozen

1. Close other apps using camera (Zoom, Teams, etc.)
2. Try different browser (Chrome recommended)
3. Check browser camera permissions in Settings
4. On iOS Safari: Requires user gesture to start camera

### MediaPipe model fails to load

1. Check network connection
2. Look for 404 errors in console
3. If CDN blocked, fallback should load automatically
4. Verify backup files exist:
   ```bash
   ls backup/libs/mediapipe/
   ```

### Performance issues

- Target: 30fps on modern hardware
- If laggy:
  - Close other browser tabs
  - Reduce browser window size
  - Check CPU usage in Task Manager
  - GPU delegate may not be active

## Deployment Checklist

Before sharing your deployed project:

- [ ] Camera works and shows video feed
- [ ] Face detection triggers emotion detection
- [ ] Particles respond to emotions correctly
- [ ] No console errors (check DevTools)
- [ ] Works on mobile browser
- [ ] Shared link works in incognito mode

## Next Steps

After deployment:
- Share URL with friends and family
- Try on different devices (phone, tablet)
- Check [EXTENSIONS.md](./EXTENSIONS.md) for enhancement ideas
- Explore camera-game or custom project paths
