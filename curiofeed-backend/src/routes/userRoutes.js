import express from "express";

import { requireAuth } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { getFollowedSourcesSchema } from "../validators/follow.validator.js";
import { updatePreferencesSchema } from "../validators/preference.validator.js"

import { updatePreferences, } from "../controllers/userController.js";
import resolveCurrentUser from "../middleware/currentUser.js";
import { getFollowedSourcesController } from "../controllers/followController.js";
import { generalLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.use(generalLimiter);

router.post(
"/preferences",
requireAuth,
validate(updatePreferencesSchema),
updatePreferences
);

router.get(
    "/me/following",
    requireAuth,
    resolveCurrentUser,
    validate(getFollowedSourcesSchema),
    getFollowedSourcesController

)

export default router;
