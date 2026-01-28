# Module 04: Context Engineering

**Duration:** 20 minutes

## Overview

This module transforms participants from basic prompters to context engineers who understand how to guide LLM behavior systematically. While Module 01 covered basic prompting and Module 02 introduced structured output, Module 04 teaches how to craft effective prompts using structure, system instructions, and few-shot examples.

**The progression:**
- **Basic prompting:** "Tell me about X"
- **Structured output:** Get JSON responses with schema validation
- **Context engineering:** System instructions + structured prompt + examples = highly consistent, high-quality results

Context engineering is about systematically guiding model behavior through deliberate prompt structure and examples, rather than hoping the model "figures out" what you want.

## Learning Objectives

By the end of this module, you will be able to:

- Understand the **Role + Task + Context + Format** pattern for effective prompts
- Use **system instructions** to set model behavior and perspective
- Apply **few-shot examples** to teach desired output patterns
- Recognize when to use **structured delimiters** (XML tags, Markdown) to help models parse prompt sections
- Apply **hierarchical context design** (System, Task, Tool, Memory layers)
- Use **decision flowcharts** to diagnose prompt problems
- Understand **security considerations** (prompt injection, input sanitization)
- Combine context engineering with structured output for production-ready consistency

## Prerequisites

- Completion of **Module 01** (AI Studio basics)
- Completion of **Module 02** (Structured output helpful but not required)
- Understanding that prompts are instructions, not just questions

## Why Context Engineering Matters

**Without context engineering:**
- Inconsistent output format across different inputs
- Model makes assumptions about tone, style, detail level
- Difficult to reproduce desired behavior reliably
- Generic responses that don't match specific needs

**With context engineering:**
- Consistent, predictable output structure
- Model behavior aligns with your requirements
- Reproducible results across similar tasks
- Professional-quality responses tailored to your use case

## What's Included

- **demonstration.md** - Instructor walkthrough showing progression from unstructured to fully context-engineered prompts
- **exercise.md** - Hands-on practice refactoring unstructured prompts
- **prompt-templates/** - Reusable templates for structured prompts and few-shot patterns
- **solutions/** - Complete before/after examples with explanations

## Quick Reference

📄 **Cheatsheet:** See "Common Tasks: Context Engineering (Few-Shot)" in cheatsheet/cheatsheet.md

📊 **Slides:** Covered in slides-content/content/01-ai-studio.md

🔗 **Apply in Part 2:**
- All Part 2 paths (prompt quality techniques for better AI results)

## Next Steps

After completing this module, you'll be ready to:
- Combine context engineering with structured output (from Module 02)
- Use grounding with Google Search (Module 05)
- Build the logic engine foundation (Module 06)
