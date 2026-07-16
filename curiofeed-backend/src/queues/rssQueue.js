import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const rssQueue = new Queue("rss-ingestion", {
    connection: redisConnection,
});

export default rssQueue;