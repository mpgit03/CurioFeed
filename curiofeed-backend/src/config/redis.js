import IORedis from "ioredis";

const redisConnection = process.env.REDIS_URL
  ? new IORedis(process.env.REDIS_URL, {
      maxRetriesPerRequest: null,
      connectTimeout: 3000,
      lazyConnect: true,
    })
  : new IORedis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      maxRetriesPerRequest: null,
      connectTimeout: 3000,
      lazyConnect: true,
    });

export default redisConnection;