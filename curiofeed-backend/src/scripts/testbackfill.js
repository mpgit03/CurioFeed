import fs from "fs/promises";

import prisma from "../lib/prisma.js";
import { persistArticleTopics } from "../services/articletopicService.js";
import { classifyArticles } from "../services/classificationService.js";



while (true) {

  const articles =
    await prisma.article.findMany({
      where: {
        topicsClassified: false,
      },
      take: 30,
      orderBy: {
        publishedAt: "desc",
      },
    });

  if (articles.length === 0) {
    break;
  }

  const payload =
    articles.map(article => ({
      articleId: article.id,
      title: article.title,
      description: article.description,
    }));

  const start = Date.now();

  const classifications =
    await classifyArticles(payload);

  const responseTime =
    Date.now() - start;

  console.log({
    articles: articles.length,
    responseTime,
  });

  
console.log({
  articlesFetched: articles.length,
  classificationsReturned:
    classifications.length,
});

  await persistArticleTopics(
    classifications
  );
  break;


}

await prisma.$disconnect();



/* await fs.writeFile(
  "classification-output.json",
  JSON.stringify(
    allResults,
    null,
    2
  )
);
 */