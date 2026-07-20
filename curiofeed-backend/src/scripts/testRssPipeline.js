import { scheduleIngestion } from "../scheduler/rssScheduler.js";
await scheduleIngestion();
console.log("rss scheduling completed");