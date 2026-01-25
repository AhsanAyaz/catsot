# Module 02: Structured Output Solution

This solution demonstrates a complete implementation of the customer feedback analysis schema, including advanced features, API code, and common issues to avoid.

---

## Customer Feedback Analysis Schema

### Complete Schema with Advanced Features

```json
{
  "type": "object",
  "properties": {
    "sentiment": {
      "type": "string",
      "description": "Overall sentiment: positive, negative, or neutral",
      "enum": ["positive", "negative", "neutral"]
    },
    "topic": {
      "type": "string",
      "description": "Main subject of the feedback (e.g., product, support, pricing, usability)"
    },
    "confidence_score": {
      "type": "number",
      "description": "Confidence in this analysis from 0-100, where 100 is highest confidence",
      "minimum": 0,
      "maximum": 100
    },
    "action_required": {
      "type": "boolean",
      "description": "Whether this feedback requires immediate follow-up action"
    },
    "summary": {
      "type": "string",
      "description": "One-sentence summary of the feedback"
    }
  },
  "required": ["sentiment", "topic", "confidence_score", "action_required"]
}
```

### What Makes This Schema Good

**1. Descriptive descriptions**
- Each field has clear guidance: "Overall sentiment: positive, negative, or neutral"
- Not just "The sentiment" – that's too vague
- Descriptions include examples and context

**2. Type safety**
- `sentiment` is string (not number or object)
- `confidence_score` is number (allows math operations)
- `action_required` is boolean (not string "true"/"false")

**3. Advanced constraints**
- `enum` on sentiment ensures only valid values
- `minimum` and `maximum` on confidence_score prevent invalid ranges
- These add enforcement beyond basic type checking

**4. Optional vs required fields**
- Core analysis fields are required
- `summary` is optional (model can omit if not confident)

---

## Example Usage

### Example Prompt

```
Analyze this customer feedback: "The new dashboard is confusing but the support team was helpful"
```

### Expected Response

```json
{
  "sentiment": "neutral",
  "topic": "product and support",
  "confidence_score": 85,
  "action_required": true,
  "summary": "Mixed feedback about dashboard usability with positive support experience"
}
```

### Why This Response is Good

- **sentiment: "neutral"** – Correctly identifies mixed positive/negative
- **topic: "product and support"** – Captures both mentioned areas
- **confidence_score: 85** – High confidence because feedback is clear
- **action_required: true** – Dashboard confusion needs attention
- **summary** – Concise, captures both aspects

---

## API Implementation

### Python Code

```python
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key="YOUR_API_KEY")

# Define the schema
feedback_schema = {
  "type": "object",
  "properties": {
    "sentiment": {
      "type": "string",
      "description": "Overall sentiment: positive, negative, or neutral",
      "enum": ["positive", "negative", "neutral"]
    },
    "topic": {
      "type": "string",
      "description": "Main subject of the feedback (e.g., product, support, pricing)"
    },
    "confidence_score": {
      "type": "number",
      "description": "Confidence in this analysis from 0-100",
      "minimum": 0,
      "maximum": 100
    },
    "action_required": {
      "type": "boolean",
      "description": "Whether this feedback requires immediate follow-up"
    },
    "summary": {
      "type": "string",
      "description": "One-sentence summary of the feedback"
    }
  },
  "required": ["sentiment", "topic", "confidence_score", "action_required"]
}

# Configure structured output
config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_json_schema=feedback_schema
)

# Generate analysis
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Analyze this customer feedback: 'The new dashboard is confusing but the support team was helpful'",
    config=config
)

# Parse and use the response
import json
result = json.loads(response.text)

print(json.dumps(result, indent=2))
print(f"\nSentiment: {result['sentiment']}")
print(f"Action needed: {result['action_required']}")
```

### Key API Elements

**1. GenerateContentConfig**
- `response_mime_type="application/json"` – Enables JSON mode
- `response_json_schema=feedback_schema` – Enforces your schema

**2. Model selection**
- `gemini-3-flash-preview` – Fast, cost-effective for structured output
- `gemini-2.5-flash` – Also works well for this use case

**3. Response parsing**
- `response.text` contains the JSON string
- `json.loads()` parses it into a Python dict
- Guaranteed to be valid JSON matching your schema

---

## Test Cases

### Test Case 1: Positive Feedback

**Input:**
```
Analyze this customer feedback: "Amazing product! Solved all my problems."
```

**Expected Output:**
```json
{
  "sentiment": "positive",
  "topic": "product",
  "confidence_score": 95,
  "action_required": false,
  "summary": "Highly satisfied customer praising product effectiveness"
}
```

---

### Test Case 2: Negative Feedback

**Input:**
```
Analyze this customer feedback: "Site keeps crashing, completely unusable"
```

**Expected Output:**
```json
{
  "sentiment": "negative",
  "topic": "technical issue",
  "confidence_score": 98,
  "action_required": true,
  "summary": "Critical technical issue affecting usability"
}
```

---

### Test Case 3: Edge Case – Very Short

**Input:**
```
Analyze this customer feedback: "Great!"
```

**Expected Output:**
```json
{
  "sentiment": "positive",
  "topic": "general",
  "confidence_score": 60,
  "action_required": false,
  "summary": "Brief positive feedback without specific details"
}
```

**Note:** Confidence score is lower due to lack of detail – this is correct behavior!

---

### Test Case 4: Edge Case – Ambiguous

**Input:**
```
Analyze this customer feedback: "It's okay, I guess"
```

**Expected Output:**
```json
{
  "sentiment": "neutral",
  "topic": "general",
  "confidence_score": 50,
  "action_required": false,
  "summary": "Lukewarm feedback with no strong opinion"
}
```

---

## Advanced Features

### Nested Objects

You can create more complex schemas with nested structures:

```json
{
  "type": "object",
  "properties": {
    "sentiment": {
      "type": "string",
      "description": "Overall sentiment",
      "enum": ["positive", "negative", "neutral"]
    },
    "details": {
      "type": "object",
      "description": "Detailed breakdown of the feedback",
      "properties": {
        "praised_aspects": {
          "type": "array",
          "description": "Things the customer liked",
          "items": {"type": "string"}
        },
        "criticized_aspects": {
          "type": "array",
          "description": "Things the customer didn't like",
          "items": {"type": "string"}
        }
      }
    }
  }
}
```

**When to use:** Complex analysis requiring structured breakdowns

---

### Combining with System Instructions

Enhance schema results with system instructions:

```python
config = types.GenerateContentConfig(
    system_instruction="You are an expert customer feedback analyst with 10 years of experience. Provide thoughtful, balanced analysis.",
    response_mime_type="application/json",
    response_json_schema=feedback_schema
)
```

**Effect:** More nuanced analysis, better handling of edge cases

---

## Key Learnings

### 1. Description Fields Are Critical

**Without descriptions:**
```json
{
  "sentiment": {"type": "string"}
}
```
Result: Valid JSON but model guesses what "sentiment" means

**With descriptions:**
```json
{
  "sentiment": {
    "type": "string",
    "description": "Overall sentiment: positive, negative, or neutral"
  }
}
```
Result: Valid JSON with accurate sentiment classification

**Takeaway:** Descriptions are **instructions to the model**, not just documentation

---

### 2. Schema Enforcement is Guaranteed

- Response will **always** match schema structure
- Required fields will **always** be present
- Types will **always** be correct (string, number, boolean)
- Enum constraints will **always** be respected

**Takeaway:** This is schema enforcement, not prompt hacking – it's guaranteed

---

### 3. Structure ≠ Accuracy

Schema ensures:
- ✅ Valid JSON syntax
- ✅ Correct field names
- ✅ Correct types
- ✅ Required fields present

Schema does NOT ensure:
- ❌ Values are factually correct
- ❌ Analysis is accurate
- ❌ Content makes sense

**Example:** If you ask about a product that doesn't exist, you'll get valid JSON with made-up values.

**Takeaway:** Always validate semantics (content) separately from structure

---

### 4. Iterative Refinement

First attempt:
```json
"topic": {"type": "string", "description": "The topic"}
```
Result: Generic values like "feedback" or "comment"

Refined:
```json
"topic": {
  "type": "string",
  "description": "Main subject of the feedback (e.g., product, support, pricing, usability)"
}
```
Result: Specific, useful categorization

**Takeaway:** Test your schema, refine descriptions based on results

---

### 5. Advanced Features Add Value

**Enums prevent invalid values:**
```json
"sentiment": {
  "enum": ["positive", "negative", "neutral"]
}
```
Without enum: Could get "good", "bad", "meh" (inconsistent)
With enum: Always one of the three specified values

**Range constraints prevent nonsense:**
```json
"confidence_score": {
  "minimum": 0,
  "maximum": 100
}
```
Without constraints: Could get -50 or 9999
With constraints: Always 0-100

**Takeaway:** Use advanced features for production systems

---

## Common Issues and Solutions

### Issue 1: Schema Validation Error in AI Studio

**Symptom:**
Red error message: "Invalid schema" or "Schema validation failed"

**Common causes:**
- Missing comma between properties
- Single quotes instead of double quotes
- Unbalanced brackets `{ }` or `[ ]`
- Trailing comma after last property

**Solution:**
1. Copy schema into a JSON validator (e.g., jsonlint.com)
2. Fix syntax errors
3. Paste corrected schema back into AI Studio

**Example of broken schema:**
```json
{
  "type": "object",
  "properties": {
    "sentiment": {"type": "string"}, // ← trailing comma problem
  }
}
```

**Fixed:**
```json
{
  "type": "object",
  "properties": {
    "sentiment": {"type": "string"}
  }
}
```

---

### Issue 2: Response Has Generic/Wrong Values Despite Valid Structure

**Symptom:**
JSON is valid but values are:
- Generic placeholders ("string", "value", "unknown")
- Wrong categorization
- Irrelevant content

**Cause:**
Descriptions are too vague or missing

**Solution:**
Improve description fields with:
- Specific instructions
- Examples of valid values
- Context about what the field represents

**Bad:**
```json
"sentiment": {"type": "string", "description": "The sentiment"}
```

**Good:**
```json
"sentiment": {
  "type": "string",
  "description": "Overall sentiment: positive, negative, or neutral based on the feedback tone"
}
```

---

### Issue 3: Unexpected Values in Enum Field

**Symptom:**
Error like "Value 'good' is not one of ['positive', 'negative', 'neutral']"

**Wait – this shouldn't happen with schema enforcement!**

**Explanation:**
If you see this error, the schema wasn't properly applied. Check:
1. JSON mode is enabled in Run settings
2. Schema is pasted in the schema editor
3. No validation errors in the schema

With proper schema enforcement, enum violations are impossible – the model cannot return invalid values.

---

### Issue 4: Missing Optional Fields

**Symptom:**
Optional field is not in the response

**Is this a problem?**
No! Optional fields (not in `required` array) can be omitted.

**Example:**
```json
{
  "required": ["sentiment", "topic"]
}
```
Response might not include `summary` field – this is correct behavior.

**If you need the field:**
Add it to the `required` array or improve the description to encourage the model to populate it.

---

## Comparison: Bad vs Good Schema

### Bad Schema (No Descriptions)

```json
{
  "type": "object",
  "properties": {
    "sentiment": {"type": "string"},
    "topic": {"type": "string"},
    "score": {"type": "number"}
  },
  "required": ["sentiment"]
}
```

**Problems:**
- No guidance for the model
- Field names are ambiguous (what's "score"?)
- Model has to guess intent
- Results will be inconsistent

**Result:**
```json
{
  "sentiment": "good",
  "topic": "feedback",
  "score": 5
}
```
Valid structure but useless values!

---

### Good Schema (With Descriptions)

```json
{
  "type": "object",
  "properties": {
    "sentiment": {
      "type": "string",
      "description": "Overall sentiment: positive, negative, or neutral",
      "enum": ["positive", "negative", "neutral"]
    },
    "topic": {
      "type": "string",
      "description": "Main subject of the feedback (product, support, pricing, etc.)"
    },
    "confidence_score": {
      "type": "number",
      "description": "Confidence in this analysis from 0-100, where 100 is highest confidence",
      "minimum": 0,
      "maximum": 100
    }
  },
  "required": ["sentiment", "topic", "confidence_score"]
}
```

**Improvements:**
- Clear descriptions guide the model
- Enum constrains sentiment values
- Field name is descriptive (confidence_score vs score)
- Range constraints prevent invalid numbers

**Result:**
```json
{
  "sentiment": "neutral",
  "topic": "dashboard usability",
  "confidence_score": 85
}
```
Valid structure AND meaningful values!

---

## Next Steps

Now that you understand structured output:

1. **Practice** with different use cases (code review, meeting notes, etc.)
2. **Experiment** with nested objects and advanced constraints
3. **Combine** with other Gemini features:
   - Module 03: Structured output from image analysis
   - Module 04: Schemas with context engineering
   - Module 06: Schemas for logic engine rules

**Key principle to remember:**
> Schema enforces structure. Descriptions guide content. Together, they make LLM output production-ready.

---

## Additional Resources

- [Official Gemini Structured Output Docs](https://ai.google.dev/gemini-api/docs/structured-output)
- [JSON Schema Reference](https://json-schema.org/understanding-json-schema/)
- AI Studio: [aistudio.google.com](https://aistudio.google.com)

**Questions?** Ask the instructor or refer to the demonstration guide for troubleshooting tips.
