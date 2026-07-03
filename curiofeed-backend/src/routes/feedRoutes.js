
import express from "express";

import { requireAuth }
  from "../middleware/authMiddleware.js";

import {
  getExplore,
  getFeedController,
  getIndia,
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

router.get(
  "/india",
  requireAuth,
  getIndia
);

export default router;