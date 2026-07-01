import prisma from "../lib/prisma.js";

const MAX_PER_TOPIC = 3;
const MAX_PER_SOURCE = 2;
const CANDIDATE_LIMIT = 100;


function getPrimaryTopic(article) {
    if (article.articleTopics.length === 0) {
      return null;
    }

    return article.articleTopics.reduce((best, current) =>
      current.confidence > best.confidence ? current : best
    ).topicId;
  }

  
export async function getExploreFeed({ limit = 20 }) {
  const articles = await prisma.article.findMany({
    where: {
      topicsClassified: true,
    },

    include: {
      source: true,
      articleTopics: {
        include: {
          topic: true,
        },
      },
    },

    orderBy: {
      publishedAt: "desc",
    },

    take: CANDIDATE_LIMIT,
  });

  const explore = [];
  const skipped = [];

  
  const topicCounts = new Map();
  const sourceCounts = new Map();

  for (const article of articles) {
    const topicId = getPrimaryTopic(article);

    if (!topicId) {
      continue;
    }

    const sourceId = article.sourceId;

    const topicCount = topicCounts.get(topicId) ?? 0;
    const sourceCount = sourceCounts.get(sourceId) ?? 0;

    if (
      topicCount >= MAX_PER_TOPIC ||
      sourceCount >= MAX_PER_SOURCE
    ) {
      skipped.push(article);
      continue;
    }

    explore.push(article);

    topicCounts.set(topicId, topicCount + 1);
    sourceCounts.set(sourceId, sourceCount + 1);

    if (explore.length === limit) {
      break;
    }
  }

  // Second pass: relax diversity constraints if needed
  if (explore.length < limit) {
    for (const article of skipped) {
      if (explore.length === limit) {
        break;
      }

      explore.push(article);
    }
  }

  return explore;
}