
import express from "express";

import { requireAuth }
  from "../middleware/authMiddleware.js";

import {
  getFeedController,
}
  from "../controllers/feedController.js";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  getFeedController
);

export default router;