

    import { ingestSource } from "../../services/ingestionService.js";

    export async function processRSSJob(job) {
        const start = Date.now();

        const {sourceId} = job.data;

        const result = await ingestSource(sourceId);

        console.log(
            `✅ ${result.source} | Inserted: ${result.inserted} | ${Date.now()-start}ms`
        );
    }