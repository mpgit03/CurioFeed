
import { buildRankedFeed } from "../helpers/FeedDiversity.js";
import prisma from "../lib/prisma.js";
import {CANDIDATE_WINDOW_SIZE} from "../constants/feed.js"
  
export async function getExploreFeed({ page = 1 ,limit = 20 ,cursor=null}) {
  

  const candidates = await prisma.article.findMany({
    where:{
      topicsClassified:true,
    },
    include: {
      source: true,
      articleTopics: {
        include: {
          topic: true,
        },
      },
    },

    orderBy: [
      {
        publishedAt:"desc",
      },
      {
        id:"desc",
      },
    ],

    take: CANDIDATE_WINDOW_SIZE,
  });

  const rankedFeed = buildRankedFeed(candidates,{})

  return rankedFeed;
}