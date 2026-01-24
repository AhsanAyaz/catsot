# Phase 1: Workshop Content Foundation - Research

**Researched:** 2026-01-24
**Domain:** Developer workshop content creation, Google AI Studio, Firebase Studio
**Confidence:** MEDIUM-HIGH

## Summary

This research investigates best practices for creating hands-on developer workshop content using Google AI Studio and Firebase Studio, specifically for a 2-hour foundations session targeting 40 developers with mixed skill levels and zero local setup requirements.

The standard approach for Google developer workshops follows the **Codelabs format**: sequential, hands-on learning paths with clear objectives, progressive skill building, and optional challenge/solution structures to accommodate varying skill levels. Google's own workshop materials emphasize browser-based tools, practical demonstrations paired with immediate hands-on exercises, and structured progression from basic exploration to building functional projects.

For AI Studio specifically, the ecosystem provides comprehensive official documentation with code examples, structured output capabilities (JSON Schema support), multimodal features (image understanding), grounding with Google Search, and robust prompt engineering patterns. Firebase Studio complements this with an AI-assisted prototyping agent that enables natural language app development, making it ideal for rapid demonstrations.

**Primary recommendation:** Structure Part 1 as 6 sequential modules (20 minutes each) following the Codelabs pattern, with each module containing a 5-7 minute demonstration followed by 10-13 minute hands-on exercise, culminating in a shared "logic engine" foundation that Part 2 builds upon.

## Standard Stack

The established tools and resources for this domain:

### Core
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Google AI Studio | Current (2026) | Primary AI playground for Gemini models | Official Google developer tool, browser-based, zero setup, free tier available |
| Firebase Studio | Preview (2026) | Full-stack AI-assisted development | Official Google tool, integrates Gemini, supports rapid prototyping |
| Gemini API | 3.x (Flash/Pro) | Underlying AI models | Latest stable models with structured output, multimodal, grounding support |
| Markdown | Standard | Content authoring | Google Codelabs standard format, version control friendly, simple syntax |

### Supporting
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Google Codelabs CLI (claat) | Latest | Publishing workshop tutorials | If converting to official Codelabs format for distribution |
| JSON Schema | Draft 2020-12 | Structured output definitions | For FOUND-02 (structured output demonstration) |
| GitHub | N/A | Content hosting | Source control for workshop materials, participant reference |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Markdown files | Google Docs with Codelabs formatting | Google Docs requires conversion step, Markdown is more developer-friendly and version-controllable |
| AI Studio | Vertex AI on Google Cloud | Vertex requires GCP project setup, AI Studio is zero-config and free for testing |
| Manual demos | Video recordings | Live demos allow real-time interaction and questions, videos are one-way |

**Installation:**
None required - all tools are browser-based.

**Access Requirements:**
- Google Account (free)
- Internet connection
- Modern web browser

## Architecture Patterns

### Recommended Workshop Structure

Based on Google Codelabs and official Firebase Studio workshop patterns:

```
workshop-content/
├── README.md                          # Workshop overview, prerequisites, agenda
├── modules/
│   ├── 01-ai-studio-exploration/
│   │   ├── README.md                 # Module overview, learning objectives
│   │   ├── demonstration.md          # Instructor guide with screenshots
│   │   ├── exercise.md               # Hands-on activity for participants
│   │   └── solutions/                # Solution code/screenshots
│   ├── 02-structured-output/
│   │   ├── README.md
│   │   ├── demonstration.md
│   │   ├── exercise.md
│   │   ├── schema-examples/          # JSON Schema files
│   │   └── solutions/
│   ├── 03-multimodal-input/
│   │   ├── README.md
│   │   ├── demonstration.md
│   │   ├── exercise.md
│   │   ├── sample-images/            # Test images for analysis
│   │   └── solutions/
│   ├── 04-context-engineering/
│   │   ├── README.md
│   │   ├── demonstration.md
│   │   ├── exercise.md
│   │   ├── prompt-templates/         # Example prompts
│   │   └── solutions/
│   ├── 05-grounding-search/
│   │   ├── README.md
│   │   ├── demonstration.md
│   │   ├── exercise.md
│   │   └── solutions/
│   └── 06-logic-engine/
│       ├── README.md
│       ├── demonstration.md
│       ├── exercise.md
│       ├── starter-template/         # Foundation for Part 2
│       └── solutions/
├── shared-assets/
│   ├── images/                       # Screenshots, diagrams
│   └── data/                         # Sample data files
└── instructor-guide/
    ├── setup-checklist.md            # Pre-workshop preparation
    ├── timing-guide.md               # Detailed schedule with buffers
    └── troubleshooting.md            # Common issues and fixes
```

### Pattern 1: Module Structure (Google Codelabs Pattern)

**What:** Each module follows a consistent 3-part structure: Overview → Demonstration → Hands-on Exercise

**When to use:** For all 6 foundation modules

**Structure:**
```markdown
## Module: [Name] (Duration: 20 minutes)

### Learning Objectives
- [Specific skill 1]
- [Specific skill 2]
- [Specific skill 3]

### Prerequisites
- [Knowledge needed]
- [Tools required]

### Demonstration (5-7 minutes)
[Step-by-step instructor walkthrough with screenshots]

1. **Step 1 Name**
   - Action: [What to do]
   - Expected result: [What happens]
   - Screenshot: `assets/module-X-step-1.png`

2. **Step 2 Name**
   - Action: [What to do]
   - Expected result: [What happens]

### Hands-on Exercise (10-13 minutes)
**Your Task:** [Clear goal statement]

**Instructions:**
1. [Action step with expected outcome]
2. [Action step with expected outcome]

**Success Criteria:**
- [ ] [Concrete verification point]
- [ ] [Concrete verification point]

### Duration Indicator
⏱️ Expected: 20 minutes | Buffer: 3 minutes

### Optional: Going Further
[Advanced exploration for fast finishers]
```

**Source:** Based on [Firebase Studio Codelab structure](https://firebase.google.com/codelabs/firebase-studio-intro)

### Pattern 2: Demonstration-First Learning

**What:** Show the capability working first, then let participants implement

**When to use:** For unfamiliar tools or complex features

**Example from AI Studio exploration:**
```markdown
### Demonstration: Your First Gemini Prompt

**Instructor demonstrates:**
1. Navigate to aistudio.google.com
2. Click "Create new prompt"
3. Select "Freeform prompt"
4. Enter: "List 3 benefits of prompt engineering"
5. Click "Run" - show response
6. Click "Get code" - show API equivalent

**Then participants do:**
[Similar task with different prompt]
```

**Why this works:** Reduces cognitive load by showing the complete workflow before asking participants to replicate it.

**Source:** Pattern observed in [Google Codelabs workshops](https://codelabs.developers.google.com/)

### Pattern 3: Progressive Complexity

**What:** Start with zero-shot, add few-shot examples, then structured output, then tools

**When to use:** Teaching prompt engineering and AI Studio features

**Progression:**
```markdown
Module 1: Basic prompt → See response
Module 2: Prompt → Get JSON (structured output)
Module 3: Image + Prompt → Get analysis (multimodal)
Module 4: System instructions + Few-shot examples → Better responses
Module 5: Prompt + Google Search → Grounded response with sources
Module 6: All techniques → Build logic engine
```

**Why this works:** Each module adds ONE new concept, building on previous knowledge.

**Source:** Recommended in [Gemini prompting strategies documentation](https://ai.google.dev/gemini-api/docs/prompting-strategies)

### Pattern 4: Challenge/Solution Structure

**What:** Provide optional solution branches for different pacing needs

**When to use:** Mixed skill levels (exact scenario for this workshop)

**Implementation:**
```markdown
### Hands-on Exercise

**Option A: Guided Challenge**
Follow these step-by-step instructions...

**Option B: Independent Challenge**
Goal: [Outcome]
Hints: [Minimal guidance]
Solution: See `solutions/` folder if stuck

**For Fast Finishers:**
Try the "Going Further" section below
```

**Source:** Pattern from [Firebase Studio workshop](https://firebase.google.com/codelabs/firebase-studio-intro)

### Pattern 5: Browser-Based, Zero Setup

**What:** All activities use web-based tools accessible via URL

**When to use:** Workshops with diverse participant environments

**Implementation:**
```markdown
### Setup (1 minute)
1. Open browser
2. Navigate to: aistudio.google.com
3. Sign in with Google Account
4. Click "New prompt"

✅ If you see the prompt editor, you're ready!
```

**Why this works:** Eliminates "works on my machine" problems, ensures everyone starts from the same baseline.

### Anti-Patterns to Avoid

- **Death by slides:** Long presentations before hands-on practice leads to disengagement
  - **Instead:** Maximum 5-7 minute demos, then immediate practice

- **Assuming prior knowledge:** Phrases like "as you know" or skipping tool navigation
  - **Instead:** Show every click, assume zero prior Google AI Studio experience

- **Feature dumping:** Showing every AI Studio feature in module 1
  - **Instead:** One feature per module, progressive layering

- **No time buffers:** Packing exactly 120 minutes of content into 120 minutes
  - **Instead:** Plan for 100 minutes of content, allowing 20 minutes total buffer

- **Copy-paste coding without understanding:** Giving code to paste without explaining what it does
  - **Instead:** Build prompts collaboratively, explain each component

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Workshop tutorial format | Custom HTML/CSS website | Google Codelabs format (Markdown) | Established pattern, mobile-friendly, duration tracking built-in, participants expect this format |
| Structured output parsing | Manual JSON string parsing and validation | Gemini's native `response_mime_type` and `response_json_schema` | Gemini handles schema validation natively, automatic type checking, supports Pydantic/Zod |
| Image upload handling | Custom base64 encoding script | Gemini File API or inline data method | Official APIs handle format conversion, size limits, caching for reuse |
| Grounding implementation | Manual web scraping + RAG pipeline | Gemini's `google_search` tool | Automatic query formulation, result synthesis, citation generation, built-in fact-checking |
| Prompt templates | Text files with string replacement | System instructions + few-shot examples in AI Studio | Visual interface, version history, shareable URLs, "Get code" export |
| Workshop timing | Manual time tracking | Codelabs duration metadata | Automatic progress tracking, visual time indicators for participants |

**Key insight:** Google has optimized these tools for the workshop use case. Custom solutions add maintenance burden and miss out on updates. The official tools are specifically designed for teaching developers about Gemini capabilities.

## Common Pitfalls

### Pitfall 1: Time Estimation Mismatch

**What goes wrong:** Demonstrations take longer than planned, exercises feel rushed, workshop runs over

**Why it happens:**
- Not accounting for participant questions during demos
- Underestimating time for 40 people to complete exercises
- No buffer for technical issues (network, login problems)
- Assumption that "simple" tasks are quick for everyone

**How to avoid:**
- **Use the 60% rule:** Plan content for 60% of available time (72 minutes of core content for 120-minute workshop)
- **Test with real users:** Run demos with a non-expert to get realistic timing
- **Build in explicit buffers:** 3 minutes per module = 18 minutes total
- **Track time visually:** Use Codelabs duration indicators so participants self-pace

**Warning signs:**
- Rushing through explanations
- Skipping exercises to "catch up"
- Participants still working when you move to next module

**Source:** Identified in [time management research](https://www.mindtools.com/awmnxfj/10-common-time-management-mistakes/) - "miscalculating time and energy needed" is one of the most common pitfalls

### Pitfall 2: Grounding Metadata Confusion

**What goes wrong:** Participants expect grounding to work like a web search, don't understand grounding metadata structure, can't extract citations

**Why it happens:**
- Grounding is automatic - model decides when to search
- Metadata structure is complex (`groundingChunks` + `groundingSupports` mapping)
- Not all prompts trigger grounding, even with tool enabled
- Search suggestions require Terms of Service compliance to display

**How to avoid:**
- **Show the complete response object** in demonstration (not just the text)
- **Explain the decision process:** "Gemini decides whether to search based on the prompt"
- **Use side-by-side comparison:** Same prompt with/without grounding enabled
- **Demonstrate citation extraction** with code example that maps supports to chunks

**Warning signs:**
- Questions like "Why didn't it search for my prompt?"
- Confusion about where citations come from
- Trying to parse `searchEntryPoint` without reading TOS

**Example demonstration:**
```markdown
### Grounding Demonstration

**Without grounding:**
Prompt: "Who won Euro 2024?"
Result: Generic or knowledge-cutoff response

**With grounding:**
Prompt: "Who won Euro 2024?"
Result: "Spain won Euro 2024... [source links]"

**Show the metadata:**
- `webSearchQueries`: ["euro 2024 winner"]
- `groundingChunks`: [{uri: "...", title: "..."}]
- `groundingSupports`: Maps text segments to sources
```

**Source:** Based on [official grounding documentation](https://ai.google.dev/gemini-api/docs/google-search) and [developer forum discussions](https://discuss.ai.google.dev/t/enable-grounding-with-google-search-switch-on-aistudio-via-url-query-parameter/77304)

### Pitfall 3: Structured Output Schema Misunderstanding

**What goes wrong:** Participants create schemas that fail validation, don't understand why outputs don't match expectations, assume schema compliance means semantic correctness

**Why it happens:**
- JSON Schema syntax is unfamiliar to many developers
- The `description` field seems optional but is critical for model guidance
- Schema enforces structure, not semantics (valid JSON ≠ correct content)
- Not all JSON Schema features are supported

**How to avoid:**
- **Start with a working example:** Show a complete schema + prompt + output
- **Emphasize descriptions:** "The description field is an instruction to the model"
- **Use visual validation:** Show schema → generated output → schema compliance check
- **Teach the Pydantic/Zod approach:** Easier than raw JSON Schema for most developers
- **Always validate semantically:** "Check that the values make sense, not just that the structure is correct"

**Warning signs:**
- Schemas without description fields
- Expecting perfect accuracy because schema is correct
- Not understanding why model returns wrong values in correct structure

**Example demonstration:**
```markdown
### Bad Schema (no descriptions):
{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "score": {"type": "number"}
  }
}

### Good Schema (with descriptions):
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The full name of the person"
    },
    "score": {
      "type": "number",
      "description": "Numerical score between 0-100"
    }
  }
}
```

**Source:** [Structured output best practices](https://ai.google.dev/gemini-api/docs/structured-output) - "Use the description field to provide clear instructions"

### Pitfall 4: Multimodal Token Cost Surprise

**What goes wrong:** Participants upload large images without understanding token consumption, hit rate limits unexpectedly

**Why it happens:**
- Image token costs are non-obvious (size-dependent tiling)
- Each 768x768 tile costs 258 tokens
- A single high-res image can cost thousands of tokens
- Small images (≤384px) cost only 258 tokens total

**How to avoid:**
- **Demonstrate with token count:** Show image size → token consumption calculation
- **Provide pre-sized images:** Workshop sample images optimized to ≤384px
- **Explain the tiling system:** "Large images are split into tiles, each costs tokens"
- **Set expectations:** "For learning, use small images; for production, consider media_resolution parameter"

**Warning signs:**
- Participants uploading phone photos (often 4000x3000px or larger)
- Confusion about why simple image prompts are "expensive"
- Rate limit errors during exercises

**Token cost reference:**
- Image ≤384px: 258 tokens
- Image 768x768: 258 tokens
- Image 1536x1536: 1,032 tokens (4 tiles)
- Image 3000x3000: ~4,000+ tokens (16+ tiles)

**Source:** [Gemini image understanding documentation](https://ai.google.dev/gemini-api/docs/image-understanding) - token usage section

### Pitfall 5: Context Engineering Without Structure

**What goes wrong:** Participants write long, rambling prompts that perform worse than shorter, structured prompts

**Why it happens:**
- Natural to write prompts like emails/conversations
- Not understanding that structure helps the model parse intent
- Skipping system instructions and going straight to prompts
- Not using few-shot examples when they would help

**How to avoid:**
- **Teach the template pattern early:** Role + Task + Context + Format
- **Use XML tags or Markdown:** "Gemini 3 works better with structured delimiters"
- **Show before/after:** Unstructured prompt vs. structured prompt with same goal
- **Emphasize few-shot examples:** "Almost always include 2-3 examples"
- **Demonstrate system instructions:** "Set the role and tone at the system level"

**Warning signs:**
- Prompts that are paragraph-length without structure
- Not using examples when output format is specific
- Asking model to "figure out" what you want

**Example:**
```markdown
### Unstructured (worse):
"I need you to analyze this customer feedback and tell me if it's positive or negative and also what the main topic is and give me a score"

### Structured (better):
<system_instruction>
You are a customer feedback analyzer.
</system_instruction>

<task>
Analyze the sentiment and topic of customer feedback.
</task>

<feedback>
{input text here}
</feedback>

<output_format>
{
  "sentiment": "positive|negative|neutral",
  "topic": "string",
  "confidence_score": 0-100
}
</output_format>
```

**Source:** [Prompt design strategies documentation](https://ai.google.dev/gemini-api/docs/prompting-strategies)

### Pitfall 6: Firebase Studio vs AI Studio Confusion

**What goes wrong:** Participants don't understand the relationship between AI Studio and Firebase Studio, try to use wrong tool for the task

**Why it happens:**
- Both are Google tools with "Studio" in the name
- Both involve Gemini/AI capabilities
- Different purposes but overlapping functionality
- Firebase Studio is preview/newer, less familiar

**How to avoid:**
- **Clear distinction in intro:** "AI Studio = Gemini playground; Firebase Studio = full-stack app builder with AI"
- **Show when to use each:**
  - AI Studio: Prompt engineering, testing Gemini features, getting API code
  - Firebase Studio: Building complete web apps, App Prototyping agent, deployment
- **Use both in appropriate contexts:**
  - Modules 1-5: Primarily AI Studio (focused Gemini learning)
  - Module 6: Could use Firebase Studio if building a full app, or AI Studio if focusing on logic

**Warning signs:**
- Trying to deploy from AI Studio
- Looking for prompt playground in Firebase Studio
- Confusion about where API keys come from

## Code Examples

Verified patterns from official sources:

### Structured Output with JSON Schema

```python
# Source: https://ai.google.dev/gemini-api/docs/structured-output
from google import genai
from google.genai import types

# Define your schema
recipe_schema = {
    "type": "object",
    "properties": {
        "recipe_name": {
            "type": "string",
            "description": "The name of the recipe"
        },
        "ingredients": {
            "type": "array",
            "description": "List of ingredients needed",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "amount": {"type": "string"}
                }
            }
        },
        "steps": {
            "type": "array",
            "description": "Cooking steps in order",
            "items": {"type": "string"}
        }
    },
    "required": ["recipe_name", "ingredients", "steps"]
}

# Configure the model
client = genai.Client(api_key="YOUR_API_KEY")
config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_json_schema=recipe_schema
)

# Generate structured output
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Create a simple pasta recipe",
    config=config
)

# Response is guaranteed to match schema structure
print(response.text)  # Valid JSON matching recipe_schema
```

**When to use:** Module 2 (FOUND-02: Structured output demonstration)

### Multimodal Image Analysis

```python
# Source: https://ai.google.dev/gemini-api/docs/image-understanding
from google import genai
from google.genai import types
import pathlib

client = genai.Client(api_key="YOUR_API_KEY")

# Upload image using File API (recommended for workshops - reuse across prompts)
sample_file = client.files.upload(
    path=pathlib.Path("sample-chart.png")
)

# Generate analysis
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[
        types.Part.from_uri(
            file_uri=sample_file.uri,
            mime_type=sample_file.mime_type
        ),
        "What data does this chart show? Summarize the key findings."
    ]
)

print(response.text)

# For small images, inline data also works:
import base64

with open("small-icon.png", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[
        types.Part.from_inline_data(
            inline_data=types.Blob(
                mime_type="image/png",
                data=image_data
            )
        ),
        "Describe this icon"
    ]
)
```

**When to use:** Module 3 (FOUND-03: Multimodal input demonstration)

**Workshop tip:** Pre-upload sample images before session to save time, share file URIs with participants

### Context Engineering with System Instructions and Few-Shot

```python
# Source: https://ai.google.dev/gemini-api/docs/prompting-strategies
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

# System instructions set the model's behavior/role
config = types.GenerateContentConfig(
    system_instruction="You are a code review assistant. Provide constructive feedback on code quality, focusing on readability, best practices, and potential bugs. Keep feedback concise and actionable."
)

# Few-shot examples teach the desired output pattern
prompt = """
Example 1:
Code: def calc(a,b): return a+b
Feedback:
- Function name is too generic. Use descriptive name like `add_numbers`
- Missing type hints. Add parameters: `a: int, b: int -> int`
- Missing docstring

Example 2:
Code: def calculate_total(prices): return sum(prices)
Feedback:
- Good descriptive name
- Consider adding type hints: `prices: list[float] -> float`
- Add docstring explaining purpose
- Consider handling empty list case

Now review this code:
Code: def process(data):
    result = []
    for item in data:
        result.append(item * 2)
    return result
"""

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=prompt,
    config=config
)

print(response.text)
```

**When to use:** Module 4 (FOUND-04: Context engineering segment)

**Workshop exercise idea:** Have participants create their own few-shot examples for a different code review style (e.g., security-focused vs. performance-focused)

### Grounding with Google Search

```python
# Source: https://ai.google.dev/gemini-api/docs/google-search
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

# Enable Google Search grounding
grounding_tool = types.Tool(google_search=types.GoogleSearch())
config = types.GenerateContentConfig(tools=[grounding_tool])

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="What are the latest updates to the Gemini API in January 2026?",
    config=config
)

# Access grounding metadata
print("Response:", response.text)
print("\nSearch queries used:", response.grounding_metadata.web_search_queries)
print("\nSources:")
for chunk in response.grounding_metadata.grounding_chunks:
    print(f"  - {chunk.web.title}: {chunk.web.uri}")

# Extract inline citations
for support in response.grounding_metadata.grounding_supports:
    text_segment = response.text[support.segment.start_index:support.segment.end_index]
    source_indices = support.grounding_chunk_indices
    print(f"\nText: '{text_segment}'")
    print(f"Sources: {[response.grounding_metadata.grounding_chunks[i].web.uri for i in source_indices]}")
```

**When to use:** Module 5 (FOUND-05: Grounding demonstration)

**Workshop demonstration tip:** Use side-by-side comparison in AI Studio - same prompt with grounding OFF vs ON - to show the difference visually

### AI Studio URL Patterns (No Code Needed)

```markdown
# Source: https://ai.google.dev (AI Studio interface patterns)

## Direct Links for Workshop Participants

### Start a new freeform prompt:
https://aistudio.google.com/prompts/new_chat

### Access structured output settings:
1. Create prompt at aistudio.google.com
2. Click "Run settings" (gear icon)
3. Under "Response format" select "JSON mode"
4. Define your schema

### Enable grounding:
1. Create prompt at aistudio.google.com
2. Click "Tools" in right panel
3. Toggle "Google Search grounding"

### Share a prompt with participants:
1. Create your prompt
2. Click "Share" (top right)
3. Set visibility to "Anyone with link"
4. Copy URL and share (participants can fork/edit)

## Workshop Setup Tip
Create template prompts in advance, share URLs in workshop materials.
Participants can fork and modify rather than starting from scratch.
```

**When to use:** Throughout all modules - reduces typing, ensures consistency

### Logic Engine Foundation (Business Rules Example)

```python
# Concept source: https://medium.com/@djangostars/python-rule-engine-logic-automation-examples-887d3210643e
# Implementation adapted for workshop context

"""
Logic Engine: Simple Rule-Based System for Part 2 Foundation
This demonstrates conditional logic that participants will enhance with AI in Part 2
"""

from typing import List, Dict, Any
from dataclasses import dataclass

@dataclass
class Rule:
    """A single business rule"""
    name: str
    condition: callable  # Function that returns True/False
    action: callable     # Function to execute if condition is True

class LogicEngine:
    """Simple rules engine for evaluating conditions and taking actions"""

    def __init__(self):
        self.rules: List[Rule] = []

    def add_rule(self, rule: Rule):
        """Add a rule to the engine"""
        self.rules.append(rule)

    def evaluate(self, context: Dict[str, Any]) -> List[str]:
        """Evaluate all rules against the context, return actions taken"""
        actions_taken = []

        for rule in self.rules:
            if rule.condition(context):
                result = rule.action(context)
                actions_taken.append(f"{rule.name}: {result}")

        return actions_taken

# Workshop Exercise: Build a simple discount calculator
engine = LogicEngine()

# Define rules
engine.add_rule(Rule(
    name="Bulk Discount",
    condition=lambda ctx: ctx.get("quantity", 0) >= 10,
    action=lambda ctx: "Applied 20% bulk discount"
))

engine.add_rule(Rule(
    name="New Customer",
    condition=lambda ctx: ctx.get("is_new_customer", False),
    action=lambda ctx: "Applied 10% new customer discount"
))

engine.add_rule(Rule(
    name="Premium Member",
    condition=lambda ctx: ctx.get("membership_tier") == "premium",
    action=lambda ctx: "Applied 15% premium member discount"
))

# Test the engine
test_context = {
    "quantity": 12,
    "is_new_customer": False,
    "membership_tier": "premium"
}

results = engine.evaluate(test_context)
print("Actions taken:", results)
# Output: ['Bulk Discount: Applied 20% bulk discount', 'Premium Member: Applied 15% premium member discount']
```

**When to use:** Module 6 (FOUND-06: Logic engine exercise)

**Part 2 connection:** In Part 2, participants will enhance this by:
- Using Gemini to generate rules from natural language
- Adding structured output to validate rule definitions
- Building a UI in Firebase Studio to manage rules
- Deploying the logic engine as a Firebase function

**Workshop exercise progression:**
1. **Understand the pattern:** Walk through the example above
2. **Modify rules:** Add a "Seasonal Sale" rule
3. **Test different contexts:** What happens with different customer profiles?
4. **Design Part 2 enhancement:** How could AI generate rules from descriptions like "Give a discount to customers who buy more than 10 items"?

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual JSON parsing with try/except | `response_mime_type` + `response_json_schema` | Gemini 2.x (2024) | Eliminates parsing errors, automatic validation, type safety |
| Prompting for JSON format in text | Native structured output | Gemini 2.0+ | Schema compliance guaranteed, no more "almost valid JSON" |
| Base64 encoding images in code | File API upload with reuse | Gemini API updates (2025) | Better performance, caching, lower token costs for repeated use |
| Manual RAG implementation | Built-in grounding with Google Search | Gemini 3.x (2025/2026) | Zero infrastructure, automatic citation, real-time web access |
| Consumer Gemini chat interface | Google AI Studio for development | Available since 2024, promoted 2025+ | System instructions, tool configuration, API code export, shareable prompts |
| Local development environment for workshops | Browser-based tools (AI Studio, Firebase Studio) | Firebase Studio preview (2025/2026) | Zero setup time, platform-agnostic, instant access |
| Google Docs → claat conversion for Codelabs | Markdown-native workflow | Long-standing but emphasized in 2026 tools | Better version control, developer-friendly, easier collaboration |

**Deprecated/outdated:**
- **Gemini 1.0 Pro:** Use Gemini 2.5+ or Gemini 3.x (better quality, structured output support)
- **Text-only models:** Gemini is natively multimodal; no need for separate vision models
- **Custom prompt parsing logic:** Structured output handles this automatically
- **Manual web scraping for current info:** Grounding with Google Search is the official solution

**Important for workshop content:**
- All documentation examples should use current model names (gemini-3-flash-preview, gemini-2.5-flash)
- Emphasize that structured output is a first-class feature, not a hack
- Grounding is production-ready and the recommended approach for real-time info

## Open Questions

Things that couldn't be fully resolved:

### 1. Firebase Studio Availability and Limits

**What we know:**
- Firebase Studio is in preview as of January 2026
- Offers "3 workspaces at no cost during preview"
- Integrates Gemini for app prototyping

**What's unclear:**
- Will all 40 workshop participants have access simultaneously?
- Are there rate limits that might affect workshop exercises?
- Is the preview stable enough for a live workshop on Jan 28, 2026?

**Recommendation:**
- **Primary approach:** Use Firebase Studio for demonstrations in Module 6, have participants follow along in AI Studio for the logic engine code
- **Backup plan:** If Firebase Studio has issues, complete Module 6 entirely in AI Studio with manual code organization (still achieves the learning objective)
- **Pre-workshop test:** Instructor should test Firebase Studio access 1 week before workshop with a test Google account

### 2. Grounding API Costs for Workshop

**What we know:**
- Free testing in AI Studio
- Paid tier: $35 per 1,000 grounded queries for Gemini 3.x
- Gemini 2.5 and older models bill per prompt instead

**What's unclear:**
- Does AI Studio free tier cover 40 participants each making ~5 grounding test prompts?
- Should workshop use instructor API key or participant accounts?
- What happens if free tier quota is exceeded mid-workshop?

**Recommendation:**
- **For Module 5:** Use AI Studio interface (free) rather than API calls for all participant exercises
- **Instructor demonstrations:** Can use API with personal/Google-provided key to show code examples
- **Document the pricing clearly:** Set expectations that production use has costs
- **Alternative if needed:** Show grounding via AI Studio's built-in toggle, skip the API code for this module

### 3. Optimal Logic Engine Scope for 20-Minute Module

**What we know:**
- Module 6 is the foundation for Part 2
- 20 minutes available (likely 15-17 after buffer)
- Needs to be simple enough for mixed skill levels
- Should demonstrate clear AI enhancement opportunity for Part 2

**What's unclear:**
- Is a full rules engine too ambitious for 20 minutes?
- Should it be pseudocode discussion vs. working code?
- How much Python knowledge can we assume?

**Recommendation:**
- **Simplified approach:** Pre-build the logic engine, have it available in GitHub
- **Module 6 exercise:** Participants read the code (5 min), modify one rule (5 min), discuss AI enhancement opportunities (5 min)
- **Alternative option:** Use a visual flowchart/decision tree that maps to code structure (more accessible)
- **Part 2 preview:** End with "In Part 2, you'll use Gemini to generate these rules from plain English"

### 4. Image Samples for Multimodal Module

**What we know:**
- Need sample images for Module 3
- Images should be ≤384px for low token cost
- Should demonstrate useful capabilities

**What's unclear:**
- What types of images best demonstrate real-world use cases for this audience?
- Should all participants use same images or different ones?
- Where should images be hosted (GitHub, Google Drive, Firebase Storage)?

**Recommendation:**
- **Curate 3-5 sample images:**
  1. Chart/graph (data extraction)
  2. Code screenshot (code explanation)
  3. UI mockup (design analysis)
  4. Product photo (description generation)
  5. Diagram (concept explanation)
- **Host on GitHub** in the workshop repo under `shared-assets/images/`
- **Pre-upload to instructor File API** before workshop to show reuse pattern
- **Participants use provided images** initially, can upload their own in "Going Further"

## Sources

### Primary (HIGH confidence)

- [Gemini API Structured Output Documentation](https://ai.google.dev/gemini-api/docs/structured-output) - Official Google documentation, last updated 2026-01-12
- [Gemini API Image Understanding](https://ai.google.dev/gemini-api/docs/image-understanding) - Official multimodal documentation
- [Gemini API Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search) - Official grounding documentation
- [Gemini API Prompt Design Strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) - Official prompting best practices, last updated 2026-01-08
- [Firebase Studio Getting Started](https://firebase.google.com/docs/studio/get-started) - Official Firebase Studio documentation, last updated 2026-01-21
- [Firebase Studio Codelab](https://firebase.google.com/codelabs/firebase-studio-intro) - Official hands-on tutorial structure
- [Firebase AI Logic Structured Output](https://firebase.google.com/docs/ai-logic/generate-structured-output) - Firebase-specific implementation, last updated 2026-01-21

### Secondary (MEDIUM confidence)

- [Google Developers Blog: Grounding with Google Search](https://developers.googleblog.com/en/gemini-api-and-ai-studio-now-offer-grounding-with-google-search/) - Official announcement with examples
- [Google Codelabs Tools Repository](https://github.com/googlecodelabs/tools) - Official Codelabs format specification
- [Medium: Structured Output with Gemini Models](https://medium.com/google-cloud/structured-output-with-gemini-models-begging-borrowing-and-json-ing-f70ffd60eae6) - Google Cloud Community examples
- [DataStudios: Google AI Studio Prompting Techniques](https://www.datastudios.org/post/google-ai-studio-prompting-techniques-structured-strategies-model-behavior-and-workflow-optimizat) - Comprehensive prompting guide with examples
- [Medium: Python Rule Engine Examples](https://medium.com/@djangostars/python-rule-engine-logic-automation-examples-887d3210643e) - Logic engine pattern reference
- [RStudio4Edu: Workshop Organization](https://rstudio4edu.github.io/rstudio4edu-book/organization.html) - Academic workshop structure best practices

### Tertiary (LOW confidence - for background/context)

- [IBM 2026 Guide to Prompt Engineering](https://www.ibm.com/think/prompt-engineering) - General prompt engineering concepts
- [SessionLab: What is a Workshop](https://www.sessionlab.com/blog/what-is-a-workshop/) - General workshop facilitation principles
- [Instruqt: Hands-on Workshop Definition](https://instruqt.com/glossary/hands-on-workshop) - Workshop format definitions
- Various developer conference workshop formats (NVIDIA GTC, ODSC, AAAI) - General trends in developer training

## Metadata

**Confidence breakdown:**
- **Standard stack: HIGH** - All tools are official Google products with current 2026 documentation
- **Architecture patterns: MEDIUM-HIGH** - Based on official Google Codelabs format + Firebase Studio examples, some extrapolation for specific workshop context
- **Code examples: HIGH** - All code from official documentation with minor adaptations
- **Pitfalls: MEDIUM** - Combination of documented best practices + inferred from common developer patterns, grounding/structured output pitfalls verified in official docs
- **Logic engine approach: MEDIUM** - Pattern is well-established, specific workshop implementation needs testing
- **Workshop timing: LOW-MEDIUM** - General principles verified, specific 20-min-per-module pacing needs real-world validation

**Research date:** 2026-01-24
**Valid until:** 2026-02-28 (30 days - stable ecosystem, but AI Studio/Firebase Studio in active development)

**Next steps for planning:**
1. Create detailed module breakdowns with specific prompts, schemas, and exercises
2. Build sample images and test data
3. Develop instructor guide with exact timing and troubleshooting
4. Create GitHub repository structure for workshop materials
5. Test complete workshop flow with a pilot participant
