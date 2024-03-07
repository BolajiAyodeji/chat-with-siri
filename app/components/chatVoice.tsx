import { ChatVoiceProps } from "@/app/types/chat";

export default function ChatVoice({
  voices,
  selectedVoice,
  setSelectedVoice,
}: ChatVoiceProps) {
  return (
    <>
      <div className="p-4 lg:p-8 lg:w-3/4 xl:w-2/4 border-0 lg:border-x-2 lg:border-white">
        <label className="mb-2 block text-sm lg:text-base" htmlFor="voices">
          Change Siri&apos;s Voice:
        </label>
        <select
          id="voices"
          name="voices"
          className="p-2 w-4/4 text-sm lg:text-base appearance-none bg-transparent border border-white text-blue-500"
          value={selectedVoice}
          onChange={(event) => setSelectedVoice(event.target.value)}
        >
          {voices &&
            voices
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((voice) => (
                <option
                  key={voice.voice_id}
                  value={voice.name}
                  className="text-center"
                >
                  {voice.name} ({voice.labels.age} {voice.labels.accent}{" "}
                  {voice.labels.gender})
                </option>
              ))}
        </select>
      </div>
      <hr className="w-full lg:w-3/4 xl:w-2/4" />
    </>
  );
}
