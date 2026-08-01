import express from "express"
import {requireAuth} from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { followschema ,unfollowSchema } from "../validators/follow.validator.js";
import resolveCurrentUser from "../middleware/currentUser.js";
import { followSourceController, getFollowedSourcesController, unfollowSourceController } from "../controllers/followController.js";
import { writeLimiter } from "../middleware/rateLimiters.js";

const router =   express.Router();

router.use(writeLimiter);


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