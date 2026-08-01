import articlePaths from "./paths/articles.js";
import feedPaths from "./paths/feed.js";
import topicPaths from "./paths/topics.js";
import followPaths from "./paths/follows.js";
import userPaths from "./paths/users.js";
import healthPaths from "./paths/health.js";
import webhookPaths from "./paths/webhooks.js";

import schemas from "./components/schemas.js";
import responses from "./components/responses.js";
import parameters from "./components/parameters.js";
import security from "./components/security.js";


const swaggerDocument = {
  openapi: "3.0.3",

  info: {
    title: "CurioFeed API",
    version: "1.0.0",
    description:
      "REST API for CurioFeed - Personalized News Aggregation Platform.",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Development Server",
    },
  ],

  tags: [
    {
      name: "Articles",
      description: "Browse and retrieve news articles.",
    },
    {
      name: "Feed",
      description: "Personalized user feed.",
    },
    {
      name: "Topics",
      description: "Topic discovery and user preferences.",
    },
    {
      name: "Users",
      description: "Authenticated user operations.",
    },
    {
      name: "Sources",
      description: "News sources.",
    },
    {
      name: "Health",
      description: "Application health endpoints.",
    },
    {
      name: "Webhooks",
      description: "External webhook endpoints.",
    },
  ],

  components: {
    schemas,
    responses,
    parameters,
    securitySchemes: security,
  },

  paths: {
    ...articlePaths,
    ...feedPaths,
    ...topicPaths,
    ...followPaths,
    ...userPaths,
    ...healthPaths,
    ...webhookPaths,
  },
};

export default swaggerDocument;