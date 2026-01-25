# Module 04 Exercise: Context Engineering

**Duration:** 10-13 minutes
**Goal:** Transform unstructured prompts into well-engineered contexts using system instructions, structure, and few-shot examples

## Your Task

Take an unstructured prompt and progressively improve it using context engineering techniques. You'll see how each technique (system instructions, XML tags, few-shot examples) adds value.

## Setup (1 minute)

1. Open aistudio.google.com
2. Create a new freeform prompt
3. Have the prompt templates open for reference:
   - `prompt-templates/structured-template.md`
   - `prompt-templates/few-shot-examples.md`

## Choose Your Path

### Option A: Guided Challenge (Recommended for beginners)

Follow the step-by-step progression to refactor a customer feedback analysis prompt.

### Option B: Independent Challenge (For advanced users)

Apply context engineering to a use case relevant to your work.

---

## Option A: Guided Challenge - Customer Feedback Analyzer

### Challenge Goal

Transform a poorly-structured feedback analysis prompt into a production-ready context-engineered solution.

### Step 1: Test the Unstructured Version (2 minutes)

**Action:** Copy this prompt into AI Studio:

```
Analyze this customer feedback and tell me if it's good or bad and what
they're talking about and give me a score: "The new dashboard is confusing
but the support team was helpful"
```

**Action:** Run it and observe the response

**What to notice:**
- Response works but format is inconsistent
- Unclear what "score" means (1-5? 1-10? percentage?)
- May or may not include all requested information
- Format will vary if you try different feedback

**Question to consider:** Would this be reliable for processing 100 customer reviews automatically?

### Step 2: Add System Instructions (3 minutes)

**Action:** Click "System instructions" in AI Studio

**Action:** Add this system instruction:

```
You are a customer feedback analyzer. Classify sentiment, identify topics,
and assess whether action is required. Be consistent in your output format.
```

**Action:** Keep the same prompt, re-run

**What to notice:**
- Response is more focused on analysis (vs. generic commentary)
- Model understands its role (analyzer, not conversationalist)
- Still lacks consistent output format

**Success criteria:**
- [ ] Response mentions sentiment classification
- [ ] Response is more structured than Step 1

### Step 3: Structure the Prompt with XML Tags (3 minutes)

**Action:** Restructure your prompt using XML tags (reference `prompt-templates/structured-template.md`):

```
<system_instruction>
You are a customer feedback analyzer.
Classify sentiment, identify topics, and assess whether action is required.
</system_instruction>

<feedback>
The new dashboard is confusing but the support team was helpful
</feedback>

<output_format>
- Sentiment: [positive/negative/neutral]
- Topic: [main subject]
- Confidence: [0-100]
- Action required: [yes/no]
- Reason: [brief explanation]
</output_format>
```

**Action:** Run and compare to previous versions

**What to notice:**
- Output follows the specified format more closely
- Clear separation between input (feedback) and instructions (output_format)
- Model understands what information to extract
- More consistent structure than previous attempts

**Success criteria:**
- [ ] Output includes sentiment classification
- [ ] Output includes confidence score
- [ ] Output includes action required assessment
- [ ] Format is close to what you specified

### Step 4: Add Few-Shot Examples (Optional - 3 minutes)

**Action:** Add 2-3 examples before your feedback (reference `prompt-templates/few-shot-examples.md`):

```
<system_instruction>
You are a customer feedback analyzer.
Classify sentiment, identify topics, and assess whether action is required.
Be consistent in your output format.
</system_instruction>

<examples>
Example 1:
Feedback: "Amazing product! Fast delivery and great quality."
Analysis:
- Sentiment: positive
- Topic: product quality and shipping
- Confidence: 95
- Action required: no
- Reason: Strong positive sentiment across multiple areas

Example 2:
Feedback: "Terrible experience. Product broke after one day and support was unhelpful."
Analysis:
- Sentiment: negative
- Topic: product quality and customer support
- Confidence: 98
- Action required: yes
- Reason: Critical product failure plus poor support experience

Example 3:
Feedback: "It works as described. Nothing special."
Analysis:
- Sentiment: neutral
- Topic: product functionality
- Confidence: 80
- Action required: no
- Reason: Meets expectations but no enthusiasm or complaints
</examples>

<task>
Now analyze this feedback following the same pattern:
Feedback: "The new dashboard is confusing but the support team was helpful"
</task>
```

**Action:** Run and observe consistency

**What to notice:**
- Output now matches the example format exactly
- Confidence scores are in the expected range
- Reasoning follows the pattern from examples
- Try with different feedback - format stays consistent

**Success criteria:**
- [ ] Output format matches the examples precisely
- [ ] Works consistently across different feedback texts
- [ ] You understand why few-shot examples improve quality

---

## Option B: Independent Challenge - Choose Your Use Case

### Goal

Apply context engineering to a real-world use case relevant to your work or interests.

### Use Case Ideas

Pick one or create your own:

1. **Technical documentation generator**
   - Input: Code snippet
   - Output: Documentation with usage examples

2. **Email tone analyzer**
   - Input: Email text
   - Output: Tone classification (professional, friendly, aggressive, etc.)

3. **Bug report triaging**
   - Input: Bug description
   - Output: Priority, affected component, suggested owner

4. **Meeting notes summarizer**
   - Input: Raw meeting transcript
   - Output: Action items, decisions, attendees

5. **API response validator**
   - Input: API response JSON
   - Output: Validation results, schema compliance

### Requirements

Create a prompt that includes:

1. **Unstructured version first** (baseline)
   - Write a simple, unstructured prompt for your use case
   - Test it and note the issues

2. **Add system instructions** (define role and behavior)
   - What role should the model take?
   - What should it focus on?

3. **Structure with XML tags** (organize sections)
   - Use tags like `<input>`, `<task>`, `<context>`, `<output_format>`
   - Reference `prompt-templates/structured-template.md`

4. **Include 2-3 few-shot examples** (show the pattern)
   - Create examples showing desired input → output
   - Reference `prompt-templates/few-shot-examples.md`

5. **Test with multiple inputs** (verify consistency)
   - Try 3-4 different inputs
   - Confirm format stays consistent

6. **(Optional) Combine with structured output**
   - Add JSON Schema from Module 02
   - Get guaranteed structure + quality content

### Solution Reference

See `solutions/solution.md` for a complete example of the customer feedback analyzer with all techniques applied.

---

## For Fast Finishers: Going Further

If you complete the main exercise with time to spare, try these advanced challenges:

### Challenge 1: Combine with Structured Output

Take your context-engineered prompt and add JSON Schema (from Module 02):
- Define a schema that matches your output format
- Enable JSON mode in AI Studio
- Compare: few-shot alone vs. few-shot + schema

### Challenge 2: Create a Reusable Template

Save your prompt for future use:
- Click "Share" in AI Studio
- Make it a template others can fork
- Export the API code (`Get code` button)
- Test the code snippet in your local environment

### Challenge 3: Test Edge Cases

See how your prompt handles tricky inputs:
- Empty input
- Very long input (500+ words)
- Ambiguous cases (mixed signals)
- Input in a different language (if applicable)

### Challenge 4: Compare Zero-Shot vs Few-Shot

Measure the improvement from adding examples:
- Remove the few-shot examples temporarily
- Test with 5 different inputs
- Compare output quality and consistency
- Add examples back - measure improvement

### Challenge 5: Optimize Token Usage

Few-shot examples use tokens. Find the sweet spot:
- Start with 3 examples
- Remove one - does quality drop?
- Add a 4th example - does quality improve?
- Find minimum examples for acceptable quality

---

## Success Criteria

By the end of this exercise, you should have:

- [ ] Refactored at least one unstructured prompt using context engineering
- [ ] Used **system instructions** to define role and behavior
- [ ] Used **XML tags** or Markdown to structure your prompt
- [ ] Created **few-shot examples** showing desired output pattern
- [ ] Tested with multiple inputs to verify consistency
- [ ] Can explain why structured prompts perform better than unstructured ones

## Duration Breakdown

⏱️ **Expected:** 12 minutes | **Buffer:** 3 minutes

- Setup: 1 minute
- Option A (Guided): 11 minutes (Step 1: 2 min, Step 2: 3 min, Step 3: 3 min, Step 4: 3 min)
- Option B (Independent): 12 minutes (design + iterate)
- Going Further: Use any remaining time

## What You've Learned

After this exercise, you understand:

1. **The progression:** Unstructured → System instructions → Structured tags → Few-shot examples
2. **When to use each technique:** Simple tasks vs. complex production use cases
3. **How to combine techniques:** System instructions + structure + examples = best results
4. **The template pattern:** Reusable prompts save time and ensure consistency

## Next Steps

In the next modules, you'll:
- **Module 05:** Add grounding with Google Search for real-time information
- **Module 06:** Build a logic engine using all techniques together
- **Part 2:** Deploy your context-engineered prompts in production applications

Ready to see your solution? Check `solutions/solution.md` for the complete customer feedback analyzer with all techniques applied.
