// controllers/feedController.js

import prisma from "../lib/prisma.js";
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

    console.log(user.id);
    
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