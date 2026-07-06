    import prisma from "../lib/prisma.js";
    import { followSource,unfollowSource,getFollowedSources } from "../services/FollowService.js";

    export async function followSourceController(req,res,next){
        try{
        const { sourceId } = req.params;

        const follow = await followSource(
            req.user.id,
            sourceId,
        );

        res.status(201).json({
            success: true,
            message: `You are now following ${follow.source.name}.`,
        });
        }
        catch(error){
            next(error);
        }

    }


    export async function unfollowSourceController(req,res,next) {
        try{
            const { sourceId } = req.params;

            const follow = await unfollowSource(
                req.user.id,
                sourceId,
            );

            res.status(200).json({
                success:true,
                message:`You have unfollowed ${follow.source.name}.`,
            })

            
        }catch(error){
            next(error);
        }
        
    };

    export async function getFollowedSourcesController(req, res, next) {
    try {
        const followedSources = await getFollowedSources(req.user.id);

        res.status(200).json({
            success: true,
            followedSources,
        });
    } catch (error) {
        next(error);
    }
}