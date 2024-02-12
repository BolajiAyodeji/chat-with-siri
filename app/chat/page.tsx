"use client";

import { useState, useEffect, useRef } from "react";
import { userRole, botRole, Message } from "@/app/types/chat";
import ChatVoice from "@/app/components/chatVoice";
import ChatMessages from "@/app/components/chatMessages";
import ChatInput from "@/app/components/chatInput";
import getVoices from "@/app/utils/getVoices";

export default function ChatPage() {
  const [voices, setVoices] = useState<any>([]);
  const [selectedVoice, setSelectedVoice] = useState("Rachel");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getOpenAIResponse = async (chatMessages: Message[]) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatMessages }),
    });

    const data = await response.json();
    return data.textOutput;
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

    let reader = new FileReader();
    reader.onload = () => {
      if (audioRef.current) {
        audioRef.current.src = reader.result as string;
        audioRef.current.play();
      }
    };
    reader.readAsDataURL(botVoiceResponse);

    setMessages([...chatMessages, { role: botRole, content: botChatResponse }]);
    setLoading(false);
  };

  const clearMessages = async () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    getVoices()
      .then((voices) => {
        setVoices(voices?.voices);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    if (messages.length !== 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 px-4 lg:px-0">
      {voices.length > 0 ? (
        <>
          <ChatVoice {...{ voices, selectedVoice, setSelectedVoice }} />
          <ChatMessages messages={messages} />
          <ChatInput
            {...{
              audioRef,
              input,
              setInput,
              messages,
              loading,
              sendMessage,
              clearMessages,
            }}
          />
        </>
      ) : (
        <p className="text-white text-9xl animate-ping">...</p>
      )}
    </main>
  );
}
