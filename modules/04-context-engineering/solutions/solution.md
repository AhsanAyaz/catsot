# Module 04 Solution: Customer Feedback Analysis

This solution shows the complete progression from an unstructured prompt to a production-ready context-engineered solution. Each version builds on the previous one, demonstrating how each technique adds value.

---

## Version 1: Unstructured (Baseline)

### Prompt

```
Analyze this customer feedback and tell me if it's good or bad and what they're talking about and give me a score: "The new dashboard is confusing but the support team was helpful"
```

### Sample Output

```
This feedback is mixed. The customer is unhappy with the new dashboard, finding it confusing, but they had a positive experience with the support team who was helpful. I'd give this a 6/10 - there's a problem with the product but good customer service.
```

### Issues with This Approach

- **No clear role:** Model doesn't know if it's analyzing for product team, support team, or general insights
- **Multiple vague tasks:** "good or bad", "what they're talking about", "give me a score" - three different asks in one sentence
- **Unclear scoring:** What does "6/10" mean? Is 5 neutral? Is 10 perfect?
- **No output format specified:** Format varies across different feedback
- **Not parseable:** Can't automatically extract sentiment, topics, or actions
- **Inconsistent:** Different runs might produce different formats or emphasis

**When to use:** Quick one-off analysis where consistency doesn't matter

---

## Version 2: With System Instructions

### System Instruction

```
You are a customer feedback analyzer. Classify sentiment, identify topics, and assess whether action is required. Be consistent in your output format.
```

### Prompt

```
Analyze this customer feedback: "The new dashboard is confusing but the support team was helpful"
```

### Sample Output

```
Sentiment: Neutral (mixed)
Topics: Dashboard UX, Customer Support
Action Required: Yes - investigate dashboard usability issues
Confidence: High

The feedback indicates a product issue (confusing dashboard) balanced by positive support experience.
```

### Improvement Over Version 1

- **Clear role defined:** "customer feedback analyzer" sets expectations
- **Focused behavior:** Model knows to classify sentiment, identify topics, assess action
- **Simplified prompt:** Role is in system instruction, not repeated in every prompt
- **More structured output:** Model attempts to organize information

### Remaining Issues

- **Format still varies:** "Neutral (mixed)" vs. "neutral" vs. "mixed sentiment"
- **No guarantee of completeness:** May or may not include all requested fields
- **Not machine-parseable:** Can't reliably extract values programmatically

**When to use:** Internal tools where human readability matters more than perfect consistency

---

## Version 3: Structured with XML Tags

### Prompt

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

### Sample Output

```
- Sentiment: neutral
- Topic: dashboard UX and customer support
- Confidence: 85
- Action required: yes
- Reason: Dashboard usability issue identified, though support mitigated impact
```

### Improvement Over Version 2

- **Clear sections:** Feedback is separate from format specification
- **Explicit output structure:** Model knows exactly what format to use
- **XML tags help parsing:** `<feedback>` vs. `<output_format>` are distinct
- **Consistent field names:** "Sentiment" not "Overall feeling" or variations
- **Enumerated values:** [positive/negative/neutral] guides the model

### Remaining Issues

- **Format guidance, not enforcement:** Model might still vary format slightly
- **No examples of edge cases:** How to handle very mixed feedback?
- **Value consistency:** "85" vs. "85%" vs. "high confidence"

**When to use:** Automated systems with some tolerance for format variation

---

## Version 4: With Few-Shot Examples (Best for Reliability)

### Prompt

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

### Sample Output (Highly Consistent)

```
Analysis:
- Sentiment: neutral
- Topic: dashboard UX and customer support
- Confidence: 85
- Action required: yes
- Reason: Mixed feedback with UX issue (dashboard confusion) balanced by positive support experience; dashboard issue warrants follow-up
```

### Improvement Over Version 3

- **Examples teach the exact format:** Model copies the structure precisely
- **Examples show edge cases:** Example 3 demonstrates neutral sentiment handling
- **Examples set detail level:** Model learns how specific to be in "Reason"
- **Highly consistent:** Output will match this format across 100+ different feedback texts
- **Confidence scores normalized:** Examples show 80-98 range, model follows

### Remaining Issues

- **Still text-based:** Not guaranteed JSON (though very consistent)
- **Token cost:** Examples add ~200 tokens per request
- **Manual parsing needed:** Would need regex or string parsing to extract values

**When to use:** Production systems where reliability matters, human-readable output preferred

---

## Version 5: With Structured Output (Production-Ready)

Combine Version 4 with JSON Schema from Module 02 for the ultimate solution.

### Prompt (Same as Version 4)

```
<system_instruction>
You are a customer feedback analyzer.
Classify sentiment, identify topics, and assess whether action is required.
Be consistent in your output format.
</system_instruction>

<examples>
Example 1:
Feedback: "Amazing product! Fast delivery."
Output:
{
  "sentiment": "positive",
  "topic": "product and shipping",
  "confidence": 95,
  "action_required": false,
  "reason": "Strong positive sentiment"
}

Example 2:
Feedback: "Product broke after one day."
Output:
{
  "sentiment": "negative",
  "topic": "product quality",
  "confidence": 98,
  "action_required": true,
  "reason": "Critical product failure"
}
</examples>

<task>
Now analyze: "The new dashboard is confusing but the support team was helpful"
</task>
```

### JSON Schema

```json
{
  "type": "object",
  "properties": {
    "sentiment": {
      "type": "string",
      "description": "Overall sentiment classification",
      "enum": ["positive", "negative", "neutral"]
    },
    "topic": {
      "type": "string",
      "description": "Main subject of the feedback (e.g., product quality, shipping, support)"
    },
    "confidence": {
      "type": "number",
      "description": "Confidence score from 0-100",
      "minimum": 0,
      "maximum": 100
    },
    "action_required": {
      "type": "boolean",
      "description": "Whether this feedback requires follow-up action"
    },
    "reason": {
      "type": "string",
      "description": "Brief explanation of the analysis (1-2 sentences)"
    }
  },
  "required": ["sentiment", "topic", "confidence", "action_required", "reason"]
}
```

### Sample Output (Guaranteed Valid JSON)

```json
{
  "sentiment": "neutral",
  "topic": "dashboard UX and customer support",
  "confidence": 85,
  "action_required": true,
  "reason": "Mixed feedback with UX issue balanced by positive support; dashboard confusion warrants investigation"
}
```

### Why This Is Production-Ready

- **Guaranteed structure:** Schema enforces valid JSON with required fields
- **Type safety:** confidence is always a number 0-100, not "high" or "85%"
- **Enum enforcement:** sentiment is always exactly "positive", "negative", or "neutral"
- **Quality content:** Few-shot examples ensure meaningful values within the structure
- **Easily parseable:** Direct JSON.parse() in any language
- **Reliable:** Same structure every time, across thousands of requests

**Result:** Best of both worlds
- **Schema:** Enforces structure, types, required fields
- **Few-shot examples:** Teaches what good values look like
- **System instructions:** Sets role and focus

**When to use:** Any production system processing customer feedback at scale

---

## Key Learnings

### The Progression

1. **Unstructured:** Works but inconsistent, not scalable
2. **System instructions:** Defines role and behavior, more focused
3. **Structured tags:** Clear sections and format expectations
4. **Few-shot examples:** Teaches exact output pattern through demonstration
5. **+ Structured output:** Production-ready with guaranteed structure

### Best Practices from This Solution

1. **Start with role:** "You are a customer feedback analyzer" sets context
2. **Separate concerns:** Use XML tags to distinguish input from instructions
3. **Show, don't just tell:** Few-shot examples are more powerful than descriptions
4. **Iterate and test:** Try with 10-20 different feedback texts to verify consistency
5. **Combine techniques:** System instructions + structure + examples + schema = best results

### When to Use Each Technique

| Technique | Use When | Example Use Case |
|-----------|----------|------------------|
| **System instructions** | Always | Set role, behavior, tone for any task |
| **Structured tags** | Multiple types of input/context | Code + requirements + constraints |
| **Few-shot examples** | Specific format or style required | Exact JSON structure, specific tone |
| **Structured output** | Need parseable, guaranteed structure | API responses, database inserts |
| **All combined** | Production systems at scale | Customer feedback pipeline |

### Performance Considerations

**Token costs for 1,000 feedback analyses:**

- Version 1 (unstructured): ~50 tokens/request = 50K tokens
- Version 2 (system instruction): ~75 tokens/request = 75K tokens
- Version 4 (few-shot): ~250 tokens/request = 250K tokens
- Version 5 (few-shot + schema): ~250 tokens/request = 250K tokens

**Trade-off:** 5x token cost for 10x+ reliability improvement
**Recommendation:** Use few-shot for production (cost is justified by consistency)

---

## Common Issues and Solutions

### Issue 1: "Output format keeps changing"

**Problem:** Even with structured tags, format varies slightly

**Solution:** Add few-shot examples showing exact format
```
Example 1: [show exact format]
Example 2: [show exact format]
Example 3: [show exact format]
```

Model learns from examples more than descriptions.

### Issue 2: "Model ignores my instructions"

**Problem:** Prompt asks for specific format but model does something else

**Solution:**
1. Move role/behavior to system instructions (higher priority)
2. Use XML tags to separate sections clearly
3. Add few-shot examples showing the desired behavior
4. If still failing, add JSON Schema for enforcement

### Issue 3: "Response is too generic"

**Problem:** "The feedback is mixed" instead of specific analysis

**Solution:** Add more specific context in system instruction
```
You are a customer feedback analyzer for a SaaS product team.
Focus on: product usability, feature requests, bug reports, support quality.
Prioritize actionable insights over generic commentary.
```

### Issue 4: "Few-shot examples make my prompt too long"

**Problem:** 3 examples + schema = 400+ tokens per request

**Solutions:**
1. **Reduce to 2 examples** - often sufficient for most patterns
2. **Use shorter examples** - demonstrate format with minimal content
3. **Consider fine-tuning** - if processing millions of requests, fine-tune a model instead
4. **Cache system instruction** - some APIs support caching to reduce cost

**Example of shorter few-shot:**
```
Example 1:
Input: "Great product!"
Output: {"sentiment": "positive", "confidence": 95}

Example 2:
Input: "Terrible experience."
Output: {"sentiment": "negative", "confidence": 98}
```

### Issue 5: "Works in AI Studio but not via API"

**Problem:** AI Studio gives good results, API code doesn't

**Common causes:**
1. System instruction not included in API config
2. Schema not properly formatted in API call
3. Different model version between AI Studio and API

**Solution:** Use "Get code" button in AI Studio - it generates correct API code

---

## API Code Example (Python)

Complete implementation using Google Gemini API:

```python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

# System instruction
system_inst = """
You are a customer feedback analyzer.
Classify sentiment, identify topics, and assess whether action is required.
Be consistent in your output format.
"""

# Few-shot examples + task
prompt = """
<examples>
Example 1:
Feedback: "Amazing product! Fast delivery."
Analysis:
- Sentiment: positive
- Topic: product and shipping
- Confidence: 95
- Action required: no

Example 2:
Feedback: "Product broke after one day."
Analysis:
- Sentiment: negative
- Topic: product quality
- Confidence: 98
- Action required: yes
</examples>

<task>
Now analyze: "The new dashboard is confusing but support was helpful"
</task>
"""

# JSON Schema
schema = {
    "type": "object",
    "properties": {
        "sentiment": {
            "type": "string",
            "enum": ["positive", "negative", "neutral"]
        },
        "topic": {"type": "string"},
        "confidence": {
            "type": "number",
            "minimum": 0,
            "maximum": 100
        },
        "action_required": {"type": "boolean"},
        "reason": {"type": "string"}
    },
    "required": ["sentiment", "topic", "confidence", "action_required", "reason"]
}

# Configure with system instruction and structured output
config = types.GenerateContentConfig(
    system_instruction=system_inst,
    response_mime_type="application/json",
    response_json_schema=schema
)

# Generate analysis
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=prompt,
    config=config
)

# Parse JSON response
import json
result = json.loads(response.text)

print(f"Sentiment: {result['sentiment']}")
print(f"Topic: {result['topic']}")
print(f"Confidence: {result['confidence']}")
print(f"Action Required: {result['action_required']}")
print(f"Reason: {result['reason']}")
```

### Output

```
Sentiment: neutral
Topic: dashboard UX and customer support
Confidence: 85
Action Required: True
Reason: Mixed feedback with UX issue balanced by positive support; dashboard confusion warrants investigation
```

---

## Real-World Applications

This pattern works for many use cases beyond customer feedback:

### 1. Code Review Automation

```python
system_instruction = "You are a code review assistant focusing on security and best practices."

# Few-shot examples showing code → review feedback pattern
# Schema: {"issues": [], "severity": "high|medium|low", "recommendations": []}
```

**Use case:** Automated PR reviews, pre-commit hooks

### 2. Content Moderation

```python
system_instruction = "You are a content moderation assistant. Flag policy violations."

# Few-shot examples showing content → moderation decision pattern
# Schema: {"compliant": bool, "violations": [], "severity": "low|medium|high"}
```

**Use case:** User-generated content platforms, comment systems

### 3. Data Extraction from Unstructured Text

```python
system_instruction = "You are a data extraction assistant. Extract structured information from emails."

# Few-shot examples showing email → extracted data pattern
# Schema: {"sender": str, "intent": str, "action_items": [], "deadline": str}
```

**Use case:** Email parsing, invoice processing, document analysis

### 4. Support Ticket Triage

```python
system_instruction = "You are a support ticket triage assistant. Categorize and prioritize tickets."

# Few-shot examples showing ticket → triage decision pattern
# Schema: {"priority": "high|medium|low", "category": str, "suggested_owner": str}
```

**Use case:** Customer support automation, IT helpdesk

### 5. Meeting Notes Summarization

```python
system_instruction = "You are a meeting notes assistant. Extract decisions and action items."

# Few-shot examples showing transcript → summary pattern
# Schema: {"decisions": [], "action_items": [], "next_meeting": str}
```

**Use case:** Team collaboration tools, async communication

---

## Conclusion

**The transformation:**

From: _"tell me if it's good or bad"_ (vague, inconsistent)

To: Guaranteed JSON with sentiment classification, topic extraction, confidence scoring, and action recommendations

**The techniques:**
1. System instructions (role and behavior)
2. Structured delimiters (clear sections)
3. Few-shot examples (pattern teaching)
4. Structured output (guaranteed format)

**The result:** Production-ready, scalable, reliable AI-powered analysis

This is context engineering. Master this pattern, and you can build professional-quality AI features for any application.
