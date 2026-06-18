import prisma from "../lib/prisma.js";
import { fetchFeed } from "./rssService.js";

const MAX_ARTICLE_AGE_DAYS = 90;

export async function ingestSource(source) {
  const articles = await fetchFeed(source.rssUrl);
  console.log(articles[0]);
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - MAX_ARTICLE_AGE_DAYS);

  const recentArticles = articles.filter((article)=>
    article.publishedAt && article.publishedAt >= cutoffDate);

  const urls = recentArticles.map(
  (article) => article.url
  );

    const existingArticles = await prisma.article.findMany({
      where: {
        url: {
          in: urls
        }
      },
      select: {
        url: true
      }
    });

    const existingUrls = new Set(
      existingArticles.map((article) => article.url)
    );

    const newArticles = recentArticles.filter(
      (article) => !existingUrls.has(article.url)
    );

    const articleData = newArticles.map(
    (article) => ({
        title: article.title,
        description: article.description,

        url: article.url,

        author: article.author,

        imageUrl: article.imageUrl,

        publishedAt: article.publishedAt,

        rawContent: article.rawContent,

        sourceId: source.id,
    })
);

    if (articleData.length > 0) {
    await prisma.article.createMany({
        data: articleData,
        skipDuplicates: true,
    });
    }


    return {
    source: source.name,

    fetched: articles.length,

    recent: recentArticles.length,

    existing: existingUrls.size,

    inserted: articleData.length,
    };
}


export async function ingestAllSources() {
  const sources = await prisma.source.findMany({
    where: {
      isActive: true,
    },
  });

  const results = await Promise.allSettled(
    sources.map((source) => ingestSource(source))
  );

  let successfulSources = 0;
  let totalFetched = 0;
  let totalInserted = 0;
  let failedSources = 0;

  for (const result of results) {
    if (result.status === "fulfilled") {
      successfulSources++;

      totalFetched += result.value.fetched;
      totalInserted += result.value.inserted;

      console.log(
        `✅ ${result.value.source} | Fetched: ${result.value.fetched} | Recent: ${result.value.recent} | Existing: ${result.value.existing} | Inserted: ${result.value.inserted}`
      );
    } else {
      failedSources++;

      console.error(
        `❌ Source ingestion failed:`,
        result.reason.message || result.reason
      );
    }
  }

  return {
    totalSources: sources.length,
    successfulSources,
    failedSources,
    totalFetched,
    totalInserted,
  };
}