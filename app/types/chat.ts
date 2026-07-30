import { SpeechProviderId } from "@/app/utils/providers";

export const userRole = "user";
export const botRole = "assistant";

export interface Message {
  role: typeof userRole | typeof botRole;
  content: string;
}

export interface StoreApiKeysProps {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  setOpenAiKey: (voice: string) => void;
  setElevenLabsKey: (voice: string) => void;
}

/** Normalized voice shape used across providers in the UI. */
export interface ProviderVoice {
  id: string;
  name: string;
  description?: string;
}

export interface ChatVoiceProps {
  voices: ProviderVoice[];
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
  selectedProvider: SpeechProviderId;
  setSelectedProvider: (provider: SpeechProviderId) => void;
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
