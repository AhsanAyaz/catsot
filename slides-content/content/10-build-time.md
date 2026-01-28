# Build Time

**Your Turn to Create**
Remaining workshop time

Note:

- Hands-on building
- Support available
- Pick a path

---

<!-- .slide: style="font-size: 0.8em" -->
### Choose Your Path

**Pick one project to build:**

| Path | Description | Difficulty |
|------|-------------|------------|
| 🎭 **Face Reactive** | Emotion-driven visuals | ⭐⭐ |
| 📸 **Camera Game** | QR-based multiplayer | ⭐⭐⭐ |
| 🚀 **Custom** | Your own idea | ⭐⭐⭐⭐ |

---

### Path A: Face Reactive

**Emotion-driven visual experience**

- MediaPipe face detection
<!-- .element: class="fragment" -->
- Real-time emotion analysis
<!-- .element: class="fragment" -->
- Visuals respond to your mood
<!-- .element: class="fragment" -->
- Similar to "Mood Organism"
<!-- .element: class="fragment" -->

**Perfect for:** Exploring multimodal AI + Canvas

---

### Face Reactive Starter

```javascript
// MediaPipe provides face mesh
const faceDetection = await faceMesh.detect(videoElement);

// Gemini analyzes emotion
const emotion = await analyzeEmotion(faceData);

// Visuals react
updateVisualization(emotion);
```

**Template:** `/templates/face-reactive/`

---

### Path B: Camera Game

**QR-based multiplayer fun**

- Scan QR to join
<!-- .element: class="fragment" -->
- Use selfie as avatar
<!-- .element: class="fragment" -->
- Compete in realtime
<!-- .element: class="fragment" -->
- Similar to "Karachi Run"
<!-- .element: class="fragment" -->

**Perfect for:** Real-time apps + Firebase

---

### Camera Game Starter

```javascript
// QR generates join link
const gameCode = generateQR(roomId);

// Selfie becomes avatar
const avatar = await processImage(selfie);

// Realtime sync
firestore.onSnapshot(roomRef, updateGame);
```

**Template:** `/templates/camera-game/`

---

### Path C: Custom Project

**Build your own idea**

**Suggestions:**

- Recipe generator with image analysis
<!-- .element: class="fragment" -->
- Drawing collaborator with AI suggestions
<!-- .element: class="fragment" -->
- Plant identifier using camera
<!-- .element: class="fragment" -->
- Your own Stockholm-inspired project
<!-- .element: class="fragment" -->

**Go wild!**

---

### Getting Help

**Mentors are circulating**

Raise your hand for:

- Technical blockers
<!-- .element: class="fragment" -->
- API questions
<!-- .element: class="fragment" -->
- Deploy issues
<!-- .element: class="fragment" -->
- Architecture advice
<!-- .element: class="fragment" -->

**Share discoveries!** Interesting solutions → quick showcase

---

### Build Checklist

**For any path:**

- [ ] Choose your project
- [ ] Start in AI-Centric View
- [ ] Review your blueprint
- [ ] Generate and iterate
- [ ] Add Firebase services
- [ ] Deploy
- [ ] Get your URL!

---

<!-- .slide: style="font-size: 0.8em" -->
### Tips for Success

| Do | Don't |
|----|-------|
| Start simple, add features | Try to build everything at once |
| Use blueprint phase | Skip straight to code |
| Ask for help early | Struggle silently |
| Deploy often | Wait until "perfect" |

---

### Time Check

**You have ~45 minutes to:**

1. Choose a path
2. Build your app
3. Add Firebase services
4. Deploy to production

**At 16:45, we'll start showcase prep**

---

### Start Building

🎯 Pick your path

🛠️ Open Firebase Studio

🚀 Create something awesome

**Go!**
