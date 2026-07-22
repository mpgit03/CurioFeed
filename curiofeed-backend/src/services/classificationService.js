

import { GoogleGenAI } from "@google/genai";
import prisma from "../lib/prisma.js";
import { serviceLogger } from "../lib/logger.js";
import { persistArticleTopics } from "./articletopicService.js";
import {CLASSIFICATION_MODEL} from "../constants/classification.js";
import { validateClassificationResponse } from "../validators/classificaitonValidators.js";

const HTTP_STATUS = {
  TOO_MANY_REQUESTS: 429,
  SERVICE_UNAVAILABLE: 503,
};


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
      serviceLogger.error(
    {
      err: error,
      response: responseText,
    },
    "Failed to parse Gemini response"
  );
    throw error;
  }
}

export async function generateWithRetry(prompt) {
  let lastError;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`Attempt ${attempt}`);

      return await ai.models.generateContent({
        model: CLASSIFICATION_MODEL,
        contents: prompt,
      });

    } catch (error) {
      lastError = error;

      serviceLogger.warn(
      {
        attempt,
        status: error.status,
        err: error,
      },
      "Gemini request failed"
    );

      if (error.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
        serviceLogger.warn(
        {
          attempt,
        },
        "Gemini quota exceeded. Delegating retries to BullMQ"
      );
          throw error;
      }

      if (error.status !== HTTP_STATUS.SERVICE_UNAVAILABLE) {
          throw error;
      }

      if (attempt < 5) {
        const delay =
          Math.pow(2, attempt) * 1000;

        serviceLogger.warn(
        {
          attempt,
          retryInSeconds: delay / 1000,
        },
        "Gemini service unavailable. Retrying"
      );

        await new Promise(resolve =>
          setTimeout(resolve, delay)
        );
      }
    }
  }

      serviceLogger.error(
      {
        attempts: 5,
        err: lastError,
      },
      "Gemini request failed after all retries"
    );

    throw lastError;

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

IMPORTANT:

Your response MUST be a single valid JSON array.

The first character MUST be '['.
The last character MUST be ']'.

Do NOT return multiple JSON objects.
Do NOT return newline-separated JSON objects.
Do NOT include markdown.
Do NOT include code fences.
Do NOT include explanations.
Do NOT include any text before or after the JSON.

Every article MUST have at least one topic.

Only use the allowed topic names.

The response must exactly match this structure:

[
  {
    "articleId": "string",
    "topics": [
      {
        "topic": "Technology",
        "confidence": 0.90
      }
    ],
    "isIndiaRelated": false
  }
]

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

export async function classifyBatch(articleIds){
  try{
    const articles = await prisma.article.findMany({
    where:{
      id:{
        in:articleIds,
      }
    },
    select:{
      id:true,
      title:true,
      description:true,
    },
  });

  const payload =
    articles.map(article => ({
      articleId: article.id,
      title: article.title,
      description: article.description,
    }));

  const classifications = await classifyArticles(payload);

  validateClassificationResponse(
    articleIds,
    classifications
  );

  return await persistArticleTopics(classifications);
  }catch (err) {
    serviceLogger.error(
      {
        articleCount: articleIds.length,
        err,
      },
      "Classification batch failed"
    );

    throw err;
  }
  
}

















