import express from "express";

import { getAllTopics, } from "../controllers/topicController.js";
import { readLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();
router.use(readLimiter);
router.get(
  "/",
  getAllTopics
);

export default router;