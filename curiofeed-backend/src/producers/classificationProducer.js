import classificationQueue from "../queues/classificationQueue.js";
import {CLASSIFICATION_JOB_BACKOFF_MS } from "../constants/classification.js"



export async function enqueueClassification(articleIds){
    await classificationQueue.add(
        "classify-batch",
        {
            articleIds,
        },
        {
        attempts: 5,

        backoff: {
            type: "exponential",
            delay: CLASSIFICATION_JOB_BACKOFF_MS,
        },

        removeOnComplete: 100,

        removeOnFail: 500,
    }

    );
};
