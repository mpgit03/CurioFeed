

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export function extractJson(responseText) {
  try {
    const cleaned = responseText
      .replace(/```json\s*/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("Failed to parse Gemini response:");
    console.log(responseText);
    throw error;
  }
}

export async function generateWithRetry(prompt) {
  let lastError;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`Attempt ${attempt}`);

      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    } catch (error) {
      lastError = error;

      console.log(
        `Attempt ${attempt} failed`,
        error.status
      );

      if (
        error.status !== 503 &&
        error.status !== 429
      ) {
        throw error;
      }

      if (attempt < 5) {
        const delay =
          Math.pow(2, attempt) * 1000;

        console.log(
          `Retrying in ${delay / 1000}s`
        );

        await new Promise(resolve =>
          setTimeout(resolve, delay)
        );
      }
    }
  }

  throw lastError;
}

export async function classifyArticles(articles) {
  const prompt = `
You are an expert content classification system.

Allowed topics:

Artificial Intelligence
Programming
Startups
Technology
Finance
Science
Business
Productivity
Design
World Affairs
Humanities

Rules:

- Classify each article independently.
- Maximum 3 topics per article.
- Only assign a topic if it is materially discussed.
- Do not infer weak associations.
- Confidence must be between 0.60 and 0.95.

Confidence Guide:

0.95 = Primary topic
0.90 = Strong primary topic
0.80 = Strong secondary topic
0.70 = Relevant but not dominant
0.60 = Weak but meaningful relation

India Classification:

Determine whether the article is primarily related to India.

Set "isIndiaRelated" to true ONLY if the article is primarily about:

- Indian government, politics, or public policy
- Indian companies or startups
- Indian economy or financial markets
- Technology, science, or business developments centered on India
- Events occurring in India
- People, organizations, or institutions whose primary context is India

Set "isIndiaRelated" to false if:

- India is mentioned only briefly.
- India is one of many countries discussed.
- The article is about a global topic without a primary focus on India.
- The connection to India is weak or incidental.

Return ONLY valid JSON.

Do not include markdown.
Do not wrap the response in triple backticks.
Do not include explanations.

Output format:

[
  {
    "articleId": "string",
    "topics": [
      {
        "topic": "Artificial Intelligence",
        "confidence": 0.95
      }
    ],
    "isIndiaRelated": true
  }
]

Articles:

${JSON.stringify(articles)}
`;

  const response = await generateWithRetry(prompt);

  return extractJson(response.text);
}

















/* export function classifyArticle(article) {
  const topics = new Set();

  const text = [
    article.title,
    article.description,
    ...(article.rawContent?.categories || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // AI

  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("llm") ||
    text.includes("gpt") ||
    text.includes("agent")
  ) {
    topics.add("Artificial Intelligence");
  }

  // Programming

  if (
    text.includes("programming") ||
    text.includes("developer") ||
    text.includes("software") ||
    text.includes("engineering") ||
    text.includes("architecture")
  ) {
    topics.add("Programming");
  }

  // Science

  if (
    text.includes("research") ||
    text.includes("science") ||
    text.includes("biology") ||
    text.includes("disease") ||
    text.includes("medical")
  ) {
    topics.add("Science");
  }

  // Startups

  if (
    text.includes("startup") ||
    text.includes("founder") ||
    text.includes("venture") ||
    text.includes("yc") ||
    text.includes("funding")
  ) {
    topics.add("Startups");
  }

  // Business

  if (
    text.includes("business") ||
    text.includes("market") ||
    text.includes("revenue") ||
    text.includes("growth")
  ) {
    topics.add("Business");
  }

  switch (article.source.category) {
  case "AI":
    topics.add("Artificial Intelligence");
    break;

  case "ENGINEERING":
    topics.add("Programming");
    break;

  case "SCIENCE":
    topics.add("Science");
    break;

  case "STARTUPS":
    topics.add("Startups");
    break;

  case "BUSINESS":
    topics.add("Business");
    break;
}

  return [...topics];
} */
