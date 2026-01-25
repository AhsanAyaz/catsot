# Module 03: Multimodal Input - Demonstration Guide

**Duration:** 5-7 minutes
**Format:** Instructor-led walkthrough with live demonstration in AI Studio

## Introduction (1 minute)

### What is Multimodal Input?

Multimodal input means combining different types of data in a single prompt - most commonly **images + text**. Gemini is **natively multimodal**, meaning it can "see" and understand images alongside your text instructions, all in one API call.

### Why It Matters

Many real-world applications need visual understanding:
- Analyzing charts and extracting data
- Understanding code from screenshots
- Describing user interfaces for accessibility
- Reviewing designs and mockups
- Processing receipts, forms, and documents

With Gemini, you don't need a separate "vision API" - multimodal capabilities are built into the same model you've been using for text.

---

## Step-by-Step Demonstration (5-6 minutes)

### Step 1: Prepare for Image Upload

**Action:**
1. Open [aistudio.google.com](https://aistudio.google.com)
2. Click "Create new prompt"
3. Select "Freeform prompt" (if prompted)

**Expected result:**
- You see the prompt editor
- Look for the upload button - usually a paperclip icon (📎) or image icon in the toolbar

**Point out to participants:**
"You can upload multiple images in a single prompt - useful for comparisons or providing multiple examples."

---

### Step 2: Upload First Image (Chart Example)

**Action:**
1. Click the upload button
2. Select `sample-images/chart.png` from the workshop files
3. Wait for upload to complete

**Expected result:**
- Image preview appears in the prompt editor
- The image is now part of your prompt context

**Screenshot:** [Image uploaded in AI Studio - chart visible in prompt editor]

**Key talking point:**
"Notice how simple this is - just click and upload. No special encoding, no separate API endpoints."

---

### Step 3: Write Your First Multimodal Prompt

**Action:**
Below the image, type this prompt:
```
What data does this chart show? Summarize the key findings.
```

**Expected result:**
- Prompt editor shows both the image and your text
- No special syntax needed - just natural language

**Point out:**
"The prompt combines visual context (the image) with text instructions (what to do with it). Gemini processes both together."

**Action:** Click "Run"

**Expected result:**
Gemini analyzes the image and provides a summary like:
```
This bar chart displays quarterly revenue data over four quarters (Q1-Q4).

Key findings:
- Revenue shows overall growth from Q1 ($50K) to Q3 ($85K)
- Q3 represents the peak performance at $85K
- Q4 shows a slight decline to $78K, but remains above Q1-Q2 levels
- The trend indicates strong mid-year performance with a minor year-end dip
```

**Screenshot:** [Response showing chart analysis with specific numbers and trends]

**Key talking point:**
"Gemini can read the chart values, identify trends, and provide business insights - all from the image."

---

### Step 4: Demonstrate Structured Data Extraction

**Action:**
Keep the same image, but replace your prompt with:
```
Extract the data from this chart as JSON with this format:
{
  "labels": [],
  "values": []
}
```

**Action:** Click "Run"

**Expected result:**
```json
{
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "values": [50000, 68000, 85000, 78000]
}
```

**Key talking point:**
"This combines two powerful features: multimodal input (the image) + structured output (from Module 02). You can extract structured data directly from visual sources."

**Point out:**
"This is useful for digitizing charts, processing receipts, extracting form data, and more."

---

### Step 5: Show Code Screenshot Analysis

**Action:**
1. Remove the chart image (click X or delete)
2. Upload `sample-images/code-screenshot.png`
3. Enter this prompt:
```
Explain what this code does in simple terms.
```

**Action:** Click "Run"

**Expected result:**
```
This code defines a function called `calculate_discount` that determines
pricing based on customer type. It:

1. Takes two parameters: the original price and customer type
2. Applies different discount rates:
   - Premium customers: 20% off
   - Regular customers: 10% off
   - New customers: 5% off
3. Returns the final discounted price

The function uses if/elif statements to check the customer type and
calculates the discount by multiplying the price by (1 - discount_rate).
```

**Follow-up prompt:**
```
Are there any potential bugs or improvements?
```

**Expected result:**
```
Potential improvements:

1. **Input validation**: Add checks for negative prices or invalid customer types
2. **Use a dictionary**: Replace if/elif chain with a lookup table for cleaner code
3. **Add type hints**: Specify parameter and return types for better code clarity
4. **Default case**: Currently returns full price if customer type doesn't match -
   this should be explicit
5. **Add docstring**: Document what the function does and what parameters it expects

Example improvement:
DISCOUNT_RATES = {'premium': 0.20, 'regular': 0.10, 'new': 0.05}

def calculate_discount(price: float, customer_type: str) -> float:
    """Apply discount based on customer type."""
    if price < 0:
        raise ValueError("Price must be positive")
    discount = DISCOUNT_RATES.get(customer_type, 0)
    return price * (1 - discount)
```

**Key talking point:**
"This is incredibly useful for code review, documentation, learning from screenshots of tutorials, and understanding unfamiliar codebases."

---

### Step 6: Discuss Token Costs

**Action:**
Point to the token usage indicator in AI Studio (usually shown after generation)

**Explain:**
"Images consume tokens based on their size. This is important to understand for cost management."

**Token cost breakdown:**
- **Small images (≤384px):** 258 tokens (~$0.00003 with Gemini Flash)
- **Medium images (768×768):** 258 tokens (single tile)
- **Large images:** Automatically tiled - each 768×768 tile = 258 tokens
  - Example: 1536×1536 image = ~1,032 tokens (4 tiles)

**Recommendations:**
1. **For workshops/testing:** Use small optimized images (≤384px) - that's what our sample images are
2. **For production:** Consider the `media_resolution` parameter to control quality/cost
3. **For reuse:** Use the File API to upload once and reference in multiple prompts

**Show File API approach (code example):**
```python
from google import genai
from google.genai import types
import pathlib

client = genai.Client(api_key="YOUR_API_KEY")

# Upload image once
image_file = client.files.upload(
    path=pathlib.Path("sample-images/chart.png")
)

# Use in multiple prompts by referencing the URI
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[
        types.Part.from_uri(
            file_uri=image_file.uri,
            mime_type=image_file.mime_type
        ),
        "Extract data as JSON"
    ]
)
```

**Key talking point:**
"The File API caches your image, so subsequent uses are faster and more efficient."

---

## Key Talking Points Summary

Emphasize these concepts during the demonstration:

### 1. Natively Multimodal
"Gemini isn't a text model with vision bolted on - it's designed from the ground up to understand images and text together. No separate vision API needed."

### 2. Natural Language
"No special prompting syntax for images. Just upload and describe what you want in plain English."

### 3. Combinable with Other Features
"Multimodal works with everything else you've learned:
- System instructions
- Structured output (JSON schemas)
- Few-shot examples
- Grounding with search"

### 4. Token Awareness
"Images cost tokens. Small images (≤384px) are very affordable at 258 tokens. Large images get tiled and cost more. Always optimize for your use case."

### 5. Multiple Images Supported
"You can upload several images in one prompt. Useful for:
- Before/after comparisons
- Multiple chart analysis
- Design option evaluation
- Multi-page document processing"

---

## Common Questions

**Q: What image formats are supported?**
A: PNG, JPEG, WebP, and HEIC. Most common formats work fine.

**Q: What's the maximum image size?**
A: 20MB for the File API, 10MB for inline uploads. But remember - larger images cost more tokens.

**Q: Can I use video?**
A: Yes, Gemini supports video via the API. Check the latest documentation for details.

**Q: How accurate is image understanding?**
A: Very good for clear images with good lighting and contrast. Quality of input affects quality of output.

**Q: Can I upload PDFs?**
A: The File API supports PDF files. Each page is processed as an image.

---

## Live Demonstration Tips

1. **Use actual sample images** - Don't just describe the process, show real results
2. **Point and click deliberately** - Make sure everyone can follow the UI actions
3. **Read responses aloud** - Some participants may not see the screen clearly
4. **Show errors gracefully** - If something fails, explain why and retry
5. **Pace for note-taking** - Pause after key points so participants can capture important details

---

⏱️ **Time check:** You should be around 6-7 minutes at this point. Participants are now ready for hands-on practice.
