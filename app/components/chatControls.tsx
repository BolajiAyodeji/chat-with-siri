import Image from "next/image";
import type { ChatControlsProps } from "@/app/types/chat";

export default function ChatControls({
  audioRef,
  savedAudio,
  messages,
  clearMessages,
}: ChatControlsProps) {
  return (
    <div className={`flex ${messages.length > 0 ? `block` : `hidden`}`}>
      <button
        title="Replay audio response"
        disabled={!savedAudio}
        onClick={() => audioRef.current && audioRef.current.play()}
      >
        <Image
          src="/play.svg"
          alt="Plus Icon"
          width={40}
          height={24}
          priority
        />
      </button>
      <button
        title="Start new chat"
        onClick={clearMessages}
        className="p-2 border-white text-black"
      >
        <Image
          src="/plus.svg"
          alt="Plus Icon"
          width={40}
          height={24}
          priority
        />
      </button>
      <audio ref={audioRef} controls className="mb-2 hidden" />
    </div>
  );
}
