import { Worker } from "bullmq";
import redisConnection from "../../config/redis.js";
import {  processRSSJob } from "./processor.js";
import rssQueue from "../../queues/rssQueue.js";
import { rssWorkerLogger } from "../../lib/logger.js";


const worker = new Worker(
    rssQueue.name,
    processRSSJob,
    {
        connection: redisConnection,
    }
);

worker.on("completed", (job) => {
  rssWorkerLogger.info(
    {
      jobId: job.id,
    },
    "RSS ingestion job completed"
  );
});

worker.on("failed", (job, err) => {
  rssWorkerLogger.error(
    {
      jobId: job?.id,
      err,
    },
    "RSS ingestion job failed"
  );
});

