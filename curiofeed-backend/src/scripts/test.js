import { fetchFeed } from "../services/rssService.js";
import prisma from "../lib/prisma.js";
import { ingestSource,ingestAllSources } from "../services/ingestionService.js";
import { getArticles } from "../services/articleService.js";

// const articles = await fetchFeed(
//   "https://openai.com/news/rss.xml"
// );
// console.log(articles.length);

// console.log(articles[0]);

//  ingestAllSources();

//  get articles with source and category
/* 
 const stats = await prisma.source.findMany({
  select: {
    name: true,
    category: true,
    _count: {
      select: {
        articles: true,
      },
    },
  },
});

console.table(
  stats.map(source => ({
    source: source.name,
    category: source.category,
    articles: source._count.articles,
  }))
);  */
 
/* const sources= await prisma.source.findMany();

console.table(
  sources.map(s => ({
    name:s.name,
    category:s.category,
  }))
); */

// const articles =
//   await prisma.article.findMany({
//     take: 10,
//     where: {
//       topicsClassified: true,
//     },
//     select: {
//       title: true,
//       articleTopics: {
//         select: {
//           confidence: true,
//           topic: {
//             select: {
//               name: true,
//             },
//           },
//         },
//       },
//     },
//   });

// console.dir(articles, { depth: null });

const topics = await prisma.topic.findMany({
  select: {
    name: true,
    _count: {
      select: {
        articleTopics: true,
      },
    },
  },
});

console.table(
  topics.map(topic => ({
    topic: topic.name,
    articles: topic._count.articleTopics,
  }))
);





// const result = await getArticles({ page: 1, limit: 10 });
// console.log(result);