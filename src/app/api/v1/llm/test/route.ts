import { NextRequest, NextResponse } from "next/server";
import { buildEndpoint, DEFAULT_LLM_BASE_URL, DEFAULT_LLM_MODEL } from "@/lib/llm";

export const runtime = "nodejs";

/**
 * Server-side probe used by the "Test connection" button.
 *
 * The browser performs the first probe itself so we test the exact path the app
 * uses. When that fails at the network level we cannot distinguish a wrong URL
 * from a CORS block, so this route repeats the same request from the server —
 * servers are not subject to CORS — and reports the real outcome.
 */
export async function POST(request: NextRequest) {
    let baseUrl: unknown;
    let apiKey: unknown;
    let model: unknown;

    try {
        const body = (await request.json()) as Record<string, unknown> | null;
        baseUrl = body?.baseUrl;
        apiKey = body?.apiKey;
        model = body?.model;
    } catch {
        return NextResponse.json(
            { kind: "http", status: 400, detail: "Invalid JSON body" },
            { status: 200 }
        );
    }

    if (typeof apiKey !== "string" || !apiKey.trim()) {
        return NextResponse.json(
            { kind: "http", status: 400, detail: "Missing apiKey" },
            { status: 200 }
        );
    }

    const resolvedModel =
        (typeof model === "string" && model.trim()) || DEFAULT_LLM_MODEL;
    const resolvedBase =
        (typeof baseUrl === "string" && baseUrl.trim()) || DEFAULT_LLM_BASE_URL;

    let endpoint: string;
    try {
        endpoint = buildEndpoint(resolvedBase);
        new URL(endpoint);
    } catch {
        return NextResponse.json(
            { kind: "network", detail: `Invalid Base URL: ${String(resolvedBase)}` },
            { status: 200 }
        );
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    headers.Authorization = `Bearer ${apiKey.trim()}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify({
                model: resolvedModel,
                messages: [{ role: "user", content: "ping" }],
                max_tokens: 1,
                stream: false,
            }),
            signal: controller.signal,
        });

        if (res.ok) {
            return NextResponse.json({ kind: "ok" }, { status: 200 });
        }

        let detail = "";
        try {
            const data = (await res.json()) as {
                error?: { message?: string };
                message?: string;
            };
            detail = data?.error?.message || data?.message || "";
        } catch {
            detail = (await res.text().catch(() => "")).slice(0, 300);
        }

        return NextResponse.json(
            { kind: "http", status: res.status, detail: detail || res.statusText },
            { status: 200 }
        );
    } catch (err) {
        const raw = (err as { message?: string })?.message || String(err);
        const timedOut = controller.signal.aborted;
        return NextResponse.json(
            { kind: "network", detail: timedOut ? "Request timed out after 20s" : raw },
            { status: 200 }
        );
    } finally {
        clearTimeout(timer);
    }
}
