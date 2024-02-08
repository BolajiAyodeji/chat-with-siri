export const userRole = "user";
export const botRole = "assistant";

export interface Message {
  role: typeof userRole | typeof botRole;
  content: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  labels: {
    age: string;
    accent: string;
    gender: string;
  };
}

export interface ChatInput {
  audioRef: React.RefObject<HTMLAudioElement>;
  input: string;
  setInput: (input: string) => void;
  messages: Message[];
  loading: boolean;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  clearMessages: () => void;
}

export interface ChatVoiceProps {
  voices: Voice[];
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
}
