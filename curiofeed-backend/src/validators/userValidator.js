import { z } from "zod";

export const updatePreferencesSchema =
  z.object({
    topicIds: z
      .array(z.string().uuid())
      .min(1)
      .max(10)
      .refine(
        (topicIds) =>
          topicIds.length ===
          new Set(topicIds).size,
        {
          message:
            "Duplicate topics are not allowed",
        }
      ),
  });