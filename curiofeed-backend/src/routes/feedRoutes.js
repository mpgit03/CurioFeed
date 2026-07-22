
import express from "express";

import { requireAuth }
  from "../middleware/authMiddleware.js";

import {
  getExploreFeedController,
  getFeedController,
  getIndiaFeedController,
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
  getExploreFeedController
);

router.get(
  "/india",
  requireAuth,
  getIndiaFeedController
);

router.get(
  "/following",
  requireAuth,
  resolveCurrentUser,
  getFollowingFeedController

);

export default router;