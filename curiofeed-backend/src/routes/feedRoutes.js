
import express from "express";

import { requireAuth }
  from "../middleware/authMiddleware.js";

import {
  getExplore,
  getFeedController,
  getIndia,
}
  from "../controllers/feedController.js";
import resolveCurrentUser from "../middleware/currentUser.js";
import { getFollowingFeedController } from "../controllers/followController.js";

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

router.get(
  "/following",
  requireAuth,
  resolveCurrentUser,
  getFollowingFeedController

);

export default router;