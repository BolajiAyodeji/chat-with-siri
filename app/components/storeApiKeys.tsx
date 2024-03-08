import { useState } from "react";
import Image from "next/image";
import { StoreApiKeysProps } from "@/app/types/chat";
import notifyUser from "@/app/utils/notifyUser";
import trimString from "@/app/utils/trimString";

export default function StoreApiKeys({
  isModal,
  setIsModal,
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
    setIsModal(false);

    notifyUser("API keys saved!", {
      type: "success",
      autoClose: 2000,
    });
  };

  const OPENAI_KEY = sessionStorage.getItem("openai-key");
  const ELEVENLABS_KEY = sessionStorage.getItem("11labs-key");

  return (
    <>
      <button
        className="z-50 items-center my-4 lg:my-8 text-white"
        onClick={() => {
          setIsModal(!isModal);
        }}
      >
        {isModal ? (
          <Image
            src="/cancel.svg"
            alt="Cancel Icon"
            title="Go back to chat"
            width={30}
            height={20}
            priority
          />
        ) : (
          <Image
            src="/settings.svg"
            alt="Settings Icon"
            title="Update API keys"
            width={20}
            height={20}
            priority
          />
        )}
      </button>

      <div
        className={`${
          isModal ? "visible" : "invisible"
        } absolute min-h-screen min-w-full z-40 transition-all ease-in bg-gray-900`}
      >
        <div className="mx-0 xl:mx-96 mt-0 lg:mt-24 py-40 border-0 lg:border-2 lg:border-white">
          <p className="px-4 text-sm lg:text-base antialiased tracking-normal leading-9">
            <span className="block mb-4 text-lg">
              Kindly enter your API keys first!
            </span>
            Both API keys are stored on your local computer and are not saved to
            any database or sent to any server or third-party service. You
            should read{" "}
            <a
              className="text-blue-500 underline underline-offset-8 hover:no-underline"
              href="https://bit.ly/chat-with-siri-guide"
              target="_blank"
              rel="noopener noreferrer"
            >
              this guide
            </a>{" "}
            to learn more :).
          </p>

          <hr className="mt-10" />

          <div className="mt-20 lg:mt-24">
            <p className="mb-2 flex flex-row justify-center text-sm lg:text-md">
              Enter your API keys here: &nbsp;
              <a
                href="https://bit.ly/chat-with-siri-guide"
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
                } w-2/4 lg:w-52 p-4 border-y-2 border-l-2 bg-transparent focus:outline-none focus:border-blue-500`}
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
            } w-2/4 lg:w-52 p-4 border-2 bg-transparent focus:outline-none focus:border-blue-500`}
                required
              />
              <button
                type="submit"
                title="Save API keys to your computer"
                className="w-full lg:w-36 px-6 py-2 lg:py-4 border-2 border-white bg-white text-black"
              >
                {ELEVENLABS_KEY && OPENAI_KEY ? "Update 🔐" : "Save 🔐"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="w-full lg:w-3/4 xl:w-2/4" />
    </>
  );
}
