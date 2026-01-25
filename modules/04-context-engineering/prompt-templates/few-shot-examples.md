# Few-Shot Examples Pattern

## What Are Few-Shot Examples?

Few-shot learning means showing the model 2-3 examples of desired input → output before asking it to process new input. This teaches the model the exact pattern, format, and style you want.

**The principle:** Show, don't just tell. Examples are often more powerful than descriptions.

## Template

```
<system_instruction>
You are a [ROLE].
</system_instruction>

<examples>
Example 1:
Input: [example input 1]
Output: [desired output 1]

Example 2:
Input: [example input 2]
Output: [desired output 2]

Example 3 (optional):
Input: [example input 3]
Output: [desired output 3]
</examples>

<task>
Now process this new input following the same pattern:
Input: [actual input to process]
</task>
```

## Example Usage: Sentiment Analysis

### Without few-shot (less reliable):

```
Analyze the sentiment of this review: "The product is okay but shipping was slow"
```

**Problems:**
- Model might return different formats ("positive", "3/5 stars", "neutral-negative")
- Unclear what level of detail is expected
- May not explain reasoning
- Results inconsistent across different reviews

### With few-shot (more reliable):

```
<system_instruction>
You are a sentiment analysis assistant.
Classify customer reviews into positive, negative, or neutral.
</system_instruction>

<examples>
Example 1:
Review: "Amazing product! Fast delivery and great quality."
Sentiment: positive
Confidence: 95%
Reason: Strong positive language, no negatives

Example 2:
Review: "Terrible experience. Product broke after one day."
Sentiment: negative
Confidence: 98%
Reason: Strong negative language, product failure

Example 3:
Review: "It works as described. Nothing special."
Sentiment: neutral
Confidence: 85%
Reason: Functional but no enthusiasm or complaints
</examples>

<task>
Now analyze this review following the same pattern:
Review: "The product is okay but shipping was slow"
</task>
```

**Expected output:**
```
Sentiment: neutral
Confidence: 80%
Reason: Mixed signals - product is acceptable, but shipping complaint brings it down from positive
```

## Why This Works

- **Pattern learning:** Model sees exactly what structure you want
- **Consistency:** Examples teach format, tone, and detail level simultaneously
- **Edge cases:** Examples can demonstrate how to handle tricky situations
- **Less ambiguity:** Model doesn't have to guess what "analyze sentiment" means

## When to Use

- **Specific output format required** (especially unusual or domain-specific structures)
- **Consistent tone/style needed** across different inputs
- **Task is uncommon or specialized** (not a standard NLP task)
- **Zero-shot results are inconsistent** (try few-shot to improve quality)

## How Many Examples?

- **2-3 examples:** Sweet spot for most tasks
  - Enough to establish a clear pattern
  - Not so many that you waste tokens

- **1 example:** Often not enough to establish a pattern
  - Model might treat it as a suggestion, not a requirement
  - Use only for very simple, straightforward tasks

- **5+ examples:** Diminishing returns
  - Takes up many tokens
  - May slow down response time
  - Rarely provides much benefit over 3 good examples

**Tip:** Use diverse examples that cover different scenarios (positive, negative, edge cases)

## Advanced Pattern: Few-Shot + Structured Output

Combining few-shot examples with JSON Schema gives you the best of both worlds: enforced structure AND quality content.

### Example: Structured Sentiment Analysis

```
<system_instruction>
You are a sentiment analysis assistant.
</system_instruction>

<examples>
Example 1:
Review: "Amazing product! Fast delivery."
Output:
{
  "sentiment": "positive",
  "topics": ["product quality", "shipping speed"],
  "confidence": 95,
  "action_required": false
}

Example 2:
Review: "Product broke after one day. Support was unhelpful."
Output:
{
  "sentiment": "negative",
  "topics": ["product quality", "customer support"],
  "confidence": 98,
  "action_required": true
}
</examples>

<task>
Now analyze: "The product is okay but shipping was slow"
</task>
```

Then add JSON Schema (from Module 02) to guarantee the structure:

```json
{
  "type": "object",
  "properties": {
    "sentiment": {
      "type": "string",
      "enum": ["positive", "negative", "neutral"],
      "description": "Overall sentiment classification"
    },
    "topics": {
      "type": "array",
      "items": {"type": "string"},
      "description": "Main topics mentioned in the review"
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "Confidence score"
    },
    "action_required": {
      "type": "boolean",
      "description": "Whether follow-up action is needed"
    }
  },
  "required": ["sentiment", "topics", "confidence", "action_required"]
}
```

**Result:** Few-shot examples teach the model what values make sense (e.g., which topics to extract), while the schema enforces the structure is always valid JSON.

## Real-World Applications

### Code Review

```
Example 1:
Code: def process(x): return x * 2
Feedback:
- Generic function name: use 'double_value' instead
- Missing type hints
- Missing docstring
```

### Email Classification

```
Example 1:
Email: "URGENT: Account suspended. Click here now!"
Classification: spam
Risk: high
Reason: Urgency manipulation, suspicious link

Example 2:
Email: "Team meeting moved to 3pm"
Classification: legitimate
Risk: none
Reason: Normal business communication
```

### Bug Report Triage

```
Example 1:
Report: "App crashes when uploading files larger than 10MB"
Priority: high
Component: file-upload
Assignee: backend-team
Reason: Data loss risk, affects core functionality
```

## Common Mistakes

### Mistake 1: Examples are too similar

```
Bad:
Example 1: Review: "Great product!" → positive
Example 2: Review: "Excellent product!" → positive
Example 3: Review: "Amazing product!" → positive
```

All positive examples don't teach the full pattern. Include diverse examples.

### Mistake 2: Examples contradict each other

```
Bad:
Example 1: "Fast delivery" → Sentiment: positive, Topics: ["shipping"]
Example 2: "Quick shipping" → Sentiment: positive, Topics: ["delivery"]
```

Be consistent with terminology (shipping vs. delivery).

### Mistake 3: Examples without explanation

```
Bad:
Example 1: "Product broke" → negative

Good:
Example 1: "Product broke after one day"
Sentiment: negative
Reason: Product failure indicates quality issue
Action required: yes (investigate defect)
```

Show the reasoning, not just the answer.

## Tips

1. **Cover edge cases:** Include at least one tricky example
2. **Be consistent:** Use the same format across all examples
3. **Show reasoning:** Explain why an output is correct
4. **Use realistic data:** Examples should look like real inputs
5. **Test the pattern:** Verify the model follows it with new inputs
