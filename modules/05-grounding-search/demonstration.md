# Module 05: Grounding with Google Search - Demonstration

**Duration:** 5-7 minutes
**Format:** Instructor-led walkthrough

## Introduction (1 minute)

"Let me show you a common problem and Gemini's elegant solution."

**The knowledge cutoff problem:**
- LLMs are trained on data up to a specific date
- Ask about recent events → outdated or "I don't know" responses
- Example: "Who won Euro 2024?" or "What are the latest Gemini API updates?"

**Traditional solution:**
- Build a RAG (Retrieval Augmented Generation) pipeline
- Web scraping, indexing, semantic search, prompt injection
- Complex infrastructure, constant maintenance

**Gemini's solution:**
- Built-in grounding with Google Search
- Zero infrastructure required
- Automatic citation generation
- Production-ready feature

"Let me demonstrate how this works in AI Studio."

## Step-by-Step Demonstration (5-6 minutes)

### Step 1: Baseline - Without Grounding (1 minute)

**Action:** Create new prompt in AI Studio
- Navigate to aistudio.google.com
- Click "Create new prompt" or "New prompt"
- Select "Freeform prompt" if prompted

**Action:** Enter the following prompt:
```
Who won Euro 2024?
```

**Action:** Run the prompt (with grounding OFF - default state)

**Expected result:**
- Generic response OR
- "I don't have information about events after my training cutoff" OR
- Outdated speculation

**Point out:**
"Notice the model is correctly indicating uncertainty or providing generic information. It doesn't have data about Euro 2024 because that's after its training cutoff."

![Non-grounded response](screenshots/01-non-grounded.png)

---

### Step 2: Enable Grounding (1 minute)

**Action:** Locate the Tools panel
- Look for "Tools" panel (usually on the right side of the interface)
- If not visible, click the tools icon or check the side panel

**Expected result:** Tools options panel appears

**Action:** Toggle Google Search grounding ON
- Find "Google Search grounding" or "Grounding with Google Search"
- Toggle the switch to ON/enabled

**Expected result:**
- Grounding enabled indicator appears
- May show a notice about grounding being active

**Point out:**
"This is all it takes. One toggle. No API keys to configure, no infrastructure to set up. Let's run the same prompt again."

![Tools panel with grounding](screenshots/03-grounded-response.png)

---

### Step 3: Same Prompt with Grounding (1.5 minutes)

**Action:** Run the same prompt with grounding enabled:
```
Who won Euro 2024?
```

**Expected result:**
- Current, accurate answer (Spain won Euro 2024)
- Response includes source citations or attribution
- May show inline links or source references
- Information is synthesized from multiple sources

**Point out:**
"Now we get a current, accurate answer with sources. Notice:
1. The information is up-to-date (Spain's victory)
2. Sources are cited (news outlets, official UEFA sources)
3. The model synthesized multiple sources automatically
4. This happened without any code or infrastructure from us"

![Grounded response with citations](screenshots/03-grounded-response.png)

---

### Step 4: Examine the Metadata (1.5 minutes)

**Action:** Look for grounding metadata in the response
- In the response panel, check for "Grounding" section or metadata panel
- May need to expand "Show details" or similar option

**Show the metadata structure (if visible in UI):**

**webSearchQueries:**
- The search terms Gemini used
- Example: ["euro 2024 winner", "uefa euro 2024 final"]

**groundingChunks:**
- List of sources consulted
- Each chunk contains: URI (URL), title, and potentially snippets
- Example: `{web: {uri: "https://...", title: "Euro 2024 Final Results"}}`

**groundingSupports:**
- Maps which text segments came from which sources
- Shows start/end indices of text
- Links segments to chunk indices
- Includes confidence scores

**Point out:**
"This metadata is incredibly valuable. In your application, you can:
- Extract and display citations
- Build a references section
- Fact-check by verifying sources
- Show confidence scores to users
- Track which sources are most relevant"

![Grounding metadata panel](screenshots/04-metadata-panel.png)

---

### Step 5: When Grounding Isn't Triggered (1 minute)

**Action:** Try a simple factual prompt with grounding still enabled:
```
What is 2 + 2?
```

**Action:** Run the prompt

**Expected result:**
- Direct answer: "4"
- Likely NO web search triggered
- No grounding metadata or minimal metadata

**Point out:**
"Gemini is smart about when to search. Simple math doesn't need current web information, so it uses its training data directly. This:
- Saves costs (no unnecessary searches)
- Improves speed (instant response)
- Reduces noise (training data is perfect for well-established facts)"

**Now try one that WILL trigger grounding:**
```
Who won the Nobel Prize in Physics in 2025?
```

**Expected result:**
- Web search IS triggered (recent event, specific date)
- Current information with sources
- Grounding metadata present

**Point out:**
"Recent, date-specific events almost always trigger grounding. Gemini recognizes this is beyond its training data."

---

### Step 6: Real-World Grounding Use Case (1 minute)

**Action:** Demonstrate a practical use case:
```
What are the latest security vulnerabilities in React 18 as of January 2026?
```

**Action:** Run with grounding ON

**Expected result:**
- Current security advisories
- Source links (npm security advisories, GitHub, CVE databases)
- Specific vulnerability details with dates
- Grounding metadata showing multiple sources

**Point out:**
"This is where grounding shines:
- **Documentation:** Keep your docs current without manual updates
- **Fact-checking:** Verify claims with authoritative sources
- **Research:** Find latest developments in any field
- **Market data:** Stock prices, sports scores, weather
- **Product comparisons:** Get current features, pricing, reviews"

---

## Key Talking Points

### Automatic Decision-Making
"Gemini decides whether to search. You don't control it directly. This is a feature, not a limitation - it optimizes for cost and speed."

### Citation Metadata
"The metadata enables proper attribution in your app. You can build a full references section, fact-checking UI, or source verification system."

### Not a Replacement for Everything
"Grounding uses Google Search, so it's perfect for public web information. For proprietary data, internal docs, or specialized databases, you still need custom RAG."

### Cost Consideration
"In production, grounding costs more than non-grounded queries. Current pricing: $35 per 1,000 grounded queries for Gemini 3.x models. But in AI Studio, testing is FREE - perfect for this workshop."

### Free in AI Studio
"Everything we're doing today is free. Experiment as much as you want during the exercise."

## Common Pitfall to Address

**Expectation:** "Grounding should search for every prompt I send"

**Reality:** "Gemini only searches when needed - queries requiring current or specialized information"

**Solution:** "Ask questions that genuinely need real-time data. Be explicit: 'What are the latest [thing] as of [current date]?'"

**Why this matters:**
- Prevents confusion when simple prompts don't trigger grounding
- Sets correct expectations for production use
- Helps participants understand the automatic nature of grounding

## Metadata Structure Example

Here's what the grounding metadata looks like in the API response (we'll see a simplified version in the UI):

```json
{
  "groundingMetadata": {
    "webSearchQueries": ["euro 2024 winner"],
    "groundingChunks": [
      {
        "web": {
          "uri": "https://example.com/euro-2024-results",
          "title": "Euro 2024 Final Results"
        }
      },
      {
        "web": {
          "uri": "https://uefa.com/euro-2024",
          "title": "UEFA Euro 2024 Official"
        }
      }
    ],
    "groundingSupports": [
      {
        "segment": {
          "startIndex": 0,
          "endIndex": 25,
          "text": "Spain won Euro 2024..."
        },
        "groundingChunkIndices": [0, 1],
        "confidenceScores": [0.98, 0.95]
      }
    ]
  }
}
```

**Breakdown:**
- **webSearchQueries:** What Gemini searched for
- **groundingChunks:** The sources (index 0, 1, etc.)
- **groundingSupports:** Maps text to sources (this text came from chunks 0 and 1)
- **confidenceScores:** How confident the model is about each source's relevance

## Wrap-Up

"Grounding transforms Gemini from a static knowledge base to a dynamic research assistant. In the next exercise, you'll experiment with different types of queries to understand when grounding adds value."

**Transition to exercise:**
"Now it's your turn. Open AI Studio and test grounding with different query types."

## Timing Note

Total: 5-7 minutes
- Introduction: 1 min
- Steps 1-6: 4-5 min
- Wrap-up: 30 sec

Buffer: Include in overall module buffer (3 min for entire module)
