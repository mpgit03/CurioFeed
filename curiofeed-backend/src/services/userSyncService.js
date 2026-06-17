import prisma from "../lib/prisma.js";

export const syncUser = async(userData) =>{
     const {
        id: clerkId,
        email_addresses,
        first_name,
        image_url,
    } = userData;

    const email = email_addresses?.[0]?.email_address || "";

    const name = first_name || "";

    const imageUrl = image_url || "";

    const user = await prisma.user.upsert({
        where:{
            clerkId,
        },
        update:{
            email,
            name,
            imageUrl,
        },
        create:{
            clerkId,
            email,
            name,
            imageUrl,

        },
    });
    return user;

};

export const deleteUser = async(clerkId)=>{
    return await prisma.user.delete({
        where:{clerkId},
    });
};

