import prisma from "../lib/prisma.js";
import { buildRankedFeed } from "../helpers/FeedDiversity.js";
import { CANDIDATE_WINDOW_SIZE } from "../constants/feed.js";

export async function getIndiaFeed({}) {
    const candidates = await prisma.article.findMany({
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
        take: CANDIDATE_WINDOW_SIZE,
    });

    const rankedFeed = buildRankedFeed(candidates,{});

    return rankedFeed;
   
}