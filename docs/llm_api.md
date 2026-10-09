# LLM Tutor API (v1)

Die mobile App soll dieselben Tutor-Funktionen wie das Web nutzen, ohne eigene Prompts zu pflegen. Die API stellt deshalb zwei Endpunkte bereit:

> **Provider-agnostisch:** Die App spricht das **OpenAI-Compatible Chat-Completions-Protokoll**. Jeder kompatible Dienst funktioniert – OpenAI, OpenRouter, Together, lokale LLMs (Ollama / LM Studio / vLLM) oder ein Gemini-zu-OpenAI-Proxy.
>
> Konfiguration (Base URL, API-Key, Modell) wird aufgelöst aus: Argumente → `localStorage` (`llm_base_url` / `llm_api_key` / `llm_model`) → Umgebungsvariablen (`NEXT_PUBLIC_LLM_*`, Legacy `NEXT_PUBLIC_GEMINI_*`) → Defaults (`https://api.openai.com/v1`, `gpt-4o-mini`).

## `GET /api/v1/personalities`
- Liefert die verfügbaren, vordefinierten Tutor-Charaktere.
- Response: `{ personalities: [{ id, name, description, image }] }`

## `POST /api/v1/llm/chat`
- Baut den System Prompt serverseitig (auf Basis der ausgewählten Personality) und sendet die Anfrage an den konfigurierten LLM (OpenAI-Compatible).
- Body:
  - `apiKey` (**string**, Pflicht): Nutzer-Key (Server erzeugt den System Prompt, nicht die App).
  - `personalityId` (**string**, Pflicht): Eine `id` aus `/api/v1/personalities`.
  - `language` (**string**, Pflicht): Sprache, z.B. `en`, `de`, `fr` (muss zu `SupportedLanguage` passen).
  - `playerColor` (**"white" | "black"**, Pflicht): Spielerfarbe des Users; der Tutor übernimmt die Gegenseite.
  - `message` (**string**, Pflicht): Nutzereingabe oder systemischer Trigger-Text.
  - `context` (optional): Zusätzliche Positions- und Analyseinfos, damit das LLM konkrete Hinweise geben kann.
    - **Move-Exchange-Modus** (`{ type: "move_exchange", ... }`):
      - `userMoveSan`, `tutorMoveSan`: SAN-Notation der letzten Züge.
      - `fenBeforeUser`, `fenAfterUser`, `fenAfterTutor`: Stellungs-FENs (vor/nach den Zügen).
      - `preEvaluation`, `postEvaluation`: Stockfish-Bewertungen (Score/Mate aus Weiß-Perspektive).
      - `openingCandidates`: Liste möglicher Eröffnungen (`{ name, eco? }`).
      - `missedTactics`: String-Liste zu erkannten taktischen Themen.
    - **Allgemeiner Modus**: `{ currentFen?, evaluation?, openingCandidates?, missedTactics? }`
  - `history` (optional): Bisherige Unterhaltung `{ role: "user" | "model", text }[]`; der Server ergänzt immer den System Prompt.
  - `modelName` (optional): Overrides des Default-Modells.
  - `baseUrl` (optional): OpenAI-Compatible Base-URL für diese Anfrage (sonst Umgebungs-/Storage-Wert).
- Response: `{ reply: string }`

### Warum serverseitiger System Prompt?
- Nur vordefinierte Charaktere sind erlaubt (keine generischen Chats).
- Der Prompt erzwingt die Tutor-Rolle (Gegner + Coach), Sprache und Verhaltensregeln.
- Die App übergibt nur Zustand (FEN, Bewertungen, Taktiken) und User-Text; der Server kapselt die Instruktionen.

## `POST /api/v1/llm/opening-explanation`
- Generiert eine Bildungs-Erklärung für eine Eröffnungs-Zug mittels LLM.
- Body: `prompt`, `moveSan`, `category`, `theoreticalMoves`, `evalChange`, `bestMove`.
- Konfiguration via `LLM_API_KEY` / `NEXT_PUBLIC_LLM_API_KEY` (Fallback `GEMINI_API_KEY` / `NEXT_PUBLIC_GEMINI_API_KEY`) und `NEXT_PUBLIC_LLM_BASE_URL` / `NEXT_PUBLIC_LLM_MODEL`.
- Response: `{ explanation: string, usedFallback: boolean }` (bei fehlendem Key oder Fehler wird eine lokale Fallback-Erklärung geliefert).
