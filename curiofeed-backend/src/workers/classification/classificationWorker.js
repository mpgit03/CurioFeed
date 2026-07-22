import { Worker } from "bullmq";
import redisConnection from "../../config/redis.js";
import {  processClassificationJob } from "./processor.js";
import classificationQueue from "../../queues/classificationQueue.js";
import { classificationWorkerLogger } from "../../lib/logger.js";


  const worker = new Worker(
      classificationQueue.name,
      processClassificationJob,
      {
          connection: redisConnection,
      }
  );

 

  worker.on("failed", (job, err) => {
  classificationWorkerLogger.error(
    {
      jobId: job?.id,
      err,
    },
    "Classification job failed"
  );
});

  worker.on("error", (err) => {
  classificationWorkerLogger.fatal(
    { err },
    "Classification worker crashed"
  );
});
