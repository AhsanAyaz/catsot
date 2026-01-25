# Module 05: Grounding with Google Search - Exercise

**Duration:** 10-13 minutes
**Format:** Hands-on practice

## Your Task

Experiment with grounding to understand when it's useful and how to interpret grounding metadata. You'll test different types of queries to see when Gemini decides to search the web and when it uses its training data.

## Setup (1 minute)

1. Open https://aistudio.google.com in your browser
2. Create a new prompt (click "Create new prompt" or "New prompt")
3. Locate the **Tools** panel (usually on the right side of the interface)
4. Find the **Google Search grounding** toggle - you'll be turning this ON and OFF during the exercise

Ready? Let's go!

---

## Option A: Guided Challenge (For beginners)

Follow these step-by-step instructions to understand grounding behavior.

### Step 1: Current Events Test (3 minutes)

**Goal:** See how grounding handles recent information

**Test Prompt:**
```
What are the latest updates to the Gemini API in January 2026?
```

**Instructions:**
1. **First, run WITHOUT grounding:**
   - Make sure Google Search grounding is OFF
   - Enter the prompt
   - Click "Run"
   - Observe the response (likely mentions knowledge cutoff or provides generic information)

2. **Now run WITH grounding:**
   - Toggle Google Search grounding to ON
   - Run the SAME prompt again
   - Observe the response (should include current information with sources)

**What to notice:**
- Does the grounded response include specific dates?
- Can you see source citations or links?
- Is there a grounding metadata section?
- How does the quality differ?

**Success criteria:**
- [ ] You see a clear difference between grounded and non-grounded responses
- [ ] The grounded response includes recent information
- [ ] You can identify at least one source or citation

---

### Step 2: Factual Knowledge Test (3 minutes)

**Goal:** Understand that grounding is selective

**Test Prompts:**

**Prompt A (Timeless fact):**
```
What is the capital of France?
```

**Prompt B (Recent fact):**
```
Who won the Nobel Prize in Physics in 2024?
```

**Instructions:**
1. Make sure Google Search grounding is ON
2. Run Prompt A ("What is the capital of France?")
   - Does Gemini search the web? (May or may not - the answer is well-known)
   - Is there grounding metadata?
3. Run Prompt B ("Who won the Nobel Prize in Physics in 2024?")
   - Does Gemini search the web? (Likely YES - recent event)
   - Is there grounding metadata with sources?

**What to notice:**
- Grounding doesn't search for EVERY query
- The model decides based on whether current information is needed
- Timeless facts may not trigger web search
- Recent, date-specific queries almost always do

**Success criteria:**
- [ ] You understand that grounding is automatic (model decides when to search)
- [ ] You can differentiate between queries that need grounding vs those that don't

---

### Step 3: Examine Metadata (3 minutes)

**Goal:** Understand the structure of grounding metadata

**Test Prompt:**
```
What are the latest security vulnerabilities in React 18?
```

**Instructions:**
1. Make sure Google Search grounding is ON
2. Run the prompt
3. Look for grounding metadata in the response:
   - Check for a "Grounding" section or "Sources" panel
   - May need to expand "Details" or similar
4. Try to identify:
   - **Which sources were used?** (Look for URLs, website names)
   - **How many sources?** (Count the citations or sources listed)
   - **What search terms did Gemini use?** (May show webSearchQueries)

**What to notice:**
- The metadata structure maps text to sources
- Multiple sources can support a single statement
- Sources often include URLs and titles

**Success criteria:**
- [ ] You found the grounding metadata section (or identified source citations)
- [ ] You can identify at least one source URL or website name
- [ ] You understand that grounding provides attribution, not just answers

---

### Step 4: Test Domain-Specific Query (2 minutes)

**Goal:** See grounding in action for real-time data

**Test Prompt (pick one):**
```
What is the current weather in Stockholm?
```
OR
```
What is the current stock price of Google (GOOGL)?
```
OR
```
What are today's top tech news headlines?
```

**Instructions:**
1. Make sure Google Search grounding is ON
2. Run your chosen prompt
3. Observe:
   - Is the information current (today's date)?
   - Are sources provided?
   - How fresh is the data?

**What to notice:**
- Grounding excels at real-time, dynamic data
- Stock prices, weather, news are perfect use cases
- Sources help verify the information is current

**Success criteria:**
- [ ] You get current information (with today's date or recent timestamp)
- [ ] Sources are cited
- [ ] You understand when grounding provides the most value

---

## Option B: Independent Challenge (For advanced users)

**Goal:** Design your own queries to test grounding behavior and analyze the metadata structure.

### Your Mission

Experiment with grounding to identify patterns in when it's triggered and how metadata is structured.

**Suggested experiments:**

1. **Feature comparison test:**
   - Try: "What is React?" (grounding OFF)
   - Then: "What are the latest React features?" (grounding ON)
   - Compare the responses

2. **Scientific queries:**
   - Try: "Explain quantum computing" (timeless concept)
   - Then: "Latest quantum computing breakthroughs in 2026" (current developments)
   - Note when web search is triggered

3. **Controversial topics:**
   - Ask about a current debate or controversial topic
   - Observe how grounding provides multiple sources for balanced information
   - Check if confidence scores vary across sources

4. **Citation extraction:**
   - Pick a grounded response
   - Map which text segments came from which sources
   - Try to understand the groundingSupports structure

**Requirements:**
- [ ] Test at least 3 different query types
- [ ] Document which queries triggered web search and which didn't
- [ ] Identify patterns (current events vs timeless facts, specific vs general, etc.)
- [ ] Attempt to extract source URLs from metadata or citations
- [ ] Note when grounding adds value vs when it's unnecessary

**Advanced bonus:**
- Click "Get code" to see how grounding is configured in API code
- Compare the API structure to what you see in the UI
- Experiment with combining grounding + structured output (see Module 02)

---

## For Fast Finishers: Going Further

### Advanced Challenges

**1. Grounding + Structured Output**
Combine Module 02 (structured output) with grounding:
- Enable both JSON output AND grounding
- Prompt: "Get the latest AI news and return as JSON with title, summary, and source for each article"
- Observe how grounding provides current data in a structured format

**2. Multi-Step Reasoning with Grounding**
Test complex queries that require synthesis:
- "Compare the GDP growth of France and Germany in 2025"
- "What are the environmental impacts of the latest EU climate policies?"
- See how Gemini searches and synthesizes multiple sources

**3. API Code Exploration**
- Click "Get code" in AI Studio
- Examine how grounding is configured (tools parameter)
- Look for: `types.Tool(google_search=types.GoogleSearch())`
- Understand how to access metadata programmatically

**4. Cost Analysis**
- Research grounding pricing (check RESEARCH.md or Google AI documentation)
- Estimate costs for a hypothetical app that uses grounding
- Think about when to enable grounding vs when to use cached/static data

---

## Success Criteria

You've successfully completed this exercise when:

- [ ] You have tested grounding with at least 3 different prompts
- [ ] You understand that grounding is automatic (model decides when to search)
- [ ] You can identify source citations in grounded responses
- [ ] You recognize when grounding adds value vs when it's unnecessary
- [ ] You are aware of grounding metadata structure (groundingChunks, groundingSupports)

---

## Duration Indicator

⏱️ **Expected:** 11 minutes | **Buffer:** 3 minutes

- Setup: 1 min
- Option A (Guided): 11 min (4 steps)
- Option B (Independent): 10-12 min
- Going Further: +5-10 min (optional)

---

## What's Next?

After completing this exercise, proceed to `solutions/solution.md` to see reference examples and learn about API implementation.

## Troubleshooting

**Issue:** "I don't see grounding metadata"
- **Solution:** Metadata visibility varies by UI version. Look for "Sources", "Grounding", or "Details" sections. If not visible in UI, the metadata is still available via API (see solutions for API code).

**Issue:** "Grounding didn't trigger even though I need current info"
- **Solution:** Be more explicit in your prompt. Try: "What are the latest [thing] as of January 2026?" or "Current [data] today"

**Issue:** "Response has no citations visible"
- **Solution:** Not all grounded responses show inline citations in the UI. Check for a grounding/sources section, or use the API for full metadata access.

**Issue:** "Grounding returned outdated information"
- **Solution:** Web search results may vary. Grounding fetches current results, but quality depends on available sources. Try rephrasing your query or being more specific about dates.
