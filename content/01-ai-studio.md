# AI Studio — The API Playground

**Module 02** | ~25 minutes
Your gateway to Gemini models

Note:

- First hands-on with AI Studio
- Foundation for understanding all other tools

---

## What is AI Studio?

**Google AI Studio** (aistudio.google.com)

- Free tier access to Gemini models
- Playground for experimentation
- API key generation
- Prompt gallery and templates

**Your starting point** for any Gemini project

---
<!-- .slide: style="font-size: 0.8em" -->
### Model Selection

| Model | Best For | Speed |
|-------|----------|-------|
| **Gemini 3 Flash** | Agents, coding, lightning speed | ⚡⚡⚡ |
| **Gemini 3 Pro** | Deep reasoning, complex solving | ⚡ |
| **Gemini 2.5 Flash** | High volume, cost-effective | ⚡⚡⚡ |
| **Gemini 2.5 Pro** | General purpose, stable production | ⚡⚡ |

**Rule of thumb:** Start with **3 Flash**, upgrade to **Pro** for reasoning

---
<!-- .slide: style="font-size: 0.8em" -->
### Structured Output

**Getting reliable JSON from Gemini**

```javascript
const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: "Analyze this text for sentiment",
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        sentiment: { type: "string", enum: ["positive", "negative", "neutral"] },
        confidence: { type: "number" }
      }
    }
  }
});
```

**Pro tip:** Description fields are instructions to the model!

---

<!-- .slide: style="font-size: 0.8em" -->
### Why Structured Output Matters

**Without structure:**
> "The sentiment is mostly positive, I'd say around 80% confident..."

**With structure:**

```json
{ "sentiment": "positive", "confidence": 0.85 }
```

✅ Parseable
✅ Predictable
✅ Production-ready

---
<!-- .slide: style="font-size: 0.8em" -->
### Multimodal Input

**Images + Text in one prompt**

```javascript
const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: [
    { text: "What emotion does this face express?" },
    { inlineData: { 
        data: base64Image, 
        mimeType: "image/png" 
    }}
  ]
});
```

Gemini sees **and** understands images

---
<!-- .slide: style="font-size: 0.8em" -->
### Grounding with Google Search

**Connect AI to real-time information**

<!-- use grounding image here -->
![grounding](assets/images/grounding/03-grounded-response.png)

--

- Toggle in AI Studio UI
- Adds current web information
- Great for: news, stock prices, weather, facts

---

<!-- .slide: style="font-size: 0.8em" -->
### Grounding vs RAG

| Feature | **Grounding** | **RAG** |
|---------|--------------|---------|
| Data source | Google Search | Your documents |
| Best for | Public info, current events | Private data |
| Setup | Toggle in UI | Build pipeline |
| Control | Limited | Full control |

**Start with Grounding** — it's instant

---

### System Instructions

**Shape model behavior globally**

```text
You are a technical workshop assistant for developers.
Always:
- Be concise and practical
- Include code examples when relevant
- Suggest next steps for learning

Never:
- Use jargon without explanation
- Make up information you're not sure about
```

Sets the "personality" for all interactions

---

### Build Full Apps with Gemini

**Turn prompts into deployed applications**

![Build Apps](assets/images/ai-studio-build-start.png)
<!-- .element: style="max-height: 50vh; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" -->

--

- "Describe your idea" -> Gemini builds the app
- HTML/CSS/React support
- Instant preview

---

### Deploy from AI Studio

**One-click deployment to Google Cloud**

![Deploy App](assets/images/ai-studio-build-deploy.png)
<!-- .element: style="max-height: 50vh; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" -->

--

- Edit code in-browser
- Deploy to Cloud Run automatically
- Share with a [public URL](https://stockholm-run-463347094622.us-west1.run.app/?session=JQ8AA0#host)

---

## AI Studio Quick Demo

**Let's explore:**

1. Open aistudio.google.com
2. Select Gemini 3 Flash
3. Try a freeform prompt
4. Add system instructions
5. Enable structured output
6. Enable grounding

---

### Key Takeaways

✅ **AI Studio** = API playground + key generation
<!-- .element: class="fragment" -->

✅ **Structured output** = Reliable, parseable responses
<!-- .element: class="fragment" -->

✅ **Multimodal** = Images as context
<!-- .element: class="fragment" -->

✅ **Grounding** = Real-time web data
<!-- .element: class="fragment" -->

✅ **System instructions** = Shape behavior
<!-- .element: class="fragment" -->

**Next:** NotebookLM — grounding AI in YOUR knowledge
<!-- .element: class="fragment" -->
