import { Voice, ChatVoiceProps } from "@/app/types/chat";

export default function ChatVoice({
  voices,
  selectedVoice,
  setSelectedVoice,
}: ChatVoiceProps) {
  return (
    <div className="flex flex-col w-full z-10 fixed top-0 items-center pt-8 bg-black">
      <label className="mb-2" htmlFor="voices">
        Change Siri&apos;s Voice:
      </label>
      <select
        id="voices"
        name="voices"
        className="w-4/4 text-blue-500 appearance-none bg-black border border-white p-2 text-center"
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices &&
          voices
            .sort((a: Voice, b: Voice) => a.name.localeCompare(b.name))
            .map((voice: Voice) => (
              <option key={voice.voice_id} value={voice.name}>
                {voice.name} ({voice.labels.age} {voice.labels.accent}{" "}
                {voice.labels.gender})
              </option>
            ))}
      </select>
      <hr className="w-full lg:w-2/4 mt-6" />
    </div>
  );
}
