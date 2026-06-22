import prisma from "../lib/prisma.js";
import fs from "fs/promises";
import { classifyArticles} from "../services/classificationService.js";

const articles = await prisma.article.findMany({
  take:5,
  where:{
    source:{
      category:{
         in:["HUMANITIES","DESIGN"],
      }
    }
  },
  orderBy:{
    publishedAt:"desc",
  }
});



for(const article of articles){
  console.log({
    articeId:article.id,
    title:article.title,
    description:article.description,

  });
};



const payload = articles.map(article=>({
  
  articleId:article.id,
  title:article.title,
  description:article.description,
})
);

const start = Date.now();

const result =  await classifyArticles(payload);

// await fs.writeFile(
//   "classification-output.json",
//   result
// );
console.log(result);  

const responseTime = Date.now() - start;

await prisma.$disconnect();