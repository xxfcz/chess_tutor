/**
 * Backwards-compatibility shim.
 *
 * The app used to depend directly on the Google Gemini SDK. It now talks to any
 * OpenAI-compatible provider via `./llm`. This file keeps the old public names
 * (`getGenAIModel`, `DEFAULT_GEMINI_MODEL`, …) working so existing imports and
 * tests need no changes, and re-exports the `ChatSession` type that a few files
 * previously imported from `@google/generative-ai`.
 */

export {
    getGenAIModel,
    DEFAULT_GEMINI_MODEL,
    GEMINI_MODEL_FALLBACKS,
    DEFAULT_LLM_BASE_URL,
    DEFAULT_LLM_MODEL,
    getAvailableModels,
    isModelUnavailableError,
    resolveLLMConfig,
    generateWithSystemInstruction,
    geminiHistoryToMessages,
} from "./llm";

export type {
    ChatSession,
    ChatResult,
    ChatMessage,
    ChatRole,
    ChatStartOptions,
    GeminiHistoryEntry,
    GenerativeModel,
    LLMConfig,
} from "./llm";
