import prisma from "../lib/prisma.js";
import { enqueueClassification } from "../producers/classificationProducer.js";
import { chunk } from "../utils/chunk.js";

import {
  CLASSIFICATION_BATCH_SIZE,
  CLASSIFICATION_MAX_BATCHES_PER_RUN,
  CLASSIFICATION_CRON_SCHEDULE,
} from "../constants/classification.js";

export async function scheduleClassification() {
  
  const articles = await prisma.article.findMany({
    where: {
      topicsClassified: false,
    },
    select: {
      id: true,
    },
    orderBy: {
      publishedAt: "asc",
    },
    take:
    CLASSIFICATION_BATCH_SIZE *
    CLASSIFICATION_MAX_BATCHES_PER_RUN
  });

  // Extract IDs
  const articleIds = articles.map((article) => article.id);

  // Create batches
  const batches = chunk(articleIds, CLASSIFICATION_BATCH_SIZE);

  // Don't enqueue more than our configured budget
  const batchesToSchedule = batches
    .filter(batch => batch.length === CLASSIFICATION_BATCH_SIZE)
    .slice(0, CLASSIFICATION_MAX_BATCHES_PER_RUN);

  await Promise.all(
    batchesToSchedule.map(batch =>
      enqueueClassification(batch)
    )
  );

  return {
    scheduled: batchesToSchedule.length,
    remainingArticles:
      articleIds.length -
      batchesToSchedule.length * CLASSIFICATION_BATCH_SIZE,
  };
}



export function startClassificationScheduler() {
    cron.schedule(CLASSIFICATION_CRON_SCHEDULE, async () => {
        try {
            const result = await scheduleClassification();

            console.log(
                `Scheduled ${result.scheduled} classification jobs`
            );
        } catch (error) {
            console.error(error);
        }
    });
}