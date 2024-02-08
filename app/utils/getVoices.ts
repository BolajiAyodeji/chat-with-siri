"use server";

import { ElevenLabsClient } from "elevenlabs";

export default async function getVoices() {
  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });

  try {
    const voices = await elevenlabs.voices.getAll();
    return voices;
  } catch (error) {
    console.error(error);
  }
}
