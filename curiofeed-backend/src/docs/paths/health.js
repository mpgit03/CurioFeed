const healthPaths = {
  "/health": {
    get: {
      tags: ["Health"],

      summary: "Health check",

      description:
        "Returns the application's health status, uptime, and current server timestamp.",

      responses: {
        200: {
          description: "Application is healthy.",

          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },

                  status: {
                    type: "string",
                    example: "ok",
                  },

                  uptime: {
                    type: "number",
                    example: 1543.72,
                  },

                  timestamp: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default healthPaths;