import { Message } from "@/app/types/chat";

export const runtime = "edge";

export async function POST(req: Request) {
  const { apiKey, messages } = await req.json();

  // Hack: add a custom prompt to reduce the number of characters of the response.
  // To maximize API credits and reduce the response time.
  messages.map((message: Message) => {
    if (message.role === "user") {
      message.content = `Imagine you are Siri, Apple's digital assistant and a user asks you the question: "${message.content}". Kindly generate a suitable response with less than 100 characters.`;
    }
  });
  // End.

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        process.env.APP_MODE === `production`
          ? apiKey
          : process.env.OPENAI_API_KEY
      }`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      temperature: 0.7,
      n: 1,
      messages,
    }),
  });
  const data = await res.json();

  if (data.error && data.error.code === "invalid_api_key") {
    return Response.json(
      "Something went wrong. Kindly check for error alerts.",
      {
        status: 401,
      }
    );
  }

  const output = data.choices[0]?.message?.content?.trim();
  // Demo response (for testing purposes)
  // const output = "Hello, I am Siri.";

  return Response.json(output);
}
