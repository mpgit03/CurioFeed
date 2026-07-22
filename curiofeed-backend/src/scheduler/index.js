import { startRSSScheduler } from "./rssScheduler.js";
import { startClassificationScheduler } from "./classificationScheduler.js";
import { schedulerLogger } from "../lib/logger.js";

export function startSchedulers() {
    schedulerLogger.info("Starting schedulers");

    startRSSScheduler();
    startClassificationScheduler();
}