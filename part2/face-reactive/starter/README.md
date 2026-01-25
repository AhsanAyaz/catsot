# Face-Reactive Emotion Visualization

Build a real-time emotion-driven particle visualization using MediaPipe face detection and Canvas 2D rendering.

## Learning Objectives

- **MediaPipe Face Landmarker**: Detect facial expressions using 478 landmarks and 52 ARKit blendshapes
- **Blendshape Analysis**: Map facial muscle movements to simplified emotions
- **Particle Systems**: Create emotion-driven visual effects using Canvas 2D
- **Object Pooling**: Optimize performance by reusing particles instead of creating new objects

## What's Provided (60-70% Complete)

✅ **Complete Infrastructure:**
- Camera setup with permission handling
- MediaPipe Face Landmarker initialization and video processing
- Particle system with object pooling (150 pre-created particles)
- Render loop with edge wrapping and fade effects
- HTML boilerplate and styling

🎯 **Your Tasks:**
- TODO 1: Implement emotion detection from blendshapes (15 minutes)
- TODO 2: Update particle visualization based on emotions (20 minutes)

## Setup

1. Open `index.html` in a modern browser (Chrome, Edge, Safari)
2. Allow camera access when prompted
3. You should see a blank canvas with "Ready!" status

## Your Tasks

### TODO 1: Emotion Detection (15 minutes)

**File:** `src/emotionMapping.js`

**Goal:** Map MediaPipe blendshapes to emotions (happy, sad, surprised, angry, excited, calm)

**Key Blendshapes:**
- Happy: `mouthSmileLeft`, `mouthSmileRight` (both > 0.5)
- Surprised: `browInnerUp` + `eyeWideLeft`/`eyeWideRight` (> 0.5)
- Sad: `mouthFrownLeft`, `mouthFrownRight` (> 0.5) + low brows
- Angry: `browDownLeft`, `browDownRight` (both > 0.5)
- Excited: smile + `jawOpen` > 0.4

**Hints:**
- Use `getBlendshapeScore(blendshapes, 'mouthSmileLeft')` to get values
- Threshold of 0.5 works well for most expressions
- Return one of: `'happy'`, `'sad'`, `'surprised'`, `'angry'`, `'excited'`, `'calm'`

### TODO 2: Particle Updates (20 minutes)

**File:** `src/visualization.js`

**Goal:** Update particle colors, sizes, speeds, and counts based on detected emotion

**Emotion Parameters Provided:**
```javascript
emotionParams = {
  happy: { color: '#FFD700', velocityMultiplier: 2.0, sizeMultiplier: 1.2, particleCount: 100 },
  sad: { color: '#4A4A8A', velocityMultiplier: 0.3, sizeMultiplier: 0.8, particleCount: 50 },
  // ... and more
}
```

**Hints:**
- Loop through existing `particles` array (don't create new particles!)
- Set `p.active = true` for first N particles (N = params.particleCount)
- Update `p.color`, `p.size`, `p.vx`, `p.vy` using emotion params
- Object pooling = reuse existing objects for better performance

## Testing

Make different facial expressions and verify:

1. **Smile** → Should show happy (gold particles, fast movement)
2. **Raise eyebrows** → Should show surprised (bright yellow, very fast)
3. **Frown** → Should show sad (dark blue, slow movement)
4. **Furrow brows** → Should show angry (red, large particles)
5. **Wide smile + open mouth** → Should show excited (orange, very fast)

## Time Estimate

- TODO 1 (Emotion Detection): 15 minutes
- TODO 2 (Particle Updates): 20 minutes
- Testing and refinement: 25-40 minutes
- **Total: 60-75 minutes**

## Extension Challenges

Finished early? See [EXTENSIONS.md](../EXTENSIONS.md) for 15+ challenges including:
- Emotion smoothing (prevent flickering)
- Face position interaction (emit particles from face)
- Multiple face support
- Three.js 3D particles
- Firebase real-time emotion sharing

## Technical Notes

**Performance Optimization:**
- Object pooling: Particles pre-created, reused every frame (no GC pauses)
- Frame skipping: MediaPipe only processes new video frames
- Edge wrapping: Particles wrap around screen edges for infinite field effect
- GPU acceleration: MediaPipe uses GPU delegate for better performance

**Browser Compatibility:**
- Chrome/Edge: Full support
- Safari: Requires HTTPS or localhost
- Firefox: Full support
- Mobile Safari: May require user interaction before camera access

## Troubleshooting

**Camera not working:**
- Check browser permissions (URL bar icon)
- Ensure using HTTPS or localhost
- Try reloading page

**No particles visible:**
- Check browser console for errors
- Verify TODO 2 is implemented
- Check that particles are being set to `active = true`

**Emotions not changing:**
- Verify TODO 1 returns different emotions
- Check console for detected emotion (status bar shows current emotion)
- Try more exaggerated expressions

## Architecture

```
index.html                 # Entry point
├── src/main.js           # App initialization, camera setup, render loop (COMPLETE)
├── src/faceDetection.js  # MediaPipe Face Landmarker wrapper (COMPLETE)
├── src/emotionMapping.js # Blendshape → emotion logic (TODO 1)
└── src/visualization.js  # Particle system rendering (TODO 2)
```

## Resources

- [MediaPipe Face Landmarker Docs](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js)
- [ARKit Blendshapes Reference](https://arkit-face-blendshapes.com/)
- [Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
