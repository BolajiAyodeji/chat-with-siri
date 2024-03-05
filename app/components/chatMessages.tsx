import Image from "next/image";
import type { ChatMessagesProps } from "@/app/types/chat";

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="absolute mt-80 lg:mt-60 pt-16 pb-60 px-6 w-full lg:w-3/4 xl:w-2/4 border-0 lg:border-x-2 lg:border-white">
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
          <div key={index} className="my-10">
            {message.role === "assistant" ? (
              <div className="flex">
                <Image
                  src="/bot.svg"
                  alt="Robot Icon"
                  width={24}
                  height={24}
                  priority
                />
                <span className="ml-2 text-xl font-semibold text-blue-500">
                  Siri:
                </span>
              </div>
            ) : (
              <div className="flex">
                <Image
                  src="/face.svg"
                  alt="Face Icon"
                  width={21}
                  height={21}
                  priority
                />
                <span className="ml-2 text-xl font-semibold text-teal-500">
                  You:
                </span>
              </div>
            )}
            <br />
            <span className="text-lg">{message.content}</span>
          </div>
        ))
      )}
    </div>
  );
}
