  import dotenv from "dotenv";
  dotenv.config();
  
  import swaggerUi from "swagger-ui-express";
  import swaggerDocument from "./docs/swagger.js";
  import express from "express";
  import cors from "cors";
  import helmet from "helmet";
  import morgan from "morgan";
  import logger from "./lib/logger.js";
  import redisConnection from "./config/redis.js";
  import prisma from "./lib/prisma.js";
  import apiLimiter from "./middleware/rateLimiters.js";


  import healthRoutes from "./routes/healthRoutes.js";
  import webhookRoutes from "./routes/webhookRoutes.js";
  import userRoutes from "./routes/userRoutes.js"
  import topicRoutes from "./routes/topicRoutes.js";
  import articleRoutes from "./routes/articleRoutes.js";
  import feedRoutes from "./routes/feedRoutes.js"
  import followRoutes from "./routes/followRoutes.js"

  import { clerkMiddleware } from "@clerk/express";
  import { requireAuth } from "./middleware/authMiddleware.js";
  // import { startSchedulers } from "./scheduler/index.js";
  import { validateDependencies } from "./config/startup.js";
  import { errorHandler } from "./middleware/errorHandler.js";




  const app = express();
  const PORT = Number(process.env.PORT || 5000);
  let shuttingDown = false;


  app.use(morgan("dev"));

  app.use(
    "/api/v1/webhooks/clerk",
    express.raw({
      type: "application/json",
    }),
    webhookRoutes
  );


  // middleware
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(helmet());

  app.use(healthRoutes);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);





  // Clerk middleware
  app.use(clerkMiddleware());

  // test route
  app.get("/api/", (req, res) => {
    res.json({
      message: "CurioFeed API Running",
    });
  });

  // protected test route
  app.get(
    "/api/v1/protected",
    requireAuth,
    (req, res) => {
      res.json({
        success: true,
        userId: req.auth().userId,
        message: "Protected route works",
      });
    }
  );

  app.use(
    "/api/v1/users",
    userRoutes,
  );

  app.use(
    "/api/v1/topics",
    topicRoutes
  );

  app.use(
    "/api/v1/articles",
    articleRoutes
  );

  app.use(
    "/api/v1/feed",
    feedRoutes
  );


  app.use(
    "/api/v1/sources",
    followRoutes
  );


  app.use(errorHandler);

  async function shutdown(signal, server, schedulers) {
    if (shuttingDown) return;
    shuttingDown = true;

    try {
        logger.info({ signal }, "Shutting down...");

        logger.info("Stopping HTTP server...");
        await new Promise((resolve, reject) => {
            server.close(err => {
                if (err) return reject(err);
                resolve();
            });
        });

        logger.info("HTTP server stopped.");

        if (schedulers) {
            logger.info("Stopping schedulers...");
            await schedulers.stop();
            logger.info("Schedulers stopped.");
        }

        logger.info("Disconnecting Prisma...");
        await prisma.$disconnect();
        logger.info("Prisma disconnected.");

        logger.info("Disconnecting Redis...");
        await redisConnection.quit();
        logger.info("Redis disconnected.");

        logger.info("Shutdown complete.");
        process.exit(0);
    } catch (err) {
        logger.error({ err }, "Shutdown failed");
        process.exit(1);
    }
}


  async function startServer() {
    

    await validateDependencies();

    
    const { startSchedulers } = await import("./scheduler/index.js");

    const schedulers =
      process.env.ENABLE_SCHEDULERS === "true"
          ? startSchedulers()
          : null;

    const server = app.listen(PORT, () => {
      logger.info(
        {
          port: PORT,
          environment: process.env.NODE_ENV,
        },
        "Server started"
      );
    });

    return {server,schedulers,};
  }


  async function bootstrap(){
  const {server,schedulers} = await startServer();

  process.on("SIGINT", () => shutdown("SIGINT", server,schedulers));
  process.on("SIGTERM", () => shutdown("SIGTERM", server , schedulers));



  }




  bootstrap().catch((err)=>{
    logger.fatal({err},"Startup Failed...");
    process.exit(1);
  });

