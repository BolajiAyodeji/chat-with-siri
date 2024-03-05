"use client";

import { useState, useEffect, useRef } from "react";
import ChatVoice from "@/app/components/chatVoice";
import StoreApiKeys from "@/app/components/storeApiKeys";
import ChatMessages from "@/app/components/chatMessages";
import ChatControls from "@/app/components/chatControls";
import ChatInput from "@/app/components/chatInput";
import getVoices from "@/app/utils/getVoices";
import notifyUser from "@/app/utils/notifyUser";
import { userRole, botRole, Message } from "@/app/types/chat";
import { VoiceResponse } from "elevenlabs/api";

export default function ChatPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [openAiKey, setOpenAiKey] = useState<string>("");
  const [elevenLabsKey, setElevenLabsKey] = useState<string>("");
  const [voices, setVoices] = useState<VoiceResponse[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("Myra");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedAudio, setSavedAudio] = useState<boolean>(false);

  const getOpenAIResponse = async (chatMessages: Message[]) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey: openAiKey, messages: chatMessages }),
    });

    if (response.status === 401) {
      notifyUser(
        "Your OpenAI API Key is invalid. Kindly check and try again.",
        {
          type: "error",
          autoClose: 5000,
        }
      );
    }

    const data = await response.json();
    return data;
  };

  const getElevenLabsResponse = async (text: string) => {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: elevenLabsKey,
        message: text,
        voice: selectedVoice,
      }),
    });

    if (response.status === 401) {
      notifyUser(
        "Your ElevenLabs API Key is invalid. Kindly check and try again.",
        {
          type: "error",
          autoClose: 5000,
        }
      );
    }

    const data = await response.blob();
    return data;
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!openAiKey && !elevenLabsKey) {
      notifyUser(
        "Kindly enter your API keys first! You should read the guide to learn more (click the ? icon).",
        {
          type: "info",
          autoClose: 5000,
        }
      );
    } else {
      setLoading(true);
      setInput("");

      const chatMessages: Message[] = [
        ...messages,
        { role: userRole, content: input },
      ];
      setMessages(chatMessages);

      const botChatResponse = await getOpenAIResponse(chatMessages);
      const botVoiceResponse = await getElevenLabsResponse(botChatResponse);

      const reader = new FileReader();
      reader.onload = () => {
        if (audioRef.current) {
          audioRef.current.src = reader.result as string;
          audioRef.current.play();
        }
      };
      reader.readAsDataURL(botVoiceResponse);

      setMessages([
        ...chatMessages,
        { role: botRole, content: botChatResponse },
      ]);
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

    const savedKey1 = sessionStorage.getItem("openai-key");
    const savedKey2 = sessionStorage.getItem("11labs-key");
    const savedVoice = localStorage.getItem("selectedVoice");
    const savedMessages = localStorage.getItem("chatMessages");

    if (savedKey1) setOpenAiKey(savedKey1!);
    if (savedKey2) setElevenLabsKey(savedKey2!);
    if (savedVoice) setSelectedVoice(savedVoice!);
    if (savedMessages) setMessages(JSON.parse(savedMessages!));
  }, []);

  useEffect(() => {
    if (messages.length !== 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      localStorage.setItem("selectedVoice", selectedVoice);
    }
  }, [selectedVoice, messages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 px-4 lg:px-0">
      {voices.length === 0 ? (
        <p className="text-white text-9xl animate-ping">...</p>
      ) : (
        <>
          <div className="flex flex-col w-full z-10 fixed top-0 text-center items-center pt-3 bg-gray-900">
            <StoreApiKeys {...{ setOpenAiKey, setElevenLabsKey }} />
            <ChatVoice {...{ voices, selectedVoice, setSelectedVoice }} />
          </div>
          <ChatMessages {...{ messages }} />
          <div className="flex flex-col items-center w-full fixed bottom-0 pb-3 bg-gray-900">
            <ChatControls
              {...{
                audioRef,
                savedAudio,
                messages,
                clearMessages,
              }}
            />
            <ChatInput
              {...{
                input,
                setInput,
                loading,
                sendMessage,
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
