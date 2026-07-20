// // import prisma from "../lib/prisma.js";


// // const articles = await prisma.article.findMany({
// //     where:{
// //         topicsClassified:true,
// //         isIndiaRelated:true,
// //     },
// // });

// // console.log(articles.length);

// import classificationQueue from "../queues/classificationQueue.js";
// import rssQueue from "../queues/rssQueue.js";

// console.log(await classificationQueue.getJobCounts());
// console.log(await rssQueue.getJobCounts());
// /* 
// const failed = await classificationQueue.getFailed();

// console.log(
//     failed.map(job => ({
//         id: job.id,
//         attemptsMade: job.attemptsMade,
//         failedReason: job.failedReason,
//     }))
// ); */
import logger from "../lib/logger.js";

logger.info("Server starting...");
logger.warn("Redis not connected");
logger.error("Gemini failed");