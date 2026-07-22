import prisma from "../lib/prisma.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { followSource,unfollowSource,getFollowedSources, getFollowingFeed } from "../services/FollowService.js";

export const followSourceController = asyncHandler( async (req,res) => {
        
        const { sourceId } = req.params;

        const follow = await followSource(
            req.user.id,
            sourceId,
        );

        res.status(201).json({
            success: true,
            message: `You are now following ${follow.source.name}.`,
        });
        
        
    });


export const unfollowSourceController =  asyncHandler( async (req,res) => {
        
            const { sourceId } = req.params;

            const follow = await unfollowSource(
                req.user.id,
                sourceId,
            );

            res.status(200).json({
                success:true,
                message:`You have unfollowed ${follow.source.name}.`,
            })
 
    });


export const getFollowedSourcesController = asyncHandler( async(req,res)=>{
        const followedSources = await getFollowedSources(req.user.id);

        res.status(200).json({
            success: true,
            followedSources,
        });
    })
    

export const getFollowingFeedController = asyncHandler( async(req,res) =>{
    const rankedArticles = await getFollowingFeed({
                userId: req.user.id,
            });
           
            
            res.status(200).json({
                success:true,
                feed:rankedArticles,
            });
})
