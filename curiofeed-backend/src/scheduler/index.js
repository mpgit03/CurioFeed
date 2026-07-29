import { startRSSScheduler } from "./rssScheduler.js";
import { startClassificationScheduler } from "./classificationScheduler.js";
import { schedulerLogger } from "../lib/logger.js";

export function startSchedulers() {
    schedulerLogger.info("Starting schedulers");

    const rssTask = startRSSScheduler();
    const classificationTask = startClassificationScheduler();

    return {
    stop() {
        rssTask.stop();
        classificationTask.stop();
    }
    };
}