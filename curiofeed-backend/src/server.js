import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import webhookRoutes from "./routes/webhookRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import topicRoutes from "./routes/topicRoutes.js";

import { clerkMiddleware } from "@clerk/express";
import { requireAuth } from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;


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

console.log(
  "PK:",
  process.env.CLERK_PUBLISHABLE_KEY
);

console.log(
  "SK:",
  process.env.CLERK_SECRET_KEY
    ? "present"
    : "missing"
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


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});