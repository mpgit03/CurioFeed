import prisma from "../lib/prisma.js";
import cron from "node-cron";
import { enqueueRssIngestion } from "../producers/rssProducer.js";
import { RSS_CRON_SCHEDULE } from "../constants/rss.js";


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

    console.log({
        scheduled :sources.length,
    });

    return {
        scheduled: sources.length,
    };


    
}


export function startRSSScheduler() {
    cron.schedule(RSS_CRON_SCHEDULE, async () => {
        try {
            const result = await scheduleIngestion();

            console.log(
                `Scheduled ${result.scheduled} RSS jobs`
            );
        } catch (error) {
            console.error(error);
        }
    });
}