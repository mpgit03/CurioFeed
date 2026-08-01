const topicPaths = {
  "/api/v1/topics": {
    get: {
      tags: ["Topics"],

      summary: "Get all topics",

      description:
        "Returns all available topics ordered alphabetically.",

      responses: {
        200: {
          description: "Topics retrieved successfully.",

          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },

                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },

                        name: {
                          type: "string",
                        },

                        slug: {
                          type: "string",
                        },

                        createdAt: {
                          type: "string",
                          format: "date-time",
                        },

                        updatedAt: {
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

        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};

export default topicPaths;