# Module 07: Vibe Coding Power Tools

**Duration:** 25 minutes

## Overview

This module introduces the advanced AI-powered development environments that transform how you build software. While Modules 01-06 taught you the fundamentals of Gemini APIs and structured outputs, Module 07 shows you how to 10x your productivity using **Google Antigravity** and **Firebase Studio**.

**The evolution:**
- **Traditional coding:** Write every line manually
- **AI-assisted coding:** Autocomplete and suggestions
- **Vibe coding:** Describe what you want, AI implements it

> "An agent doesn't autocomplete your next line. It takes your task, breaks it into steps, executes those steps, runs tests, fixes what broke, and hands you a verified result."

## Learning Objectives

By the end of this module, you will be able to:

- Understand the **vibe coding paradigm** and when to use it
- Navigate **Google Antigravity's** three surfaces (Agent Manager, Editor, Browser)
- Switch between **multiple AI models** (Gemini 3 Pro, Claude Opus/Sonnet 4.5)
- Configure and use **MCP servers** to extend agent capabilities
- Create **rules and workflows** to customize agent behavior
- Understand **agent skills** for modular capability extension
- Use **Firebase Studio** for rapid prototyping with visual feedback

## Prerequisites

- Completion of **Module 04** (Context engineering patterns apply here)
- Understanding that prompts are detailed instructions, not just requests
- Willingness to shift from "writing code" to "directing AI agents"

## Why Vibe Coding Matters

**Traditional development:**
- You write every line of code
- Context switching between research, coding, testing
- Slow iteration cycles

**Vibe coding development:**
- Describe the desired outcome in natural language
- AI plans, implements, and validates
- You review, approve, and iterate
- Parallel agent execution for multiple tasks

**Industry impact (2025-2026):**
- 25% of Y Combinator Winter 2025 startups had 95% AI-generated codebases
- 84% of developers using or planning to use AI coding tools
- "Vibe coding" named Collins English Dictionary Word of the Year 2025

## What's Included

- **demonstration.md** - Instructor walkthrough of Antigravity and Firebase Studio
- **exercise.md** - Hands-on practice configuring rules, MCP servers, and skills
- **solutions/** - Reference configurations and example skills

## Tools Covered

### Google Antigravity
- Agent-first IDE announced November 2025 alongside Gemini 3
- Three interconnected surfaces: Agent Manager, Editor, Browser
- Multi-model support: Gemini 3 Pro/Flash, Claude Opus/Sonnet 4.5, GPT-OSS
- MCP server integration for external tools
- Rules, workflows, and skills for customization

### NotebookLM MCP
- Zero-hallucination research from your own documentation
- Upload official docs (APIs, frameworks, internal wikis)
- AI queries only YOUR trusted sources
- Grounded answers with citations
- Eliminates invented APIs and outdated information

### Firebase Studio
- Cloud-based development environment (formerly Project IDX)
- App Prototyping Agent for natural language app building
- Visual communication tools (Annotate, Select, Image upload)
- Version control with easy rollback
- Seamless Firebase integration

## Quick Reference

📄 **Cheatsheet:** See "Vibe Coding Power Tools" section in cheatsheet/cheatsheet.md

📊 **Slides:** Covered in slides/02-module-transitions.md (Module 06 → Part 2 transition)

🔗 **Apply in Part 2:**
- All project paths benefit from Antigravity/Firebase Studio workflows
- Use MCP servers for Firebase integration
- Apply rules for code quality enforcement

## Key Concepts

### The Three Modes of Agent Autonomy

| Mode | Description | Use Case |
|------|-------------|----------|
| **Fast** | Agent executes immediately | Simple tasks, quick fixes |
| **Planning** | Agent creates plan for approval | Complex features, refactoring |
| **Ask** | Step-by-step approval | Critical code paths, learning |

### Rules vs. Workflows vs. Skills

| Type | Activation | Purpose |
|------|------------|---------|
| **Rules** | Always on (or glob-triggered) | Persistent constraints ("always use TypeScript strict mode") |
| **Workflows** | User-triggered via `/` | Saved sequences ("/test", "/review") |
| **Skills** | On-demand capability | Specialized expertise loaded when needed |

### Model Selection Strategy

| Model | Best For |
|-------|----------|
| **Gemini 3 Pro** | Default, strong multimodal, 1M context |
| **Gemini 3 Flash** | Quick tasks, lower latency |
| **Claude Opus 4.5** | Deep reasoning, complex agentic coding |
| **Claude Sonnet 4.5** | Day-to-day coding, cost-effective |

## Next Steps

After completing this module, you'll be ready to:
- Apply vibe coding workflows to Part 2 projects
- Configure custom rules for your team's coding standards
- Extend capabilities with MCP servers and skills
- Leverage both Antigravity and Firebase Studio for different use cases
