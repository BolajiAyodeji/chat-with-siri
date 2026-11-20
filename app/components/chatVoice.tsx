import { ChatVoiceProps } from "@/app/types/chat";
import { SPEECH_PROVIDERS, SpeechProviderId } from "@/app/utils/providers";

export default function ChatVoice({
  voices,
  selectedVoice,
  setSelectedVoice,
  selectedProvider,
  setSelectedProvider
}: ChatVoiceProps) {
  return (
    <>
      <div className="p-4 lg:p-8 lg:w-3/4 xl:w-2/4 border-0 lg:border-x-2 lg:border-white flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="mb-2 block text-sm lg:text-base" htmlFor="provider">
            Speech Provider:
          </label>
          <select
            id="provider"
            name="provider"
            className="p-2 w-full text-sm lg:text-base appearance-none bg-transparent border border-white text-blue-500"
            value={selectedProvider}
            onChange={(event) =>
              setSelectedProvider(event.target.value as SpeechProviderId)
            }
          >
            {SPEECH_PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm lg:text-base" htmlFor="voices">
            Change Siri&apos;s Voice:
          </label>
          <select
            id="voices"
            name="voices"
            className="p-2 w-full text-sm lg:text-base appearance-none bg-transparent border border-white text-blue-500"
            value={selectedVoice}
            onChange={(event) => setSelectedVoice(event.target.value)}
          >
            {voices
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                  {voice.description ? ` (${voice.description})` : ""}
                </option>
              ))}
          </select>
        </div>
      </div>
      <hr className="w-full lg:w-3/4 xl:w-2/4" />
    </>
  );
}
