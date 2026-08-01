# CurioFeed

<div align = "center">
# 📰 CurioFeed

### AI-Powered Personalized News Aggregation Platform

**A production-oriented full-stack application that asynchronously
ingests, classifies and ranks news articles using modern backend
engineering practices.**

> 🚧 **Status:** Active Development\
> Live demo, screenshots and deployment links will be added after
> production deployment.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=nextdotjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Redis](https://img.shields.io/badge/Redis-BullMQ-DC382D?logo=redis)
![Swagger](https://img.shields.io/badge/OpenAPI-Swagger-85EA2D?logo=swagger)
:::

------------------------------------------------------------------------

## Why CurioFeed?

Most news aggregators simply display articles in chronological order.

CurioFeed explores how a production-oriented recommendation platform can
be built using asynchronous processing, AI-powered topic classification
and personalized ranking. Rather than performing expensive operations
during user requests, ingestion and AI classification execute in
background workers while the API remains responsive.

------------------------------------------------------------------------

## Key Highlights

-   🤖 AI-powered article classification with Gemini
-   📰 Automated RSS aggregation pipeline
-   🎯 Personalized recommendation engine
-   ⚡ BullMQ + Redis background workers
-   🔐 Clerk authentication
-   📚 OpenAPI / Swagger documentation
-   🛡 Startup dependency validation
-   📈 Structured logging with Pino
-   🔄 Graceful shutdown
-   🚀 Modular service-oriented architecture

------------------------------------------------------------------------

## Architecture Overview

``` text
Users
  │
  ▼
Next.js Frontend
  │
  ▼
Express REST API
  │
  ├────────────── PostgreSQL (Neon)
  │
  ├────────────── Clerk Authentication
  │
  ▼
Redis (BullMQ)
  │
  ├──────── RSS Worker
  └──────── AI Classification Worker
                │
                ▼
             Gemini API
```

------------------------------------------------------------------------

## Recommendation Flow

``` text
User Preferences
      │
Candidate Articles
      │
Topic Matching
      │
Confidence Scoring
      │
Recency Boost
      │
Rank Articles
      │
Personalized Feed
```

Ranking combines:

-   Primary topic confidence
-   Secondary topic confidence
-   Publication recency

------------------------------------------------------------------------

## Features

### User Experience

-   Personalized feed
-   Explore feed
-   India feed
-   Follow favourite news sources
-   Topic preference management
-   Secure authentication

### Backend

-   RSS ingestion
-   AI topic classification
-   Queue-based background processing
-   Redis-backed BullMQ workers
-   Prisma ORM
-   PostgreSQL
-   Request validation with Zod
-   Swagger/OpenAPI
-   Centralized error handling
-   Rate limiting
-   Health endpoint

------------------------------------------------------------------------

## Technology Stack

  Layer           Technologies
  --------------- -----------------------
  Frontend        Next.js, React, Clerk
  Backend         Node.js, Express 5
  Database        PostgreSQL, Prisma
  Queue           Redis, BullMQ
  AI              Gemini
  Documentation   Swagger / OpenAPI
  Deployment      Render, Vercel

------------------------------------------------------------------------

## API

### Articles

-   GET `/api/v1/articles`
-   GET `/api/v1/articles/{id}`
-   GET `/api/v1/articles/{id}/open`

### Feed

-   GET `/api/v1/feed`
-   GET `/api/v1/feed/explore`
-   GET `/api/v1/feed/india`
-   GET `/api/v1/feed/following`

### Topics

-   GET `/api/v1/topics`

### Sources

-   POST `/api/v1/sources/{sourceId}/follow`
-   DELETE `/api/v1/sources/{sourceId}/follow`

### Users

-   POST `/api/v1/users/preferences`
-   GET `/api/v1/users/me/following`

### Health

-   GET `/health`

### Webhooks

-   POST `/api/v1/webhooks/clerk`

Interactive documentation:

``` text
/api-docs
```

------------------------------------------------------------------------

## Local Development

``` bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Workers:

``` bash
npm run workers:rss
npm run workers:classification
```

------------------------------------------------------------------------

## Environment Variables

Backend:

``` env
DATABASE_URL=
REDIS_HOST=
REDIS_PORT=
NODE_ENV=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_WEBHOOK_SECRET=
GEMINI_API_KEY=
CURSOR_SECRET=
LOG_LEVEL=
ENABLE_SCHEDULERS=true
```

Frontend:

``` env
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

------------------------------------------------------------------------

## Deployment

  Component     Platform
  ------------- --------------------------
  Frontend      Vercel
  Backend API   Render
  PostgreSQL    Neon
  Redis         Render Redis
  RSS Worker    Render Background Worker
  AI Worker     Render Background Worker

------------------------------------------------------------------------

## Engineering Decisions

-   Thin controllers with business logic isolated in services
-   Queue-based asynchronous processing
-   Dedicated background workers
-   Startup dependency validation
-   Graceful shutdown lifecycle
-   Modular OpenAPI documentation
-   Centralized error handling
-   Structured logging

------------------------------------------------------------------------

## Roadmap

### Recommendation Engine

-   Collaborative filtering
-   Click tracking
-   Recommendation V2

### User Features

-   Bookmarks
-   Collections
-   Reading history

### Infrastructure

-   CI/CD
-   Monitoring
-   Docker Compose
-   Metrics

------------------------------------------------------------------------

## Screenshots

*To be added after the frontend is polished and production deployment is
complete.*

Planned screenshots:

-   Landing page
-   Personalized feed
-   Explore feed
-   India feed
-   Swagger documentation
-   Architecture diagram

------------------------------------------------------------------------



</div>
**Built as a production-oriented backend engineering portfolio
project.**

⭐ If you found CurioFeed interesting, consider starring the repository.
:::
