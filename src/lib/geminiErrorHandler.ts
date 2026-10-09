/**
 * Centralized error handler for Gemini API errors
 */

export interface GeminiErrorInfo {
  isQuotaError: boolean;
  isRateLimitError: boolean;
  /** The requested model was rejected (404 / retired / unsupported). */
  isModelError: boolean;
  userMessage: string;
  technicalMessage: string;
  retryAfterSeconds?: number;
}

/**
 * Parse a Gemini API error and extract useful information
 */
export function parseGeminiError(error: any): GeminiErrorInfo {
  const errorMessage = error?.message || error?.toString() || 'Unknown error';

  // Check for quota exceeded (429 error)
  const isQuotaError = errorMessage.includes('quota') ||
                       errorMessage.includes('429') ||
                       errorMessage.includes('exceeded your current quota');

  // Check for rate limit errors
  const isRateLimitError = errorMessage.includes('rate limit') ||
                           errorMessage.includes('429');

  // Check for model errors: retired / renamed / not available to this key
  // e.g. "models/gemini-2.5-flash is no longer available to new users"
  const isModelError = errorMessage.includes('404') &&
                       (errorMessage.includes('model') || errorMessage.includes('models/')) ||
                       errorMessage.includes('is no longer available') ||
                       errorMessage.includes('is not found') ||
                       errorMessage.includes('not supported for generateContent');

  // Extract retry delay if available
  let retryAfterSeconds: number | undefined;
  const retryMatch = errorMessage.match(/retry in (\d+(?:\.\d+)?)s/);
  if (retryMatch) {
    retryAfterSeconds = Math.ceil(parseFloat(retryMatch[1]));
  }

  // Generate user-friendly message
  let userMessage: string;

  if (isQuotaError) {
    if (errorMessage.includes('free_tier')) {
      userMessage = 'You have reached the daily limit for your free API key. Please upgrade to a paid plan or wait until tomorrow to continue.';
    } else {
      userMessage = 'You have exceeded your API quota. Please check your billing details or wait before trying again.';
    }
  } else if (isRateLimitError) {
    userMessage = retryAfterSeconds
      ? `You're sending requests too quickly. Please wait ${retryAfterSeconds} seconds before trying again.`
      : 'You\'re sending requests too quickly. Please wait a moment before trying again.';
  } else if (isModelError) {
    // Extract the suggested replacement from Google's message when present
    const suggested = errorMessage.match(/use models\/([^\s]+)/)?.[1];
    userMessage = suggested
      ? `The AI model configured for this app is no longer available to your API key. Google suggests using "${suggested}". Set NEXT_PUBLIC_GEMINI_MODEL=${suggested} and restart the dev server.`
      : 'The AI model configured for this app is no longer available to your API key. Please update the model name (NEXT_PUBLIC_GEMINI_MODEL) and restart the dev server.';
  } else if (errorMessage.includes('API key')) {
    userMessage = 'Your API key appears to be invalid. Please check your settings.';
  } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    userMessage = 'Network error. Please check your internet connection and try again.';
  } else {
    userMessage = 'An error occurred while communicating with the AI. Please try again.';
  }

  return {
    isQuotaError,
    isRateLimitError,
    isModelError,
    userMessage,
    technicalMessage: errorMessage,
    retryAfterSeconds,
  };
}

/**
 * Check if an error is a Gemini API error
 */
export function isGeminiError(error: any): boolean {
  const message = error?.message || error?.toString() || '';
  return message.includes('GoogleGenerativeAI') ||
         message.includes('generativelanguage.googleapis.com') ||
         message.includes('Gemini');
}
