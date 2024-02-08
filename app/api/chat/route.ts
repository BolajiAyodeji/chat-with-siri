export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
        messages,
      }),
    });
    const data = await res.json();
    const textOutput = data.choices[0]?.message?.content?.trim();

    // Demo test response
    // const textOutput = "Hello, I am Siri.";

    return Response.json({ textOutput });
  } catch (error) {
    console.error(error);
    return Response.json({ textOutput: "Sorry, I do not understand." });
  }
}
