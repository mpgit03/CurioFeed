import express from "express"
import {requireAuth} from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { followschema ,unfollowSchema } from "../validators/follow.validator.js";
import resolveCurrentUser from "../middleware/currentUser.js";
import { getFollowedSources } from "../services/FollowService.js";
import { followSourceController, getFollowedSourcesController, unfollowSourceController } from "../controllers/followController.js";

const router =   express.Router();


router.post(
    "/:sourceId/follow",
    requireAuth,
    resolveCurrentUser,
    validate(followschema),
    followSourceController
);

router.delete(
    "/:sourceId/follow",
    requireAuth,
    resolveCurrentUser,
    validate(unfollowSchema),
    unfollowSourceController
);





export default router;