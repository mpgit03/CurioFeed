import fs from "fs/promises";

import prisma from "../lib/prisma.js";
import { persistArticleTopics } from "../services/articletopicService.js";
import { classifyArticles } from "../services/classificationService.js";


while (true) {

  try {

    const articles =
      await prisma.article.findMany({
        where: {
          topicsClassified: false,
        },
        take: 20,
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

    await persistArticleTopics(
      classifications
    );

    await new Promise(resolve =>
      setTimeout(resolve, 5000)
    );

  } catch (error) {

    console.error(error.message);

  if(error.status === 429){
    console.log(
      "Quota exhausted. Stopping backfill."
    );

    break;
  }

  continue;
  }
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