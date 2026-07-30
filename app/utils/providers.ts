// Speech provider registry. Adding a provider should only require
// appending to this list and adding a case in /api/speech.

export type SpeechProviderId = "elevenlabs" | "openai";

export interface SpeechProviderStaticVoice {
  id: string;
  name: string;
}

export interface SpeechProviderDef {
  id: SpeechProviderId;
  label: string;
  // Default voice id when user first switches to this provider.
  defaultVoice: string;
  // Static voice catalog for providers whose voices are fixed (OpenAI TTS).
  // Omitted when voices are fetched dynamically (ElevenLabs).
  voices?: SpeechProviderStaticVoice[];
}

export const SPEECH_PROVIDERS: SpeechProviderDef[] = [
  {
    id: "elevenlabs",
    label: "ElevenLabs",
    // Matches the upstream default in app/chat/page.tsx.
    defaultVoice: "Myra"
  },
  {
    id: "openai",
    label: "OpenAI",
    defaultVoice: "alloy",
    voices: [
      { id: "alloy", name: "Alloy" },
      { id: "ash", name: "Ash" },
      { id: "ballad", name: "Ballad" },
      { id: "coral", name: "Coral" },
      { id: "echo", name: "Echo" },
      { id: "fable", name: "Fable" },
      { id: "nova", name: "Nova" },
      { id: "onyx", name: "Onyx" },
      { id: "sage", name: "Sage" },
      { id: "shimmer", name: "Shimmer" }
    ]
  }
];

export const DEFAULT_PROVIDER: SpeechProviderId = "elevenlabs";

export function getProviderDef(id: SpeechProviderId): SpeechProviderDef {
  const def = SPEECH_PROVIDERS.find((p) => p.id === id);
  if (!def) {
    throw new Error(`Unknown speech provider: ${id}`);
  }
  return def;
}
