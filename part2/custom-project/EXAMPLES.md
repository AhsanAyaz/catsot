# Custom Project Examples

## Introduction

Need inspiration? Here are 15+ project ideas you can build in 60-75 minutes.

Each example includes:
- **Concept:** What it does
- **Stack:** Which tools to use
- **Core Feature:** The ONE thing to implement
- **Implementation Hints:** How to approach it
- **Extension Ideas:** Where to go next

Pick one, adapt it, or combine ideas to create something unique!

## Solo Experiences

### 1. Emotion Mirror
**Concept:** Your facial expression changes the visual atmosphere around you.

**Stack:** MediaPipe + Canvas 2D

**Core Feature:** Map facial blendshapes to visual parameters (color, particle density, movement speed).

**Implementation Hints:**
1. Setup MediaPipe Face Landmarker (02-RESEARCH.md Pattern 1)
2. Extract key blendshapes (smile, frown, eyebrow raises)
3. Map to color palette (happy = warm, sad = cool)
4. Update Canvas particle system based on emotion
5. Use object pooling for performance

**Extension Ideas:**
- Add emotion history graph
- Smooth emotion transitions
- Multiple simultaneous emotions

**Time Estimate:** 45-55 min

---

### 2. Voice Painter
**Concept:** Speak words, see them visualized as abstract art.

**Stack:** Web Speech API + Canvas 2D

**Core Feature:** Convert speech to text, analyze sentiment/words, generate visual representation.

**Implementation Hints:**
1. Setup Web Speech API (SpeechRecognition)
2. Capture transcript in real-time
3. Analyze word sentiment (positive/negative/neutral)
4. Draw shapes/colors based on sentiment
5. Build up visual composition over time

**Extension Ideas:**
- Word cloud visualization
- Save as image
- Background music based on sentiment

**Time Estimate:** 40-50 min

---

### 3. Gesture Conductor
**Concept:** Control 3D objects with hand gestures like a conductor.

**Stack:** MediaPipe Hand Landmarker + Three.js

**Core Feature:** Track hand position, map to 3D object rotation/scale/position.

**Implementation Hints:**
1. Setup MediaPipe Hand Landmarker
2. Track index finger tip position (landmark 8)
3. Map x/y position to 3D rotation
4. Add pinch gesture for scale (distance between thumb and index)
5. Render simple 3D cube or sphere

**Extension Ideas:**
- Multiple objects
- Gesture vocabulary (swipe, circle, etc.)
- Particle trail following hand

**Time Estimate:** 55-65 min

---

### 4. Mood Soundscape
**Concept:** Your expression changes ambient sound layers.

**Stack:** MediaPipe + Web Audio API

**Core Feature:** Detect emotion, adjust audio parameters (volume, filter, reverb) per emotion.

**Implementation Hints:**
1. Setup MediaPipe Face Landmarker
2. Load 3-4 ambient audio loops (rain, birds, wind, music)
3. Detect emotion (happy, sad, calm, excited)
4. Adjust volume/filters per track based on emotion
5. Smooth transitions between states

**Extension Ideas:**
- Record audio output
- Visualize audio waveforms
- User-uploaded audio files

**Time Estimate:** 50-60 min

---

### 5. Focus Timer
**Concept:** Track if you're looking at screen, penalize distractions.

**Stack:** MediaPipe Face Landmarker + Canvas 2D

**Core Feature:** Detect face presence, measure time looking at screen, pause timer if face disappears.

**Implementation Hints:**
1. Setup MediaPipe Face Landmarker
2. Track face detection confidence
3. If confidence > 0.5: increment focus time
4. If confidence < 0.5: pause, show "Come back!" message
5. Display total focus time and breaks

**Extension Ideas:**
- Pomodoro integration
- Focus streak tracking
- Export focus report

**Time Estimate:** 35-45 min

---

## Multiplayer Experiences

### 6. Emoji Reaction Wall
**Concept:** Players send emoji reactions that appear on shared wall in real-time.

**Stack:** Firebase + Canvas 2D

**Core Feature:** Click emoji, broadcast to all players, animate on shared canvas.

**Implementation Hints:**
1. Setup Firebase Realtime Database emulator
2. Write emoji + position to `/reactions/{timestamp}`
3. Listen to new reactions
4. Animate emoji floating up screen (like Twitch reactions)
5. Auto-delete old reactions after 5 seconds

**Extension Ideas:**
- Emoji rain effect
- Reaction counts
- Custom emoji uploads

**Time Estimate:** 40-50 min

---

### 7. Collaborative Drawing
**Concept:** Multiple people draw on same canvas in real-time.

**Stack:** Firebase + Canvas 2D

**Core Feature:** Mouse/touch draws lines, sync stroke data to Firebase, render all players' strokes.

**Implementation Hints:**
1. Setup Firebase Realtime Database
2. Track mouse/touch position
3. Write stroke data: `{ playerId, x, y, color, timestamp }`
4. Listen to all strokes, render to canvas
5. Color-code by player

**Extension Ideas:**
- Undo/redo
- Clear canvas
- Save as image

**Time Estimate:** 45-55 min

---

### 8. Presence Heatmap
**Concept:** Show where players are looking on screen (mouse position heatmap).

**Stack:** Firebase + Canvas 2D

**Core Feature:** Track mouse position, broadcast to Firebase, render density heatmap.

**Implementation Hints:**
1. Setup Firebase Realtime Database
2. Write mouse position every 100ms: `/positions/{playerId}`
3. Listen to all player positions
4. Render heatmap using gradient circles
5. Fade old positions over time

**Extension Ideas:**
- Click heatmap (where people click)
- Path visualization (movement trails)
- Attention analytics

**Time Estimate:** 50-60 min

---

### 9. Turn-Based Photo Game
**Concept:** Players take turns capturing photos, others vote on best one.

**Stack:** html5-qrcode + Firebase + Camera API

**Core Feature:** Capture photo, upload to Firebase, display grid, voting system.

**Implementation Hints:**
1. Setup camera with getUserMedia
2. Capture still frame to canvas
3. Convert to data URL
4. Write to Firebase: `/photos/{photoId}`
5. Simple voting: write to `/votes/{photoId}/{playerId}`

**Extension Ideas:**
- Photo challenges (themes)
- Filters/effects
- Winner announcement

**Time Estimate:** 55-65 min

---

## Creative Experiments

### 10. Word-Driven Fractals
**Concept:** Type words, see fractal patterns based on word properties.

**Stack:** Canvas 2D + Web APIs

**Core Feature:** Analyze word (length, vowels, consonants), map to fractal parameters.

**Implementation Hints:**
1. Setup text input
2. Analyze word: length, vowel ratio, letter frequencies
3. Map to fractal recursion depth, angle, color
4. Draw recursive tree fractal
5. Animate parameter transitions

**Extension Ideas:**
- Multiple fractal types
- Save fractal as image
- Word history visualization

**Time Estimate:** 45-55 min

---

### 11. Beat-Driven Particles
**Concept:** Microphone detects audio beats, triggers particle bursts.

**Stack:** Web Audio API + Canvas 2D

**Core Feature:** Analyze microphone input for beat detection, emit particles on beats.

**Implementation Hints:**
1. Setup getUserMedia for audio
2. Use AnalyserNode for frequency data
3. Detect beats (sudden energy increase in low frequencies)
4. Emit particle burst on beat
5. Vary particle properties by beat intensity

**Extension Ideas:**
- Frequency-based colors
- Waveform visualization
- Record video output

**Time Estimate:** 50-60 min

---

### 12. Gravity Sandbox
**Concept:** Click to spawn objects with physics, interact with gravity.

**Stack:** Canvas 2D + Basic Physics

**Core Feature:** Spawn circles on click, apply gravity, bounce off edges.

**Implementation Hints:**
1. Setup Canvas 2D
2. Store objects: `{ x, y, vx, vy, radius, color }`
3. Update loop: apply gravity (vy += 0.5), update position
4. Check edge collisions, reverse velocity
5. Render circles

**Extension Ideas:**
- Object-to-object collisions
- Drag to throw objects
- Attractors/repellers

**Time Estimate:** 40-50 min

---

### 13. ASCII Camera
**Concept:** Convert camera feed to ASCII art in real-time.

**Stack:** Camera API + Canvas 2D

**Core Feature:** Sample video pixels, map brightness to ASCII characters, render as text.

**Implementation Hints:**
1. Setup camera with getUserMedia
2. Sample video frame pixels in grid (e.g., every 8x8)
3. Calculate average brightness per cell
4. Map brightness to ASCII: ` .:-=+*#%@`
5. Render ASCII to canvas or DOM

**Extension Ideas:**
- Color ASCII
- Adjustable resolution
- Save as text file

**Time Estimate:** 45-55 min

---

### 14. Particle Attraction
**Concept:** Mouse/face position attracts particles creating flowing patterns.

**Stack:** MediaPipe or Mouse + Canvas 2D

**Core Feature:** Particles attracted to target position with spring physics.

**Implementation Hints:**
1. Setup particle system (object pooling)
2. Get target position (mouse or face landmark)
3. Calculate force toward target: `force = (target - position) * strength`
4. Update velocity: `velocity += force`
5. Update position: `position += velocity * damping`

**Extension Ideas:**
- Multiple attractors
- Repulsion zones
- Particle connections

**Time Estimate:** 40-50 min

---

### 15. Expression Recorder
**Concept:** Record sequence of facial expressions, play back as animation.

**Stack:** MediaPipe + Canvas 2D

**Core Feature:** Capture blendshape values over time, replay as visualization.

**Implementation Hints:**
1. Setup MediaPipe Face Landmarker
2. Record blendshapes to array: `{ timestamp, blendshapes }`
3. Add record/stop buttons
4. Playback mode: interpolate between recorded frames
5. Visualize key blendshapes as bars

**Extension Ideas:**
- Export as JSON
- Compare recordings
- Emotion timeline

**Time Estimate:** 50-60 min

---

## Mix and Match

Combine elements from different examples:

- **Emotion Mirror** + **Multiplayer** = Shared emotion visualization
- **Gesture Conductor** + **Beat-Driven Particles** = Gesture-controlled music visualizer
- **Collaborative Drawing** + **Voice Painter** = Voice-controlled shared canvas
- **Focus Timer** + **Presence Heatmap** = Productivity monitoring for teams

## Still Stuck?

**Ask yourself:**
1. What INPUT do you want? (face, voice, mouse, QR, audio)
2. What OUTPUT do you want? (visuals, audio, data)
3. What's the CONNECTION? (emotion → color, gesture → rotation, beat → burst)

**Start simple:**
- Get INPUT working (detect face, capture voice, track mouse)
- Get OUTPUT working (draw particles, play sound, show text)
- Connect them (input changes output)
- Polish and extend

**Remember:** These are starting points. Make them YOUR OWN!
