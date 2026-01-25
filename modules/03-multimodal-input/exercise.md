# Module 03: Multimodal Input - Hands-on Exercise

**Duration:** 10-13 minutes
**Goal:** Practice analyzing different types of images with multimodal prompts

---

## Your Task

Practice multimodal input by analyzing different types of images with Gemini. You'll learn to extract information from charts, understand code screenshots, and analyze UI designs.

---

## Setup (1 minute)

1. Open [aistudio.google.com](https://aistudio.google.com)
2. Create a new prompt
3. Locate the image upload button (📎 or image icon)

✅ **Ready?** If you see the prompt editor with an upload button, you're good to go!

---

## Choose Your Path

Select based on your comfort level with AI Studio:

- **Option A: Guided Challenge** - Step-by-step instructions (recommended for most participants)
- **Option B: Independent Challenge** - Minimal guidance, more exploration (for advanced users)

---

## Option A: Guided Challenge

Follow these steps to practice multimodal analysis with three different image types.

### Challenge 1: Chart Analysis (3 minutes)

**Goal:** Extract insights and data from a chart image

**Steps:**
1. Click the upload button in AI Studio
2. Upload `sample-images/chart.png`
3. Below the image, enter this prompt:
   ```
   What data does this chart show? Summarize the key trends.
   ```
4. Click "Run" and observe the response
5. Try a follow-up prompt in the same conversation:
   ```
   Extract this data as a JSON array
   ```
6. Click "Run" again

**Success criteria:**
- ✅ You received a text summary describing the chart
- ✅ You received structured JSON data extracted from the chart
- ✅ The JSON includes labels and values

**What you learned:** Gemini can read visual data and convert it to structured formats.

---

### Challenge 2: Code Screenshot Analysis (3 minutes)

**Goal:** Get code explanations and reviews from a screenshot

**Steps:**
1. Remove the chart image (or start a new prompt)
2. Upload `sample-images/code-screenshot.png`
3. Enter this prompt:
   ```
   Explain what this code does step by step
   ```
4. Click "Run" and read the explanation
5. Try a follow-up prompt:
   ```
   Are there any bugs or improvements you'd suggest?
   ```
6. Click "Run" again

**Success criteria:**
- ✅ You received a clear explanation of the code's purpose
- ✅ You received suggestions for improvements or potential issues
- ✅ The suggestions are specific and actionable

**What you learned:** Gemini can analyze code from images - useful for documentation, learning, and code review.

---

### Challenge 3: UI Mockup Analysis (3 minutes)

**Goal:** Describe and critique a user interface design

**Steps:**
1. Remove the code image (or start a new prompt)
2. Upload `sample-images/ui-mockup.png`
3. Enter this prompt:
   ```
   Describe this user interface. What is its purpose?
   ```
4. Click "Run" and read the description
5. Try a follow-up prompt:
   ```
   Suggest 3 improvements to this design
   ```
6. Click "Run" again

**Success criteria:**
- ✅ You received a description identifying UI elements
- ✅ You received specific design improvement suggestions
- ✅ The suggestions are practical and UX-focused

**What you learned:** Gemini can analyze designs and provide UX insights - useful for design review and accessibility.

---

### Challenge 4: Check Token Usage (1 minute)

**Goal:** Understand token costs for images

**Steps:**
1. Look at the token usage indicator after each image prompt (usually shown in AI Studio interface)
2. Note the approximate token count for each image
3. Compare to what you learned in the demonstration

**Observation:**
- Small images (≤384px) should use approximately 258 tokens
- This is roughly equivalent to 200 words of text

**What you learned:** Token costs for images are predictable when you optimize image size.

---

## Option B: Independent Challenge

**For advanced participants who want more freedom to explore.**

### Goal
Upload your own image or use a provided sample, then extract meaningful insights using multimodal prompts.

### Task Ideas

Choose one or more:

1. **Data visualization analysis**
   - Upload a chart or graph
   - Extract the data as structured JSON
   - Ask for trends, predictions, or insights

2. **Code review from screenshot**
   - Upload a code screenshot
   - Generate documentation or docstrings
   - Get bug reports and improvement suggestions

3. **Design description and implementation**
   - Upload a UI design or wireframe
   - Generate a detailed description
   - Ask for HTML/CSS to implement the design

4. **Before/After comparison**
   - Upload TWO images in one prompt
   - Compare differences
   - Analyze improvements or changes

### Requirements

Complete at least:
- ✅ Use at least 2 different images
- ✅ Write prompts that extract specific information (not just "describe this")
- ✅ Try combining multimodal with structured output (use JSON schema from Module 02)
- ✅ Check token usage and note the cost

### Resources

- Sample images: `sample-images/` directory
- Solution examples: `solutions/solution.md`
- JSON schemas: See Module 02 materials

---

## For Fast Finishers: Going Further

If you complete the main exercise early, try these advanced challenges:

### Advanced Challenge 1: Multiple Images
Upload multiple images in a single prompt and ask Gemini to compare them:
```
Compare these two charts. What are the key differences in trends?
```

### Advanced Challenge 2: Combined Context
Upload an image AND provide text context:
```
[Upload diagram]

This diagram shows our system architecture. Based on this design:
1. What are potential bottlenecks?
2. Suggest scalability improvements
3. Identify security concerns
```

### Advanced Challenge 3: Structured Output Schema
Combine multimodal with a structured output schema (from Module 02):
```
[Upload UI mockup]

Extract UI components as JSON matching this schema:
{
  "type": "object",
  "properties": {
    "components": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {"type": "string"},
          "label": {"type": "string"},
          "purpose": {"type": "string"}
        }
      }
    }
  }
}
```

### Advanced Challenge 4: File API Approach
Try the File API code pattern from the demonstration:
- Upload an image using the File API
- Reuse the same file URI in multiple prompts
- Observe the performance benefit

See `solutions/solution.md` for API code examples.

### Advanced Challenge 5: Different Image Types
Experiment with different visual content:
- Diagrams and flowcharts
- Photos of objects or scenes
- Hand-drawn sketches
- Screenshots of applications
- Infographics
- Memes (for fun!)

---

## Success Criteria

By the end of this exercise, you should be able to check all these boxes:

- [ ] You have uploaded and analyzed at least 2 different images
- [ ] You understand that Gemini can "see" and describe visual content
- [ ] You have tried both descriptive prompts ("explain this") and extractive prompts ("extract data as JSON")
- [ ] You are aware of token costs for images (small images ≤384px = 258 tokens)
- [ ] You can imagine multimodal use cases for your own projects

---

## Real-World Use Cases to Consider

As you work through the exercise, think about how multimodal input could be useful in your projects:

- **Data entry automation:** Extract data from photos of receipts, forms, or documents
- **Accessibility tools:** Generate alt text for images automatically
- **Content moderation:** Analyze images for safety or policy compliance
- **Design systems:** Analyze UI screenshots to ensure consistency
- **Documentation:** Generate explanations from code screenshots
- **Analytics dashboards:** Extract data from chart images when API access isn't available
- **Product catalogs:** Describe product photos for e-commerce
- **Technical support:** Analyze screenshots of errors to suggest fixes

---

## Need Help?

**Common issues:**

**Image upload not working?**
- Check file format (PNG, JPEG supported)
- Check file size (<10MB for uploads)
- Try refreshing AI Studio

**Response doesn't describe image accurately?**
- Be more specific in your prompt
- Instead of "describe this", ask "What data is shown in this chart?"
- Ensure image is clear and well-lit

**Token usage seems high?**
- Check image dimensions - resize to ≤384px for workshop use
- Large images are tiled, consuming more tokens

**Can't find sample images?**
- Check the `sample-images/` directory in the workshop materials
- Ask the instructor for access

---

⏱️ **Duration:** Expected: 11 minutes | Buffer: 3 minutes

**Next:** Once you've completed the exercise, compare your results with `solutions/solution.md` to see expected outputs and learn additional patterns.
