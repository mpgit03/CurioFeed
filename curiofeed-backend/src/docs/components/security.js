const parameters = {
  Page: {
    name: "page",
    in: "query",
    required: false,
    schema: {
      type: "integer",
      minimum: 1,
      default: 1,
    },
    description: "Page number.",
  },

  Limit: {
    name: "limit",
    in: "query",
    required: false,
    schema: {
      type: "integer",
      minimum: 5,
      maximum: 50,
      default: 10,
    },
    description: "Articles per page.",
  },

  ArticleId: {
    name: "articleId",
    in: "path",
    required: true,
    schema: {
      type: "string",
    },
    description: "Article CUID.",
  },
};

export default parameters;