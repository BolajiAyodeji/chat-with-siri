import { ElevenLabsClient } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(req: Request) {
  const { message, voice } = await req.json();

  try {
    const audio = await elevenlabs.generate({
      voice,
      model_id: "eleven_multilingual_v2",
      text: message,
      stream: true,
    });

    return new Response(audio as any, {
      headers: { "content-type": "audio/mpeg" },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ output: "Sorry, I do not understand." });
  }
}
