import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // parse body, etc.
  try {
    const { topic, controversial, relationship } = await req.json();

    // Construct a message array for a chat completion
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates exactly 5 conversation topics in JSON array form, with no extra text.",
      },
      {
        role: "user",
        content: `Generate exactly 5 deep conversation topics about ${topic} with a controversial level of ${controversial} between ${relationship}. Return your answer as a valid JSON array of strings, for example: ["Topic 1", ... ].`,
      },
    ];

    // Call chat.completions.create with the new library
    console.log("Calling OpenAI API with messages:", messages);
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18", // or "gpt-4"
      messages: messages as any,
      max_tokens: 250,
      temperature: 0.7,
    });

    // The response is typically in response.choices[0].message.content
    const rawText = response.choices[0]?.message?.content?.trim() ?? "";

    // Attempt to parse the content as JSON
    const topics = JSON.parse(rawText);

    return new Response(JSON.stringify({ topics }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error generating topics:", err);
    return new Response(JSON.stringify({ topics: [], error: "Failed to fetch topics." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
