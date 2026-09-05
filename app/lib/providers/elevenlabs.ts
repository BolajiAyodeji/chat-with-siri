import { ElevenLabsClient } from "elevenlabs";
import type { NormalizedVoice } from "@/app/types/chat";
import type { SynthesizeOptions } from "./types";

// Fetch ElevenLabs' global preset voices and normalize them.
export async function getElevenLabsVoices(apiKey?: string): Promise<NormalizedVoice[]> {
  const elevenlabs = new ElevenLabsClient({ apiKey });
  const all = await elevenlabs.voices.getAll();

  return (all.voices ?? []).map((voice) => ({
    voice_id: voice.voice_id,
    name: voice.name ?? voice.voice_id,
    descriptor: voice.labels?.age,
    accent: voice.labels?.accent,
    gender: voice.labels?.gender
  }));
}

// Generate speech. Returns the SDK's audio stream, which is a valid Response body.
export async function elevenLabsSynthesize({
  apiKey,
  text,
  voice,
  stability,
  similarity
}: SynthesizeOptions) {
  const elevenlabs = new ElevenLabsClient({ apiKey });

  return elevenlabs.generate({
    voice,
    model_id: "eleven_turbo_v2",
    voice_settings: { stability, similarity_boost: similarity },
    text
    // stream: true,
  });
}
