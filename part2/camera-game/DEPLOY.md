# Deploying Camera Game Project to Firebase

Deploy your multiplayer camera game to Firebase Hosting and Realtime Database.

## Prerequisites

- [ ] Node.js installed (v16+)
- [ ] Firebase CLI: `npm install -g firebase-tools`
- [ ] Google account (free tier works)
- [ ] Project code working locally with emulator

## Quick Deploy (5-10 minutes)

### 1. Login to Firebase

```bash
firebase login
```

Opens browser for Google account authentication.

### 2. Create Firebase Project (first time only)

```bash
firebase projects:create --display-name "My Camera Game"
```

Or visit [Firebase Console](https://console.firebase.google.com/) and click "Add project".

### 3. Enable Realtime Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click "Realtime Database" in left sidebar
4. Click "Create Database"
5. Choose location (default is fine)
6. Select "Start in test mode" (for workshop)
7. Click "Enable"

Copy the database URL: `https://[project-id]-default-rtdb.firebaseio.com`

### 4. Update Firebase Configuration

Edit `starter/src/multiplayer.js` (or `reference/src/multiplayer.js`):

```javascript
// Replace emulator config with production config
const firebaseConfig = {
  apiKey: "[from Firebase Console > Project Settings > General]",
  authDomain: "[project-id].firebaseapp.com",
  databaseURL: "https://[project-id]-default-rtdb.firebaseio.com",
  projectId: "[project-id]",
  storageBucket: "[project-id].appspot.com",
  messagingSenderId: "[from Firebase Console]",
  appId: "[from Firebase Console]"
};
```

Find these values in: Firebase Console > Project Settings > General > Your apps > SDK setup

### 5. Set Up Hosting Target

From the repository root:

```bash
# Apply hosting target
firebase target:apply hosting camera-game-starter my-camera-game

# Or for reference implementation
firebase target:apply hosting camera-game-reference my-camera-game-reference
```

### 6. Deploy

```bash
# Deploy your starter project
firebase deploy --only hosting:camera-game-starter

# Or deploy the reference implementation
firebase deploy --only hosting:camera-game-reference
```

Expected output:
```
+  Deploy complete!

Hosting URL: https://my-camera-game.web.app
```

## Local Testing Before Deploy

### Using Firebase Emulator

```bash
# Start all emulators
firebase emulators:start

# Or just hosting and database
firebase emulators:start --only hosting,database
```

- Hosting: http://localhost:5000
- Database: http://localhost:9000
- Emulator UI: http://localhost:4000

### Testing Multiplayer Locally

1. Open http://localhost:5000 in two browser windows
2. Create a game session in one window
3. Scan QR code or enter code in second window
4. Verify players see each other
5. Test game mechanics sync correctly

## Project-Specific Notes

### QR Code Generation

Generate shareable QR codes for your deployed game:

```
https://[your-project].web.app?session=[code]
```

Free QR code generators:
- [QR Code Generator](https://www.qr-code-generator.com/)
- [GoQR.me](https://goqr.me/)

Print QR codes for easy sharing at events.

### Multiplayer Testing

**Minimum 2 devices needed** to test multiplayer features:
- Two phones
- Phone + computer
- Two browser windows (same computer)

**Testing tips:**
- Use different browsers to simulate different users
- Check Emulator UI at localhost:4000 to see database updates
- Watch for sync delays (should be <100ms on good connection)

### Firebase Realtime Database Rules

For workshop (test mode), rules are permissive:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**After workshop**, tighten security:
```json
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
```

### Camera and QR Scanning

- QR scanning requires camera permission
- Works best in good lighting
- Hold QR code steady for 1-2 seconds
- If scanning fails, enter code manually

## Troubleshooting

### "Firebase command not found"

```bash
npm install -g firebase-tools
firebase --version
```

### Database connection fails

1. Check Firebase config values are correct
2. Verify database URL format: `https://[project-id]-default-rtdb.firebaseio.com`
3. Check database rules allow read/write
4. Look for CORS errors in console

### Multiplayer not syncing

1. Verify both players joined same session
2. Check network connectivity
3. Look at Realtime Database in Firebase Console
4. Check browser console for errors

### "Permission denied" on database

1. Go to Firebase Console > Realtime Database > Rules
2. Ensure rules allow read/write:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
3. Click "Publish"

### QR scanner not working

1. Check camera permissions granted
2. Ensure good lighting on QR code
3. Hold camera steady
4. Try manual code entry as fallback

### Deployed site shows blank page

1. Open DevTools (F12) > Console
2. Look for 404 errors on resources
3. Check Firebase config is not emulator config
4. Verify index.html exists in public directory

### Game actions not syncing between players

1. Check database rules allow write
2. Verify session ID matches between players
3. Look at database in Firebase Console for updates
4. Check network tab for failed requests

## Deployment Checklist

Before sharing your deployed game:

- [ ] Database connected (not emulator)
- [ ] Session creation works
- [ ] QR code generates correctly
- [ ] Second player can join via QR/code
- [ ] Game actions sync in real-time
- [ ] Works on mobile browsers
- [ ] No console errors

## Sharing Your Game

### At Events

1. Deploy reference implementation
2. Generate QR code for URL
3. Display QR code on screen
4. Attendees scan to join

### Online

Share the URL directly:
```
https://[your-project].web.app
```

Or with pre-filled session:
```
https://[your-project].web.app?session=ABC123
```

## Next Steps

After deployment:
- Test with friends remotely
- Try different game mechanics from [EXTENSIONS.md](./EXTENSIONS.md)
- Add authentication for persistent scores
- Create tournament mode with brackets
