import {z} from "zod";

export const followschema = z.object({
    params: z.object({
        sourceId: z.cuid(),
    }),
    query: z.object({}),
    body: z.object({}),
});

export const unfollowSchema = z.object({
    params: z.object({
        sourceId: z.cuid(),
    }),
    query: z.object({}),
    body: z.object({}),
});

export const getFollowedSourcesSchema = z.object({
    params: z.object({}),
    query: z.object({}),
    body: z.object({}),
});

export const getFollowingFeedSchema = z.object({
    params: z.object({}),
    query: z.object({}),
    body: z.object({}),
});