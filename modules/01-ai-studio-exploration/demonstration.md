# Module 01: AI Studio Exploration - Demonstration Guide

**For Instructors** | **Duration:** 5-7 minutes

## Introduction (1 minute)

### What is Google AI Studio?

Google AI Studio is a browser-based playground for experimenting with Gemini models. It's designed for developers who want to:

- Test prompts and see responses in real-time
- Explore model capabilities without writing code
- Configure system instructions, model parameters, and tools
- Export working code for integration into applications

**Why use AI Studio?**

- **Zero setup** - No API keys, no installations, works in your browser
- **Free tier** - Test and prototype without cost during development
- **Code generation** - Every prompt can be exported as Python, Node.js, or curl
- **Shareable** - Prompts can be shared via URL for collaboration

This is where all Gemini integrations begin. You prototype here, then move to production.

---

## Step-by-Step Demonstration (5-6 minutes)

### Step 1: Navigate to AI Studio

**Action:**
1. Open your web browser
2. Navigate to: `aistudio.google.com`
3. If prompted, sign in with your Google Account

**Expected result:**
- AI Studio landing page appears
- You see options to create prompts or view examples

**Note for participants:** If you're not signed in, you'll be prompted. Any Google Account works (personal or work).

[Screenshot: AI Studio landing page]

---

### Step 2: Create a new prompt

**Action:**
1. Click the **"New prompt"** button (or similar button to create)
2. When the prompt type selection appears, choose **"Freeform prompt"**

**Expected result:**
- Prompt editor interface loads
- You see a text input area for your prompt
- Model dropdown shows `gemini-3-flash-preview` (default)
- Right panel shows configuration options

**Talking point:** "Freeform prompts are the simplest type - just text in, text out. We'll explore other types in later modules."

[Screenshot: Prompt type selection]

[Screenshot: Empty prompt editor]

---

### Step 3: Write your first prompt

**Action:**
1. In the main prompt field, type:
   ```
   List 3 benefits of using AI in developer workflows
   ```
2. Observe the interface - note the model selection dropdown

**Expected result:**
- Text appears in the prompt editor
- Model dropdown shows `gemini-3-flash-preview`
- "Run" button is now enabled

**Show participants:**
- The model selector (Flash vs Pro, different versions)
- Where the prompt text goes
- The Run button location

**Talking point:** "Gemini 3 Flash is the fast, cost-effective model perfect for testing. Pro models offer higher quality but cost more."

[Screenshot: Prompt entered in editor]

---

### Step 4: Run the prompt

**Action:**
1. Click the **"Run"** button

**Expected result:**
- Loading indicator appears briefly
- Response generates in the output panel (may stream in real-time)
- Token usage indicator appears (shows input/output tokens)
- Response time is displayed

**Point out to participants:**
- The streaming effect (text appearing progressively)
- Token count - "This is how usage is measured and billed"
- Response time - "Flash is typically very fast, under 2 seconds"

**Example response you might see:**
```
Here are 3 benefits of using AI in developer workflows:

1. **Faster Code Generation**: AI can help write boilerplate code, generate test cases, and suggest implementations...

2. **Improved Code Quality**: AI-powered code review tools can identify bugs, security vulnerabilities...

3. **Enhanced Learning**: Developers can use AI to explain complex code, learn new frameworks...
```

[Screenshot: Response generated with token count]

---

### Step 5: View API code

**Action:**
1. Click the **"Get code"** button (top right of interface)
2. Code panel opens with multiple language tabs

**Expected result:**
- Code export panel appears
- Tabs for Python, Node.js, curl (and possibly others)
- Python tab is selected by default
- Full working code is shown

**Show participants:**
- Switch between language tabs
- Point out the API key placeholder
- Explain: "This exact code will reproduce the same result in your application"

**Example code shown:**
```python
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="List 3 benefits of using AI in developer workflows"
)

print(response.text)
```

**Talking point:** "Notice how simple this is - your natural language prompt becomes one API call. This is the foundation of Gemini integration."

[Screenshot: Get code panel with Python example]

---

### Step 6: Modify and re-run

**Action:**
1. Close the code panel (or leave it open)
2. Edit the original prompt to:
   ```
   List 3 benefits of using AI in developer workflows. Format the output as JSON.
   ```
3. Click **"Run"** again

**Expected result:**
- New response generates
- Response *may* be formatted differently, but likely still text (not pure JSON)
- Demonstrates iterative refinement

**Example response:**
```
{
  "benefits": [
    {
      "title": "Faster Code Generation",
      "description": "AI can help write boilerplate code..."
    },
    ...
  ]
}
```

**Or it might just list benefits in a different format - that's okay!**

**Talking point:** "Notice I asked for JSON, but the result isn't guaranteed to be valid JSON. That's because we're using a freeform prompt. In Module 02, you'll learn how to *enforce* JSON structure using schemas. This is a preview of why structured output matters."

[Screenshot: Modified prompt with different response]

---

## Key Talking Points (Wrap-up)

Emphasize these concepts as you demonstrate:

1. **Everything is browser-based**
   - No installations, no command line, no development environment needed
   - Sign in and start immediately

2. **Prompts are shareable**
   - Every prompt has a URL
   - You can share with colleagues for collaboration
   - Version history is automatically tracked

3. **Free tier for testing**
   - AI Studio is free for prototyping
   - Rate limits apply, but generous for development
   - Production apps need API keys (covered in Module 06)

4. **This is the starting point**
   - Every Gemini integration begins here
   - Test your prompts before writing code
   - Iterate in the UI, then export to your app

5. **Iterative refinement is normal**
   - Your first prompt rarely gives the perfect result
   - Experiment, refine, re-run
   - The feedback loop is instant

---

## Transition to Exercise

"Now it's your turn. Open AI Studio on your own device and create your first prompt. The exercise gives you two options - a guided path if you want step-by-step instructions, or an independent challenge if you prefer to explore. Both paths lead to the same learning outcomes. You have 10-13 minutes. Let's begin!"

---

## Troubleshooting Tips

**If participants encounter issues:**

- **"I can't access AI Studio"** - Confirm they're signed in with a Google Account
- **"The Run button is disabled"** - Check that there's text in the prompt field
- **"I get an error when running"** - Likely a rate limit; wait 30 seconds and try again
- **"Where is the Get code button?"** - Top right corner of the interface, may be labeled differently

---

**Duration:** ⏱️ 5-7 minutes demonstrated | Allow 1-2 minutes for questions
