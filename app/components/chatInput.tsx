import Image from "next/image";
import type { ChatInput } from "@/app/types/chat";

export default function ChatInput({
  audioRef,
  input,
  setInput,
  messages,
  loading,
  sendMessage,
  clearMessages,
}: ChatInput) {
  return (
    <div className="flex flex-col items-center w-full fixed bottom-0 pb-2 pt-6 bg-black">
      <audio ref={audioRef} controls className="mb-2 hidden" />
      <form onSubmit={sendMessage} className="mb-4">
        <label className="hidden" htmlFor="message">
          Enter your message here:
        </label>
        <input
          type="text"
          name="message"
          value={input}
          placeholder="What's on your mind?..."
          onChange={(event) => setInput(event.target.value)}
          className="w-56 md:w-72 lg:w-96 p-4 border-2 text-white bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          title="Send message"
          disabled={input.trim() === "" || input.trim().length < 5}
          className="w-24 md:w-24 lg:w-auto px-4 lg:px-8 py-4 border-2 border-white bg-white text-black"
        >
          {loading ? <p className="animate-spin">⏳</p> : "Ask Siri"}
        </button>
      </form>
      <button
        title="Start new chat"
        onClick={clearMessages}
        className={`p-2 ${
          messages.length > 0 ? `block` : `hidden`
        } border-white text-black`}
      >
        <Image
          src="/plus.svg"
          alt="Plus Icon"
          width={40}
          height={24}
          priority
        />
      </button>
    </div>
  );
}
