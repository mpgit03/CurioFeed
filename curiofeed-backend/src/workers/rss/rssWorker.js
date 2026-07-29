import prisma from "../../lib/prisma.js";
import { Worker } from "bullmq";
import redisConnection from "../../config/redis.js";
import {  processRSSJob } from "./processor.js";
import rssQueue from "../../queues/rssQueue.js";
import { rssWorkerLogger } from "../../lib/logger.js";
import { registerWorkerShutdown } from "../../lib/shutdownWorker.js";


export const rssWorker = new Worker(
    rssQueue.name,
    processRSSJob,
    {
        connection: redisConnection,
    }
);

rssWorker.on("completed", (job) => {
  rssWorkerLogger.info(
    {
      jobId: job.id,
    },
    "RSS ingestion job completed"
  );
});

rssWorker.on("failed", (job, err) => {
  rssWorkerLogger.error(
    {
      jobId: job?.id,
      err,
    },
    "RSS ingestion job failed"
  );
});



registerWorkerShutdown({
    workerName: "RSS",
    worker: rssWorker,
    logger: rssWorkerLogger,
    prisma,
    redis: redisConnection,
});