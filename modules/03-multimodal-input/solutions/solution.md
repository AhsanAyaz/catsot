# Module 03: Multimodal Input - Complete Solution

This document provides example prompts, expected responses, and code patterns for the multimodal input exercises.

---

## Chart Analysis Example

### Image Description
**File:** `sample-images/chart.png`
**Type:** Bar chart showing quarterly revenue
**Optimized:** Yes (≤384px for 258 token cost)

---

### Prompt 1: Descriptive Analysis

**Prompt:**
```
What data does this chart show? Summarize the key trends.
```

**Expected Response:**
```
This bar chart displays quarterly revenue data over four quarters (Q1 through Q4).

Key findings:
- Q1: $50,000 in revenue
- Q2: $68,000 in revenue (36% increase from Q1)
- Q3: $85,000 in revenue (peak performance, 25% increase from Q2)
- Q4: $78,000 in revenue (8% decline from Q3 but still 56% above Q1)

Overall trend: Strong upward trajectory from Q1 to Q3 with slight decline in Q4.
The data suggests seasonal strength in mid-year with a minor year-end pullback.
```

**What this demonstrates:**
- Gemini can read chart values accurately
- Identifies trends and calculates percentages
- Provides business context and insights

---

### Prompt 2: Structured Data Extraction

**Prompt:**
```
Extract the data from this chart as JSON with this format:
{
  "quarters": ["Q1", "Q2", ...],
  "revenue": [50000, ...]
}
```

**Expected Response:**
```json
{
  "quarters": ["Q1", "Q2", "Q3", "Q4"],
  "revenue": [50000, 68000, 85000, 78000]
}
```

**What this demonstrates:**
- Multimodal + structured output combination
- Reliable data extraction from visual sources
- No manual transcription needed

---

### Advanced Prompt: Business Insights

**Prompt:**
```
Based on this revenue chart, provide a JSON analysis with:
1. Total annual revenue
2. Average quarterly revenue
3. Best performing quarter
4. Growth rate Q1 to Q3

Use this schema:
{
  "total_revenue": number,
  "average_quarterly": number,
  "top_quarter": string,
  "growth_rate_percent": number
}
```

**Expected Response:**
```json
{
  "total_revenue": 281000,
  "average_quarterly": 70250,
  "top_quarter": "Q3",
  "growth_rate_percent": 70
}
```

**What this demonstrates:**
- Gemini can perform calculations on visual data
- Complex analysis from simple image input
- Structured output ensures consistent format

---

## Code Screenshot Analysis Example

### Image Description
**File:** `sample-images/code-screenshot.png`
**Type:** Python function for calculating discounts
**Content:** Code snippet with syntax highlighting

---

### Prompt 1: Code Explanation

**Prompt:**
```
Explain what this code does step by step. Then identify any potential bugs or improvements.
```

**Expected Response:**
```
## What This Code Does

This Python function `calculate_discount` determines the final price after applying
a customer-type-based discount:

Step-by-step:
1. Takes two parameters: `price` (original amount) and `customer_type` (category)
2. Checks customer type using if/elif statements
3. Applies discount based on type:
   - 'premium': 20% discount (multiplies by 0.80)
   - 'regular': 10% discount (multiplies by 0.90)
   - 'new': 5% discount (multiplies by 0.95)
4. Returns the discounted price

## Potential Improvements

1. **Input Validation**
   - No check for negative prices
   - No handling of None or invalid customer types
   - Should validate that price is a number

2. **Code Structure**
   - Replace if/elif chain with a dictionary lookup
   - More maintainable and easier to add new customer types

3. **Type Hints**
   - Add type annotations for better code clarity
   - Example: `def calculate_discount(price: float, customer_type: str) -> float:`

4. **Documentation**
   - Missing docstring explaining purpose and parameters
   - Should document expected input values

5. **Edge Cases**
   - What happens if customer_type doesn't match any condition?
   - Currently returns original price (implicit) - should be explicit

## Improved Version

```python
DISCOUNT_RATES = {
    'premium': 0.20,
    'regular': 0.10,
    'new': 0.05
}

def calculate_discount(price: float, customer_type: str) -> float:
    """
    Calculate discounted price based on customer type.

    Args:
        price: Original price (must be positive)
        customer_type: One of 'premium', 'regular', or 'new'

    Returns:
        Final price after applying discount

    Raises:
        ValueError: If price is negative or customer_type is invalid
    """
    if price < 0:
        raise ValueError("Price must be positive")

    if customer_type not in DISCOUNT_RATES:
        raise ValueError(f"Invalid customer type: {customer_type}")

    discount_rate = DISCOUNT_RATES[customer_type]
    return price * (1 - discount_rate)
```
```

**What this demonstrates:**
- Gemini can read and understand code from images
- Provides detailed step-by-step explanations
- Identifies bugs and suggests improvements
- Generates improved code examples

---

### Prompt 2: Generate Tests

**Prompt:**
```
Based on this code, write unit tests using pytest.
```

**Expected Response:**
```python
import pytest
from discount import calculate_discount

def test_premium_discount():
    """Test premium customer receives 20% discount"""
    assert calculate_discount(100, 'premium') == 80

def test_regular_discount():
    """Test regular customer receives 10% discount"""
    assert calculate_discount(100, 'regular') == 90

def test_new_discount():
    """Test new customer receives 5% discount"""
    assert calculate_discount(100, 'new') == 95

def test_negative_price():
    """Test that negative prices raise ValueError"""
    with pytest.raises(ValueError):
        calculate_discount(-100, 'premium')

def test_invalid_customer_type():
    """Test that invalid customer types raise ValueError"""
    with pytest.raises(ValueError):
        calculate_discount(100, 'invalid')

def test_zero_price():
    """Test edge case of zero price"""
    assert calculate_discount(0, 'premium') == 0

def test_decimal_prices():
    """Test that decimal prices work correctly"""
    assert calculate_discount(99.99, 'regular') == pytest.approx(89.99, 0.01)
```

**What this demonstrates:**
- Test generation from visual code input
- Comprehensive test coverage suggestions
- Edge case identification

---

## UI Mockup Analysis Example

### Image Description
**File:** `sample-images/ui-mockup.png`
**Type:** Mobile app login screen wireframe
**Content:** UI elements, layout, and interactions

---

### Prompt 1: UI Description

**Prompt:**
```
Describe this user interface. What is its purpose? List all UI elements you can identify.
```

**Expected Response:**
```
## UI Purpose
This is a mobile app login screen designed for user authentication.

## UI Elements Identified

**Header:**
- App logo/icon positioned at the top center
- Likely serves as branding and visual anchor

**Input Fields:**
1. Email/username input field
   - Text input with placeholder text
   - Icon (envelope or user icon) on the left
2. Password input field
   - Secured text input (password masking)
   - Icon (lock) on the left
   - Possible show/hide toggle on the right

**Actions:**
- Primary "Login" button (prominent, likely colored)
- "Forgot password?" link/button (secondary, smaller text)
- "Sign up" or "Create account" link at the bottom

**Layout:**
- Vertical stack layout
- Centered alignment
- Consistent spacing between elements
- Follows standard mobile UI patterns

## User Flow
1. User enters email and password
2. Taps "Login" button to authenticate
3. Alternative paths: forgot password or sign up for new account
```

**What this demonstrates:**
- Detailed UI component identification
- Understanding of user flow and purpose
- Recognition of standard UI patterns

---

### Prompt 2: Design Critique

**Prompt:**
```
Suggest 3 improvements to this design from a UX perspective.
```

**Expected Response:**
```
## Suggested UX Improvements

### 1. Add Social Login Options
**Current:** Only email/password login
**Improvement:** Include "Continue with Google" and "Continue with Apple" buttons
**Benefit:**
- Reduces friction (users don't need to remember another password)
- Faster onboarding for new users
- Industry standard for modern apps

### 2. Password Visibility Toggle
**Current:** Password field likely doesn't show visibility toggle clearly
**Improvement:** Add eye icon to show/hide password
**Benefit:**
- Reduces login errors from typos
- Better accessibility
- Standard UX pattern users expect

### 3. Biometric Authentication Option
**Current:** Manual login only
**Improvement:** Add fingerprint/Face ID option
**Benefit:**
- Much faster for returning users
- Improved security (biometric > memorized passwords)
- Better mobile-first experience

### Additional Recommendations

**4. Loading State Indicator**
Add spinner or progress indicator on the login button during authentication

**5. Error Messaging**
Include space for inline error messages below each input field

**6. Accessibility Improvements**
- Ensure sufficient color contrast (WCAG AA minimum)
- Larger touch targets (minimum 44×44 points)
- Screen reader labels for all interactive elements

**7. Remember Me Option**
Checkbox to keep user logged in on this device
```

**What this demonstrates:**
- UX analysis and critique capabilities
- Understanding of modern design patterns
- Accessibility awareness

---

### Prompt 3: Generate Implementation Code

**Prompt:**
```
Generate React component code to implement this login screen.
```

**Expected Response:**
```jsx
import React, { useState } from 'react';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call would go here
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="logo-container">
        <img src="/logo.png" alt="App Logo" />
      </div>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <a href="/forgot-password" className="forgot-link">
          Forgot password?
        </a>
      </form>

      <div className="signup-section">
        <span>Don't have an account? </span>
        <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}

export default LoginScreen;
```

**What this demonstrates:**
- Code generation from visual mockups
- Functional implementation with state management
- Accessibility considerations (aria-label, semantic HTML)

---

## API Code for Multimodal (Python)

Complete working example using the Gemini API with the File API approach:

```python
from google import genai
from google.genai import types
import pathlib

# Initialize client
client = genai.Client(api_key="YOUR_API_KEY")

# Upload image using File API (recommended for reuse)
image_file = client.files.upload(
    path=pathlib.Path("sample-images/chart.png")
)

print(f"Uploaded file URI: {image_file.uri}")
print(f"MIME type: {image_file.mime_type}")

# Generate content with multimodal prompt
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[
        types.Part.from_uri(
            file_uri=image_file.uri,
            mime_type=image_file.mime_type
        ),
        "Extract the data from this chart as JSON"
    ]
)

print(response.text)

# Reuse the same file in another prompt (shows File API benefit)
response2 = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[
        types.Part.from_uri(
            file_uri=image_file.uri,
            mime_type=image_file.mime_type
        ),
        "Summarize the trends in this data"
    ]
)

print(response2.text)
```

### Alternative: Inline Data Approach (for small images)

```python
import base64
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

# Read and encode image
with open("sample-images/chart.png", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

# Generate content with inline image
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[
        types.Part.from_inline_data(
            inline_data=types.Blob(
                mime_type="image/png",
                data=image_data
            )
        ),
        "What does this chart show?"
    ]
)

print(response.text)
```

**When to use each approach:**
- **File API:** When reusing images across multiple prompts (more efficient)
- **Inline data:** For one-off image analysis or very small images

---

## Key Learnings

### 1. Natively Multimodal
Gemini processes images and text together in a single model call. No separate vision API or special handling required.

### 2. No Special Syntax
Just upload the image and write natural language prompts. Gemini understands the context automatically.

### 3. Combinable Features
Multimodal works seamlessly with:
- Structured output (JSON schemas)
- System instructions
- Few-shot examples
- Grounding with Google Search
- Function calling

### 4. Token Costs Matter
- Images ≤384px: 258 tokens (~$0.00003 with Flash)
- Larger images: Tiled at 768×768 per tile = 258 tokens each
- Example: 1536×1536 image = ~1,032 tokens (4 tiles)
- Always optimize image size for your use case

### 5. File API for Production
Upload images once, reference by URI in multiple prompts:
- Saves upload time
- Better performance through caching
- More efficient for repeated use

### 6. Multiple Images Supported
You can upload several images in one prompt for:
- Before/after comparisons
- Multi-document analysis
- Design option evaluation
- Cross-referencing visuals

---

## Common Issues & Solutions

### Issue: "Image upload not working"
**Causes:**
- File format not supported (use PNG, JPEG, WebP)
- File size too large (>10MB for inline, >20MB for File API)
- Network connectivity issues

**Solutions:**
- Check file format and convert if needed
- Compress or resize large images
- Try refreshing AI Studio
- Use File API instead of inline upload

---

### Issue: "Response doesn't describe image accurately"
**Causes:**
- Vague or ambiguous prompt
- Poor image quality (blurry, dark, low contrast)
- Image contains text in non-Latin scripts

**Solutions:**
- Be specific: Instead of "describe this", ask "What data values are shown in this bar chart?"
- Improve image quality: good lighting, clear text, high contrast
- For charts, try structured extraction: "Extract as JSON"
- For code, specify the language: "Explain this Python code"

---

### Issue: "Token usage is very high"
**Causes:**
- Large image dimensions cause tiling
- Multiple large images in one prompt
- Unoptimized screenshots or photos

**Solutions:**
- Resize images to ≤384px for workshop/testing
- Use image editing tools to optimize dimensions
- Consider `media_resolution` parameter for quality/cost control
- Use File API to reuse images across prompts

---

### Issue: "Can I use video?"
**Answer:** Yes, Gemini supports video input via the API. Use the File API to upload video files and reference them in prompts. Each frame may be sampled as an image for analysis. Check the latest documentation for video-specific features and token costs.

---

### Issue: "How do I handle PDFs?"
**Answer:** The File API supports PDF files. Each page is processed as an image. For text-heavy PDFs, consider extracting text first for better token efficiency.

---

## Real-World Use Cases

### 1. Data Extraction
**Use case:** Digitizing charts and graphs from reports
**Example prompt:**
```
Extract all data points from this chart as a JSON array with labels and values.
Ensure numeric values are parsed as numbers, not strings.
```

**Applications:**
- Converting legacy reports to databases
- Automating data entry from scanned documents
- Creating datasets from research papers

---

### 2. Code Documentation
**Use case:** Generating documentation from code screenshots
**Example prompt:**
```
Generate comprehensive documentation for this code including:
1. Function signature
2. Purpose and behavior
3. Parameters and return values
4. Example usage
5. Edge cases to consider
```

**Applications:**
- Documenting legacy codebases
- Creating API documentation
- Training materials from code examples

---

### 3. UI/UX Review
**Use case:** Design analysis and critique
**Example prompt:**
```
Analyze this UI design for accessibility issues. Check:
1. Color contrast ratios
2. Touch target sizes
3. Text readability
4. Navigation clarity
5. WCAG compliance concerns
```

**Applications:**
- Automated design review
- Accessibility audits
- Design system consistency checking

---

### 4. Accessibility (Alt Text)
**Use case:** Generating alt text for images
**Example prompt:**
```
Generate descriptive alt text for this image suitable for screen readers.
Focus on conveying the essential information and context.
Keep it concise (under 125 characters if possible).
```

**Applications:**
- Automated alt text generation for websites
- Accessibility compliance for content management systems
- Image description for visually impaired users

---

### 5. Content Moderation
**Use case:** Analyzing images for policy compliance
**Example prompt:**
```
Analyze this image for content moderation. Check for:
1. Inappropriate content
2. Violence or graphic imagery
3. Copyright concerns (brand logos, trademarks)
4. Safety issues

Return as JSON:
{
  "safe": boolean,
  "concerns": [array of issues found],
  "confidence": 0-100
}
```

**Applications:**
- User-generated content platforms
- Social media moderation
- E-commerce product image review

---

### 6. Receipt/Invoice Processing
**Use case:** Extracting data from receipts
**Example prompt:**
```
Extract information from this receipt as JSON:
{
  "merchant": string,
  "date": "YYYY-MM-DD",
  "total": number,
  "items": [
    {"description": string, "price": number}
  ],
  "tax": number
}
```

**Applications:**
- Expense tracking apps
- Accounting automation
- Tax preparation tools

---

### 7. Diagram Understanding
**Use case:** Explaining technical diagrams
**Example prompt:**
```
Explain this system architecture diagram. Include:
1. Components and their roles
2. Data flow between components
3. External dependencies
4. Potential bottlenecks or single points of failure
```

**Applications:**
- Technical documentation
- Onboarding new developers
- Architecture reviews

---

## Next Steps

### Combine with Module 02 (Structured Output)
Try creating JSON schemas for your multimodal prompts to ensure consistent data extraction:

```python
# Define schema for chart extraction
chart_schema = {
    "type": "object",
    "properties": {
        "chart_type": {
            "type": "string",
            "description": "Type of chart (bar, line, pie, etc.)"
        },
        "title": {
            "type": "string",
            "description": "Chart title or main topic"
        },
        "data_points": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "label": {"type": "string"},
                    "value": {"type": "number"}
                }
            }
        },
        "insights": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Key trends or insights from the data"
        }
    }
}

# Use with multimodal prompt
config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_json_schema=chart_schema
)

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[
        types.Part.from_uri(file_uri=image_file.uri, mime_type=image_file.mime_type),
        "Analyze this chart and extract structured data"
    ],
    config=config
)
```

### Experiment in Part 2
Use multimodal capabilities in your Part 2 projects:
- Analyze facial expressions (combine with MediaPipe)
- Process gesture screenshots
- Analyze game state from visual inputs
- Generate visual feedback based on camera input

---

**Congratulations!** You now understand how to use Gemini's multimodal capabilities to analyze images, extract data, and build powerful visual AI applications.
