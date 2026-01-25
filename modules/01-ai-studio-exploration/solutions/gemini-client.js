// ============================================
// GEMINI API CLIENT - AI Studio Module
// Uses QuotaAwareAPI for workshop resilience
// ============================================
//
// This client demonstrates making Gemini API calls from code,
// complementing the AI Studio UI exploration in this module.
//
// Why QuotaAwareAPI? With 40 participants at the workshop,
// a single API key exhausts quickly (15 RPM free tier).
// Multiple keys with automatic rotation ensure availability.
//
// Usage:
//   import { generateText, listModels } from './gemini-client.js';
//   const response = await generateText('Tell me about Stockholm');
//
// ============================================

import { QuotaAwareAPI, createFromEnv } from '../../../infrastructure/quota-monitor.js';

// Initialize API with environment keys
let geminiAPI = null;

function getAPI() {
  if (!geminiAPI) {
    geminiAPI = createFromEnv({ verbose: false });
  }
  return geminiAPI;
}

/**
 * Generate text using Gemini API (basic prompt).
 * This mirrors what you do in AI Studio's prompt interface.
 *
 * @param {string} prompt - The text prompt
 * @param {string} model - Model name, default 'gemini-2.0-flash'
 * @returns {Promise<string>} - Generated text
 */
export async function generateText(prompt, model = 'gemini-2.0-flash') {
  const api = getAPI();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await api.call(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
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
 * Generate text with system instruction.
 * This mirrors AI Studio's system instruction panel.
 *
 * @param {string} systemInstruction - System-level guidance
 * @param {string} userPrompt - User's prompt
 * @param {string} model - Model name
 * @returns {Promise<string>} - Generated text
 */
export async function generateWithSystem(systemInstruction, userPrompt, model = 'gemini-2.0-flash') {
  const api = getAPI();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await api.call(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ parts: [{ text: userPrompt }] }]
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
 * List available Gemini models.
 *
 * @returns {Promise<Object[]>} - Array of model info
 */
export async function listModels() {
  const api = getAPI();
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models';

  const response = await api.call(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const result = await response.json();
  return result.models || [];
}

/**
 * Get current API usage statistics.
 * Useful for monitoring during the workshop.
 *
 * @returns {Object} - Stats object
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
// const response = await generateText('What makes Stockholm special?');
// console.log(response);
//
// const withSystem = await generateWithSystem(
//   'You are a helpful tour guide who loves Swedish culture.',
//   'Recommend a lunch spot near Fotografiska.'
// );
// console.log(withSystem);
//
// printStats();
