import type { NormalizedVoice } from "@/app/types/chat";
import type { SynthesizeOptions } from "./types";

const SIXTYDB_BASE_URL = "https://api.60db.ai";

// Build an error that carries a `statusCode` so the route + client error
// handling stays identical to the ElevenLabs SDK's error shape.
function sixtyDbError(message: string, statusCode: number) {
  return Object.assign(new Error(message), { statusCode });
}

// Fetch the user's 60db voices (GET /myvoices) and normalize them.
export async function getSixtyDbVoices(apiKey?: string): Promise<NormalizedVoice[]> {
  const res = await fetch(`${SIXTYDB_BASE_URL}/myvoices`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });

  if (!res.ok) {
    throw sixtyDbError("Failed to fetch 60db voices.", res.status);
  }

  const json = await res.json();

  return (json.data ?? []).map((voice: any) => ({
    voice_id: voice.voice_id,
    name: voice.name ?? voice.voice_id,
    descriptor: voice.labels?.language_name,
    accent: voice.labels?.accent,
    gender: voice.labels?.gender
  }));
}

// Generate speech (POST /tts-synthesize). 60db returns JSON with base64 audio,
// so we decode it to a Buffer and let the route serve it as audio/mpeg —
// keeping the client playback pipeline identical to ElevenLabs.
export async function sixtyDbSynthesize({
  apiKey,
  text,
  voice,
  stability,
  similarity
}: SynthesizeOptions) {
  const res = await fetch(`${SIXTYDB_BASE_URL}/tts-synthesize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      // `voice` may be empty (user has no voices) → 60db uses its system default.
      ...(voice ? { voice_id: voice } : {}),
      // Canonical 0–1 settings rescaled to 60db's 0–100 range.
      stability: Math.round(stability * 100),
      similarity: Math.round(similarity * 100),
      output_format: "mp3"
    })
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success || !json?.audio_base64) {
    throw sixtyDbError(json?.message ?? "60db synthesis failed.", res.status || 500);
  }

  return Buffer.from(json.audio_base64, "base64");
}
