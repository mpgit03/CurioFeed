import prisma from "../src/lib/prisma.js";
import {
  seedTopics,
  seedSources,
} from "./seed/index.js";

async function main() {
  try {
    //  await seedTopics();
      // await seedSources();

    /* verify seeding 

    const response = await prisma.source.findMany({
      select: {
        name: true,
        category: true,
      },
    });

     console.log(response); */

     /* await prisma.source.update({
      where:{
        id:"cmqkoblcy000bujo0du6tcmco"
      },
      data:{
        rssUrl:"https://www.a16z.news/feed"
      }
     }); */

    

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();