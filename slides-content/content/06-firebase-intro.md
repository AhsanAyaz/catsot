# Part 2: Firebase Studio

**Build & Deploy with AI**
15:30 - 17:00 (1.5 hours)

Note:

- Focus shifts from understanding to BUILDING
- Everyone leaves with a deployed app

---

### What is Firebase Studio?

**Cloud-native development environment with AI agents**

- Formerly part of Project IDX
<!-- .element: class="fragment" -->
- Full IDE in the browser
<!-- .element: class="fragment" -->
- Two modes: AI-Centric View + Pro Code Mode
<!-- .element: class="fragment" -->
- Built-in Firebase service integration
<!-- .element: class="fragment" -->
- One-click deployment
<!-- .element: class="fragment" -->

**Zero setup. Just build.**
<!-- .element: class="fragment" -->

---

<!-- .slide: style="font-size: 0.8em" -->
### The Two Modes

| Mode | Purpose | Best For |
|------|---------|----------|
| **AI-Centric View** | Vibe coding with Prototyper | Starting from scratch |
| **Pro Code Mode** | Full VS Code experience | Fine-tuning, debugging |

You'll use **both** today

---

<video src="assets/videos/VibeCodingFlow.mp4" controls autoplay loop muted></video>
<!-- .element: style="border-radius: 12px;" -->

---

### Step 1: Vision

**Describe your app — multimodally**

<div style="display: flex; gap: 2rem; align-items: flex-start;">
<div style="flex: 1;">

**Natural language:**
> "Create a community garden journal where users log plants and upload photos"

</div>
<div style="flex: 1;">

**Sketches:**
[Upload wireframes](https://gemini.google.com/app/88795b6d826ca727) or use Draw Mode to sketch layout

![Wireframes](assets/images/doodle_plush_app.png)

</div>
</div>

--

**Be specific** — generic prompts → generic apps

---

### Step 2: Blueprint

**AI generates architecture before code**

The Blueprint includes:

- Feature breakdown
<!-- .element: class="fragment" -->
- Tech stack selection
<!-- .element: class="fragment" -->
- Style guidelines
<!-- .element: class="fragment" -->
- Component structure
<!-- .element: class="fragment" -->

**Review and refine!**
Changing the plan is cheaper than refactoring code
<!-- .element: class="fragment" -->
---

### Step 3: Prototype

**AI generates the codebase**

After approving the blueprint:

- Full application scaffolded
<!-- .element: class="fragment" -->
- Components created
<!-- .element: class="fragment" -->
- Basic styling applied
<!-- .element: class="fragment" -->
- Live preview available
<!-- .element: class="fragment" -->

**Now iterate...**
<!-- .element: class="fragment" -->

---

### Step 4: Iterate (Annotation Mode)

**Point-and-click refinement**

Select any element → Give specific instructions
> "Make this button blue and larger"

---

### Step 5: Deploy

**One command to production**

```bash
/firebase:deploy
```

Or click the Deploy button

**Firebase App Hosting handles:**

- Build process
<!-- .element: class="fragment" -->
- CDN configuration
<!-- .element: class="fragment" -->
- SSL certificates
<!-- .element: class="fragment" -->
- Server-side rendering
<!-- .element: class="fragment" -->

---

### Key Takeaways

✅ **AI-Centric View** = Vibe coding from scratch
<!-- .element: class="fragment" -->
✅ **Blueprint first** = Review before coding
<!-- .element: class="fragment" -->
✅ **Annotation mode** = Visual refinement
<!-- .element: class="fragment" -->
✅ **One-click deploy** = Production-ready
<!-- .element: class="fragment" -->

**Next:** Deep dive into AI-Centric View
