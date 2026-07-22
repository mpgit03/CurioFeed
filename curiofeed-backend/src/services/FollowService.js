import prisma from "../lib/prisma.js"
import {CANDIDATE_WINDOW_SIZE} from "../constants/feed.js"
import {buildRankedFeed} from "../helpers/FeedDiversity.js"
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";

export async function followSource(userId,sourceId){
    try{

        const source = await prisma.source.findUnique({
            where:{
                id:sourceId,
            }
        })

        if(!source){ throw new ApiError(404,"Source not Found");  }

        return await prisma.userSourceFollow.create({
        data:{
            userId,
            sourceId,   
        },
        include:{
            source:true,
        },
    });
    }catch(error){
         if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new ApiError(409,"You already follow this source.");
        }

        throw error;
    }

}

export async function unfollowSource(userId, sourceId) {
    try
    {
        return await prisma.userSourceFollow.delete({
        where: {
            userId_sourceId: {
                userId,
                sourceId,
            },
            
        },
        include:{
                source:true,
            }
    });
    }
    catch (error) {
    if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
    ) {
        throw new ApiError(404,"You are not following this source.");
    }

    throw error;
}
}

export async function getFollowedSources(userId) {
    const follows = await prisma.userSourceFollow.findMany({
        where: {
            userId,
        },
        include: {
            source: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return follows.map((follow) => ({
        ...follow.source,
        followedAt: follow.createdAt,
    }));
}



export async function getFollowingFeed({userId}) {

 
    const follows =  await prisma.userSourceFollow.findMany({
        where:{
            userId,
        },
        select:{
            sourceId:true,
        },
        
    });

    const sourceIds = follows.map( follow=>follow.sourceId );
    
    if (sourceIds.length === 0) {
        return [];
    }

    const candidates = await prisma.article.findMany({
            where: {
                topicsClassified: true,
                sourceId: {
                    in: sourceIds,
                },
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
  
 