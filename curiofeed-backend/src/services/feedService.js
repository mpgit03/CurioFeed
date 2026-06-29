import prisma from "../lib/prisma.js";

export async function getFeed({
  userId,
  limit = 20
}) {

  const userPreferences =
    await prisma.userPreference.findMany({
      where: {
        userId,
      },
      select: {
        topicId: true,
      },
    });

    console.log({
    userId,
    userPreferencesCount:
        userPreferences.length,
    });

    console.log(
  userPreferences.map(
    p => ({
      topicId: p.topicId,
    })
  )
);

  if (userPreferences.length === 0) {
    return [];
  }

  const preferredTopicIds =
    new Set(
      userPreferences.map(
        preference => preference.topicId
      )
    );

    console.log({
  preferredTopicIds:
    [...preferredTopicIds],
});

  const articles =
    await prisma.article.findMany({
      where: {
        articleTopics: {
          some: {
            topicId: {
              in: [...preferredTopicIds],
            },
          },
        },
      },

      include: {
        source: true,

        articleTopics: {
          where: {
            topicId: {
              in: [...preferredTopicIds],
            },
          },

          include: {
            topic: true,
          },
        },
      },

      take: 100,

      orderBy: {
        publishedAt: "desc",
      },
    });

    console.log({
  articlesFound:
    articles.length,
});

  const feed = [];

  for (const article of articles) {

    const matchingTopics =
      article.articleTopics.filter(
        topic =>
          preferredTopicIds.has(
            topic.topicId
          )
      );

    if (matchingTopics.length === 0) {
      continue;
    }

    const primaryConfidence =
      Math.max(
        ...matchingTopics.map(
          topic => topic.confidence
        )
      );

    const secondaryConfidence =
      matchingTopics
        .filter(
          topic =>
            topic.confidence !==
            primaryConfidence
        )
        .reduce(
          (sum, topic) =>
            sum + topic.confidence,
          0
        );

    const ageDays =
      (
        Date.now() -
        article.publishedAt.getTime()
      ) /
      (1000 * 60 * 60 * 24);

    const recencyBoost =
      Math.max(
        0,
        0.25 - ageDays * 0.01
      );

    const score =
      primaryConfidence +
      secondaryConfidence * 0.15 +
      recencyBoost;

    feed.push({
      ...article,
      score,
    });
  }

  feed.sort(
    (a, b) =>
      b.score - a.score
  );

  return feed.slice(0, limit);
}