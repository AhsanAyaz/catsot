# Screenshot Capture Checklist

This checklist documents all 17 screenshots needed for the workshop demonstration files.

## Capture Settings

- **Browser window:** 1280x800 or similar
- **Zoom:** 100%
- **Format:** PNG
- **Target file size:** 50-150KB after optimization (use pngquant, optipng, or similar)
- **Timing:** Capture within 3 days of workshop to reflect current UI

## Module 01: AI Studio Exploration (7 screenshots)

| # | Filename | What to Show | Save To |
|---|----------|--------------|---------|
| 1 | `01-landing-page.png` | AI Studio landing page after sign-in, showing main interface | `modules/01-ai-studio-exploration/screenshots/` |
| 2 | `02-prompt-type-selection.png` | Prompt type selection dialog (Freeform, Chat, etc.) | `modules/01-ai-studio-exploration/screenshots/` |
| 3 | `03-empty-prompt-editor.png` | Empty freeform prompt editor showing model dropdown | `modules/01-ai-studio-exploration/screenshots/` |
| 4 | `04-prompt-entered.png` | Prompt field with text: "List 3 benefits of using AI in developer workflows" | `modules/01-ai-studio-exploration/screenshots/` |
| 5 | `05-response-with-tokens.png` | Response panel showing generated response with token count and timing | `modules/01-ai-studio-exploration/screenshots/` |
| 6 | `06-get-code-panel.png` | Get code panel open with Python example visible | `modules/01-ai-studio-exploration/screenshots/` |
| 7 | `07-modified-prompt.png` | Modified prompt asking for JSON format with the response | `modules/01-ai-studio-exploration/screenshots/` |

### Module 01 Capture Sequence

1. Sign in to AI Studio (aistudio.google.com)
2. Capture landing page (screenshot 1)
3. Click "New prompt" - capture the type selection dialog (screenshot 2)
4. Select "Freeform prompt" - capture empty editor (screenshot 3)
5. Type: "List 3 benefits of using AI in developer workflows" - capture (screenshot 4)
6. Click Run - wait for response - capture with token count visible (screenshot 5)
7. Click "Get code" - capture the code panel (screenshot 6)
8. Modify prompt to: "List 3 benefits of using AI in developer workflows. Format the output as JSON." - Run - capture (screenshot 7)

---

## Module 02: Structured Output (3 screenshots)

| # | Filename | What to Show | Save To |
|---|----------|--------------|---------|
| 8 | `01-text-response.png` | Unstructured text response from prompt "Analyze this product: iPhone 15 Pro" | `modules/02-structured-output/screenshots/` |
| 9 | `02-run-settings-json.png` | Run settings panel with JSON mode selected and schema editor visible | `modules/02-structured-output/screenshots/` |
| 10 | `03-json-response.png` | Clean JSON response matching the product schema | `modules/02-structured-output/screenshots/` |

### Module 02 Capture Sequence

1. Create new freeform prompt
2. Enter: "Analyze this product: iPhone 15 Pro" (no JSON mode)
3. Run - capture the text response (screenshot 8)
4. Open Run settings - enable JSON mode - show schema editor (screenshot 9)
5. Paste product schema (from module docs) and run - capture JSON response (screenshot 10)

**Product Schema to use:**
```json
{
  "type": "object",
  "properties": {
    "product_name": {"type": "string", "description": "The name of the product"},
    "category": {"type": "string", "description": "Product category (electronics, clothing, food, etc.)"},
    "price_estimate": {"type": "number", "description": "Estimated price in USD"},
    "features": {"type": "array", "description": "List of key product features", "items": {"type": "string"}},
    "target_audience": {"type": "string", "description": "Who this product is designed for"}
  },
  "required": ["product_name", "category", "price_estimate", "features"]
}
```

---

## Module 04: Context Engineering (3 screenshots)

| # | Filename | What to Show | Save To |
|---|----------|--------------|---------|
| 11 | `01-unstructured-response.png` | Response to unstructured prompt: "Review this code and suggest improvements: def calc(a,b): return a+b" | `modules/04-context-engineering/screenshots/` |
| 12 | `02-system-instructions.png` | System instructions panel with code review assistant role text | `modules/04-context-engineering/screenshots/` |
| 13 | `03-few-shot-prompt.png` | Few-shot prompt with examples showing consistent formatted output | `modules/04-context-engineering/screenshots/` |

### Module 04 Capture Sequence

1. Create new freeform prompt
2. Enter: "Review this code and suggest improvements: def calc(a,b): return a+b"
3. Run - capture response (screenshot 11)
4. Open System Instructions - enter: "You are a code review assistant. Provide constructive feedback on code quality, focusing on readability, best practices, and potential bugs. Keep feedback concise and actionable."
5. Capture the system instructions panel (screenshot 12)
6. Clear prompt - enter few-shot examples with structured format:
   ```
   Example 1:
   Code: def process(data): return data * 2
   Feedback:
   - Function name 'process' is too generic. Use 'double_value' instead.
   - Missing type hints. Add: def double_value(data: int) -> int
   - Missing docstring.

   Example 2:
   Code: def calculate_total(prices: list[float]) -> float: return sum(prices)
   Feedback:
   - Good descriptive name ✓
   - Type hints present ✓
   - Consider adding docstring explaining purpose
   - Handle empty list case: if not prices: return 0.0

   Now review this code:
   <code>
   def calc(a, b):
       return a + b
   </code>
   ```
7. Run - capture the consistent formatted response (screenshot 13)

---

## Module 05: Grounding with Search (4 screenshots)

| # | Filename | What to Show | Save To |
|---|----------|--------------|---------|
| 14 | `01-non-grounded.png` | Response to "Who won Euro 2024?" WITHOUT grounding (shows knowledge cutoff) | `modules/05-grounding-search/screenshots/` |
| 15 | `02-tools-panel.png` | Tools panel with Google Search grounding toggle enabled | `modules/05-grounding-search/screenshots/` |
| 16 | `03-grounded-response.png` | Grounded response to same question with citations visible | `modules/05-grounding-search/screenshots/` |
| 17 | `04-metadata-panel.png` | Grounding metadata panel showing search queries and sources | `modules/05-grounding-search/screenshots/` |

### Module 05 Capture Sequence

1. Create new freeform prompt
2. Enter: "Who won Euro 2024?"
3. Ensure grounding is OFF
4. Run - capture response showing knowledge cutoff limitation (screenshot 14)
5. Open Tools panel - enable Google Search grounding (screenshot 15)
6. Run same prompt again - capture grounded response with citations (screenshot 16)
7. Expand grounding metadata/details section - capture (screenshot 17)

---

## Verification Checklist

After capturing all screenshots, verify:

- [ ] All 17 files exist in correct directories
- [ ] All filenames match exactly (01-landing-page.png, etc.)
- [ ] All files are PNG format
- [ ] All files are under 200KB (optimize if larger)
- [ ] UI elements are clearly visible and readable
- [ ] No personal information visible in screenshots
- [ ] Screenshots reflect current AI Studio UI (January 2026)

## Post-Capture Optimization

If screenshots are too large, optimize with:

```bash
# Using pngquant (lossy but high quality)
pngquant --quality=65-80 --ext .png --force *.png

# Using optipng (lossless)
optipng -o7 *.png
```

Target: 50-150KB per screenshot for fast loading in documentation.
