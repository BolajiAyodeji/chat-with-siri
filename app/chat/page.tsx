"use client";

import { useState, useEffect, useRef } from "react";
import StoreApiKeys from "@/app/components/storeApiKeys";
import ChatVoice from "@/app/components/chatVoice";
import ChatMessages from "@/app/components/chatMessages";
import ChatControls from "@/app/components/chatControls";
import ChatInput from "@/app/components/chatInput";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import getVoices from "@/app/utils/getVoices";
import notifyUser from "@/app/utils/notifyUser";
import { userRole, botRole, Message, ProviderVoice } from "@/app/types/chat";
import {
  DEFAULT_PROVIDER,
  SpeechProviderId,
  getProviderDef
} from "@/app/utils/providers";

export default function ChatPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isModal, setIsModal] = useState(false);
  const [openAiKey, setOpenAiKey] = useLocalStorage<string>("openai-key", "");
  const [elevenLabsKey, setElevenLabsKey] = useLocalStorage<string>("11labs-key", "");
  const [voices, setVoices] = useState<ProviderVoice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState<boolean>(true);
  const [selectedProvider, setSelectedProvider] =
    useLocalStorage<SpeechProviderId>("selectedProvider", DEFAULT_PROVIDER);
  const [selectedVoice, setSelectedVoice] = useLocalStorage<string>(
    "selectedVoice",
    "Myra"
  );
  const [input, setInput] = useState("");
  const [messages, setMessages] = useLocalStorage<Message[]>("chatMessages", []);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedAudio, setSavedAudio] = useState<boolean>(false);

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

  const getSpeechResponse = async (text: string) => {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: selectedProvider === "openai" ? openAiKey : elevenLabsKey,
        message: text,
        voice: selectedVoice,
        provider: selectedProvider
      })
    });

    if (response.status === 401) {
      const label = selectedProvider === "openai" ? "OpenAI" : "ElevenLabs";
      notifyUser(`Your ${label} API Key is invalid. Kindly check and try again.`, {
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

    if (isProduction && !openAiKey && !elevenLabsKey) {
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

  useEffect(() => {
    let cancelled = false;
    setVoicesLoading(true);
    getVoices(selectedProvider)
      .then((fetched) => {
        if (cancelled) return;
        setVoices(fetched);
        // If the current selection isn't in the new provider's catalog,
        // snap to the provider's default voice.
        const hasCurrent = fetched.some((v) => v.id === selectedVoice);
        if (!hasCurrent) {
          setSelectedVoice(getProviderDef(selectedProvider).defaultVoice);
        }
      })
      .catch((error) => {
        console.error("Error fetching voices:", error);
      })
      .finally(() => {
        if (!cancelled) setVoicesLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // selectedVoice intentionally omitted: we don't want to refetch when the
    // user picks a different voice within the same provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvider]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-between py-4 px-4 lg:px-0">
      {voicesLoading ? (
        <p className="text-white text-9xl animate-ping">...</p>
      ) : (
        <>
          <div className="flex flex-col w-full z-10 fixed top-0 text-center items-center bg-gray-900">
            <StoreApiKeys
              {...{
                isModal,
                setIsModal,
                setOpenAiKey,
                setElevenLabsKey
              }}
            />
            <ChatVoice
              {...{
                voices,
                selectedVoice,
                setSelectedVoice,
                selectedProvider,
                setSelectedProvider
              }}
            />
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
