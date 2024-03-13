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
import { userRole, botRole, Message } from "@/app/types/chat";
import { VoiceResponse } from "elevenlabs/api";

export default function ChatPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isModal, setIsModal] = useState(false);
  const [openAiKey, setOpenAiKey] = useLocalStorage<string>("openai-key", "");
  const [elevenLabsKey, setElevenLabsKey] = useLocalStorage<string>("11labs-key", "");
  const [voices, setVoices] = useState<VoiceResponse[]>([]);
  const [selectedVoice, setSelectedVoice] = useLocalStorage<string>("selectedVoice", "Myra");
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
      notifyUser("Your OpenAI API Key is invalid. Kindly check and try again.", {
        type: "error",
        autoClose: 5000
      });
    }

    const data = await response.json();
    return data;
  };

  const getElevenLabsResponse = async (text: string) => {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: elevenLabsKey,
        message: text,
        voice: selectedVoice
      })
    });

    if (response.status === 401) {
      notifyUser("Your ElevenLabs API Key is invalid. Kindly check and try again.", {
        type: "error",
        autoClose: 5000
      });
    }

    const data = await response.blob();
    return data;
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (process.env.NEXT_PUBLIC_APP_MODE === "production" && !openAiKey && !elevenLabsKey) {
      setIsModal(true);
    } else {
      setLoading(true);
      setInput("");

      const chatMessages: Message[] = [...messages, { role: userRole, content: input }];
      setMessages(chatMessages);

      const botChatResponse = await getOpenAIResponse(chatMessages);
      const botVoiceResponse = await getElevenLabsResponse(botChatResponse);

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
    getVoices()
      .then((voices) => {
        setVoices(voices ?? []);
      })
      .catch((error) => {
        console.error("Error fetching voices:", error);
      });
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center justify-between py-4 px-4 lg:px-0">
      {voices.length === 0 ? (
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
