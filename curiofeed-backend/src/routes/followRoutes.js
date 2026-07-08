import express from "express"
import {requireAuth} from "../middleware/authMiddleware.js";
import resolveCurrentUser from "../middleware/currentUser.js";
import { getFollowedSources } from "../services/FollowService.js";
import { followSourceController, getFollowedSourcesController, unfollowSourceController } from "../controllers/followController.js";

const router =   express.Router();


router.post(
    "/:sourceId/follow",
    requireAuth,
    resolveCurrentUser,
    followSourceController
);

router.delete(
    "/:sourceId/follow",
    requireAuth,
    resolveCurrentUser,
    unfollowSourceController
);





export default router;