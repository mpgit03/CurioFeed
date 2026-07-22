// controllers/feedController.js

import { ApiError } from "../utils/ApiError.js"
import prisma from "../lib/prisma.js";
import { getExploreFeed } from "../services/exploreService.js";
import { getFeed } from "../services/feedService.js";
import { getIndiaFeed } from "../services/indiaService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";


export const getFeedController = asyncHandler( async(req,res) =>{
    const user = await prisma.user.findUnique({
        where:{
            clerkId:req.userId,
        }
    });

   if(!user){
    throw new ApiError(404,"User does not exist");
   }

   const page =
        Number(req.query.page) || 1;

    const limit =
        Number(req.query.limit) || 20;

    const {cursor} = req.query;


    const feed = await getFeed({
        userId: user.id,
        page,
        limit,
        cursor
    });

    res.status(200).json({
        success: true,
        feed,
    });
    
})



export const getExploreFeedController = asyncHandler( async(req,res) => {
    
        const rankedArticles = await getExploreFeed({});
        
        res.json({
            success:true,
            feed:rankedArticles
        });
    
});

export const getIndiaFeedController = asyncHandler ( async(req,res) =>{
            const rankedArticles = await getIndiaFeed({});
            
            res.status(200).json({
                success:true,
                feed:rankedArticles,
            });
        
});