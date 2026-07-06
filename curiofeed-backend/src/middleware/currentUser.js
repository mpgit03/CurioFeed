import prisma from "../lib/prisma.js";

export default async function resolveCurrentUser(req,res,next){
    try{
        const user = await prisma.user.findUnique({
            where:{
                clerkId:req.userId,
            },
        });

        if(!user){
            throw new Error("User not found");
        }

        req.user = user;
        // req.user = Object.freeze(user);
        next();
    }
    catch(error){
        next(error);
    }
};