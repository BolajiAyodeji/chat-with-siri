import { ElevenLabsClient } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(req: Request) {
  const { message, voice } = await req.json();

  try {
    const audio = await elevenlabs.generate({
      voice,
      model_id: "eleven_turbo_v2",
      voice_settings: { similarity_boost: 0.5, stability: 0.5 },
      text: message,
      // stream: true,
    });

    console.log(audio);

    return new Response(audio as any, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      "Something went wrong. Kindly check your logs for errors."
    );
  }
}
