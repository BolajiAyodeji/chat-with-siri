import { VoiceResponse } from "elevenlabs/api";

export const userRole = "user";
export const botRole = "assistant";

export interface Message {
  role: typeof userRole | typeof botRole;
  content: string;
}

export interface ChatVoiceProps {
  loading: boolean;
  voices: VoiceResponse[];
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
}

export interface ChatInputProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  savedAudio: boolean;
  input: string;
  setInput: (input: string) => void;
  messages: Message[];
  loading: boolean;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  clearMessages: () => void;
}
