import { generateSpeech } from "@speech-sdk/core";
import { createElevenLabs } from "@speech-sdk/core/elevenlabs";
import { createOpenAI } from "@speech-sdk/core/openai";
import { DEFAULT_PROVIDER, SpeechProviderId } from "@/app/utils/providers";

const isProduction = process.env.NEXT_PUBLIC_APP_MODE === "production";

function resolveModel(provider: SpeechProviderId, apiKey: string | undefined) {
  // In production, the client-supplied key is used (BYO-key flow).
  // In dev, the server falls back to env so the live demo works without keys.
  switch (provider) {
    case "openai": {
      const key = isProduction ? apiKey : process.env.OPENAI_API_KEY;
      return createOpenAI({ apiKey: key })("tts-1");
    }
    case "elevenlabs": {
      const key = isProduction ? apiKey : process.env.ELEVENLABS_API_KEY;
      // eleven_turbo_v2 matches the upstream model choice for latency parity.
      return createElevenLabs({ apiKey: key })("eleven_turbo_v2");
    }
    default: {
      // Exhaustiveness check — TS will flag new providers that forget a case.
      const _never: never = provider;
      throw new Error(`Unknown speech provider: ${_never}`);
    }
  }
}

export async function POST(req: Request) {
  const { apiKey, message, voice, provider } = await req.json();
  const resolvedProvider: SpeechProviderId = provider ?? DEFAULT_PROVIDER;

  try {
    const model = resolveModel(resolvedProvider, apiKey);
    const result = await generateSpeech({
      model,
      text: message,
      voice
    });

    return new Response(result.audio.uint8Array as any, {
      headers: { "Content-Type": result.audio.mediaType }
    });
  } catch (error: any) {
    console.error(error);
    // @speech-sdk/core throws ApiError with .statusCode for upstream HTTP failures.
    const status =
      typeof error?.statusCode === "number" ? error.statusCode : 500;
    return Response.json(
      { error: error?.message ?? "Speech generation failed" },
      { status }
    );
  }
}
