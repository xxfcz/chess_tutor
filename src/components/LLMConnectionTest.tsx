"use client";

import { useState } from "react";
import { CheckCircle, Loader2, Wifi, XCircle } from "lucide-react";
import { SupportedLanguage, Translations } from "@/lib/i18n/translations";
import { useTranslation } from "@/lib/i18n/useTranslation";
import {
    ConnectionTestResult,
    TestOutcome,
    testLLMConnection,
} from "@/lib/llmConnectionTest";

type ApiStrings = Translations["onboarding"]["api"];

interface LLMConnectionTestProps {
    baseUrl: string;
    apiKey: string;
    model: string;
    language: SupportedLanguage;
}

function pickMessage(outcome: TestOutcome, api: ApiStrings): string {
    switch (outcome) {
        case "ok":
            return api.testOk;
        case "auth":
            return api.testAuth;
        case "model":
            return api.testModel;
        case "quota":
            return api.testQuota;
        case "cors":
            return api.testCors;
        case "network":
            return api.testNetwork;
        case "error":
            return api.testError;
        case "missing":
        default:
            return api.testMissing;
    }
}

/**
 * "Test connection" affordance shared by the settings page and onboarding.
 * Verifies Base URL + API Key (+ Model) against whatever OpenAI-compatible
 * provider the user configured.
 */
export function LLMConnectionTest({
    baseUrl,
    apiKey,
    model,
    language,
}: LLMConnectionTestProps) {
    const t = useTranslation(language);
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState<ConnectionTestResult | null>(null);

    const runTest = async () => {
        setRunning(true);
        setResult(null);
        try {
            const outcome = await testLLMConnection({ baseUrl, apiKey, model });
            setResult(outcome);
        } catch (error) {
            setResult({
                ok: false,
                outcome: "error",
                message: t.onboarding.api.testError,
                detail: (error as { message?: string })?.message || String(error),
            });
        } finally {
            setRunning(false);
        }
    };

    const message = result ? pickMessage(result.outcome, t.onboarding.api) : null;

    return (
        <div className="space-y-2">
            <button
                type="button"
                onClick={runTest}
                disabled={running}
                data-testid="test-connection-button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
                {running ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <Wifi size={16} />
                )}
                {running ? t.onboarding.api.testing : t.onboarding.api.testConnection}
            </button>

            {result && message && (
                <div
                    data-testid="test-connection-result"
                    data-outcome={result.outcome}
                    className={`flex items-start gap-2 p-3 rounded-lg border text-sm ${
                        result.ok
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                            : result.outcome === "cors"
                              ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
                              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                    }`}
                >
                    {result.ok ? (
                        <CheckCircle size={16} className="mt-0.5 shrink-0" />
                    ) : (
                        <XCircle size={16} className="mt-0.5 shrink-0" />
                    )}
                    <div className="min-w-0">
                        <p className="font-medium">
                            {message}
                            {result.ok && result.latencyMs ? ` (${result.latencyMs} ms)` : ""}
                        </p>
                        {result.detail && (
                            <pre className="mt-1 text-xs whitespace-pre-wrap break-words font-mono opacity-80">
                                {result.detail}
                            </pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
