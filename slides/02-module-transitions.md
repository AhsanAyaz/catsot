---
marp: true
theme: default
paginate: true
class: invert
---

<!--
Speaker Notes:
These slides bridge between modules
Use them to:
1. Reinforce what was just learned
2. Preview next module's value
3. Check timing (adjust pace if needed)
4. Answer common questions
-->

# Transition: Module 01 → 02

**What you just learned:**
Freeform prompts in AI Studio — powerful but unpredictable

**Common challenge:**
"The model gives different formats each time"

**Next module solves this:**
Structured output with JSON schemas — enforce consistent format

**Why it matters:**
You can't build reliable apps on unpredictable output

**Open:** `modules/02-structured-output/exercise.md`

---

<!--
Speaker Notes - Common Module 01 Questions:
Q: "Which model should I use?"
A: Gemini 2.0 Flash for most tasks (fast, cheap), Pro for complex reasoning

Q: "What are system instructions?"
A: Context that applies to every prompt (like personality, constraints)

Q: "Can I save prompts?"
A: Yes — use templates (covered in Module 04)

Time check: Should be ~13:20-13:25
-->

# Module 01 → 02: Code Example

**Before (Module 01):**
```javascript
const result = await model.generateContent("Analyze sentiment: I love this!");
// Output: "This text expresses positive sentiment and excitement."
// Format: unpredictable text
```

**After (Module 02):**
```javascript
const schema = {
  type: "object",
  properties: {
    sentiment: { type: "string", enum: ["positive", "negative", "neutral"] },
    confidence: { type: "number" }
  }
};
const result = await model.generateContent("Analyze sentiment: I love this!");
// Output: { "sentiment": "positive", "confidence": 0.95 }
// Format: guaranteed JSON structure
```

**Cheatsheet reference:** See "Common Tasks: Structured Output" (page 1)

---

# Transition: Module 02 → 03

**What you just learned:**
JSON schemas enforce structure — reliable, parseable output

**Common challenge:**
"I want to analyze images, not just text"

**Next module adds:**
Multimodal input — combine images + text prompts

**Why it matters:**
Real-world AI apps process multiple input types (photos, screenshots, charts)

**Open:** `modules/03-multimodal-input/exercise.md`

---

<!--
Speaker Notes - Common Module 02 Questions:
Q: "Can I nest objects in schemas?"
A: Yes — schemas support nested objects, arrays, complex types

Q: "What if model can't match schema?"
A: It will try hard to fit, but may return generic values if truly impossible

Q: "Description fields — are they required?"
A: No, but HIGHLY recommended — they guide the model like mini-prompts

Time check: Should be ~13:45
If behind, consider shortening Module 03 exercise variants
-->

# Module 02 → 03: Code Example

**Text-only (Module 02):**
```javascript
await model.generateContent("What's the emotion in: 'I'm so happy!'");
// Limited to text tone analysis
```

**Text + Image (Module 03):**
```javascript
const imagePart = {
  inlineData: {
    data: base64Image,
    mimeType: "image/png"
  }
};

await model.generateContent([
  "What emotion does this face express?",
  imagePart
]);
// Analyzes actual facial expressions from image
```

**Key insight:** Multimodal = more accurate, context-aware analysis

**Cheatsheet reference:** See "Common Tasks: Image Analysis" (page 1)

---

# Transition: Module 03 → 04

**What you just learned:**
Multimodal input — analyze images, charts, screenshots

**Common challenge:**
"How do I make the model understand my specific use case?"

**Next module teaches:**
Context engineering — prompt templates, few-shot examples, XML tags

**Why it matters:**
Better context = better results (garbage in, garbage out)

**Open:** `modules/04-context-engineering/exercise.md`

---

<!--
Speaker Notes - Common Module 03 Questions:
Q: "Why optimize image size to ≤384px?"
A: Token cost — larger images cost more, 384px is sweet spot for quality/cost

Q: "File API vs inline data — which to use?"
A: File API for reuse across prompts, inline for quick one-off analysis

Q: "Can I send multiple images?"
A: Yes — array of image parts, model analyzes all together

Time check: Should be ~14:10
Coffee break at 15:00, so need to finish Modules 04-06 in ~50 min
-->

# Module 03 → 04: Code Example

**Simple prompt (Module 03):**
```javascript
await model.generateContent(["Analyze this chart", imagePart]);
// Generic analysis
```

**Engineered prompt (Module 04):**
```javascript
const prompt = `
<context>
You are a data analyst for a Swedish fintech company.
</context>

<examples>
Example 1: Rising trend → "Growth phase, consider scaling infrastructure"
Example 2: Flat line → "Stability phase, optimize costs"
</examples>

<task>
Analyze this chart for actionable insights.
</task>
`;
await model.generateContent([prompt, imagePart]);
// Context-aware, domain-specific analysis
```

**Cheatsheet reference:** See "Advanced: Context Engineering" (page 2)

---

# Transition: Module 04 → 05

**What you just learned:**
Context engineering — templates, few-shot, XML structure

**Common challenge:**
"Model doesn't know current events or real-time data"

**Next module adds:**
Grounding with Google Search — inject current information

**Why it matters:**
AI models are trained on past data — grounding adds NOW

**Open:** `modules/05-grounding-search/exercise.md`

---

<!--
Speaker Notes - Common Module 04 Questions:
Q: "How many examples should I provide for few-shot?"
A: 2-3 optimal — more adds token cost, diminishing returns beyond 3

Q: "Why use XML tags instead of plain text?"
A: Clear delimiters, less ambiguity, better model understanding

Q: "Can I save templates?"
A: Yes — AI Studio supports saving prompts, export to API code

Time check: Should be ~14:30
Modules 05 and 06 remain (~40 min for both)
-->

# Module 04 → 05: Comparison

**Without grounding:**
```javascript
await model.generateContent("Who won the Nobel Prize in Literature 2025?");
// "I don't have real-time information..."
```

**With grounding:**
```javascript
// Enable grounding in AI Studio (toggle ON)
await model.generateContent("Who won the Nobel Prize in Literature 2025?");
// "According to nobelprize.org, the 2025 Nobel Prize in Literature was awarded to..."
// Includes source URLs, grounding chunks
```

**When to use grounding:**
- Current events, stock prices, sports scores
- Public web information
- Fact-checking against latest sources

**Cheatsheet reference:** See "Advanced: Grounding" (page 2)

---

# Transition: Module 05 → 06

**What you just learned:**
Grounding with Google Search — real-time, current information

**Common challenge:**
"I need to build reusable logic systems, not one-off prompts"

**Final module introduces:**
Logic engine pattern — vibe coding toward Part 2 projects

**Why it matters:**
This is the bridge between prompts and production apps

**Open:** `modules/06-logic-engine/exercise.md`

---

<!--
Speaker Notes - Common Module 05 Questions:
Q: "Grounding vs RAG — when to use which?"
A: Grounding for public web, RAG for private/proprietary documents

Q: "Does grounding work with structured output?"
A: Yes — combine both (see "Going Further" section)

Q: "How reliable are grounding sources?"
A: Model cites sources — verify critical info, treat as starting point

Time check: Should be ~14:50
Module 06 is final before coffee break
-->

# Module 05 → 06: Use Case

**Grounding example (Module 05):**
```javascript
// Query current stock price
await model.generateContent("What's Spotify's stock price?");
// Uses Google Search, returns current data
```

**Logic engine example (Module 06):**
```javascript
// Build reusable pricing rules using AI
const rules = [
  { name: "market-hours", condition: (time) => isMarketOpen(time), action: "show-live-price" },
  { name: "after-hours", condition: (time) => !isMarketOpen(time), action: "show-last-close" }
];

// Engine evaluates rules, AI helps design them
const action = engine.evaluate(currentTime, rules);
```

**Bridge to Part 2:** Logic engines power creative projects

**Cheatsheet reference:** See "Advanced: Logic Patterns" (page 2)

---

# Transition: Module 06 → Coffee Break

**What you just learned:**
Logic engine pattern — vibe coding, reusable systems

**All foundations complete:**
✅ Freeform prompts
✅ Structured output
✅ Multimodal input
✅ Context engineering
✅ Grounding
✅ Logic patterns

**After coffee break (15:30):**
Part 2 — Choose your creative project path

**Open:** `slides/03-part2-intro.md` after break

---

<!--
Speaker Notes - Coffee Break (15:00-15:30):
- Remind participants to return by 15:30
- Part 2 is 1.5 hours (15:30-17:00)
- Three project paths to choose from
- Use break to think about which path interests you

Time check: Should reach coffee break by ~15:00
If early: extend "Going Further" explorations
If late: skip optional exercises in Module 06
-->

# Coffee Break

**Return:** 15:30

**Think about:**
Which Part 2 project interests you?
- Face-Reactive Visualization
- Camera-Based Multiplayer Game
- Custom Creative Project

See you in 30 minutes!

---

<!-- Next: slides/03-part2-intro.md -->
