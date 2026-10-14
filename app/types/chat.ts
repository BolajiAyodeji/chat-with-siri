export const userRole = "user";
export const botRole = "assistant";

// Supported text-to-speech engines. The app talks to both through one
// normalized interface so the UI and API routes behave identically.
export type Provider = "elevenlabs" | "sixtydb";

export interface ProviderInfo {
  id: Provider;
  name: string;
}

export const PROVIDERS: ProviderInfo[] = [
  { id: "elevenlabs", name: "ElevenLabs" },
  { id: "sixtydb", name: "60db" }
];

// A voice shape shared by every provider. Each provider maps its own
// response into this so `chatVoice` and the voice dropdown stay generic.
export interface NormalizedVoice {
  voice_id: string;
  name: string;
  descriptor?: string; // age (ElevenLabs) or language (60db)
  accent?: string;
  gender?: string;
}

export interface Message {
  role: typeof userRole | typeof botRole;
  content: string;
}

export interface StoreApiKeysProps {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  setOpenAiKey: (key: string) => void;
  setElevenLabsKey: (key: string) => void;
  setSixtyDbKey: (key: string) => void;
}

export interface ChatProviderProps {
  provider: Provider;
  setProvider: (provider: Provider) => void;
}

export interface ChatVoiceProps {
  voices: NormalizedVoice[];
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
}

export interface ChatMessagesProps {
  messages: Message[];
}

export interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  loading: boolean;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ChatControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  savedAudio: boolean;
  messages: Message[];
  clearMessages: () => void;
}
