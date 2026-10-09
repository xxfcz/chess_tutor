/**
 * Helper utilities for API key management
 */

export type ApiKeySource = 'localStorage' | 'env' | 'none';

export interface ApiKeyInfo {
  key: string | null;
  source: ApiKeySource;
  anonymized: string;
}

/** Storage keys for the configurable LLM provider. */
export const STORAGE_KEY_API_KEY = "llm_api_key";
export const STORAGE_KEY_BASE_URL = "llm_base_url";
export const STORAGE_KEY_MODEL = "llm_model";

/** Legacy key kept for backwards compatibility with existing installs. */
export const STORAGE_KEY_LEGACY_API_KEY = "gemini_api_key";

/**
 * Read the stored LLM API key, preferring the new `llm_api_key` key and
 * falling back to the legacy `gemini_api_key`.
 */
export function getStoredApiKey(): string | null {
  if (typeof window === "undefined") return null;
  const key = localStorage.getItem(STORAGE_KEY_API_KEY) || localStorage.getItem(STORAGE_KEY_LEGACY_API_KEY);
  return key && key.trim() ? key : null;
}

/**
 * Anonymize an API key by showing only first 2 and last 2 characters
 * Example: "AIzaSyABC...XYZ123" becomes "AI...23"
 */
export function anonymizeApiKey(key: string | null): string {
  if (!key || key.length < 8) {
    return '••••••••';
  }

  const first2 = key.substring(0, 2);
  const last2 = key.substring(key.length - 2);
  return `${first2}${'•'.repeat(6)}${last2}`;
}

/**
 * Get the current API key and its source
 */
export function getApiKeyInfo(): ApiKeyInfo {
  // Check localStorage first (user-set key takes precedence)
  if (typeof window !== 'undefined') {
    const storedKey = getStoredApiKey();
    if (storedKey) {
      return {
        key: storedKey,
        source: 'localStorage',
        anonymized: anonymizeApiKey(storedKey),
      };
    }
  }

  // Check environment variable (fallback)
  const envKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (envKey && envKey.trim()) {
    return {
      key: envKey,
      source: 'env',
      anonymized: anonymizeApiKey(envKey),
    };
  }

  // No key found
  return {
    key: null,
    source: 'none',
    anonymized: '••••••••',
  };
}

/**
 * Get user-friendly description of API key source
 */
export function getApiKeySourceDescription(source: ApiKeySource): string {
  switch (source) {
    case 'localStorage':
      return 'User Settings (localStorage)';
    case 'env':
      return 'Environment Variable (.env)';
    case 'none':
      return 'Not configured';
  }
}
