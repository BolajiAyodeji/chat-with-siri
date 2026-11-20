import { PROVIDERS, type ChatProviderProps, type Provider } from "@/app/types/chat";

export default function ChatProvider({ provider, setProvider }: ChatProviderProps) {
  return (
    <>
      <div className="p-4 lg:px-8 lg:pt-8 lg:pb-0 lg:w-3/4 xl:w-2/4">
        <label className="mb-2 block text-sm lg:text-base" htmlFor="provider">
          Speech Engine:
        </label>
        <select
          id="provider"
          name="provider"
          className="p-2 w-4/4 text-sm lg:text-base appearance-none bg-transparent border border-white text-blue-500"
          value={provider}
          onChange={(event) => setProvider(event.target.value as Provider)}
        >
          {PROVIDERS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
