---
marp: true
theme: default
paginate: true
class: invert
---

<!--
Speaker Notes:
- Part 1 is 2 hours total = ~20 min per module
- Emphasize Option A/B paths for mixed skill levels
- Mention "Going Further" sections for fast finishers
- Time check after Module 3 (should be ~14:00)
-->

# Part 1: Foundations

**6 Progressive Modules**
13:00 - 15:00 (2 hours)

Building mental models for AI architecture

---

# Learning Path

```
Text Input → JSON Output → Image Analysis → Context Engineering → Search Grounding → Logic Engine
```

Each module builds on the previous:
1. Understand the basics
2. Add structure
3. Add multimodality
4. Refine with context
5. Connect to real-world data
6. Build reusable logic

**Progressive complexity** — beginners stay on track, advanced folks go deeper

---

# Module Overview

| Module | Focus | Time | Path |
|--------|-------|------|------|
| 01: AI Studio Exploration | Freeform prompts, model selection | 20 min | `modules/01-ai-studio-exploration/` |
| 02: Structured Output | JSON schemas, validation | 20 min | `modules/02-structured-output/` |
| 03: Multimodal Input | Image analysis, vision | 25 min | `modules/03-multimodal-input/` |
| 04: Context Engineering | Prompt templates, few-shot | 20 min | `modules/04-context-engineering/` |
| 05: Grounding with Search | Current events, real-time data | 20 min | `modules/05-grounding-search/` |
| 06: Logic Engine | Vibe coding, reusable systems | 25 min | `modules/06-logic-engine/` |

**Total: ~2 hours** (includes quick breaks)

---

# Module Structure

Each module follows same pattern:

**README.md** — Learning objectives, concepts
**demonstration.md** — Instructor walkthrough
**exercise.md** — Your hands-on practice
**solutions/** — Reference implementations

**Option A/B paths** in exercises:
- Option A: Guided, step-by-step
- Option B: Independent exploration

**Going Further** sections for fast finishers

---

# Your First Gemini Prompt

**Basic pattern** (you'll use this in Module 01):

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

const result = await model.generateContent("Your prompt here");
console.log(result.response.text());
```

**Simple** — but we'll make it much more powerful.

---

# Quick Reference During Exercises

**Cheatsheet available:**
See `/cheatsheet/cheatsheet.pdf` for quick API reference

**Organized by task frequency:**
- Quick Start (5 minutes to first prompt)
- Common Tasks (structured output, images)
- Advanced (grounding, function calling)
- Troubleshooting (API errors, rate limits)

Keep it open during exercises for fast lookup.

---

# Module 01: AI Studio Exploration

**What you'll learn:**
- AI Studio interface (aistudio.google.com)
- Freeform prompt crafting
- Model selection (Gemini 2.0 Flash, Pro)
- System instructions

**Key insight:**
Freeform prompts are powerful but unpredictable — sets baseline for structured output in Module 02

**Exercise:** Create blog post generator with style variations

**File:** `modules/01-ai-studio-exploration/exercise.md`

<!--
Timing note: Module 01 should complete by ~13:20
Check if participants are keeping pace
-->

---

# Module 02: Structured Output

**What you'll learn:**
- JSON Schema creation
- Enforcing structure with `responseMimeType`
- Description fields as model instructions
- Edge case handling

**Key insight:**
Description fields aren't just documentation — they're instructions to the model

**Example schema:**

```javascript
const schema = {
  type: "object",
  properties: {
    emotion: {
      type: "string",
      enum: ["happy", "sad", "surprised"],
      description: "Detected emotion from text tone"
    },
    confidence: { type: "number", minimum: 0, maximum: 1 }
  }
};
```

**File:** `modules/02-structured-output/exercise.md`

---

# Module 03: Multimodal Input

**What you'll learn:**
- Image analysis with Gemini Vision
- Combining images + text prompts
- File API vs inline data
- Token cost awareness (images ≤384px = 258 tokens)

**Example multimodal prompt:**

```javascript
const imagePart = {
  inlineData: {
    data: base64EncodedImage,
    mimeType: "image/png"
  }
};

const result = await model.generateContent([
  "What emotion does this face express?",
  imagePart
]);
```

**File:** `modules/03-multimodal-input/exercise.md`

---

# Module 04: Context Engineering

**What you'll learn:**
- 5-version prompt progression pattern
- Few-shot learning (2-3 examples optimal)
- XML tags for structured delimiters
- Template patterns for reusable prompts

**Progression:**
1. Basic prompt (unstructured)
2. Add system instructions
3. Add XML tags for sections
4. Add few-shot examples
5. Combine with structured output

**Key insight:**
Context engineering + structured output = production-ready

**File:** `modules/04-context-engineering/exercise.md`

---

# Module 05: Grounding with Google Search

**What you'll learn:**
- Grounding toggle in AI Studio
- When to use grounding vs RAG
- Metadata structure (grounding chunks, URLs)
- Four query types (current events, facts, stock prices)

**Grounding vs RAG comparison:**

| Feature | Grounding | RAG |
|---------|-----------|-----|
| Data source | Google Search | Your documents |
| Best for | Public web info, current events | Private data, specific corpus |
| Setup | Toggle in UI | Build embedding pipeline |

**File:** `modules/05-grounding-search/exercise.md`

---

# Module 06: Logic Engine

**What you'll learn:**
- Vibe coding workflow (describe → AI generates)
- Pre-built logic engine pattern
- Lambda functions for rules
- Part 2 preparation (connecting to projects)

**Example pattern:**

```javascript
// Describe what you want
const rules = [
  { name: "happy-discount", condition: (data) => data.emotion === "happy", action: (data) => data.price * 0.9 }
];

// Logic engine executes
const result = engine.evaluate(customerData, rules);
```

**This prepares you for Part 2** — vibe coding your creative project

**File:** `modules/06-logic-engine/exercise.md`

<!--
Timing note: Module 06 should complete by ~14:50
Coffee break at 15:00
-->

---

# Between Modules: Quick Checks

After each module, instructor will:
1. Demonstrate key concept live
2. Check common questions
3. Show 1-2 interesting participant solutions
4. Bridge to next module

**See:** `slides/02-module-transitions.md` for detailed bridges

**Timing flexibility:**
- Ahead of schedule? Explore "Going Further" sections
- Behind schedule? Focus on core concepts, skip optional exercises

---

# Ready for Module 01?

**Open:** `modules/01-ai-studio-exploration/README.md`

**Navigate to:** aistudio.google.com

**Goal:** Understand freeform prompts before adding structure

Let's start.

---

<!-- Next: slides/02-module-transitions.md for between-module bridges -->
