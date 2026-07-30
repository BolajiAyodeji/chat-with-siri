import type { NormalizedVoice } from "@/app/types/chat";

// Canonical synthesis options shared by every provider.
// `stability` and `similarity` are 0–1 here (ElevenLabs' scale); the 60db
// provider rescales them to its own 0–100 range internally.
export interface SynthesizeOptions {
  apiKey?: string;
  text: string;
  voice: string;
  stability: number;
  similarity: number;
}

export const DEFAULT_STABILITY = 0.5;
export const DEFAULT_SIMILARITY = 0.5;

// Both providers return something that is a valid `Response` body:
// ElevenLabs yields a Node stream, 60db yields a decoded Buffer.
export type AudioBody = unknown;

export interface TtsProvider {
  getVoices(apiKey?: string): Promise<NormalizedVoice[]>;
  synthesize(options: SynthesizeOptions): Promise<AudioBody>;
}

export type { NormalizedVoice };
