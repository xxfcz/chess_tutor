import { NextRequest, NextResponse } from 'next/server';
import {
  OPENING_TUTOR_SYSTEM_PROMPT,
  OPENING_TUTOR_TEMPERATURE,
  OPENING_TUTOR_MAX_TOKENS,
  generateFallbackExplanation,
} from '@/lib/server/openingTutorPrompt';
import { generateWithSystemInstruction } from '@/lib/llm';

export const runtime = 'nodejs';
export const maxDuration = 10; // 10 second timeout

/**
 * Opening Explanation API Endpoint
 * Generates educational explanations for chess moves using an LLM.
 *
 * The LLM provider is fully configurable via environment variables
 * (NEXT_PUBLIC_LLM_BASE_URL / LLM_API_KEY / NEXT_PUBLIC_LLM_MODEL, falling back
 * to the legacy NEXT_PUBLIC_GEMINI_* values). It speaks the OpenAI Chat
 * Completions protocol, so any third-party compatible endpoint works.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prompt,
      moveSan,
      category,
      theoreticalMoves,
      evalChange,
      bestMove,
    } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing prompt parameter' },
        { status: 400 }
      );
    }

    // Check for API key (server-side env; falls back to legacy GEMINI_API_KEY)
    const apiKey =
      process.env.LLM_API_KEY ||
      process.env.NEXT_PUBLIC_LLM_API_KEY ||
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('LLM API key not configured, using fallback explanation');
      const fallback = generateFallbackExplanation(
        category,
        moveSan,
        theoreticalMoves,
        evalChange,
        bestMove
      );
      return NextResponse.json({
        explanation: fallback,
        usedFallback: true,
      });
    }

    // Generate explanation via the configurable, OpenAI-compatible provider.
    const explanation = await generateWithSystemInstruction({
      apiKey,
      systemInstruction: OPENING_TUTOR_SYSTEM_PROMPT,
      prompt,
      maxTokens: OPENING_TUTOR_MAX_TOKENS,
      temperature: OPENING_TUTOR_TEMPERATURE,
    });

    if (!explanation || explanation.trim().length === 0) {
      // Empty response - use fallback
      const fallback = generateFallbackExplanation(
        category,
        moveSan,
        theoreticalMoves,
        evalChange,
        bestMove
      );
      return NextResponse.json({
        explanation: fallback,
        usedFallback: true,
      });
    }

    return NextResponse.json({
      explanation: explanation.trim(),
      usedFallback: false,
    });
  } catch (error) {
    console.error('LLM explanation error:', error);

    // Try to extract fallback params from request
    let fallbackExplanation = 'Unable to generate explanation at this time.';
    try {
      const body = await request.json();
      if (body.moveSan && body.category) {
        fallbackExplanation = generateFallbackExplanation(
          body.category,
          body.moveSan,
          body.theoreticalMoves || [],
          body.evalChange,
          body.bestMove
        );
      }
    } catch {
      // Ignore fallback generation errors
    }

    return NextResponse.json({
      explanation: fallbackExplanation,
      usedFallback: true,
      error: 'LLM request failed',
    });
  }
}
