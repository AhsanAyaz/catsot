# Module 02: Structured Output Exercise

**Duration:** 10-13 minutes
**Format:** Hands-on individual work

## Your Task

Create a JSON Schema for a specific use case and use it to get structured output from Gemini.

This exercise will teach you to define precise output formats, use description fields effectively, and validate that your schema produces the results you expect.

---

## Setup (1 minute)

1. Open [aistudio.google.com](https://aistudio.google.com) in your browser
2. Create a new prompt (click "New prompt" or "Create new prompt")
3. Open **Run settings** (gear icon ⚙️)
4. Under "Response format", select **JSON mode**

✅ If you see the schema editor, you're ready to begin!

---

## Option A: Guided Challenge (For Beginners)

**Recommended if:** This is your first time with JSON Schema or structured output

### Challenge: Create a Schema for Analyzing Customer Feedback

Your goal is to build a schema that analyzes customer feedback and returns structured data about sentiment, topic, confidence, and whether action is needed.

---

### Step 1: Define Your Schema (4 minutes)

Create a schema with these fields:

| Field | Type | Description (Your Job: Write This!) | Required? |
|-------|------|-------------------------------------|-----------|
| `sentiment` | string | Hint: positive, negative, or neutral | Yes |
| `topic` | string | Hint: what the feedback is about | Yes |
| `confidence_score` | number | Hint: 0-100, how confident is this analysis | Yes |
| `action_required` | boolean | Hint: does this need follow-up | Yes |
| `summary` | string | Hint: one-sentence summary | No |

**Your task:**
1. Open a text editor or use the schema editor in AI Studio
2. Start with this template:
   ```json
   {
     "type": "object",
     "properties": {
       "sentiment": {
         "type": "string",
         "description": "TODO: Write a clear description here"
       }
     },
     "required": ["sentiment"]
   }
   ```
3. Add the remaining fields following the same pattern
4. Write **clear, specific descriptions** for each field (remember: descriptions are instructions to the model!)
5. Update the `required` array to include all required fields

**Reference:** Look at `schema-examples/product-schema.json` for structure examples

**Tips:**
- Descriptions should be specific: "Overall sentiment (positive, negative, or neutral)" is better than "The sentiment"
- For numbers, mention ranges: "Confidence score from 0-100" helps the model
- Think about what the model needs to know to populate this field correctly

---

### Step 2: Test Your Schema (4 minutes)

**Action:**
1. Paste your schema into the AI Studio schema editor
2. Check for validation errors (if any, fix JSON syntax: commas, brackets, quotes)
3. Write this prompt in the prompt editor:
   ```
   Analyze this customer feedback: "The new dashboard is confusing but the support team was helpful"
   ```
4. Click **Run**

**Expected result:**
Valid JSON matching your schema structure

**Verify:**
- ✅ All required fields are present
- ✅ Types are correct (string, number, boolean)
- ✅ Values make sense (not generic placeholders)

**If values seem wrong or generic:**
- Your descriptions might not be clear enough
- Try adding more specific guidance in description fields
- Run again and compare results

---

### Step 3: Iterate and Test Edge Cases (3 minutes)

Try these additional test cases:

**Test 2: Very short feedback**
```
Analyze this customer feedback: "Great!"
```

**Test 3: Mixed sentiment**
```
Analyze this customer feedback: "Love the features but it's too expensive"
```

**Test 4: Negative feedback**
```
Analyze this customer feedback: "Site keeps crashing, completely unusable"
```

**What to observe:**
- Does `sentiment` correctly identify positive/negative/neutral?
- Does `confidence_score` vary based on clarity of feedback?
- Does `action_required` make sense (true for complaints, false for praise)?

**Adjust your schema if needed:**
- Refine descriptions based on results
- Add more guidance for ambiguous cases

---

### Step 4: Optional Enhancement (If Time Allows)

Make your schema more robust using advanced JSON Schema features:

**Add enum constraint for sentiment:**
```json
"sentiment": {
  "type": "string",
  "description": "Overall sentiment of the feedback",
  "enum": ["positive", "negative", "neutral"]
}
```

**Add range constraints for confidence_score:**
```json
"confidence_score": {
  "type": "number",
  "description": "Confidence in this analysis from 0-100",
  "minimum": 0,
  "maximum": 100
}
```

These constraints further enforce what values are allowed.

---

## Option B: Independent Challenge (For Advanced Users)

**Recommended if:** You're comfortable with JSON and want to explore your own use case

### Goal
Create a schema for a use case relevant to your work, test it with multiple examples, and verify schema enforcement.

---

### Use Case Ideas

Choose one or design your own:

**1. Code Review Analysis**
- Fields: `quality_score` (number), `issues_found` (array of strings), `suggestions` (array of strings), `severity` (string: low/medium/high)
- Prompt: "Review this code: [paste code snippet]"

**2. Meeting Notes Summary**
- Fields: `action_items` (array of objects with `task` and `assignee`), `participants` (array of strings), `decisions` (array of strings), `next_meeting` (string)
- Prompt: "Summarize this meeting transcript: [paste transcript]"

**3. Social Media Post Analysis**
- Fields: `sentiment` (string), `engagement_prediction` (string: low/medium/high), `suggested_hashtags` (array of strings), `target_audience` (string), `content_type` (string)
- Prompt: "Analyze this social media post: [paste post]"

**4. Product Feature Request**
- Fields: `feature_name` (string), `priority` (string: low/medium/high), `effort_estimate` (string: small/medium/large), `user_value` (string), `technical_complexity` (string)
- Prompt: "Analyze this feature request: [paste request]"

---

### Requirements

Your schema must have:
- ✅ At least **4 fields** with proper types (string, number, boolean, array, object)
- ✅ **Description fields** on all properties (remember: these are instructions!)
- ✅ At least **2 required fields**
- ✅ Tested with **3 different inputs**

### Testing Checklist

- [ ] Schema validates in AI Studio (no JSON syntax errors)
- [ ] Tested with 3 different prompts
- [ ] All responses match schema structure
- [ ] Values are reasonable (not generic placeholders)
- [ ] Edge cases handled (very short input, ambiguous input, etc.)

### Going Deeper

Advanced challenges to try:
- Use nested objects (e.g., `action_items` as array of objects with `task` and `due_date` properties)
- Add enum constraints to limit allowed values
- Combine structured output with multimodal input (image + text)
- Export the API code and test it in Python

---

## For Fast Finishers: Going Further

Completed both test cases? Try these advanced explorations:

### 1. Nested Objects
Create a schema with an array of objects that have properties:
```json
"action_items": {
  "type": "array",
  "description": "List of action items from the feedback",
  "items": {
    "type": "object",
    "properties": {
      "task": {
        "type": "string",
        "description": "What needs to be done"
      },
      "priority": {
        "type": "string",
        "description": "Priority level",
        "enum": ["low", "medium", "high"]
      }
    },
    "required": ["task"]
  }
}
```

### 2. Test Without Descriptions
Create a copy of your schema and remove all description fields. Run the same prompts. Compare results. This demonstrates why descriptions matter!

**Hypothesis:** Without descriptions, you'll get:
- Valid JSON structure
- Generic or placeholder values
- Less accurate field population

**Try it and see!**

### 3. Explore the API Code
Click "Get code" in AI Studio and examine the Python code:
- Locate where `response_json_schema` is defined
- Identify the `response_mime_type` parameter
- Notice how the schema is passed to the config

**Challenge:** Can you modify the API code to use a different schema?

### 4. Combine with System Instructions
Try adding a system instruction to enhance results:
1. In Run settings, add System instructions: "You are an expert customer feedback analyst with 10 years of experience."
2. Run the same prompts
3. Compare results – does the system instruction improve analysis quality?

---

## Success Criteria

Before moving on, verify you have:

- [ ] Created a valid JSON Schema with proper syntax
- [ ] Included description fields on all properties (and understand they're instructions to the model)
- [ ] Tested the schema with at least 2 different prompts
- [ ] Received valid JSON responses matching your schema
- [ ] Understand that schema enforces **structure**, not **accuracy** of content
- [ ] Can explain why description fields matter

---

## Duration

⏱️ **Expected:** 12 minutes | **Buffer:** 3 minutes

**Breakdown:**
- Setup: 1 minute
- Schema creation: 4 minutes
- Testing: 4 minutes
- Iteration: 3 minutes

If you finish early, explore the "Going Further" challenges above!

---

## Need Help?

**Schema won't validate?**
- Check for missing commas between properties
- Ensure all strings are in double quotes (not single quotes)
- Verify brackets are balanced: `{ }` and `[ ]`
- Use a JSON validator online if needed

**Results seem wrong despite valid structure?**
- Check your description fields – are they specific enough?
- Try adding examples in descriptions: "sentiment (positive, negative, or neutral)"
- Remember: schema ensures structure, descriptions guide content

**Stuck on schema design?**
- Look at `schema-examples/product-schema.json` for reference
- See `solutions/solution.md` for a complete example
- Ask the instructor!

---

## Next Steps

Once complete, check out `solutions/solution.md` to see a reference implementation and learn about advanced features like enum constraints and range validation.

In the next module, we'll combine structured output with multimodal input – analyzing images and returning structured data!
