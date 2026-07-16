import { ingestSource } from "../services/ingestionService.js";
import rssQueue from "../queues/rssQueue.js";


export async function enqueueRssIngestion(sourceId){
    await rssQueue.add(
    "rss-ingestion",
    {
        sourceId,
    },
    {
        attempts: 5,

        backoff: {
            type: "exponential",
            delay: 5000,
        },

        removeOnComplete: 100,

        removeOnFail: 500,
    }
);
}