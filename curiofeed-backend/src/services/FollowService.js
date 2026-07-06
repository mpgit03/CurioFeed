import prisma from "../lib/prisma.js"

export async function followSource(userId,sourceId){
    try{

        const source = await prisma.source.findUnique({
            where:{
                id:sourceId,
            }
        })

        if(!source){ throw new Error("Source not Found");  }

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
            throw new Error("You already follow this source.");
        }

        throw error;
    }

}

export async function unfollowSource(userId, sourceId) {
    try
    {
        return prisma.userSourceFollow.delete({
        where: {
            userId_sourceId: {
                userId,
                sourceId,
            },
        },
    });
    }
    catch (error) {
    if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
    ) {
        throw new Error("You are not following this source.");
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