import prisma from "../lib/prisma.js";
import cron from "node-cron";
import { enqueueRssIngestion } from "../producers/rssProducer.js";
import { RSS_CRON_SCHEDULE } from "../constants/rss.js";
import { schedulerLogger } from "../lib/logger.js";


export async function scheduleIngestion() {

    const sources = await prisma.source.findMany({
        where:{
            isActive:true,
        },
        select: {
            id: true,
        }
    });

    await Promise.all(
        sources.map(source =>
            enqueueRssIngestion(source.id)
        )
    );


    return {
        scheduled: sources.length,
    };


    
}


export function startRSSScheduler() {
    cron.schedule(RSS_CRON_SCHEDULE, async () => {
        try {
            const result = await scheduleIngestion();

            schedulerLogger.info(
                {
                scheduledJobs: result.scheduled,
                },
                "RSS ingestion jobs scheduled"
            );
        } catch (error) {
            schedulerLogger.error(
            { err: error },
            "Failed to schedule RSS ingestion jobs"
            );
        }
    });
}