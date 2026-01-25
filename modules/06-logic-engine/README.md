# Module 06: Logic Engine - Foundations for AI-Powered Rules

**Duration:** 20 minutes

## Learning Objectives

- Understand rule-based systems (condition → action pattern)
- Implement simple business rules in Python
- Execute rules against context data
- Envision how AI can generate rules from natural language (Part 2 preview)

## Prerequisites

- Completion of Module 01 (AI Studio basics)
- Completion of Module 02 (Structured output - helpful for understanding rule format)
- Basic Python knowledge (reading code, understanding functions and classes)

## Overview

### What is a logic engine?

A system that evaluates conditions and executes actions based on rules. Think of it as "if-then" logic for business decisions:

- **IF** customer buys more than 10 items → **THEN** apply bulk discount
- **IF** user is a new customer → **THEN** apply welcome discount
- **IF** order is during winter months → **THEN** apply seasonal discount

### Why build this?

This module creates the foundation for Part 2, where Gemini will generate these rules from natural language. Instead of manually coding each rule, you'll describe what you want and AI generates the implementation.

### The progression

- **Part 1 (this module):** Manually define rules in code
- **Part 2:** Use Gemini to generate rules from descriptions like "Give discount to customers who buy more than 10 items"

This is the "vibe code" pattern - describe what you want, AI generates the implementation.

## Part 2 Preview: AI-Generated Rules

In Part 2, you'll enhance this logic engine by:

1. Using Gemini to convert natural language → rule definitions
2. Applying structured output (Module 02) to ensure valid rule format
3. Building a UI in Firebase Studio to manage rules
4. Deploying the logic engine as a Firebase function

### Example Part 2 flow

**User input:**
```
"Apply 20% discount for premium members"
```

**Gemini output (structured):**
```json
{
  "name": "Premium Member Discount",
  "condition": "membership_tier == 'premium'",
  "action": "apply_discount(20)"
}
```

**Logic Engine:** Executes the generated rule

This transforms business rule management from a coding task to a natural language conversation.

## Module Structure

- **demonstration.md** - Instructor walkthrough showing how to define and execute rules
- **exercise.md** - Hands-on activity: add custom rules to the logic engine
- **starter-template/** - Working logic engine code you'll modify
- **solutions/** - Complete solutions with Part 2 enhancement examples

## What You'll Build

A working logic engine that:

- Defines rules with conditions and actions
- Evaluates rules against context data
- Executes multiple rules independently
- Provides the foundation for AI-powered rule generation in Part 2

This is the shared foundation that all Part 2 projects build upon, whether you create a face-reactive experience, camera game, or custom project.

## Duration Indicator

⏱️ Expected: 20 minutes | Buffer: 3 minutes
