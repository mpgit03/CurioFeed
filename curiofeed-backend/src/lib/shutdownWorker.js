export function registerWorkerShutdown({
    workerName,
    worker,
    logger,
    prisma,
    redis,
}) {
    let isShuttingDown = false;

    async function shutdown(signal) {
        if (isShuttingDown) return;

        isShuttingDown = true;

        logger.info({ signal }, `Shutting down ${workerName} worker...`);

        try {
            await worker.close();
            logger.info("BullMQ worker closed.");

            await prisma.$disconnect();
            logger.info("Prisma disconnected.");

            await redis.quit();
            logger.info("Redis disconnected.");
            logger.info("Exiting process...");
            process.exit(0);
        } catch (err) {
            logger.fatal(
                { err },
                `${workerName} worker shutdown failed`
            );

            process.exit(1);
        }
    }

    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));
}