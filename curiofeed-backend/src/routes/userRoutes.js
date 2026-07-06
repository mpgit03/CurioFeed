import express from "express";

import { requireAuth } from "../middleware/authMiddleware.js";

import { updatePreferences, } from "../controllers/userController.js";
import resolveCurrentUser from "../middleware/currentUser.js";
import { getFollowedSourcesController } from "../controllers/followController.js";

const router = express.Router();

router.post(
"/preferences",
requireAuth,
updatePreferences
);

router.get(
    "/me/following",
    requireAuth,
    resolveCurrentUser,
    getFollowedSourcesController

)

export default router;
