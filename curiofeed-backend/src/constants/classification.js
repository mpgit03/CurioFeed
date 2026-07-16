// constants/classification.js

export const CLASSIFICATION_MODEL = "gemini-2.5-flash";

export const CLASSIFICATION_BATCH_SIZE = 20;

export const CLASSIFICATION_MAX_BATCHES_PER_RUN = 2;

export const CLASSIFICATION_WORKER_CONCURRENCY = 1; 

export const CLASSIFICATION_JOB_ATTEMPTS = 5;

export const CLASSIFICATION_JOB_BACKOFF_MS = 15000;

export const CLASSIFICATION_CRON_SCHEDULE = "0 * * * *";