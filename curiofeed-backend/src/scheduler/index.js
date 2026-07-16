import { startRSSScheduler } from "./rssScheduler.js";
import { startClassificationScheduler } from "./classificationScheduler.js";

export function startSchedulers() {
    console.log("Starting schedulers...");

    startRSSScheduler();
    startClassificationScheduler();
}