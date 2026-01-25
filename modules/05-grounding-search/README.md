# Module 05: Grounding with Google Search

**Duration:** 20 minutes

## Learning Objectives

- Understand what grounding is and why it matters (real-time information, fact-checking)
- Enable grounding in AI Studio using the Google Search tool
- Interpret grounding metadata (groundingChunks, groundingSupports, citations)
- Recognize when grounding is appropriate vs when it's not needed

## Prerequisites

- Completion of Module 01 (AI Studio basics)
- Understanding of LLM knowledge cutoff limitations

## Overview

### The Problem: Knowledge Cutoff

Large language models like Gemini are trained on data up to a specific date. When you ask about events after that training cutoff, the model either provides outdated information or correctly admits it doesn't know. This is the **knowledge cutoff problem**.

Examples where knowledge cutoff matters:
- "What are the latest API updates?" (technical documentation changes constantly)
- "Who won [recent event]?" (sports, awards, elections)
- "What is the current stock price of [company]?" (real-time data)
- "Latest security vulnerabilities in [framework]" (time-sensitive information)

### The Old Approach: Manual RAG

Before grounding, developers solved this by building **RAG (Retrieval Augmented Generation)** pipelines:
1. Web scraping to fetch current information
2. Indexing and chunking the data
3. Semantic search to find relevant chunks
4. Injecting chunks into the prompt
5. Manual citation extraction

This works, but requires significant infrastructure and maintenance.

### The New Approach: Built-in Grounding with Google Search

Gemini's grounding feature provides **automatic, real-time web search** with zero infrastructure:
- **Automatic decision-making:** The model determines when web search is needed
- **Source synthesis:** Multiple sources are automatically combined
- **Citation metadata:** Built-in groundingChunks and groundingSupports structure
- **Production-ready:** Official Google solution, not a hack

### How It Works

1. You enable the Google Search grounding tool in AI Studio or via API
2. You send your prompt as usual
3. Gemini analyzes the prompt and decides whether to search
4. If needed, Gemini formulates search queries, fetches results, and synthesizes them
5. The response includes both the answer AND citation metadata

**Important:** Grounding is **selective**, not automatic. Simple factual queries that don't need current information may not trigger a web search, even with grounding enabled.

## Key Concepts

### Automatic Decision-Making

Gemini doesn't search for every prompt. It evaluates whether the query genuinely needs real-time or specialized web information. This:
- **Saves costs** (grounding has additional fees in production)
- **Improves speed** (no unnecessary web requests)
- **Reduces noise** (uses training data for well-established facts)

### Citation Metadata Structure

When grounding is triggered, the response includes `groundingMetadata` with three key components:

1. **webSearchQueries** - The search terms Gemini used
2. **groundingChunks** - List of sources (URLs, titles)
3. **groundingSupports** - Maps which text segments came from which sources

This metadata enables proper attribution in your application.

### Not a Replacement for Everything

Grounding is perfect for public web information, but **not suitable for**:
- Proprietary company data
- Internal documentation
- Specialized databases
- Private information

For those cases, you still need a custom RAG solution.

## Free Tier for Testing

**Important for this workshop:** Testing grounding in AI Studio is **free**. The costs mentioned in the documentation apply only to production API usage. During this module, experiment freely.

## Module Structure

1. **demonstration.md** - Instructor walkthrough showing grounding toggle and metadata
2. **exercise.md** - Hands-on testing with different query types
3. **solutions/solution.md** - Reference examples with complete metadata structure

## When to Use Grounding

| Use Case | Grounding Value |
|----------|----------------|
| Current events, news | HIGH |
| Recent technical updates | HIGH |
| Stock prices, sports scores | HIGH |
| Historical facts | LOW |
| Mathematical calculations | LOW |
| Code explanations | LOW |
| Fact-checking with sources | HIGH |

## Duration

Expected: 20 minutes | Buffer: 3 minutes

## Next Steps

Proceed to `demonstration.md` for the instructor walkthrough.
