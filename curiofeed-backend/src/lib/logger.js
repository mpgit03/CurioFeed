import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: !isProduction
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

export const startupLogger = logger.child({ service: "startup" });
export const serverLogger = logger.child({ service: "server" });
export const schedulerLogger = logger.child({ service: "scheduler" });
export const rssWorkerLogger = logger.child({ service: "rss-worker" });
export const classificationWorkerLogger = logger.child({
  service: "classification-worker",
});
export const serviceLogger = logger.child({service:"ingestion-service"});
export const rssProcessorLogger = logger.child({
  service: "rss-processor",
});
export const classificationProcessorLogger = logger.child({
  service: "classification-processor",
});
export const redisLogger = logger.child({ service: "redis" });

export default logger;