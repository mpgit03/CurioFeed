
import express from "express";

import { requireAuth }
  from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { getFollowingFeedSchema } from "../validators/follow.validator.js";

import {
  getExploreFeedController,
  getFeedController,
  getIndiaFeedController,
}
  from "../controllers/feedController.js";
import resolveCurrentUser from "../middleware/currentUser.js";
import { getFollowingFeedController } from "../controllers/followController.js";
import { readLimiter } from "../middleware/rateLimiters.js";
import { getFeedSchema } from "../validators/feed.validator.js";

const router = express.Router();

router.use(readLimiter);



router.get(
  "/",
  requireAuth,
  validate(getFeedSchema),
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
  validate(getFollowingFeedSchema),
  getFollowingFeedController

);

export default router;