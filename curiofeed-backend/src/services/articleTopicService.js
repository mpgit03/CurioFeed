import prisma from "../lib/prisma.js";

export async function persistArticleTopics(
  classifications
) {

  const topics =
    await prisma.topic.findMany();

  const topicMap =
    new Map(
      topics.map(topic => [
        topic.name.toUpperCase(),
        topic.id,
      ])
    );

  const articleTopicRows = [];

  const classifiedArticleIds =
    new Set();

  for (const classification of classifications) {

    classifiedArticleIds.add(
      classification.articleId
    );

    for (const topic of classification.topics) {

      const topicId =
        topicMap.get(
          topic.topic.toUpperCase()
        );

      if (!topicId) continue;

      articleTopicRows.push({
        articleId:
          classification.articleId,

        topicId,

        confidence:
          topic.confidence,
        classifiedBy: "AI",
      });
    }
  }

  await prisma.articleTopic.createMany({
    data: articleTopicRows,
    skipDuplicates: true,
  });

  await prisma.$transaction(
  classifications.map(classification =>
    prisma.article.update({
      where: {
        id: classification.articleId,
      },
      data: {
        topicsClassified: true,
        isIndiaRelated: classification.isIndiaRelated,
      },
    })
  )
);

  console.log({
  articleTopicRows:
    articleTopicRows.length,

  classifiedArticles:
    classifiedArticleIds.size,
});

  return {
    articleTopicsCreated:
      articleTopicRows.length,

    articlesClassified:
      classifiedArticleIds.size,
  };
}