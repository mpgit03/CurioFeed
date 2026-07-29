    import {z} from "zod";

    export const getarticleSchema = z.object({
        query:z.object({
            page: z.coerce.number().int().min(1).default(1),
            limit : z.coerce.number().min(5).max(50).default(10),
        }),
        params : z.object({}),
        body : z.object({}),

    });

    export const getArticleByIdSchema = z.object({
        params: z.object({
            articleId: z.cuid(),
        }),
        query: z.object({}),
        body: z.object({}),
        });
