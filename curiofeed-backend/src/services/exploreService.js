import { applyFeedDiversity } from "../helpers/FeedDiversity.js";
import prisma from "../lib/prisma.js";


const CANDIDATE_LIMIT = 100;

  
export async function getExploreFeed({ page = 1 ,limit = 20 }) {
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

  const diversified =
    applyFeedDiversity(
        articles,
        CANDIDATE_LIMIT
    );

  const skip =
      (page - 1) * limit;

  return diversified.slice(
      skip,
      skip + limit
  );
}