# Custom Project Template

This is a blank canvas for building your own AI-powered interactive experience.

## What's Included

**Infrastructure helpers (optional):**
- `src/camera.js` - Camera access via getUserMedia
- `src/firebase.js` - Firebase Realtime Database connection (emulator)
- `src/rendering.js` - Canvas 2D or Three.js setup

**You decide:**
- What to build
- Which helpers to use (or none)
- How to structure your code

## Getting Started

1. **Choose your approach** (see ARCHITECTURE-GUIDE.md)
   - Solo or multiplayer?
   - 2D or 3D?
   - Camera input or other interaction?

2. **Uncomment what you need** in index.html and main.js
   - MediaPipe for face detection
   - Firebase for multiplayer
   - Three.js for 3D
   - html5-qrcode for QR scanning

3. **Start building** in src/main.js

4. **Get inspired** (see EXAMPLES.md for project ideas)

## Need Ideas?

See EXAMPLES.md for 10+ project concepts with implementation hints.

## Architecture Questions?

See ARCHITECTURE-GUIDE.md for decision matrix on:
- Canvas 2D vs Three.js
- Firebase Realtime DB vs local state
- Face detection vs QR codes vs other inputs

## Time Budget

You have 60-75 minutes. Focus on ONE core feature:
- ✅ Working camera + simple visual effect
- ❌ Complex game + multiplayer + 3D graphics + AI
