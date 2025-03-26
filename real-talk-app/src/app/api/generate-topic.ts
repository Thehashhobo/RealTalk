// pages/api/generate-topic.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Define a schema for the expected output (an array of strings)
const TopicsSchema = z.array(z.string());

interface GenerateTopicResponse {
  topics: string[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateTopicResponse>
) {
  console.log('Request body:', req.body);
  if (req.method !== 'POST') {
    return res.status(405).json({ topics: [], error: 'Method not allowed' });
  }

  const { topic, controversial, relationship } = req.body;

  // Construct a prompt instructing the LLM to return a JSON array of 5 topics
  const prompt = `Generate exactly 5 deep conversation topics about ${topic} with a controversial level of ${controversial} involving a ${relationship} relationship. Return your answer as a valid JSON array of strings, for example: ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"]. Do not include any extra text.`;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 200, // Increase if needed to accommodate the JSON output
        temperature: 0.7,
        stop: null,
      }),
    });

    const data = await response.json();

    // Extract the raw output text from the LLM
    const rawText: string = data?.choices?.[0]?.text?.trim() || '';

    let topics: string[] = [];
    try {
      // Attempt to parse the LLM's output as JSON and validate it using Zod
      const parsedOutput = JSON.parse(rawText);
      topics = TopicsSchema.parse(parsedOutput);
    } catch (parseError) {
      console.error('Error parsing LLM output as JSON:', parseError);
      return res.status(500).json({ topics: [], error: 'Could not parse LLM response as JSON.' });
    }

    // Return the validated array of topics
    res.status(200).json({ topics });
  } catch (error) {
    console.error('Error calling LLM API:', error);
    res.status(500).json({ topics: [], error: 'Error calling LLM API' });
  }
}
