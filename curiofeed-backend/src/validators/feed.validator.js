import { z } from "zod";
import { paginationQuerySchema } from "./common.validator.js";

export const getFeedSchema = z.object({
  query: paginationQuerySchema,
  params: z.object({}),
  body: z.object({}),
});

