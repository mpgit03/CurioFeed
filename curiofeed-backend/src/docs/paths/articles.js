const articlePaths = {
  "/api/v1/articles": {
    get: {
      tags: ["Articles"],

      summary: "Get articles",

      description:
        "Returns a paginated list of the latest articles ordered by publication date.",

      parameters: [
        {
          $ref: "#/components/parameters/Page",
        },
        {
          $ref: "#/components/parameters/Limit",
        },
      ],

      responses: {
        200: {
          description: "Articles retrieved successfully.",
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
                    $ref: "#/components/schemas/ArticleListResponse",
                  },
                },
              },
            },
          },
        },

        400: {
          $ref: "#/components/responses/BadRequest",
        },

        429: {
          $ref: "#/components/responses/TooManyRequests",
        },

        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/v1/articles/{articleId}": {
    get: {
      tags: ["Articles"],

      summary: "Get article by ID",

      description:
        "Returns the complete details of a single article.",

      parameters: [
        {
          $ref: "#/components/parameters/ArticleId",
        },
      ],

      responses: {
        200: {
          description: "Article retrieved successfully.",

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
                    $ref: "#/components/schemas/ArticleDetails",
                  },
                },
              },
            },
          },
        },

        400: {
          $ref: "#/components/responses/BadRequest",
        },

        404: {
          $ref: "#/components/responses/NotFound",
        },

        429: {
          $ref: "#/components/responses/TooManyRequests",
        },

        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/v1/articles/{articleId}/open": {
    get: {
      tags: ["Articles"],

      summary: "Open article",

      description:
        "Redirects the client to the original article URL.",

      parameters: [
        {
          $ref: "#/components/parameters/ArticleId",
        },
      ],

      responses: {
        302: {
          description: "Redirect to original article.",
        },

        404: {
          $ref: "#/components/responses/NotFound",
        },

        429: {
          $ref: "#/components/responses/TooManyRequests",
        },

        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};

export default articlePaths;