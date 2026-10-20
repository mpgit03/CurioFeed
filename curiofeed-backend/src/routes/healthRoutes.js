// routes/health.js
import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

export default router;