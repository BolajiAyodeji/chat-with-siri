import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <p className="text-center text-lg border-b border-gray-600 pb-6 pt-8 backdrop-blur-2xl lg:rounded-xl lg:border lg:p-4">
        A simple full-stack text-to-speech chatbot built using Nextjs,{" "}
        <a
          href="https://platform.openai.com/docs/guides/text-generation/chat-completions-api?utm_source=bolajiayodeji.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenAI&apos;s GPT-3 Chat Completions API
        </a>
        , and{" "}
        <a
          href="https://elevenlabs.io/docs/api-reference/text-to-speech?utm_source=bolajiayodeji.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ElevenLabs&apos; Text-to-Speech API
        </a>
        .
      </p>

      <div className="grid grid-cols-3 gap-6 lg:gap-0 items-center lg:max-w-4xl lg:w-full my-24">
        <a
          href="https://nextjs.org?utm_source=bolajiayodeji.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/next.svg"
            className="dark:invert"
            alt="Nextjs's Logo"
            width={200}
            height={10}
            priority
          />
        </a>
        <a
          href="https://openai.com?utm_source=bolajiayodeji.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/openai.svg"
            className="dark:invert"
            alt="OpenAI's Logo"
            width={200}
            height={10}
            priority
          />
        </a>
        <a
          href="http://elevenlabs.io/?from=bolajiayodeji2995"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/elevenlabs.svg"
            className="dark:invert"
            alt="Elevenlabs's Logo"
            width={250}
            height={10}
            priority
          />
        </a>
      </div>

      <div className="mb-20 lg:mb-32 grid lg:grid-cols-3 text-center lg:max-w-5xl lg:w-full lg:text-left">
        <a
          href="/chat"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300"
        >
          <h2 className={`mb-3 text-2xl font-semibold text-blue-500`}>
            Chat With Siri{" "}
            <span className="ml-4 animate-bounce inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              ➤
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Ask the chatbot a question by text and get an audio response alongside text.
          </p>
        </a>
        <a
          href="https://blog.bolajiayodeji.com/how-to-build-an-audio-chatbot-with-nextjs-openai-and-elevenlabs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Read Tutorial{" "}
            <span className="ml-4 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              ➤
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn how this demo was built by reading a comprehensive blogpost.
          </p>
        </a>

        <a
          href="https://github.com/BolajiAyodeji/chat-with-siri"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            OSS Code{" "}
            <span className="ml-4 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              ➤
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the public code of this demo on GitHub and maybe contribute to it.
          </p>
        </a>
      </div>

      <div className="fixed bottom-0 w-full lg:w-2/4 py-4 bg-gray-900">
        <hr className="my-4 lg:my-0 border-gray-600 pb-0 lg:pb-4" />
        <Image
          src="/fav.svg"
          className="hidden lg:block mx-auto"
          alt="Chat With Siri Logo"
          width={50}
          height={10}
        />
        <p className="text-center">
          &copy;{" "}
          <a href="https://bolajiayodeji.com" target="_blank" rel="noopener noreferrer">
            Bolaji Ayodeji
          </a>{" "}
          | 2024 - {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
