/** Humanizer filter — makes AI responses sound warmer, less robotic */

const FILLER_PHRASES = [
  "Oh, ",
  "You know, ",
  "Well now, ",
  "Let me tell you, ",
  "Here's the thing — ",
  "I'll be honest, ",
];

const WARMTH_ENDINGS = [
  " 🍽️",
  " Let's make it happen!",
  " That's what we do at Nanny's.",
  " We got you covered.",
  " Can't wait to hear more!",
];

/**
 * Light humanization pass on LLM output.
 * - Occasionally prepends a filler phrase
 * - Breaks overly long sentences
 * - Adds warmth to short responses
 */
export function humanize(text: string): string {
  if (!text || text.length < 20) return text;

  let result = text;

  // 30% chance: prepend a warm filler if response starts formally
  if (Math.random() < 0.3 && /^(Here|Based|I would|The|For|Our)/.test(result)) {
    const filler = FILLER_PHRASES[Math.floor(Math.random() * FILLER_PHRASES.length)];
    result = filler + result.charAt(0).toLowerCase() + result.slice(1);
  }

  // For short responses (under 100 chars), add a warm ending
  if (result.length < 100 && Math.random() < 0.4) {
    const ending = WARMTH_ENDINGS[Math.floor(Math.random() * WARMTH_ENDINGS.length)];
    if (!result.endsWith("!") && !result.endsWith("?")) {
      result = result.replace(/\.?\s*$/, ".") + ending;
    }
  }

  return result;
}
