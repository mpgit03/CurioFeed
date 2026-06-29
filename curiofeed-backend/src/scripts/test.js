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
 
// const response = await prisma.userPreference.findMany({
//   where: {
//     userId: "user_3FHCbeCfoRXbk7Mwf48J3a61M1h",
//   },
//   include: {
//     topic: true,
//   },
// });

// console.log(response);

const response = await prisma.article.findMany({
  where:{
    topicsClassified:true,
  }
});

console.log(response.length
);