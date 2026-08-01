const articlePaths = {
    "/api/v1/articles": {
        get: {
            tags: ["Articles"],

            summary: "Get articles",

            description:
                "Returns a paginated list of articles.",

            parameters: [
                    {
                        name: "page",
                        in: "query",
                        description: "Page number.",
                        required: false,
                        schema: {
                            type: "integer",
                            minimum: 1,
                            default: 1,
                        },
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "Number of articles per page.",
                        required: false,
                        schema: {
                            type: "integer",
                            minimum: 5,
                            maximum: 50,
                            default: 10,
                        },
                    },
                ],

            responses: {
                200: {
                    description: "Articles retrieved successfully",
                },

                400: {
                    description: "Validation failed",
                },

                429: {
                    description: "Too many requests",
                },

                500: {
                    description: "Internal server error",
                },
            },
        },
    },
};

export default articlePaths;