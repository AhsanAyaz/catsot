# Module 03: Multimodal Input

**Duration:** 20 minutes
**Prerequisites:** Completion of Module 01 (AI Studio basics)

## Learning Objectives

By the end of this module, you will be able to:

- Understand multimodal capabilities of Gemini (combining vision and language)
- Upload images to AI Studio for analysis
- Write effective prompts that combine image and text context
- Recognize token cost considerations for images
- Apply multimodal input to real-world use cases

## Overview

Modern AI models like Gemini are **natively multimodal** - they can understand both images and text together in a single conversation. This unlocks powerful capabilities:

- **Data extraction:** Convert charts and graphs to structured data
- **Code review:** Explain code from screenshots
- **Design analysis:** Describe and critique user interfaces
- **Content generation:** Create alt text for accessibility
- **Visual understanding:** Analyze photos, diagrams, and mockups

Unlike older approaches that required separate "vision" models, Gemini handles images and text seamlessly in the same API call with no special syntax required.

## Why Multimodal Matters

Many real-world AI applications need to work with visual information:

- A customer support bot analyzing product photos
- A documentation tool generating descriptions from code screenshots
- A data analysis tool extracting numbers from charts
- An accessibility tool creating alt text for images
- A design tool suggesting UI/UX improvements

This module teaches you how to build these capabilities using Gemini's multimodal features.

## Token Cost Awareness

**Important:** Images consume tokens based on their size. Understanding token costs helps you build efficient applications.

**Token usage by image size:**
- Images ≤384px (width or height): **258 tokens**
- Larger images: Automatically tiled, with each 768×768 tile costing 258 tokens
- Example: A 1536×1536 image uses ~1,032 tokens (4 tiles)

**Recommendations for this workshop:**
- Use small, optimized images (≤384px) for learning and testing
- The sample images provided are already optimized
- For production apps, consider the `media_resolution` parameter to control quality/cost tradeoff

**Why this matters:** A single high-resolution photo could cost as much as thousands of text tokens. Always optimize images for your use case.

See RESEARCH.md for detailed token cost analysis and the File API approach for reusing images across multiple prompts.

## Module Contents

This module includes:

1. **demonstration.md** - Instructor walkthrough of image upload and multimodal prompting
2. **exercise.md** - Hands-on practice analyzing different image types
3. **sample-images/** - Pre-optimized images for chart, code, and UI analysis
4. **solutions/** - Complete examples with expected outputs

## Getting Started

1. Open [aistudio.google.com](https://aistudio.google.com)
2. Create a new prompt
3. Look for the image upload button (paperclip or image icon)
4. Follow along with the demonstration

## Next Steps

After completing this module:
- You'll combine multimodal with structured output (from Module 02) for extracting structured data from images
- You'll use images as context for building richer AI applications in Part 2
- You'll understand how to optimize image inputs for production use

---

⏱️ **Duration:** 20 minutes (with 3-minute buffer)
