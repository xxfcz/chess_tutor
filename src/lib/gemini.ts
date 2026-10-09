import { GoogleGenerativeAI, SchemaType, FunctionDeclaration } from "@google/generative-ai";

/**
 * Default Gemini model used across the app.
 *
 * `gemini-2.5-flash` is now restricted to accounts that used it before
 * (new keys get a 404 "no longer available to new users"), so the default
 * moved to `gemini-3.8-flash`. Override with NEXT_PUBLIC_GEMINI_MODEL if
 * Google renames things again — no code change needed.
 */
export const DEFAULT_GEMINI_MODEL =
    process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-3.8-flash";

/** Ordered fallback chain tried when the default model is unavailable. */
export const GEMINI_MODEL_FALLBACKS: string[] = [
    "gemini-3.8-flash",
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
];

export async function getAvailableModels(): Promise<string[]> {
    // Prioritize newer models
    return [
        "gemini-3.8-flash",
        "gemini-3.5-flash",
        "gemini-3.5-flash-lite",
        "gemini-3.1-flash-lite",
    ];
}

const evaluatePositionTool: FunctionDeclaration = {
    name: "evaluate_position",
    description: "Evaluates a chess position using the Stockfish engine to get the best move and score. Use this when the user asks for the best move, evaluation, or why a move is good/bad.",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            fen: {
                type: SchemaType.STRING,
                description: "The FEN string of the position to evaluate.",
            },
            depth: {
                type: SchemaType.NUMBER,
                description: "The search depth for the engine (default 15).",
            },
        },
        required: ["fen"],
    },
};

export function getGenAIModel(apiKey: string, modelName: string = DEFAULT_GEMINI_MODEL) {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
        model: modelName,
        tools: [{ functionDeclarations: [evaluatePositionTool] }],
    });
}

/**
 * True when the API rejected the model itself (404 / "no longer available" /
 * "not found"). Callers can use this to retry with a different model instead
 * of surfacing a generic failure.
 */
export function isModelUnavailableError(error: unknown): boolean {
    const message = (error as { message?: string })?.message || String(error);
    return (
        message.includes("404") ||
        /models\/[^\s]+ is not found/.test(message) ||
        message.includes("is no longer available") ||
        message.includes("is not supported for generateContent")
    );
}
