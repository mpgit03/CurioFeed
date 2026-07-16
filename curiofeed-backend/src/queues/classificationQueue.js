import {  Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const classificationQueue  = new Queue(
    "classification-queue",
    {
        connection:redisConnection,
    }
);

export default classificationQueue;