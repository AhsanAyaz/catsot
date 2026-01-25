# Module 01: AI Studio Exploration - Hands-on Exercise

**Duration:** 10-13 minutes

## Your Task

Create your first AI Studio prompt and explore the interface. By the end of this exercise, you'll understand the basic prompt-response workflow and how AI Studio translates to production code.

---

## Setup (1 minute)

Before you begin, get AI Studio ready:

1. Open your web browser
2. Navigate to: `aistudio.google.com`
3. Sign in with your Google Account (if not already signed in)
4. Click **"New prompt"** (or similar)
5. Select **"Freeform prompt"**

✅ **Success check:** If you see the prompt editor with a text input field, you're ready to go!

---

## Choose Your Path

Select the option that matches your comfort level. Both paths achieve the same learning outcomes.

---

## Option A: Guided Challenge (Recommended for beginners)

Follow these step-by-step instructions to build confidence with AI Studio.

### Step 1: Create a basic prompt (3 minutes)

**Your task:**
1. In the prompt field, write a question or instruction about a topic you're interested in
2. Click the **"Run"** button
3. Observe the response that generates

**Example topics to explore:**
- Technical: "Explain how neural networks work in simple terms"
- Creative: "Write a haiku about Stockholm in winter"
- Practical: "Suggest 5 creative workshop icebreaker activities"
- Code-related: "Explain this Python code: `list(map(lambda x: x**2, range(10)))`"

**Success criteria:**
- ✅ You entered a prompt
- ✅ You clicked Run
- ✅ You see a generated response
- ✅ The response is relevant to your prompt

**What to observe:**
- How long did the response take to generate?
- Did the text stream in progressively or appear all at once?
- What does the token count say? (Look for input/output tokens)

---

### Step 2: Explore model settings (3 minutes)

**Your task:**
1. Locate the **model dropdown** (currently showing `gemini-3-flash-preview` or similar)
2. Click it to view available models
3. Find the **temperature** slider or setting (may be in "Run settings" or similar)
4. Change the temperature to a different value
5. Re-run your prompt from Step 1

**Understanding temperature:**
- **0.0** = More deterministic, consistent, focused (good for factual tasks)
- **1.0** = More creative, varied, random (good for brainstorming)
- **0.7** = Balanced (default for many tasks)

**Success criteria:**
- ✅ You located and viewed the model options
- ✅ You found the temperature setting
- ✅ You re-ran the prompt with a different temperature
- ✅ You notice how temperature affects the output

**Experiment:**
Try running the same prompt 3 times at temperature 1.0. Do you get different responses each time?

---

### Step 3: Export API code (3 minutes)

**Your task:**
1. Click the **"Get code"** button (top right area of the interface)
2. Observe the code panel that opens
3. Switch between the **Python**, **Node.js**, and **curl** tabs
4. Copy the **Python** code to a text file or note (you'll reference this concept in Module 06)

**Success criteria:**
- ✅ You opened the code export panel
- ✅ You viewed code in at least 2 different languages
- ✅ You understand this code would reproduce the same result in your app
- ✅ You see where your prompt text appears in the code

**Key insight:**
This is how AI Studio prompts become production applications. Every prompt you create here can be exported as working code. The "Get code" button bridges the gap between experimentation and integration.

**Question to consider:**
What would you need to make this code work in your own application? (Hint: Look for "YOUR_API_KEY")

---

### Step 4: Review and reflect (1 minute)

**Reflection questions:**
- What was easier than you expected?
- What was more complex than you expected?
- How could you use this workflow in a real project?

---

## Option B: Independent Challenge (For advanced users)

**Goal:** Create a prompt that demonstrates Gemini's capabilities and export it as API code.

**Your challenge:**
1. Create a prompt that solves a problem you encounter in your work
2. Experiment with different model settings to improve the output
3. Export the prompt as API code
4. Think about how this could integrate into an application

**Hints:**
- Try asking Gemini to explain a technical concept you've been curious about
- Experiment with temperature settings (0.0 for consistency, 1.0 for creativity)
- Use the "Get code" button to see the API equivalent
- Consider: What would you need to deploy this as a microservice?

**Challenge extension:**
Can you craft a prompt that produces a response you could use directly in production? (e.g., generate documentation, create test data, draft an email template)

**Solution:** See `solutions/solution.md` if you get stuck or want to compare your approach.

---

## For Fast Finishers: Going Further

If you complete either path early, try these advanced explorations:

### 1. Multi-turn conversation
- Add follow-up prompts to your original prompt
- Observe how context is maintained (or not) between runs
- Try the **"Chat prompt"** type instead of "Freeform prompt" to see multi-turn behavior

### 2. Explore saved prompts
- Save your prompt using the Save button
- View your saved prompts library
- Understand how you can organize and reuse prompts

### 3. Share your work
- Click the **"Share"** button
- Generate a shareable link
- Consider: How could you use shareable prompts for team collaboration?

### 4. Compare models
- Run the exact same prompt on different models (Flash vs Pro)
- Compare response quality, speed, and token usage
- Which model would you choose for different use cases?

### 5. Experiment with system instructions
- Look for the "System instructions" field (may be in settings)
- Add a system instruction like: "You are a helpful coding assistant. Always provide concise explanations."
- Observe how it changes the model's behavior

---

## Success Criteria

Before moving to the next module, ensure you can check off all of these:

- [ ] You have created and run at least one prompt in AI Studio
- [ ] You have experimented with model settings (temperature or model selection)
- [ ] You have viewed the API code export for your prompt
- [ ] You understand the basic prompt-response workflow
- [ ] You recognize how AI Studio prompts translate to production code

**If you can check all boxes, you're ready for Module 02!**

---

## Common Issues & Solutions

**Issue:** "I can't sign in to AI Studio"
**Solution:** Ensure you're using a Google Account. If you don't have one, create one at accounts.google.com (free).

**Issue:** "The Run button doesn't work"
**Solution:** Make sure there's text in the prompt field. If it still doesn't work, refresh the page and try again.

**Issue:** "I get an error: 'Rate limit exceeded'"
**Solution:** AI Studio has rate limits on the free tier. Wait 60 seconds and try again. For the workshop, this should be rare.

**Issue:** "My response doesn't match the example"
**Solution:** That's normal! Generative AI produces different outputs each time, especially at higher temperatures. Focus on whether the response is relevant and useful, not whether it matches word-for-word.

**Issue:** "I can't find the 'Get code' button"
**Solution:** Look in the top right area of the interface. It may be labeled "View code" or have a code icon. If you still can't find it, ask the instructor.

**Issue:** "The code has 'YOUR_API_KEY' - where do I get that?"
**Solution:** API keys are covered in Module 06. For now, just understand that you'd replace that placeholder with your own key from Google Cloud.

---

## Duration Indicator

⏱️ **Expected:** 10 minutes | **Buffer:** 3 minutes | **Total:** 13 minutes

**Pacing guide:**
- If you finish in < 8 minutes: Explore "Going Further" section
- If you're at 10 minutes: Complete current step, then move to next module
- If you're at 13 minutes: Finish your current task, we'll continue as a group

---

**Next:** Return to the main workshop space for Module 02 introduction
