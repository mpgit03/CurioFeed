

    import { ingestSource } from "../../services/ingestionService.js";
    import { rssProcessorLogger } from "../../lib/logger.js";

    export async function processRSSJob(job) {
        const start = Date.now();

        const {sourceId} = job.data;

        const result = await ingestSource(sourceId);

        rssProcessorLogger.info(
        {
            sourceId,
            source: result.source,
            inserted: result.inserted,
            duration: Date.now() - start,
        },
        "RSS source processed"
        );
    }