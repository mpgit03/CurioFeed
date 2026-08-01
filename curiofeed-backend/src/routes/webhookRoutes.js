import express from "express";
import { clerkWebhookHandler } from "../controllers/webhookController.js";

const router = express.Router();

router.post(
    "/",
    clerkWebhookHandler,
);

export default router;