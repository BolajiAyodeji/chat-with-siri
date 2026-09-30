"use server";

import { ElevenLabsClient } from "elevenlabs";
import {
  SpeechProviderId,
  getProviderDef
} from "@/app/utils/providers";
import { ProviderVoice } from "@/app/types/chat";

export default async function getVoices(
  provider: SpeechProviderId = "elevenlabs"
): Promise<ProviderVoice[]> {
  if (provider === "elevenlabs") {
    try {
      const elevenlabs = new ElevenLabsClient({
        // Use the API key from env in production
        // So the voices are available on first render.
        apiKey: process.env.ELEVENLABS_API_KEY
      });
      const allVoices = await elevenlabs.voices.getAll();
      return (allVoices.voices ?? []).map((v) => {
        const labels = [v.labels?.age, v.labels?.accent, v.labels?.gender]
          .filter(Boolean)
          .join(" ");
        return {
          // ElevenLabs is queried by voice name downstream, so use name as id.
          id: v.name ?? v.voice_id ?? "",
          name: v.name ?? "Unnamed",
          description: labels || undefined
        };
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Static-catalog providers (e.g. OpenAI).
  const def = getProviderDef(provider);
  return (def.voices ?? []).map((v) => ({ id: v.id, name: v.name }));
}
