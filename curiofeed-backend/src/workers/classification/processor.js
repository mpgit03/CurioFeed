import { classifyBatch } from "../../services/classificationService.js";

export async function processClassificationJob(job) {
  const start = Date.now();

  const { articleIds } = job.data;

  const result = await classifyBatch(articleIds);

  console.log(
    `✅ Article Topics: ${result.articleTopicsCreated} | Classified: ${result.articlesClassified} | ${Date.now() - start}ms`
  );
}