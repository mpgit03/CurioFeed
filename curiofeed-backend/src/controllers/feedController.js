// controllers/feedController.js

import prisma from "../lib/prisma.js";
import { getExploreFeed } from "../services/exploreService.js";
import { getFeed } from "../services/feedService.js";
import { getIndiaFeed } from "../services/indiaService.js";


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
        const rankedArticles = await getExploreFeed({});
        
        res.json({
            success:true,
            feed:rankedArticles
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Failed to load explore feed",
        });
        
    }
    
}

export async function getIndia(req,res){
        try{
            const rankedArticles = await getIndiaFeed({});
            
            res.status(200).json({
                success:true,
                feed:rankedArticles,
            });
        }catch(error){
            console.log(error);
            res.status(500).json({
            success:false,
            message:"Failed to load india feed",
        });
        }
}