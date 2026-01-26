# Module 05 Solution: Grounding with Google Search

This document provides reference examples for the grounding exercise, showing expected responses, metadata structure, and API implementation.

---

## Query Type Comparison

### Type 1: Current Events (Grounding Essential)

**Query:**
```
What are the latest updates to the Gemini API in January 2026?
```

**Without Grounding:**
```
I don't have access to information about API updates in January 2026,
as my training data has a cutoff date. I recommend checking the official
Google AI documentation for the most current information.
```

**With Grounding:**
```
Recent updates to the Gemini API in January 2026 include:

1. **Gemini 3.0 Preview Release** - Introduces enhanced multimodal capabilities
   with improved image understanding and longer context windows (up to 2M tokens).
   [Source: Google AI Blog, Jan 15, 2026]

2. **Structured Output Enhancements** - Native support for Pydantic models and
   Zod schemas, simplifying schema definition for developers.
   [Source: Gemini API Documentation, Jan 20, 2026]

3. **Grounding Cost Reduction** - Pricing for grounded queries reduced from
   $35/1K to $25/1K queries for Gemini 3.x models.
   [Source: Google Cloud Pricing Updates, Jan 10, 2026]

For complete details, see: https://ai.google.dev/changelog
```

**Grounding Metadata Example:**
```json
{
  "groundingMetadata": {
    "webSearchQueries": [
      "Gemini API updates January 2026",
      "Google AI Gemini 3.0 release notes"
    ],
    "groundingChunks": [
      {
        "web": {
          "uri": "https://ai.google.dev/changelog",
          "title": "Gemini API Changelog - January 2026"
        }
      },
      {
        "web": {
          "uri": "https://cloud.google.com/blog/products/ai-machine-learning",
          "title": "Google Cloud AI Blog"
        }
      },
      {
        "web": {
          "uri": "https://developers.googleblog.com/",
          "title": "Google Developers Blog"
        }
      }
    ],
    "groundingSupports": [
      {
        "segment": {
          "startIndex": 54,
          "endIndex": 90,
          "text": "Gemini 3.0 Preview Release"
        },
        "groundingChunkIndices": [0],
        "confidenceScores": [0.95]
      },
      {
        "segment": {
          "startIndex": 200,
          "endIndex": 245,
          "text": "Structured Output Enhancements"
        },
        "groundingChunkIndices": [0, 1],
        "confidenceScores": [0.92, 0.88]
      }
    ]
  }
}
```

**Why grounding helps:** API updates are time-sensitive and beyond training cutoff. Grounding provides current, authoritative information with sources.

---

### Type 2: Timeless Facts (Grounding Optional)

**Query:**
```
What is the capital of France?
```

**Without Grounding:**
```
The capital of France is Paris.
```

**With Grounding:**
```
The capital of France is Paris.
```

**Grounding behavior:**
- May or may not trigger web search
- Model recognizes this is a well-established fact
- If grounding is triggered, metadata will be minimal
- Response quality is the same either way

**Why grounding doesn't add much value:** This is a timeless, well-established fact that's in the model's training data. Web search is unnecessary.

---

### Type 3: Recent Specific Events (Grounding Essential)

**Query:**
```
Who won the Nobel Prize in Physics in 2025?
```

**Without Grounding:**
```
I don't have information about the Nobel Prize awards in 2025,
as that's beyond my training data cutoff. Please check the
official NobelPrize.org website for the most current information.
```

**With Grounding:**
```
The 2025 Nobel Prize in Physics was awarded to Dr. Elena Rodriguez
(Stanford University) and Dr. Kenji Yamamoto (University of Tokyo)
for their groundbreaking work on quantum error correction, enabling
practical quantum computing applications.

Their research demonstrated a novel approach to stabilizing quantum
bits (qubits), reducing error rates by over 99% and making large-scale
quantum computers feasible for the first time.

[Source: NobelPrize.org, October 2025]
[Source: Nature - Nobel Prize in Physics 2025 announcement]
```

**Grounding Metadata:**
```json
{
  "groundingMetadata": {
    "webSearchQueries": [
      "Nobel Prize Physics 2025 winner"
    ],
    "groundingChunks": [
      {
        "web": {
          "uri": "https://www.nobelprize.org/prizes/physics/2025/",
          "title": "The Nobel Prize in Physics 2025"
        }
      },
      {
        "web": {
          "uri": "https://www.nature.com/articles/nobel-physics-2025",
          "title": "Nobel Prize in Physics 2025 - Nature"
        }
      }
    ],
    "groundingSupports": [
      {
        "segment": {
          "startIndex": 0,
          "endIndex": 120,
          "text": "The 2025 Nobel Prize in Physics was awarded to Dr. Elena Rodriguez (Stanford University) and Dr. Kenji Yamamoto..."
        },
        "groundingChunkIndices": [0, 1],
        "confidenceScores": [0.99, 0.97]
      }
    ]
  }
}
```

**Why grounding helps:** Recent event with specific date. Requires authoritative sources (NobelPrize.org). Web search is essential for accuracy.

---

### Type 4: Dynamic Data (Grounding Essential)

**Query:**
```
What is the current stock price of Tesla?
```

**Without Grounding:**
```
I don't have access to real-time stock prices. My training data
only includes information up to my cutoff date. For current Tesla
(TSLA) stock prices, please check financial websites like Google
Finance, Yahoo Finance, or Bloomberg.
```

**With Grounding:**
```
As of January 24, 2026, Tesla (TSLA) is trading at approximately
$245.30 per share, up 2.3% from the previous close of $239.75.

Recent trading highlights:
- Day's range: $242.10 - $247.50
- 52-week range: $185.20 - $312.40
- Market cap: ~$775 billion

Note: Stock prices change continuously during market hours.
This information may be outdated by the time you read it.

[Source: Google Finance, Jan 24, 2026 2:30 PM EST]
[Source: Yahoo Finance]
```

**Grounding Metadata:**
```json
{
  "groundingMetadata": {
    "webSearchQueries": [
      "Tesla stock price current TSLA"
    ],
    "groundingChunks": [
      {
        "web": {
          "uri": "https://www.google.com/finance/quote/TSLA:NASDAQ",
          "title": "Tesla Inc (TSLA) Stock Price - Google Finance"
        }
      },
      {
        "web": {
          "uri": "https://finance.yahoo.com/quote/TSLA",
          "title": "Tesla, Inc. (TSLA) Stock Price - Yahoo Finance"
        }
      }
    ],
    "groundingSupports": [
      {
        "segment": {
          "startIndex": 28,
          "endIndex": 85,
          "text": "Tesla (TSLA) is trading at approximately $245.30 per share"
        },
        "groundingChunkIndices": [0, 1],
        "confidenceScores": [0.96, 0.94]
      }
    ]
  }
}
```

**Why grounding helps:** Real-time data that changes continuously. Web search provides the most current information available. Sources help verify freshness.

---

## When to Use Grounding

| Query Type | Grounding Value | Example | Reasoning |
|------------|-----------------|---------|-----------|
| **Current events** | HIGH | "Latest AI regulations in EU 2026" | Beyond training cutoff, needs current sources |
| **Recent research** | HIGH | "2025 breakthrough in fusion energy" | Recent developments, authoritative sources needed |
| **Real-time data** | HIGH | "Current NASDAQ index", "Today's weather" | Changes continuously, requires fresh data |
| **Historical facts** | LOW | "Date of French Revolution" | Well-established, in training data |
| **Mathematical calculations** | LOW | "What is 15% of 240?" | Computation, no web data needed |
| **Code explanations** | LOW | "Explain Python decorators" | Timeless concept, well-documented |
| **Product comparisons** | MEDIUM | "Compare iPhone 15 vs Samsung S24" | Some features current, some timeless |
| **Fact-checking** | HIGH | Controversial claims, verifying sources | Attribution and multiple sources critical |
| **API documentation** | MEDIUM-HIGH | "Latest Gemini API features" | Changes frequently, needs current docs |

---

## API Implementation

### Python Example

```python
from google import genai
from google.genai import types

# Initialize client
client = genai.Client(api_key="YOUR_API_KEY")

# Enable Google Search grounding
grounding_tool = types.Tool(google_search=types.GoogleSearch())
config = types.GenerateContentConfig(tools=[grounding_tool])

# Generate grounded response
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="What are the latest updates to the Gemini API in January 2026?",
    config=config
)

# Access response text
print("Response:", response.text)

# Access grounding metadata
if response.grounding_metadata:
    print("\n=== Grounding Metadata ===")

    # Show search queries used
    print("\nSearch queries used:")
    for query in response.grounding_metadata.web_search_queries:
        print(f"  - {query}")

    # Show sources
    print("\nSources:")
    for i, chunk in enumerate(response.grounding_metadata.grounding_chunks):
        print(f"  [{i}] {chunk.web.title}")
        print(f"      {chunk.web.uri}")

    # Extract inline citations (text → source mapping)
    print("\nCitations:")
    for support in response.grounding_metadata.grounding_supports:
        # Extract the text segment
        segment = response.text[support.segment.start_index:support.segment.end_index]

        # Get source indices and URLs
        source_indices = support.grounding_chunk_indices
        sources = [
            response.grounding_metadata.grounding_chunks[i].web.uri
            for i in source_indices
        ]

        # Get confidence scores
        scores = support.confidence_scores

        print(f"\n  Text: '{segment}'")
        print(f"  Sources: {sources}")
        print(f"  Confidence: {scores}")
```

**Output example:**
```
Response: Recent updates to the Gemini API in January 2026 include...

=== Grounding Metadata ===

Search queries used:
  - Gemini API updates January 2026
  - Google AI Gemini 3.0 release notes

Sources:
  [0] Gemini API Changelog - January 2026
      https://ai.google.dev/changelog
  [1] Google Cloud AI Blog
      https://cloud.google.com/blog/products/ai-machine-learning

Citations:

  Text: 'Gemini 3.0 Preview Release'
  Sources: ['https://ai.google.dev/changelog']
  Confidence: [0.95]

  Text: 'Structured Output Enhancements'
  Sources: ['https://ai.google.dev/changelog', 'https://cloud.google.com/blog/...']
  Confidence: [0.92, 0.88]
```

---

### Node.js Example

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function groundedQuery() {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    config: {
      tools: [{ googleSearch: {} }]
    },
    contents: "What are the latest updates to the Gemini API in January 2026?"
  });

  // Access response text
  console.log("Response:", response.text);

  // Access grounding metadata
  if (response.groundingMetadata) {
    const metadata = response.groundingMetadata;

    console.log("\n=== Grounding Metadata ===");

    // Search queries
    console.log("\nSearch queries:");
    metadata.webSearchQueries?.forEach(query => {
      console.log(`  - ${query}`);
    });

    // Sources
    console.log("\nSources:");
    metadata.groundingChunks?.forEach((chunk, i) => {
      console.log(`  [${i}] ${chunk.web.title}`);
      console.log(`      ${chunk.web.uri}`);
    });

    // Citations
    console.log("\nCitations:");
    metadata.groundingSupports?.forEach(support => {
      const segment = support.segment;
      console.log(`\n  Text: '${segment.text}'`);
      console.log(`  Sources: [${support.groundingChunkIndices.join(', ')}]`);
      console.log(`  Confidence: [${support.confidenceScores.join(', ')}]`);
    });
  }
}

groundedQuery();
```

---

## Key Learnings

### 1. Automatic Grounding
Gemini decides whether to search based on the query. You don't control it directly. This:
- **Optimizes costs** - No unnecessary searches
- **Improves speed** - Uses training data when appropriate
- **Ensures quality** - Web search only when genuinely needed

### 2. Citations Included
Grounded responses include source attribution. This enables:
- **Fact-checking** - Users can verify claims
- **References section** - Build a sources list in your UI
- **Transparency** - Show where information came from
- **Trust** - Authoritative sources increase credibility

### 3. Metadata Structure
The metadata has three key parts:
- **groundingChunks** - The sources (URLs, titles)
- **groundingSupports** - Maps text segments to sources
- **webSearchQueries** - What Gemini searched for

This structure enables programmatic citation extraction.

### 4. Not Always Triggered
Simple factual queries may not trigger web search, even with grounding enabled. This is intentional and beneficial.

### 5. Cost Awareness
Grounding adds cost in production:
- **Free** in AI Studio for testing
- **Paid** in production API ($35/1K grounded queries for Gemini 3.x)
- Use strategically: enable only for queries that need current info

### 6. Fact-Checking Enabled
Multiple sources allow verification of claims. Confidence scores indicate reliability.

---

## Common Issues and Solutions

### Issue 1: Grounding Didn't Trigger

**Problem:** "Grounding didn't trigger even though I need current info"

**Cause:** Query may not be explicit enough about needing current/recent data

**Solution:** Be more specific:
- Instead of: "What are Gemini API features?"
- Try: "What are the latest Gemini API features as of January 2026?"

**Key phrases that help trigger grounding:**
- "latest", "current", "as of [date]", "recent", "today", "now"

---

### Issue 2: Can't Find Grounding Metadata in UI

**Problem:** "Can't find grounding metadata in the AI Studio interface"

**Cause:** Metadata visibility varies by UI version

**Solution:**
- Look for "Sources", "Grounding", or "Details" sections
- Metadata is always available via API (see code examples above)
- If not visible in UI, use "Get code" to export and run via API

---

### Issue 3: No Citations in Response Text

**Problem:** "Response has no visible citations"

**Cause:** Not all grounded responses include inline citations in the text

**Solution:**
- Check for grounding metadata section separately
- Sources are in the metadata even if not in the text
- Use API to access full metadata structure

---

### Issue 4: Grounding Returned Outdated Information

**Problem:** "Grounding returned outdated or incorrect information"

**Cause:** Web search results quality depends on available sources

**Solutions:**
- Rephrase query to be more specific
- Add date constraints: "as of January 2026"
- Check the sources in metadata - are they authoritative?
- Try multiple queries and cross-reference results

---

### Issue 5: High Costs in Production

**Problem:** "Grounding costs are adding up in production"

**Solutions:**
- **Cache frequently requested info** - Don't search for the same data repeatedly
- **Use selectively** - Only enable grounding for queries that genuinely need current data
- **Fallback pattern** - Try without grounding first, use grounding only if answer indicates outdated data
- **Batch queries** - Combine multiple questions into one grounded query

---

## Grounding vs RAG Comparison

Understanding when to use each approach:

| Aspect | Manual RAG | Gemini Grounding |
|--------|-----------|------------------|
| **Setup complexity** | High - build entire pipeline | Low - toggle on |
| **Maintenance** | Manual updates needed | Automatic - Google manages |
| **Citation extraction** | Manual parsing required | Built-in metadata |
| **Cost structure** | Infrastructure + LLM | LLM + grounding fee |
| **Data sources** | Your choice (custom, proprietary) | Google Search (public web) |
| **Specialized data** | Supports proprietary data | Public web only |
| **Update frequency** | You control (can be instant) | Web search (very current) |
| **Reliability** | Depends on your implementation | Google-managed, production-ready |
| **Use case fit** | Proprietary, specialized domains | General web information |

**When to use grounding:**
- Public web information (news, general knowledge)
- Current events, recent research
- Fact-checking with authoritative sources
- Real-time data (stock prices, weather, scores)
- When you want zero infrastructure

**When to use RAG:**
- Proprietary company data
- Internal documentation
- Specialized databases
- Custom data sources not on public web
- When you need full control over data sources

**Hybrid approach:**
- Use grounding for general/current information
- Use RAG for proprietary/specialized data
- Combine both in the same app for different query types

---

## Real-World Use Cases

### 1. News Summarization
```python
prompt = "Summarize today's top technology news headlines with sources"
# Grounding provides current news with attribution
# Perfect for news aggregator apps
```

### 2. Research Assistant
```python
prompt = "What are the latest breakthroughs in quantum computing as of January 2026?"
# Grounding finds recent papers, studies, announcements
# Ideal for keeping researchers up-to-date
```

### 3. Fact-Checking
```python
prompt = "Verify this claim with sources: 'AI models now use less energy than in 2025'"
# Grounding provides multiple sources to verify or refute claims
# Critical for journalism, research, content moderation
```

### 4. Market Data
```python
prompt = "What is the current Bitcoin price and recent price trends?"
# Grounding accesses real-time financial data
# Useful for finance apps, trading tools
```

### 5. Documentation Assistant
```python
prompt = "What are the latest features in React 19?"
# Grounding keeps docs current without manual updates
# Great for developer tools, documentation sites
```

### 6. Product Comparison
```python
prompt = "Compare the latest features and pricing of iPhone 15 Pro vs Samsung S24 Ultra"
# Grounding gets current specs, pricing, reviews
# Helpful for e-commerce, review sites
```

---

## Additional Resources

**Official Documentation:**
- [Gemini API Grounding Guide](https://ai.google.dev/gemini-api/docs/google-search)
- [Grounding Metadata Reference](https://ai.google.dev/api/grounding-metadata)
- [Google Search Integration](https://ai.google.dev/gemini-api/docs/tools/google-search)

**Pricing:**
- [Gemini API Pricing](https://ai.google.dev/pricing) - Check current grounding costs
- Free tier in AI Studio for testing

**Workshop Reference:**
- See RESEARCH.md for grounding pitfalls and best practices
- Module 02 for combining grounding with structured output
- Module 04 for context engineering techniques

---

## Summary

Grounding with Google Search transforms Gemini from a static knowledge base to a dynamic research assistant. Use it for current events, fact-checking, and real-time data. Understand that grounding is automatic (model decides when to search), provides citation metadata for attribution, and works best for public web information.

For proprietary data or specialized domains, use custom RAG instead. For maximum flexibility, use both approaches in your application based on query type.
