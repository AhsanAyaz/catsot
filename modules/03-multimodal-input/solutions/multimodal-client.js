// ============================================
// MULTIMODAL GEMINI CLIENT
// Uses QuotaAwareAPI for workshop resilience
// ============================================
//
// This client demonstrates multimodal input (images + text),
// complementing the visual understanding exercises in this module.
//
// Key insight: Image size affects token cost.
// Images <=384px = 258 tokens (budget-friendly for testing).
//
// Usage:
//   import { analyzeImage, describeImage } from './multimodal-client.js';
//   const analysis = await analyzeImage(imageBase64, 'What is in this image?');
//
// ============================================

import { QuotaAwareAPI, createFromEnv } from '../../../infrastructure/quota-monitor.js';
import { readFileSync } from 'fs';
import { extname } from 'path';

// Initialize API with environment keys
let geminiAPI = null;

function getAPI() {
  if (!geminiAPI) {
    geminiAPI = createFromEnv({ verbose: false });
  }
  return geminiAPI;
}

/**
 * Convert file extension to MIME type.
 */
function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'image/png';
}

/**
 * Analyze an image with a custom prompt.
 * The core multimodal capability from Module 03.
 *
 * @param {string} imageBase64 - Base64-encoded image data
 * @param {string} prompt - Question or instruction about the image
 * @param {string} mimeType - Image MIME type (default: image/png)
 * @param {string} model - Model name, default 'gemini-2.0-flash-001'
 * @returns {Promise<string>} - Analysis text
 */
export async function analyzeImage(imageBase64, prompt, mimeType = 'image/png', model = 'gemini-2.0-flash-001') {
  const api = getAPI();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await api.call(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            inlineData: {
              mimeType,
              data: imageBase64
            }
          },
          { text: prompt }
        ]
      }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const result = await response.json();

  if (!result.candidates || result.candidates.length === 0) {
    throw new Error('No response generated');
  }

  return result.candidates[0].content.parts[0].text;
}

/**
 * Analyze an image file from disk.
 *
 * @param {string} filePath - Path to image file
 * @param {string} prompt - Question about the image
 * @returns {Promise<string>} - Analysis text
 */
export async function analyzeImageFile(filePath, prompt) {
  const imageBuffer = readFileSync(filePath);
  const imageBase64 = imageBuffer.toString('base64');
  const mimeType = getMimeType(filePath);

  return analyzeImage(imageBase64, prompt, mimeType);
}

/**
 * Analyze an image with structured JSON output.
 * Combines Module 02 (structured output) with Module 03 (multimodal).
 *
 * @param {string} imageBase64 - Base64-encoded image
 * @param {Object} schema - JSON Schema for output
 * @param {string} prompt - Analysis prompt
 * @param {string} mimeType - Image MIME type
 * @returns {Promise<Object>} - Structured analysis
 */
export async function analyzeImageStructured(imageBase64, schema, prompt, mimeType = 'image/png') {
  const api = getAPI();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent`;

  const response = await api.call(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            inlineData: {
              mimeType,
              data: imageBase64
            }
          },
          { text: prompt }
        ]
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const result = await response.json();

  if (!result.candidates || result.candidates.length === 0) {
    throw new Error('No response generated');
  }

  return JSON.parse(result.candidates[0].content.parts[0].text);
}

/**
 * Describe what's in an image.
 * Simple wrapper for common use case.
 *
 * @param {string} imageBase64 - Base64-encoded image
 * @param {string} mimeType - Image MIME type
 * @returns {Promise<string>} - Description text
 */
export async function describeImage(imageBase64, mimeType = 'image/png') {
  return analyzeImage(
    imageBase64,
    'Describe what you see in this image in detail.',
    mimeType
  );
}

/**
 * Extract text from an image (OCR).
 *
 * @param {string} imageBase64 - Base64-encoded image
 * @param {string} mimeType - Image MIME type
 * @returns {Promise<string>} - Extracted text
 */
export async function extractText(imageBase64, mimeType = 'image/png') {
  return analyzeImage(
    imageBase64,
    'Extract and return all text visible in this image. Preserve formatting if possible.',
    mimeType
  );
}

/**
 * Analyze a chart or graph.
 * One of the image types from Module 03 exercises.
 *
 * @param {string} imageBase64 - Base64-encoded chart image
 * @param {string} mimeType - Image MIME type
 * @returns {Promise<Object>} - Structured chart analysis
 */
export async function analyzeChart(imageBase64, mimeType = 'image/png') {
  const chartSchema = {
    type: 'object',
    description: 'Analysis of a chart or graph',
    properties: {
      chartType: {
        type: 'string',
        description: 'Type of chart (bar, line, pie, scatter, etc.)',
        enum: ['bar', 'line', 'pie', 'scatter', 'area', 'histogram', 'other']
      },
      title: {
        type: 'string',
        description: 'Chart title if visible'
      },
      xAxis: {
        type: 'string',
        description: 'X-axis label or description'
      },
      yAxis: {
        type: 'string',
        description: 'Y-axis label or description'
      },
      dataPoints: {
        type: 'array',
        description: 'Key data points or values visible',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            value: { type: 'string' }
          }
        }
      },
      insights: {
        type: 'array',
        description: 'Key insights from the data',
        items: { type: 'string' }
      }
    },
    required: ['chartType', 'insights']
  };

  return analyzeImageStructured(
    imageBase64,
    chartSchema,
    'Analyze this chart and extract key information.',
    mimeType
  );
}

/**
 * Analyze a UI mockup or screenshot.
 * Another image type from Module 03 exercises.
 *
 * @param {string} imageBase64 - Base64-encoded UI image
 * @param {string} mimeType - Image MIME type
 * @returns {Promise<Object>} - Structured UI analysis
 */
export async function analyzeUI(imageBase64, mimeType = 'image/png') {
  const uiSchema = {
    type: 'object',
    description: 'Analysis of a UI design or screenshot',
    properties: {
      appType: {
        type: 'string',
        description: 'Type of application (mobile app, website, desktop, etc.)'
      },
      screenPurpose: {
        type: 'string',
        description: 'Purpose of this screen (login, dashboard, settings, etc.)'
      },
      components: {
        type: 'array',
        description: 'UI components identified',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            description: { type: 'string' }
          }
        }
      },
      colorScheme: {
        type: 'string',
        description: 'Primary colors used'
      },
      suggestions: {
        type: 'array',
        description: 'Accessibility or UX improvement suggestions',
        items: { type: 'string' }
      }
    },
    required: ['appType', 'screenPurpose', 'components']
  };

  return analyzeImageStructured(
    imageBase64,
    uiSchema,
    'Analyze this UI design and identify components and patterns.',
    mimeType
  );
}

/**
 * Get current API usage statistics.
 */
export function getStats() {
  return getAPI().getStats();
}

/**
 * Print API usage statistics to console.
 */
export function printStats() {
  getAPI().printStats();
}

// ============================================
// Example usage (uncomment to run):
// ============================================
//
// import dotenv from 'dotenv';
// dotenv.config({ path: 'infrastructure/api-keys.env' });
//
// // Analyze an image file
// const description = await analyzeImageFile('./sample-images/chart.png', 'Explain this chart');
// console.log(description);
//
// // Analyze a chart with structured output
// const imageBuffer = readFileSync('./sample-images/chart.png');
// const chartAnalysis = await analyzeChart(imageBuffer.toString('base64'));
// console.log(JSON.stringify(chartAnalysis, null, 2));
//
// // Extract text from a code screenshot
// const codeBuffer = readFileSync('./sample-images/code-screenshot.png');
// const extractedCode = await extractText(codeBuffer.toString('base64'));
// console.log(extractedCode);
//
// printStats();
