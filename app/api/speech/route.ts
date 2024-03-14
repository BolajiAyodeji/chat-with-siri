import { ElevenLabsClient } from "elevenlabs";

const isProduction = process.env.NEXT_PUBLIC_APP_MODE === "production";

export async function POST(req: Request) {
  const { apiKey, message, voice } = await req.json();

  const elevenlabs = new ElevenLabsClient({
    apiKey: isProduction ? apiKey : process.env.ELEVENLABS_API_KEY
  });

  try {
    const audio = await elevenlabs.generate({
      voice,
      model_id: "eleven_turbo_v2",
      voice_settings: { similarity_boost: 0.5, stability: 0.5 },
      text: message
      // stream: true,
    });

    return new Response(audio as any, {
      headers: { "Content-Type": "audio/mpeg" }
    });
  } catch (error: any) {
    console.error(error);
    return Response.json(error, { status: error.statusCode });
  }
}
