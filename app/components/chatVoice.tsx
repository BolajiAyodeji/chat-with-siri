import { ChatVoiceProps } from "@/app/types/chat";

export default function ChatVoice({
  loading,
  voices,
  selectedVoice,
  setSelectedVoice,
}: ChatVoiceProps) {
  return (
    <div className="flex flex-col w-full z-10 fixed top-0 items-center pt-8 bg-gray-900">
      <label className="mb-2" htmlFor="voices">
        Change Siri&apos;s Voice:
      </label>
      <select
        id="voices"
        name="voices"
        className="w-4/4 text-blue-500 appearance-none bg-transparent border border-white p-2 text-center"
        value={selectedVoice}
        disabled={loading}
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
      <hr className="w-full lg:w-3/4 xl:w-2/4 mt-6" />
    </div>
  );
}
