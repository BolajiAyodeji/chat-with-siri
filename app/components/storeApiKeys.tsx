import { useState } from "react";
import Image from "next/image";
import { StoreApiKeysProps } from "@/app/types/chat";
import notifyUser from "@/app/utils/notifyUser";
import trimString from "@/app/utils/trimString";

export default function StoreApiKeys({
  setOpenAiKey,
  setElevenLabsKey,
}: StoreApiKeysProps) {
  const [isFocused, setIsFocused] = useState(false);

  const saveKeys = async (formData: FormData) => {
    const key1 = trimString(formData.get("openai-key") as string);
    const key2 = trimString(formData.get("11labs-key") as string);
    sessionStorage.setItem("openai-key", key1);
    sessionStorage.setItem("11labs-key", key2);

    setOpenAiKey(key1);
    setElevenLabsKey(key2);

    notifyUser("API keys saved!", {
      type: "success",
      autoClose: 2000,
    });
  };

  const OPENAI_KEY = sessionStorage.getItem("openai-key");
  const ELEVENLABS_KEY = sessionStorage.getItem("11labs-key");

  return (
    <>
      <div className="mb-4">
        <p className="mb-2 flex flex-row justify-center text-sm lg:text-md">
          Enter your API keys (saved locally) &nbsp;
          <a
            className=""
            href="https://github.com/BolajiAyodeji/chat-with-siri"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/question.svg"
              alt="Question Icon"
              title="Learn More"
              width={20}
              height={12}
              priority
            />
          </a>
        </p>
        <form action={saveKeys} className="px-4">
          <label
            className="absolute text-sm p-5 text-gray-500"
            htmlFor="openai-key"
          >
            {isFocused ? "" : "OpenAI..."}
          </label>
          <input
            id="openai-key"
            name="openai-key"
            defaultValue={OPENAI_KEY ?? ""}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
            className={`${
              isFocused
                ? `text-white transition ease-in-out duration-700`
                : `text-transparent transition ease-in-out`
            } w-2/4 lg:w-1/3 p-4 border-y-2 border-l-2 bg-transparent focus:outline-none focus:border-blue-500`}
            required
          />
          <label
            className="absolute text-sm p-5 text-gray-500"
            htmlFor="11labs-key"
          >
            {isFocused ? "" : "ElevenLabs..."}
          </label>
          <input
            id="11labs-key"
            name="11labs-key"
            defaultValue={ELEVENLABS_KEY ?? ""}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
            className={`${
              isFocused
                ? `text-white transition ease-in-out duration-700`
                : `text-transparent transition ease-in-out`
            }
            } w-2/4 lg:w-1/3 p-4 border-2 bg-transparent focus:outline-none focus:border-blue-500`}
            required
          />
          <button
            type="submit"
            title="Save API keys to your computer"
            className="w-full lg:w-auto px-6 py-2 lg:py-4 border-2 border-white bg-white text-black"
          >
            {ELEVENLABS_KEY && OPENAI_KEY ? "Update 🔐" : "Save 🔐"}
          </button>
        </form>
      </div>
      <hr className="w-full lg:w-3/4 xl:w-2/4 mt-0 lg:mt-8" />
    </>
  );
}
