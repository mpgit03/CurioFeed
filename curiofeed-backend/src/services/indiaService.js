import prisma from "../lib/prisma.js";
import { applyFeedDiversity } from "../helpers/FeedDiversity.js";
const CANDIDATE_LIMIT = 100;

export async function getIndiaFeed({
     page=1,
     limit = 20
}) {
    const articles = await prisma.article.findMany({
        where: {
            topicsClassified: true,
            isIndiaRelated: true,
        },
        include: {
            articleTopics: {
                include: {
                    topic: true,
                },  
            },
            source: true,
        },
        orderBy: {
            publishedAt: "desc",
        },
        take: CANDIDATE_LIMIT,
    });

    const diversified = await applyFeedDiversity(articles);
    
    const skip = (page-1)*limit;

    return diversified.slice( skip, skip + limit);

   
}