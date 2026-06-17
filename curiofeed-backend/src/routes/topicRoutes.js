import express from "express";

import { getAllTopics, } from "../controllers/topicController.js";

const router = express.Router();

router.get(
  "/",
  getAllTopics
);

export default router;