const userPaths = {
  "/api/v1/users/preferences": {
    post: {
      tags: ["Users"],

      summary: "Update user preferences",

      description:
        "Updates the authenticated user's preferred topics and marks onboarding as completed.",

      security: [
        {
          BearerAuth: [],
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["topicIds"],
              properties: {
                topicIds: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  minItems: 1,
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Preferences updated successfully.",
        },

        400: {
          $ref: "#/components/responses/BadRequest",
        },

        401: {
          $ref: "#/components/responses/Unauthorized",
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

  "/api/v1/users/me/following": {
    get: {
      tags: ["Users"],

      summary: "Get followed sources",

      description:
        "Returns the list of news sources followed by the authenticated user.",

      security: [
        {
          BearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Followed sources retrieved successfully.",
        },

        401: {
          $ref: "#/components/responses/Unauthorized",
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

export default userPaths;