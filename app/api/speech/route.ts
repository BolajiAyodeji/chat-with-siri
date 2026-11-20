import type { Provider } from "@/app/types/chat";
import { elevenLabsSynthesize } from "@/app/lib/providers/elevenlabs";
import { sixtyDbSynthesize } from "@/app/lib/providers/sixtydb";
import { DEFAULT_STABILITY, DEFAULT_SIMILARITY } from "@/app/lib/providers/types";

const isProduction = process.env.NEXT_PUBLIC_APP_MODE === "production";

export async function POST(req: Request) {
  const {
    provider = "elevenlabs",
    apiKey,
    message,
    voice
  }: { provider?: Provider; apiKey?: string; message: string; voice: string } = await req.json();

  // Pick the right key: the user's in production, the env key in development.
  const key = isProduction
    ? apiKey
    : provider === "sixtydb"
      ? process.env.SIXTYDB_API_KEY
      : process.env.ELEVENLABS_API_KEY;

  const options = {
    apiKey: key,
    text: message,
    voice,
    stability: DEFAULT_STABILITY,
    similarity: DEFAULT_SIMILARITY
  };

  try {
    const audio =
      provider === "sixtydb"
        ? await sixtyDbSynthesize(options)
        : await elevenLabsSynthesize(options);

    return new Response(audio as any, {
      headers: { "Content-Type": "audio/mpeg" }
    });
  } catch (error: any) {
    console.error(error);
    return Response.json(error?.message ?? "Speech synthesis failed.", {
      status: error?.statusCode ?? 500
    });
  }
}
