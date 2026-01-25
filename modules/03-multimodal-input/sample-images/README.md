# Sample Images for Module 03

These images are optimized for workshop use (≤384px to minimize token cost).

## Provided Images

### 1. chart.png
**Use case:** Data extraction and analysis
**Description:** Sample chart showing quarterly revenue trends
**Prompt ideas:**
- "What data does this chart show?"
- "Summarize the key trends"
- "Extract the data as JSON"
- "What was the revenue in Q3?"

**Expected capability:** Gemini can identify chart type, read values, describe trends, and extract data as structured output.

---

### 2. code-screenshot.png
**Use case:** Code explanation and review
**Description:** Screenshot of a Python or JavaScript function
**Prompt ideas:**
- "Explain what this code does"
- "Identify potential bugs"
- "Suggest improvements"
- "Write tests for this function"
- "Add docstrings to this code"

**Expected capability:** Gemini can read code from images, explain logic, identify issues, and suggest improvements.

---

### 3. ui-mockup.png
**Use case:** Design analysis and description
**Description:** Wireframe or UI design mockup
**Prompt ideas:**
- "Describe this user interface"
- "What improvements would you suggest?"
- "Write alt text for accessibility"
- "What is the purpose of this interface?"
- "Generate HTML/CSS to implement this design"

**Expected capability:** Gemini can identify UI elements, understand layout, critique design, and suggest improvements.

---

## Creating Your Own Images

For workshop exercises, keep images small to manage token costs:

- **Maximum dimension:** 384px (width or height)
- **File format:** PNG or JPEG
- **File size:** <100KB recommended
- **Content:** Clear, well-lit, high-contrast for best recognition

Larger images consume more tokens (see Module README for details).

## Token Cost Examples

**Small image (≤384px):**
- Token cost: 258 tokens
- Equivalent to: ~200 words of text
- Best for: Testing, learning, optimized production apps

**Medium image (768×768):**
- Token cost: 258 tokens (single tile)
- Equivalent to: ~200 words of text
- Best for: Standard production use

**Large image (1536×1536):**
- Token cost: ~1,032 tokens (4 tiles)
- Equivalent to: ~800 words of text
- Best for: High-detail analysis when necessary

## File API for Production

For production applications that reuse the same images across multiple prompts, use the File API:

1. Upload image once to File API
2. Receive a file URI
3. Reference the URI in multiple prompts
4. Saves upload time and allows better caching

See solutions/solution.md for API code examples.

---

**Note:** The actual image files (chart.png, code-screenshot.png, ui-mockup.png) are placeholders in this repository. For a real workshop, replace these with actual optimized images or use your own examples.
