import { Worker } from "bullmq";
import redisConnection from "../../config/redis.js";
import {  processClassificationJob } from "./processor.js";
import classificationQueue from "../../queues/classificationQueue.js";


const worker = new Worker(
    classificationQueue.name,
    processClassificationJob,
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

worker.on("error", (err) => {
  console.error(err);
});
