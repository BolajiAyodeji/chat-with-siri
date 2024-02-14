"use client";

import { useState, useEffect, useRef } from "react";
import ChatVoice from "@/app/components/chatVoice";
import ChatMessages from "@/app/components/chatMessages";
import ChatInput from "@/app/components/chatInput";
import getVoices from "@/app/utils/getVoices";
import { userRole, botRole, Message } from "@/app/types/chat";
import { VoiceResponse } from "elevenlabs/api";

export default function ChatPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
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
      body: JSON.stringify({ messages: chatMessages }),
    });

    const data = await response.json();
    return data;
  };

  const getElevenLabsResponse = async (text: string) => {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text, voice: selectedVoice }),
    });

    const data = await response.blob();
    return data;
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    setMessages([...chatMessages, { role: botRole, content: botChatResponse }]);
    setLoading(false);
    setSavedAudio(true);
  };

  const clearMessages = async () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    const savedVoice = localStorage.getItem("selectedVoice");
    if (savedMessages || savedVoice) {
      setMessages(JSON.parse(savedMessages!));
      setSelectedVoice(savedVoice!);
    }

    getVoices()
      .then((voices) => {
        setVoices(voices!);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    if (messages.length !== 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      localStorage.setItem("selectedVoice", selectedVoice);
    }
  }, [messages, selectedVoice]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 px-4 lg:px-0">
      {voices.length === 0 ? (
        <p className="text-white text-9xl animate-ping">...</p>
      ) : (
        <>
          <ChatVoice
            {...{ loading, voices, selectedVoice, setSelectedVoice }}
          />
          <ChatMessages {...{ messages }} />
          <ChatInput
            {...{
              audioRef,
              savedAudio,
              input,
              setInput,
              messages,
              loading,
              sendMessage,
              clearMessages,
            }}
          />
        </>
      )}
    </main>
  );
}
