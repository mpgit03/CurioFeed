import { Worker } from "bullmq";
import redisConnection from "../../config/redis.js";
import {  processRSSJob } from "./processor.js";
import rssQueue from "../../queues/rssQueue.js";


const worker = new Worker(
    rssQueue.name,
    processRSSJob,
    {
        connection: redisConnection,
    }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed`);
  console.error(err);
});

