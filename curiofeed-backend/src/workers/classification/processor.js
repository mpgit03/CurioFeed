import { classificationProcessorLogger } from "../../lib/logger.js";
import { classifyBatch } from "../../services/classificationService.js";

export async function processClassificationJob(job) {
  const start = Date.now();

  const { articleIds } = job.data;

  const result = await classifyBatch(articleIds);

  classificationProcessorLogger.info(
  {
    articleCount: articleIds.length,
    articleTopicsCreated: result.articleTopicsCreated,
    articlesClassified: result.articlesClassified,
    duration: Date.now() - start,
  },
  "Classification batch processed"
);
}