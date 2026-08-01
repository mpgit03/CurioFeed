const webhookPaths = {
  "/api/v1/webhooks/clerk": {
    post: {
      tags: ["Webhooks"],

      summary: "Clerk webhook",

      description:
        "Processes Clerk user lifecycle events and synchronizes users with CurioFeed.",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Webhook processed successfully.",
        },

        400: {
          description:
            "Webhook verification failed or missing headers.",
        },

        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};

export default webhookPaths;