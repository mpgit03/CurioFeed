// controllers/feedController.js

import prisma from "../lib/prisma.js";
import { getExploreFeed } from "../services/exploreService.js";
import { getFeed } from "../services/feedService.js";


export async function getFeedController(
  req,
  res
) {

  try{
    const user = await prisma.user.findUnique({
        where:{
            clerkId:req.userId,
        }
    });

   if(!user){
    throw new Error("User does not exist");
   }


    const feed = await getFeed({
        userId: user.id,
        limit: 10,
    });

    res.status(200).json({
        success: true,
        feed,
    });
    }
  catch(error){
        res.status(404).json({
            success:false,
            message:error.message,
        });
    }



   
}

export async function getExplore(req,res) {
    try{
        const limit = Number(req.query.limit)||20;

        const articles = await getExploreFeed(limit);
        
        res.json({
            success:true,
           feed:articles
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Failed to load explore feed",
        });
        
    }
    
}