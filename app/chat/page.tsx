"use client";

import { useState, useEffect, useRef } from "react";
import StoreApiKeys from "@/app/components/storeApiKeys";
import ChatProvider from "@/app/components/chatProvider";
import ChatVoice from "@/app/components/chatVoice";
import ChatMessages from "@/app/components/chatMessages";
import ChatControls from "@/app/components/chatControls";
import ChatInput from "@/app/components/chatInput";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import getVoices from "@/app/utils/getVoices";
import notifyUser from "@/app/utils/notifyUser";
import { userRole, botRole, Message, NormalizedVoice, Provider } from "@/app/types/chat";

export default function ChatPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isModal, setIsModal] = useState(false);
  const [openAiKey, setOpenAiKey] = useLocalStorage<string>("openai-key", "");
  const [elevenLabsKey, setElevenLabsKey] = useLocalStorage<string>("11labs-key", "");
  const [sixtyDbKey, setSixtyDbKey] = useLocalStorage<string>("60db-key", "");
  const [provider, setProvider] = useLocalStorage<Provider>("provider", "elevenlabs");
  const [voices, setVoices] = useState<NormalizedVoice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState<boolean>(true);
  const [selectedVoice, setSelectedVoice] = useLocalStorage<string>("selectedVoice", "");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useLocalStorage<Message[]>("chatMessages", []);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedAudio, setSavedAudio] = useState<boolean>(false);

  // The TTS key for whichever engine is currently active.
  const ttsKey = provider === "sixtydb" ? sixtyDbKey : elevenLabsKey;
  const providerName = provider === "sixtydb" ? "60db" : "ElevenLabs";

  const getOpenAIResponse = async (chatMessages: Message[]) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ apiKey: openAiKey, messages: chatMessages })
    });

    if (response.status === 401) {
      notifyUser("There's a problem with your OpenAI API Key. Kindly check and try again.", {
        type: "error",
        autoClose: 5000
      });
    }

    const data = await response.json();
    return data;
  };

  // Provider-agnostic speech request. The active provider + its key are sent
  // to /api/speech, which always responds with audio/mpeg.
  const getSpeechResponse = async (text: string) => {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider,
        apiKey: ttsKey,
        message: text,
        voice: selectedVoice
      })
    });

    if (response.status === 401) {
      notifyUser(`Your ${providerName} API Key is invalid. Kindly check and try again.`, {
        type: "error",
        autoClose: 5000
      });
    }

    const data = await response.blob();
    return data;
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProduction = process.env.NEXT_PUBLIC_APP_MODE === "production";

    if (isProduction && (!openAiKey || !ttsKey)) {
      setIsModal(true);
    } else {
      setLoading(true);
      setInput("");

      const chatMessages: Message[] = [...messages, { role: userRole, content: input }];
      setMessages(chatMessages);

      const botChatResponse = await getOpenAIResponse(chatMessages);
      const botVoiceResponse = await getSpeechResponse(botChatResponse);

      const reader = new FileReader();
      reader.readAsDataURL(botVoiceResponse);
      reader.onload = () => {
        if (audioRef.current) {
          audioRef.current.src = reader.result as string;
          audioRef.current.play();
        }
      };

      setMessages([...chatMessages, { role: botRole, content: botChatResponse }]);
      setLoading(false);
      setSavedAudio(true);
    }
  };

  const clearMessages = async () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  // Refetch voices whenever the provider (or its key) changes, then reconcile
  // the selected voice so it always points at a valid voice for that provider.
  useEffect(() => {
    setVoicesLoading(true);
    getVoices(provider, ttsKey)
      .then((result) => {
        const list = result ?? [];
        setVoices(list);
        if (list.length === 0) {
          setSelectedVoice("");
        } else if (!list.some((voice) => voice.voice_id === selectedVoice)) {
          setSelectedVoice(list[0].voice_id);
        }
      })
      .catch((error) => {
        console.error("Error fetching voices:", error);
        setVoices([]);
      })
      .finally(() => setVoicesLoading(false));
    // selectedVoice is intentionally omitted to avoid a refetch loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, elevenLabsKey, sixtyDbKey]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-between py-4 px-4 lg:px-0">
      {voicesLoading && voices.length === 0 ? (
        <p className="text-white text-9xl animate-ping">...</p>
      ) : (
        <>
          <div className="flex flex-col w-full z-10 fixed top-0 text-center items-center bg-gray-900">
            <StoreApiKeys
              {...{
                isModal,
                setIsModal,
                setOpenAiKey,
                setElevenLabsKey,
                setSixtyDbKey
              }}
            />
            <ChatProvider {...{ provider, setProvider }} />
            <ChatVoice {...{ voices, selectedVoice, setSelectedVoice }} />
          </div>
          <ChatMessages {...{ messages }} />
          <div className="flex flex-col items-center w-full fixed bottom-0 pb-3 bg-gray-900">
            <ChatControls
              {...{
                audioRef,
                savedAudio,
                messages,
                clearMessages
              }}
            />
            <ChatInput
              {...{
                input,
                setInput,
                loading,
                sendMessage
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
