import prisma from "../lib/prisma.js";
import { classifyArticle } from "../services/classificationService.js";

const articles =
  await prisma.article.findMany({
    take: 20,

    include: {
      source: true,
    },

    orderBy: {
      publishedAt: "desc",
    },
  });

for (const article of articles) {
  console.log("\n");
  console.log(article.title);

  console.log(
    classifyArticle(article)
  );
}

await prisma.$disconnect();