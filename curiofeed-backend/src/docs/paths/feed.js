const feedPaths = {
  "/api/v1/feed": {
    get: {
      tags: ["Feed"],

      summary: "Get personalized feed",

      description:
        "Returns a personalized ranked news feed based on the authenticated user's topic preferences.",

      security: [
        {
          BearerAuth: [],
        },
      ],

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
          description: "Personalized feed retrieved successfully.",
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

  "/api/v1/feed/explore": {
    get: {
      tags: ["Feed"],

      summary: "Get explore feed",

      description:
        "Returns a curated explore feed independent of user preferences.",

      security: [
        {
          BearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Explore feed retrieved successfully.",
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

  "/api/v1/feed/india": {
    get: {
      tags: ["Feed"],

      summary: "Get India feed",

      description:
        "Returns articles classified as India-related.",

      security: [
        {
          BearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "India feed retrieved successfully.",
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

  "/api/v1/feed/following": {
    get: {
      tags: ["Feed"],

      summary: "Get following feed",

      description:
        "Returns articles from sources followed by the authenticated user.",

      security: [
        {
          BearerAuth: [],
        },
      ],

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
          description: "Following feed retrieved successfully.",
        },

        400: {
          $ref: "#/components/responses/BadRequest",
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

export default feedPaths;