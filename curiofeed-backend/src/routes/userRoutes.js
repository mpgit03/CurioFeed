import express from "express";

import { requireAuth } from "../middleware/authMiddleware.js";

import { updatePreferences, } from "../controllers/userController.js";

const router = express.Router();

router.post(
"/preferences",
requireAuth,
updatePreferences
);

export default router;
