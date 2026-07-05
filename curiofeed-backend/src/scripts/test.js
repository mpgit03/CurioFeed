import prisma from "../lib/prisma.js";


const articles = await prisma.article.findMany({
    where:{
        topicsClassified:true,
        isIndiaRelated:true,
    },
});

console.log(articles.length);