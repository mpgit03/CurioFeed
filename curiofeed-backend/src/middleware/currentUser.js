import { ApiError } from "../utils/ApiError.js";
import prisma from "../lib/prisma.js";
import { asyncHandler } from "./asyncHandler.js";



export default resolveCurrentUser = asyncHandler( async(req,res,next) =>{
    const user = await prisma.user.findUnique({
            where:{
                clerkId:req.userId,
            },
        });

        if(!user){
            throw new ApiError(401,"User account no longer exists.");
        }

        req.user = user;
        next();
})