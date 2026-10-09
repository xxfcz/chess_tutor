import { testLLMConnection } from "@/lib/llmConnectionTest";

type FetchInit = { method?: string; headers?: unknown; body?: string; signal?: unknown };

const PROXY = "/api/v1/llm/test";

function jsonResponse(body: unknown, status = 200) {
    return {
        ok: status >= 200 && status < 300,
        status,
        statusText: `status ${status}`,
        json: async () => body,
        text: async () => JSON.stringify(body),
    } as unknown as Response;
}

function installFetch(impl: (url: string, init?: FetchInit) => Promise<Response>) {
    global.fetch = jest.fn(impl as never) as typeof global.fetch;
}

/** Direct calls succeed, so the proxy must never be consulted. */
function neverProxy() {
    return async (url: string) => {
        if (url === PROXY) throw new Error("proxy must not be called");
        return jsonResponse({ choices: [{ message: { content: "" } }] });
    };
}

describe("testLLMConnection", () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
        jest.restoreAllMocks();
    });

    it("rejects early when no API key is provided", async () => {
        installFetch(neverProxy());
        const result = await testLLMConnection({ apiKey: "", baseUrl: "https://example.test/v1" });
        expect(result.ok).toBe(false);
        expect(result.outcome).toBe("missing");
    });

    it("rejects a malformed base URL without any network call", async () => {
        installFetch(neverProxy());
        const result = await testLLMConnection({ apiKey: "sk-test", baseUrl: "not a url" });
        expect(result.outcome).toBe("network");
        expect(result.detail).toContain("not a url");
    });

    it("reports success together with the measured latency", async () => {
        installFetch(neverProxy());
        const result = await testLLMConnection({
            apiKey: "sk-test",
            baseUrl: "https://example.test/v1",
        });
        expect(result.ok).toBe(true);
        expect(result.outcome).toBe("ok");
        expect(typeof result.latencyMs).toBe("number");
    });

    it("classifies 401/403 as an auth failure", async () => {
        for (const status of [401, 403]) {
            installFetch(async () =>
                jsonResponse({ error: { message: "Incorrect API key provided" } }, status)
            );
            const result = await testLLMConnection({
                apiKey: "sk-bad",
                baseUrl: "https://example.test/v1",
            });
            expect(result.ok).toBe(false);
            expect(result.outcome).toBe("auth");
            expect(result.detail).toContain(String(status));
        }
    });

    it("classifies 404 as a model/endpoint failure", async () => {
        installFetch(async () => jsonResponse({ error: { message: "unknown model" } }, 404));
        const result = await testLLMConnection({
            apiKey: "sk-test",
            baseUrl: "https://example.test/v1",
        });
        expect(result.outcome).toBe("model");
    });

    it("classifies 429 as quota/rate limiting", async () => {
        installFetch(async () => jsonResponse({ error: { message: "slow down" } }, 429));
        const result = await testLLMConnection({
            apiKey: "sk-test",
            baseUrl: "https://example.test/v1",
        });
        expect(result.outcome).toBe("quota");
    });

    it("detects CORS blocking when the browser fails but the server succeeds", async () => {
        installFetch(async (url: string) => {
            if (url === PROXY) return jsonResponse({ kind: "ok" });
            throw new TypeError("Failed to fetch");
        });
        const result = await testLLMConnection({
            apiKey: "sk-test",
            baseUrl: "https://example.test/v1",
        });
        expect(result.ok).toBe(false);
        expect(result.outcome).toBe("cors");
        expect(result.viaProxy).toBe(true);
    });

    it("reports a genuine network failure when both probes fail", async () => {
        installFetch(async (url: string) => {
            if (url === PROXY) return jsonResponse({ kind: "network", detail: "ENOTFOUND" });
            throw new TypeError("Failed to fetch");
        });
        const result = await testLLMConnection({
            apiKey: "sk-test",
            baseUrl: "https://example.test/v1",
        });
        expect(result.outcome).toBe("network");
    });

    it("surfaces the real credential error discovered via the server probe", async () => {
        installFetch(async (url: string) => {
            if (url === PROXY) {
                return jsonResponse({ kind: "http", status: 401, detail: "invalid key" });
            }
            throw new TypeError("Failed to fetch");
        });
        const result = await testLLMConnection({
            apiKey: "sk-bad",
            baseUrl: "https://example.test/v1",
        });
        expect(result.outcome).toBe("auth");
        expect(result.viaProxy).toBe(true);
    });

    it("appends /chat/completions and sends a minimal payload", async () => {
        const seen: { url: string; body: Record<string, unknown> }[] = [];
        installFetch(async (url: string, init?: FetchInit) => {
            seen.push({ url, body: JSON.parse((init?.body as string) ?? "{}") });
            return jsonResponse({ choices: [{ message: { content: "" } }] });
        });

        await testLLMConnection({
            apiKey: "sk-test",
            baseUrl: "https://example.test/v1",
            model: "my-model",
        });

        expect(seen).toHaveLength(1);
        expect(seen[0].url).toBe("https://example.test/v1/chat/completions");
        expect(seen[0].body.model).toBe("my-model");
        expect(seen[0].body.max_tokens).toBe(1);
    });

    it("does not duplicate /chat/completions when already present", async () => {
        const seen: string[] = [];
        installFetch(async (url: string) => {
            seen.push(url);
            return jsonResponse({ choices: [{ message: { content: "" } }] });
        });

        await testLLMConnection({
            apiKey: "sk-test",
            baseUrl: "https://example.test/v1/chat/completions",
        });

        expect(seen[0]).toBe("https://example.test/v1/chat/completions");
    });
});
