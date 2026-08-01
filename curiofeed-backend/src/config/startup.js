import prisma from "../lib/prisma.js";
import redisConnection from "../config/redis.js";
import  logger  from "../lib/logger.js";

const startupLogger = logger.child({
  service: "startup",
});

export async function validateDependencies() {
  startupLogger.info("Validating application dependencies...");

  await prisma.$queryRaw`SELECT 1`;
  startupLogger.info("PostgreSQL connected");

  try {
 if (redisConnection.status === "wait") {
    await redisConnection.connect();
}

await redisConnection.ping();

  startupLogger.info("Redis connected");
  } catch (err) {
    startupLogger.fatal({ err }, "Redis connection failed");
  process.exit(1);
  }

  startupLogger.info("Startup validation complete");
}