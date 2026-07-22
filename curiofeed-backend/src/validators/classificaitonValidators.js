import { ExternalServiceError } from "../utils/ExternalServiceError.js";
import { ALLOWED_TOPICS } from "../constants/topics.js";

export function validateClassificationResponse(
  expectedArticleIds,
  classifications
) {
  if (!Array.isArray(classifications)) {
    throw new ExternalServiceError(
      "AI classification response must be an array."
    );
  }

  if (classifications.length !== expectedArticleIds.length) {
    throw new ExternalServiceError(
      `AI classification response contained ${classifications.length} classifications; expected ${expectedArticleIds.length}.`
    );
  }

  const expectedIds = new Set(expectedArticleIds);
  const seenArticleIds = new Set();

  for (const classification of classifications) {
    // ---------- articleId ----------

    if (typeof classification.articleId !== "string") {
      throw new ExternalServiceError(
        "AI classification response contains a classification without a valid articleId."
      );
    }

    if (!expectedIds.has(classification.articleId)) {
      throw new ExternalServiceError(
        `AI classification response contains an unexpected articleId '${classification.articleId}'.`
      );
    }

    if (seenArticleIds.has(classification.articleId)) {
      throw new ExternalServiceError(
        `AI classification response contains duplicate classifications for article '${classification.articleId}'.`
      );
    }

    seenArticleIds.add(classification.articleId);

    // ---------- topics ----------

    if (!Array.isArray(classification.topics)) {
      throw new ExternalServiceError(
        `AI classification response contains an invalid topics array for article '${classification.articleId}'.`
      );
    }

    if (classification.topics.length < 1) {
      throw new ExternalServiceError(
        `AI classification response must contain at least one topic for article '${classification.articleId}'.`
      );
    }

    if (classification.topics.length > 3) {
      throw new ExternalServiceError(
        `AI classification response contains more than three topics for article '${classification.articleId}'.`
      );
    }

    // ---------- India flag ----------

    if (typeof classification.isIndiaRelated !== "boolean") {
      throw new ExternalServiceError(
        `AI classification response contains an invalid isIndiaRelated value for article '${classification.articleId}'.`
      );
    }

    // ---------- topic validation ----------

    const seenTopics = new Set();

    for (const topic of classification.topics) {
      if (typeof topic.topic !== "string") {
        throw new ExternalServiceError(
          `AI classification response contains an invalid topic name for article '${classification.articleId}'.`
        );
      }

      if (!ALLOWED_TOPICS.has(topic.topic)) {
        throw new ExternalServiceError(
          `AI classification response contains an unsupported topic '${topic.topic}' for article '${classification.articleId}'.`
        );
      }

      if (seenTopics.has(topic.topic)) {
        throw new ExternalServiceError(
          `AI classification response contains duplicate topic '${topic.topic}' for article '${classification.articleId}'.`
        );
      }

      seenTopics.add(topic.topic);

      if (typeof topic.confidence !== "number") {
        throw new ExternalServiceError(
          `AI classification response contains an invalid confidence value for article '${classification.articleId}'.`
        );
      }

      if (topic.confidence < 0.6 || topic.confidence > 0.95) {
        throw new ExternalServiceError(
          `AI classification response contains an out-of-range confidence (${topic.confidence}) for article '${classification.articleId}'.`
        );
      }
    }
  }
}