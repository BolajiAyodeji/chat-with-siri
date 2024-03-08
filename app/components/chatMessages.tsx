import Image from "next/image";
import type { ChatMessagesProps } from "@/app/types/chat";

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="absolute mt-20 lg:mt-40 pt-16 pb-48 px-6 w-full lg:w-3/4 xl:w-2/4 border-0 lg:border-x-2 lg:border-white">
      {messages && messages.length === 0 ? (
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            className="mt-20"
            alt="Chat With Siri Logo"
            width={650}
            height={10}
            priority
          />
          <h2 className="text-xl text-center mt-12 animate-none lg:animate-bounce">
            Hi there! How can I help you today?
          </h2>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="my-6 lg:my-10">
            {message.role === "assistant" ? (
              <div className="flex mb-2 lg:mb-4">
                <Image src="/bot.svg" alt="Robot Icon" width={20} height={20} priority />
                <span className="ml-2 text-md lg:text-lg font-semibold text-blue-500">Siri:</span>
              </div>
            ) : (
              <div className="flex mb-2 lg:mb-4">
                <Image src="/face.svg" alt="Face Icon" width={18} height={18} priority />
                <span className="ml-2 text-md lg:text-lg font-semibold text-teal-500">You:</span>
              </div>
            )}
            <span className="text-md lg:text-lg">{message.content}</span>
          </div>
        ))
      )}
    </div>
  );
}
