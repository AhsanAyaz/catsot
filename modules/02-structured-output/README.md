# Module 02: Structured Output

**Duration:** 20 minutes
**Prerequisites:** Completion of Module 01 (AI Studio basics), basic understanding of JSON format

## Overview

Getting reliable, parseable data from AI models has historically been challenging. The old approach relied on prompting the model to "return JSON" and hoping for the best – often resulting in invalid JSON, inconsistent structures, or unparseable responses.

Gemini solves this problem with **native structured output** using JSON Schema. This isn't prompt hacking or hoping the model cooperates – it's schema enforcement at the API level that guarantees valid JSON responses matching your exact specification.

In this module, you'll learn how to define output schemas and use AI Studio's JSON mode to get reliable structured data every time.

## Learning Objectives

By the end of this module, you will be able to:

- **Understand why structured output matters** for real applications (APIs, databases, automation)
- **Create JSON Schema** to define precise output formats with type validation
- **Use AI Studio's JSON mode** to guarantee valid JSON responses from Gemini
- **Recognize the importance of description fields** in schemas as instructions to the model
- **Differentiate schema enforcement from prompt hacking** (guaranteed vs. hopeful)

## Why This Matters

Real-world applications need predictable, machine-readable data:
- **APIs** require consistent response formats
- **Database inserts** need validated structures
- **Automation workflows** can't handle "almost valid" JSON
- **Production systems** demand reliability, not best-effort parsing

Gemini's structured output capability makes LLMs production-ready for these use cases.

## Module Structure

1. **Demonstration** (5-7 minutes): Watch the instructor configure JSON mode in AI Studio, showing before/after comparison
2. **Hands-on Exercise** (10-13 minutes): Create your own schema for customer feedback analysis
3. **Going Further** (optional): Advanced schema features like enums and nested objects

## Materials

- **Demonstration guide:** `demonstration.md` – instructor walkthrough with step-by-step screenshots
- **Exercise instructions:** `exercise.md` – your schema creation challenge
- **Schema examples:** `schema-examples/` – working examples you can reference
  - `recipe-schema.json` – Recipe with ingredients and steps
  - `product-schema.json` – Product analysis with pricing and features
- **Solutions:** `solutions/solution.md` – complete reference implementation

## Key Concept: Description Fields Are Instructions

The most important insight in this module: **description fields in your schema are not just documentation – they're instructions to the model.**

When you define a schema field like:
```json
{
  "sentiment": {
    "type": "string",
    "description": "Overall sentiment: positive, negative, or neutral"
  }
}
```

Gemini uses that description to understand what to populate in that field. Without descriptions, the model has to guess your intent. With descriptions, it has clear guidance.

## Next Steps

After completing this module, you'll use structured output in:
- Module 03: Multimodal input (structured analysis of images)
- Module 04: Context engineering (combining schemas with advanced prompts)
- Module 06: Logic engine (using schemas to define business rules)

Ready to get started? Proceed to `demonstration.md` to see JSON mode in action.
