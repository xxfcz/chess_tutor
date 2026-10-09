/**
 * Connection test for a custom OpenAI-compatible LLM provider.
 *
 * The point of this test is to answer two separate questions, because mixing
 * them produces useless errors:
 *   1. Are the Base URL / API Key / Model actually valid?
 *   2. Can *this browser* call the provider?
 *
 * Most real usage in this app calls the provider directly from the browser, so
 * the first probe mirrors that exact path. If that probe fails with a network
 * level error we cannot tell a typo'd URL apart from a browser CORS block, so
 * we retry once through our own server (`/api/v1/llm/test`), which is not
 * subject to CORS. That lets us report either "your key is wrong" or "your key
 * is fine but the browser is blocked" instead of a misleading "network error".
 */

import { buildEndpoint, DEFAULT_LLM_BASE_URL, DEFAULT_LLM_MODEL } from "./llm";

export type TestOutcome =
    | "ok"
    | "auth"
    | "model"
    | "quota"
    | "cors"
    | "network"
    | "error"
    | "missing";

export interface ConnectionTestResult {
    ok: boolean;
    outcome: TestOutcome;
    /** Short user-facing summary (English fallback; UI localizes by outcome). */
    message: string;
    /** Raw provider detail worth showing in a monospace block. */
    detail?: string;
    latencyMs?: number;
    /** True when the result was confirmed through our own server instead of the browser. */
    viaProxy?: boolean;
}

export interface ConnectionTestInput {
    baseUrl?: string;
    apiKey?: string;
    model?: string;
}

type ProbeResult =
    | { kind: "ok"; latencyMs: number }
    | { kind: "http"; status: number; detail: string }
    | { kind: "network"; detail: string };

const TIMEOUT_MS = 20_000;

/** Minimal request: 1 output token keeps the cost of a test effectively zero. */
function buildProbeBody(model: string): string {
    return JSON.stringify({
        model,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1,
        stream: false,
    });
}

function authHeaders(apiKey: string): Record<string, string> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
    return headers;
}

async function readErrorDetail(res: Response): Promise<string> {
    try {
        const data = (await res.json()) as { error?: { message?: string }; message?: string };
        const detail = data?.error?.message || data?.message;
        if (detail) return detail;
    } catch {
        /* fall through to text */
    }
    try {
        const text = await res.text();
        if (text) return text.slice(0, 300);
    } catch {
        /* ignore */
    }
    return res.statusText || "";
}

/** Turn an HTTP failure into a meaningful outcome. */
function classifyHttp(status: number, detail: string): ConnectionTestResult {
    if (status === 401 || status === 403) {
        return {
            ok: false,
            outcome: "auth",
            message: "The provider rejected the API key.",
            detail: `HTTP ${status}: ${detail}`.trim(),
        };
    }
    if (status === 404) {
        return {
            ok: false,
            outcome: "model",
            message: "Endpoint or model not found.",
            detail: `HTTP 404: ${detail}`.trim(),
        };
    }
    if (status === 429) {
        return {
            ok: false,
            outcome: "quota",
            message: "Rate limited or out of quota.",
            detail: `HTTP 429: ${detail}`.trim(),
        };
    }
    return {
        ok: false,
        outcome: "error",
        message: "The provider returned an error.",
        detail: `HTTP ${status}: ${detail}`.trim(),
    };
}

/** Probe the provider straight from the browser — the same path real calls use. */
async function probeDirect(input: Required<ConnectionTestInput>): Promise<ProbeResult> {
    const endpoint = buildEndpoint(input.baseUrl);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const startedAt = Date.now();

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: authHeaders(input.apiKey),
            body: buildProbeBody(input.model),
            signal: controller.signal,
        });

        if (res.ok) return { kind: "ok", latencyMs: Date.now() - startedAt };
        return { kind: "http", status: res.status, detail: await readErrorDetail(res) };
    } catch (err) {
        const raw = (err as { message?: string })?.message || String(err);
        if (controller.signal.aborted) {
            return { kind: "network", detail: `Request timed out after ${TIMEOUT_MS / 1000}s` };
        }
        return { kind: "network", detail: raw };
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Ask our own server to probe the provider. Servers are not subject to CORS,
 * so this isolates credential problems from browser-level blocking.
 */
async function probeViaServer(input: Required<ConnectionTestInput>): Promise<ProbeResult> {
    try {
        const res = await fetch("/api/v1/llm/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });

        const payload = (await res.json().catch(() => null)) as
            | { kind?: string; status?: number; detail?: string }
            | null;

        if (!res.ok || !payload) {
            return { kind: "network", detail: payload?.detail || `Proxy failed (HTTP ${res.status})` };
        }

        if (payload.kind === "ok") return { kind: "ok", latencyMs: 0 };
        if (payload.kind === "http") {
            return { kind: "http", status: payload.status ?? 0, detail: payload.detail ?? "" };
        }
        return { kind: "network", detail: payload.detail || "Proxy could not reach the provider" };
    } catch (err) {
        return {
            kind: "network",
            detail: (err as { message?: string })?.message || String(err),
        };
    }
}

/**
 * Validate Base URL + API Key (+ Model) against the configured provider.
 */
export async function testLLMConnection(
    input: ConnectionTestInput
): Promise<ConnectionTestResult> {
    const apiKey = (input.apiKey || "").trim();
    const baseUrl = (input.baseUrl || "").trim() || DEFAULT_LLM_BASE_URL;
    const model = (input.model || "").trim() || DEFAULT_LLM_MODEL;

    if (!apiKey) {
        return {
            ok: false,
            outcome: "missing",
            message: "Enter an API key first.",
        };
    }

    // Basic shape check so a malformed URL gives an immediate, obvious error.
    try {
        new URL(baseUrl);
    } catch {
        return {
            ok: false,
            outcome: "network",
            message: "The Base URL is not a valid URL.",
            detail: baseUrl,
        };
    }

    const direct = await probeDirect({ baseUrl, apiKey, model });

    if (direct.kind === "ok") {
        return {
            ok: true,
            outcome: "ok",
            message: "Connection successful.",
            latencyMs: direct.latencyMs,
        };
    }

    // A real HTTP status already tells us what is wrong — no need to retry.
    if (direct.kind === "http") {
        return classifyHttp(direct.status, direct.detail);
    }

    // Network-level failure: could be a bad URL, or the browser being blocked
    // by CORS. Ask the server to disambiguate.
    const viaServer = await probeViaServer({ baseUrl, apiKey, model });

    if (viaServer.kind === "ok") {
        return {
            ok: false,
            outcome: "cors",
            message:
                "The URL and API key are valid, but the provider blocks direct requests from the browser (CORS).",
            detail: `Browser: ${direct.detail}`,
            viaProxy: true,
        };
    }

    if (viaServer.kind === "http") {
        const result = classifyHttp(viaServer.status, viaServer.detail);
        return { ...result, viaProxy: true };
    }

    return {
        ok: false,
        outcome: "network",
        message: "Could not reach the provider. Check the Base URL and your network.",
        detail: `Browser: ${direct.detail}\nServer: ${viaServer.detail}`,
    };
}
