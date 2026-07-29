import {z} from "zod";

export const updatePreferencesSchema = z.object({
    body: z.object({
        topicIds: z.array(z.cuid()).min(1),
    }),
    query: z.object({}),
    params: z.object({}),
});