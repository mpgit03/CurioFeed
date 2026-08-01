const followPaths = {
  "/api/v1/sources/{sourceId}/follow": {
    post: {
      tags: ["Sources"],

      summary: "Follow source",

      description:
        "Follow a news source.",

      security: [
        {
          BearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "sourceId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "Source ID.",
        },
      ],

      responses: {
        201: {
          description: "Source followed successfully.",
        },

        401: {
          $ref: "#/components/responses/Unauthorized",
        },

        404: {
          $ref: "#/components/responses/NotFound",
        },

        409: {
          description: "Already following source.",
        },

        429: {
          $ref: "#/components/responses/TooManyRequests",
        },

        500: {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },

    delete: {
      tags: ["Sources"],

      summary: "Unfollow source",

      description:
        "Stop following a news source.",

      security: [
        {
          BearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "sourceId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description: "Source unfollowed successfully.",
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
};

export default followPaths;