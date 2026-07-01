
import express from "express";

import { requireAuth }
  from "../middleware/authMiddleware.js";

import {
  getExplore,
  getFeedController,
}
  from "../controllers/feedController.js";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  getFeedController
);

router.get(
  "/explore",
  requireAuth,
  getExplore
);

export default router;