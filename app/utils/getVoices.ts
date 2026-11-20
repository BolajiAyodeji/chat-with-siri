"use server";

import type { NormalizedVoice, Provider } from "@/app/types/chat";
import { getElevenLabsVoices } from "@/app/lib/providers/elevenlabs";
import { getSixtyDbVoices } from "@/app/lib/providers/sixtydb";

const isProduction = process.env.NEXT_PUBLIC_APP_MODE === "production";

// Fetch voices for the active provider, normalized to a shared shape.
// In production the user's own key is used; in development the env key is.
export default async function getVoices(
  provider: Provider = "elevenlabs",
  apiKey?: string
): Promise<NormalizedVoice[]> {
  try {
    if (provider === "sixtydb") {
      // /myvoices returns the *user's* voices, so it needs their key in prod.
      const key = isProduction ? apiKey : process.env.SIXTYDB_API_KEY;
      if (!key) return [];
      return await getSixtyDbVoices(key);
    }

    // ElevenLabs voices are global presets — load them from the env key so
    // they're available on first render regardless of mode.
    return await getElevenLabsVoices(process.env.ELEVENLABS_API_KEY);
  } catch (error) {
    console.error(error);
    return [];
  }
}
