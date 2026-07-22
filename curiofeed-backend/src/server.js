import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./lib/logger.js"


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


async function startServer() {

  await validateDependencies();

  const { startSchedulers } = await import("./scheduler/index.js");

  if (process.env.ENABLE_SCHEDULERS === "true") {
    startSchedulers();
  }

  app.listen(PORT, () => {
    logger.info(
      {
        port: PORT,
        environment: process.env.NODE_ENV,
      },
      "Server started"
    );
  });
}

startServer().catch((err) => {
  logger.fatal({ err }, "Startup failed");
  process.exit(1);
});

