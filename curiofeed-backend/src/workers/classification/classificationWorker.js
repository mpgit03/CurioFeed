
import prisma from "../../lib/prisma.js";
import { Worker } from "bullmq";
import redisConnection from "../../config/redis.js";
import {  processClassificationJob } from "./processor.js";
import classificationQueue from "../../queues/classificationQueue.js";
import { classificationWorkerLogger } from "../../lib/logger.js";
import { registerWorkerShutdown } from "../../lib/shutdownWorker.js";


  export const classificationWorker = new Worker(
      classificationQueue.name,
      processClassificationJob,
      {
          connection: redisConnection,
      }
  );

 

  classificationWorker.on("failed", (job, err) => {
  classificationWorkerLogger.error(
    {
      jobId: job?.id,
      err,
    },
    "Classification job failed"
  );
});

  classificationWorker.on("error", (err) => {
  classificationWorkerLogger.fatal(
    { err },
    "Classification worker crashed"
  );
});


registerWorkerShutdown({
    workerName: "Classification",
    worker: classificationWorker,
    logger: classificationWorkerLogger,
    prisma,
    redis: redisConnection,
});


