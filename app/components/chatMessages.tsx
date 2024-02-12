import Image from "next/image";
import type { Message } from "@/app/types/chat";

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="absolute w-full lg:w-2/4 mt-52 lg:mt-24 pb-60 px-6 border-0 lg:border-x-2 lg:border-white">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center mt-20 lg:mt-40">
          <Image
            src="/logo.svg"
            className=""
            alt="Chat With Siri Logo"
            width={800}
            height={10}
            priority
          />
          <h2 className="text-xl text-center mt-12 animate-none lg:animate-bounce">
            Hi there! How can I help you today?
          </h2>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="mb-8 mt-0 lg:mt-12">
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
