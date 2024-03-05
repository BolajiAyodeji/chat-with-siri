import { ChatVoiceProps } from "@/app/types/chat";

export default function ChatVoice({
  voices,
  selectedVoice,
  setSelectedVoice,
}: ChatVoiceProps) {
  return (
    <>
      <div className="p-6 w-full lg:w-3/4 xl:w-2/4 border-0 lg:border-x-2 lg:border-white">
        <label className="mb-2 block" htmlFor="voices">
          Change Siri&apos;s Voice:
        </label>
        <select
          id="voices"
          name="voices"
          className="w-4/4 text-blue-500 appearance-none bg-transparent border border-white p-2 text-center"
          value={selectedVoice}
          onChange={(event) => setSelectedVoice(event.target.value)}
        >
          {voices &&
            voices
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((voice) => (
                <option key={voice.voice_id} value={voice.name}>
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
