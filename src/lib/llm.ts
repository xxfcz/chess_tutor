/**
 * LLM client (OpenAI-compatible Chat Completions).
 *
 * The app previously called Google Gemini directly. To support custom
 * third-party providers — OpenAI, OpenRouter, Together, local proxies
 * (Ollama / LM Studio / vLLM), Gemini-to-OpenAI shims, etc. — we now speak the
 * OpenAI Chat Completions protocol, which is the de-facto standard.
 *
 * Configuration (base URL, API key, model) is resolved with this precedence:
 *   1. explicit arguments
 *   2. browser localStorage (`llm_base_url` / `llm_api_key` / `llm_model`)
 *   3. environment variables (`NEXT_PUBLIC_LLM_*`, legacy `NEXT_PUBLIC_GEMINI_*`)
 *   4. sensible defaults (OpenAI-compatible)
 *
 * The exported surface deliberately mirrors the small slice of the Gemini SDK
 * the app uses (`getGenAIModel` + `startChat` / `sendMessage` /
 * `generateContent` / `response.text()`) so call sites barely change.
 */

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
    role: ChatRole;
    content: string;
}

export interface ChatResult {
    response: { text(): string };
}

export interface ChatSession {
    sendMessage(prompt: string): Promise<ChatResult>;
}

export interface ChatStartOptions {
    history?: GeminiHistoryEntry[];
    generationConfig?: { maxOutputTokens?: number; temperature?: number };
    systemInstruction?: string;
}

export interface GeminiHistoryEntry {
    role: "user" | "model";
    parts: { text?: string }[];
}

export interface GenerativeModel {
    startChat(opts?: ChatStartOptions): ChatSession;
    generateContent(prompt: string): Promise<ChatResult>;
}

export interface LLMConfig {
    baseUrl: string;
    apiKey: string;
    model: string;
}

export const DEFAULT_LLM_BASE_URL = "https://api.openai.com/v1";
export const DEFAULT_LLM_MODEL = "gpt-4o-mini";

// Backwards-compatible aliases used across the codebase / tests.
export const DEFAULT_GEMINI_MODEL = DEFAULT_LLM_MODEL;
export const GEMINI_MODEL_FALLBACKS: string[] = [DEFAULT_LLM_MODEL];

function safeLocalStorage(): Storage | null {
    try {
        return typeof window !== "undefined" ? window.localStorage : null;
    } catch {
        return null;
    }
}

/**
 * Resolve the effective LLM configuration from arguments, localStorage and
 * environment variables. Falls back to the legacy `gemini_*` keys/values so
 * existing deployments keep working.
 */
export function resolveLLMConfig(opts?: {
    apiKey?: string;
    model?: string;
    baseUrl?: string;
}): LLMConfig {
    const ls = safeLocalStorage();

    const localKey = ls?.getItem("llm_api_key") || ls?.getItem("gemini_api_key") || undefined;
    const localBase = ls?.getItem("llm_base_url") || undefined;
    const localModel = ls?.getItem("llm_model") || undefined;

    const apiKey =
        opts?.apiKey ||
        localKey ||
        process.env.NEXT_PUBLIC_LLM_API_KEY ||
        process.env.LLM_API_KEY ||
        process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        "";

    const baseUrl =
        opts?.baseUrl || localBase || process.env.NEXT_PUBLIC_LLM_BASE_URL || DEFAULT_LLM_BASE_URL;

    const model =
        opts?.model ||
        localModel ||
        process.env.NEXT_PUBLIC_LLM_MODEL ||
        process.env.NEXT_PUBLIC_GEMINI_MODEL ||
        DEFAULT_LLM_MODEL;

    return { baseUrl, apiKey, model };
}

/**
 * Build the Chat Completions endpoint from a configurable base URL.
 * Accepts either a bare base (`https://api.openai.com/v1`) or a full
 * `.../chat/completions` URL (idempotent).
 */
function buildEndpoint(baseUrl: string): string {
    let url = (baseUrl || "").replace(/\/+$/, "");
    if (!url) url = DEFAULT_LLM_BASE_URL;
    if (/\/chat\/completions$/i.test(url)) return url;
    return `${url}/chat/completions`;
}

/**
 * Convert a Gemini-style history into OpenAI messages. In every call site the
 * first `user` turn is the system/role prompt and the first `model` turn is the
 * model's acknowledgement, so leading `user` turns (before the first `model`
 * turn) are concatenated into the `system` message.
 */
export function geminiHistoryToMessages(
    history: GeminiHistoryEntry[] = []
): { system: string; messages: ChatMessage[] } {
    const systemParts: string[] = [];
    const messages: ChatMessage[] = [];

    let seenModel = false;
    for (const entry of history) {
        const text = (entry.parts || []).map((p) => p.text ?? "").join("\n").trim();
        if (!seenModel && entry.role === "user") {
            if (text) systemParts.push(text);
            continue;
        }
        if (entry.role === "model") seenModel = true;
        messages.push({
            role: entry.role === "model" ? "assistant" : "user",
            content: text,
        });
    }

    return { system: systemParts.join("\n\n"), messages };
}

async function callChatCompletions(
    config: LLMConfig,
    messages: ChatMessage[],
    system: string,
    maxTokens?: number,
    temperature?: number
): Promise<string> {
    const endpoint = buildEndpoint(config.baseUrl);

    const payload: Record<string, unknown> = {
        model: config.model,
        messages: system ? [{ role: "system", content: system }, ...messages] : messages,
        stream: false,
    };
    if (maxTokens != null) payload.max_tokens = maxTokens;
    if (temperature != null) payload.temperature = temperature;

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (config.apiKey) headers.Authorization = `Bearer ${config.apiKey}`;

    let res: Response;
    try {
        res = await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
    } catch (err) {
        const message = (err as { message?: string })?.message || String(err);
        if (/Failed to fetch|NetworkError|ECONNREFUSED|ENOTFOUND|fetch failed|aborted/i.test(message)) {
            throw new Error(
                "Network error: unable to reach the LLM endpoint. Check the Base URL and your connection."
            );
        }
        throw new Error(`Network error: ${message}`);
    }

    if (!res.ok) {
        let detail = "";
        try {
            const data = (await res.json()) as { error?: { message?: string } };
            detail = data?.error?.message || "";
        } catch {
            try {
                detail = (await res.text()).slice(0, 300);
            } catch {
                /* ignore */
            }
        }
        if (!detail) detail = res.statusText;
        throw new Error(`LLM API error (${res.status}): ${detail}`);
    }

    const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
    };
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === "string" ? content : "";
}

/**
 * Drop-in replacement for the previous Gemini `getGenAIModel`. Returns an object
 * whose methods mirror the Gemini SDK surface used by the app.
 */
export function getGenAIModel(
    apiKey?: string,
    modelName?: string,
    baseUrl?: string
): GenerativeModel {
    const config = resolveLLMConfig({ apiKey, model: modelName, baseUrl });

    return {
        startChat(opts?: ChatStartOptions) {
            const { system, messages } = geminiHistoryToMessages(opts?.history);
            const sessionMessages: ChatMessage[] = [...messages];
            const maxTokens = opts?.generationConfig?.maxOutputTokens;
            const temperature = opts?.generationConfig?.temperature;
            const sessionSystem = (opts?.systemInstruction || system).trim();

            return {
                async sendMessage(prompt: string): Promise<ChatResult> {
                    sessionMessages.push({ role: "user", content: prompt });
                    const text = await callChatCompletions(
                        config,
                        sessionMessages,
                        sessionSystem,
                        maxTokens,
                        temperature
                    );
                    sessionMessages.push({ role: "assistant", content: text });
                    return { response: { text: () => text } };
                },
            };
        },
        async generateContent(prompt: string): Promise<ChatResult> {
            const text = await callChatCompletions(
                config,
                [{ role: "user", content: prompt }],
                ""
            );
            return { response: { text: () => text } };
        },
    };
}

/**
 * Convenience for server routes that build a request with an explicit system
 * instruction (previously `GoogleGenerativeAI` + `systemInstruction`).
 */
export async function generateWithSystemInstruction(opts: {
    apiKey?: string;
    model?: string;
    baseUrl?: string;
    systemInstruction: string;
    prompt: string;
    maxTokens?: number;
    temperature?: number;
}): Promise<string> {
    const config = resolveLLMConfig(opts);
    return callChatCompletions(
        config,
        [{ role: "user", content: opts.prompt }],
        opts.systemInstruction,
        opts.maxTokens,
        opts.temperature
    );
}

export async function getAvailableModels(): Promise<string[]> {
    return [DEFAULT_LLM_MODEL, "gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"];
}

export function isModelUnavailableError(error: unknown): boolean {
    const message = (error as { message?: string })?.message || String(error);
    return (
        /\b404\b/.test(message) ||
        /model.*(not found|does not exist)/i.test(message) ||
        /is no longer available/i.test(message) ||
        /is not supported/i.test(message)
    );
}
