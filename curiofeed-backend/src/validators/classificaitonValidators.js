const ALLOWED_TOPICS = new Set([
  "Artificial Intelligence",
  "Programming",
  "Startups",
  "Technology",
  "Finance",
  "Science",
  "Business",
  "Productivity",
  "Design",
  "World Affairs",
  "Humanities",
]);

export function validateClassificationResponse(
  expectedArticleIds,
  classifications
) {
  if (!Array.isArray(classifications)) {
    throw new Error("Classification response must be an array.");
  }

  if (classifications.length !== expectedArticleIds.length) {
    throw new Error(
      `Expected ${expectedArticleIds.length} classifications but received ${classifications.length}.`
    );
  }

  const expectedIds = new Set(expectedArticleIds);
  const seenArticleIds = new Set();

  for (const classification of classifications) {
    // ---------- articleId ----------

    if (typeof classification.articleId !== "string") {
      throw new Error("Classification is missing a valid articleId.");
    }

    if (!expectedIds.has(classification.articleId)) {
      throw new Error(
        `Unexpected articleId '${classification.articleId}' returned by Gemini.`
      );
    }

    if (seenArticleIds.has(classification.articleId)) {
      throw new Error(
        `Duplicate classification for article '${classification.articleId}'.`
      );
    }

    seenArticleIds.add(classification.articleId);

    // ---------- topics ----------

    if (!Array.isArray(classification.topics)) {
      throw new Error(
        `Article ${classification.articleId}: topics must be an array.`
      );
    }

    if (classification.topics.length < 1) {
      throw new Error(
        `Article ${classification.articleId}: at least one topic is required.`
      );
    }

    if (classification.topics.length > 3) {
      throw new Error(
        `Article ${classification.articleId}: maximum 3 topics allowed.`
      );
    }

    // ---------- India flag ----------

    if (typeof classification.isIndiaRelated !== "boolean") {
      throw new Error(
        `Article ${classification.articleId}: isIndiaRelated must be a boolean.`
      );
    }

    // ---------- topic validation ----------

    const seenTopics = new Set();

    for (const topic of classification.topics) {
      if (typeof topic.topic !== "string") {
        throw new Error(
          `Article ${classification.articleId}: topic name must be a string.`
        );
      }

      if (!ALLOWED_TOPICS.has(topic.topic)) {
        throw new Error(
          `Article ${classification.articleId}: '${topic.topic}' is not an allowed topic.`
        );
      }

      if (seenTopics.has(topic.topic)) {
        throw new Error(
          `Article ${classification.articleId}: duplicate topic '${topic.topic}'.`
        );
      }

      seenTopics.add(topic.topic);

      if (typeof topic.confidence !== "number") {
        throw new Error(
          `Article ${classification.articleId}: confidence must be a number.`
        );
      }

      if (topic.confidence < 0.6 || topic.confidence > 0.95) {
        throw new Error(
          `Article ${classification.articleId}: confidence ${topic.confidence} is outside the allowed range.`
        );
      }
    }
  }
}