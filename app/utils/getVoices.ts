"use server";

import { ElevenLabsClient } from "elevenlabs";

export default async function getVoices() {
  const elevenlabs = new ElevenLabsClient({
    // Use the API key from env in production
    // So the voices are available on first render.
    apiKey: process.env.ELEVENLABS_API_KEY
  });

  try {
    const allVoices = await elevenlabs.voices.getAll();
    return allVoices.voices;
  } catch (error) {
    console.error(error);
  }
}
