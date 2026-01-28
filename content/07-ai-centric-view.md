# AI-Centric View Deep Dive

**The Prototyper in Action**
~20 minutes

Note:

- Hands-on with the App Prototyping Agent
- Show multimodal input, blueprints, annotation

---

### The App Prototyping Agent

**Your AI co-pilot for building apps**

Also called: "The Prototyper"

- Understands natural language
<!-- .element: class="fragment" -->
- Processes images and sketches
<!-- .element: class="fragment" -->
- Generates full applications
<!-- .element: class="fragment" -->
- Remembers context across prompts
<!-- .element: class="fragment" -->

---

<!-- .slide: style="font-size: 0.8em" -->
### Multimodal Prompting

**Use ALL the input types**

| Input | Example |
|-------|---------|
| **Text** | "Create a recipe sharing app" |
| **Images** | Upload mockups, wireframes |
| **Draw Mode** | Sketch layouts directly |
| **Combine** | Text + image for best results |

---

### Draw Mode

**Sketch your UI directly**

- No design skills needed
<!-- .element: class="fragment" -->
- Basic shapes → full components
<!-- .element: class="fragment" -->
- Grounds the AI in YOUR vision
<!-- .element: class="fragment" -->

---
<!-- .slide: style="font-size: 0.8em" -->
### Prompting Best Practices

**❌ Too vague:**
> "Make a recipe app"

**✅ Specific and contextual:**
> "Create a recipe sharing platform where home cooks can:
>
> - Share recipes with photos
> - Save favorites to collections
> - Leave reviews and ratings
> Use a warm, inviting color palette like a cozy kitchen"

---

### The Blueprint Phase

**Review before coding!**

```markdown
## Features
- Recipe card grid
- User authentication
- Favorites collection
- Search by ingredient

## Tech Stack
- Next.js with App Router
- Tailwind CSS
- Firebase Auth
- Firestore database
```

**Ask for changes now, not after 1000 lines of code**

---

### Blueprint Refinement

**Nudge the AI:**

> "Looks good, but:
>
> - Use Shadcn/UI components instead of custom
> - Add dark mode support
> - Include a 'cooking timer' feature"

**Iterate on the plan**, then click "Prototype this App"

---

### Annotation Mode

**Visual, precise refinement**

1. Hover over the preview
2. Click to select element
3. Give specific instruction
4. Watch it update live

---

<!-- .slide: style="font-size: 0.8em" -->
### Annotation Examples

| Selection | Instruction | Result |
|-----------|-------------|--------|
| Header | "Make the logo bigger" | Logo scales up |
| Button | "Change to blue, add hover effect" | Styled button |
| Card | "Add shadow and rounded corners" | Visual update |
| Layout | "Make this a 3-column grid" | Grid restructure |

---

### Nano Banana Model

**Instant asset generation**

The Prototyper uses a specialized model for:

- Placeholder images
<!-- .element: class="fragment" -->
- Icons
<!-- .element: class="fragment" -->
- UI illustrations
<!-- .element: class="fragment" -->

**Your prototype looks professional immediately**
(No broken image placeholders!)
<!-- .element: class="fragment" -->

---

### Hands-On Demo

**Let's create something together:**

1. Open Firebase Studio
2. Start new project with AI-Centric View
3. Describe an app
4. Review and refine blueprint
5. Generate prototype
6. Use Annotation Mode to tweak

---

### Key Takeaways

✅ **Multimodal input** = Text + images + sketches
<!-- .element: class="fragment" -->
✅ **Blueprint phase** = Refine before generating
<!-- .element: class="fragment" -->
✅ **Annotation mode** = Point-and-click fixes
<!-- .element: class="fragment" -->
✅ **Nano Banana** = Beautiful assets automatically
<!-- .element: class="fragment" -->

**Next:** Pro Code Mode for full control
