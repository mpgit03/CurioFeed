# CurioFeed

<div align = "center">
# 📰 CurioFeed

### AI-Powered Personalized News Aggregation Platform

**A production-oriented full-stack application that asynchronously
ingests, classifies and ranks news articles using modern backend
engineering practices.**

> 🚧 > ✅ **Status:** Production Deployed
>
> CurioFeed is deployed with a Next.js frontend on Vercel and an Express API on Render.
> Recommendation Engine V2 and additional user features are currently under active development.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=nextdotjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Redis](https://img.shields.io/badge/Redis-BullMQ-DC382D?logo=redis)
![Swagger](https://img.shields.io/badge/OpenAPI-Swagger-85EA2D?logo=swagger)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)
![BullMQ](https://img.shields.io/badge/BullMQ-Redis-DC382D)
![Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google&logoColor=white)

> **CurioFeed demonstrates how AI-powered recommendation systems can be built using asynchronous processing, distributed workers, and production-ready backend engineering practices.**

---

## 🌐 Live Demo

**Frontend**

https://curio-feed-wine.vercel.app

**Backend API**

https://curiofeed-api.onrender.com

**Swagger Documentation**

https://curiofeed-api.onrender.com/api-docs

> **Note**
> The backend uses Render's free tier, so the first request after inactivity may take a few seconds while the server wakes up.


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

## System Architecture

```text
                           Users
                             │
                             ▼
                  Next.js Frontend (Vercel)
                             │
                    HTTPS + Clerk JWT
                             │
                             ▼
                  Express REST API (Render)
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
      PostgreSQL (Neon)   Clerk Auth   Redis (BullMQ)
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      ▼                                             ▼
              RSS Ingestion Worker                    AI Classification Worker
                      │                                             │
                      └──────────────────────┬──────────────────────┘
                                             ▼
                                        Gemini API
```

------------------------------------------------------------------------

## Recommendation Pipeline

``` text
                  User Preferences
                          │
                          ▼
        Recently Classified Candidate Articles
                          │
                          ▼
          AI Topic Confidence Matching
                          │
                          ▼
              Personalized Relevance Score
                          │
                          ▼
                  Recency Score Boost
                          │
                          ▼
               Final Ranking & Sorting
                          │
                          ▼
                Personalized Feed Response
```

The recommendation engine ranks articles by combining:

- Primary topic confidence
- Secondary topic confidence
- User topic preferences
- Publication recency

Topic confidence scores are generated asynchronously by the AI classification pipeline and stored in PostgreSQL, allowing recommendation requests to remain fast without invoking AI during user requests.

------------------------------------------------------------------------

## Features

### Frontend

- 🎯 Personalized AI-powered news feed
- 🌍 Explore feed for discovering new content
- 🇮🇳 India-specific news feed
- ⭐ Follow and unfollow news sources
- 🔐 Secure authentication with Clerk
- 📱 Responsive modern UI built with Next.js

### Backend Platform

- 📰 Automated RSS ingestion pipeline
- 🤖 AI-powered topic classification using Gemini
- ⚡ Asynchronous background processing with BullMQ
- 🧠 Confidence-based recommendation engine
- 🗄 PostgreSQL + Prisma ORM
- 🚦 Redis-backed distributed rate limiting
- 📖 OpenAPI / Swagger documentation
- ✅ Request validation with Zod
- 📈 Structured logging using Pino
- ❤️ Health monitoring endpoint
- 🔄 Graceful shutdown
- 🛡 Startup dependency validation

### Background Processing

- RSS ingestion runs independently from user requests.
- AI topic classification executes asynchronously through BullMQ workers.
- Recommendation requests never invoke AI directly, ensuring low response latency.

------------------------------------------------------------------------

## Technology Stack

| Layer | Technologies |
|--------|--------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS, Clerk |
| **Backend** | Node.js, Express 5, Prisma ORM, Zod |
| **Database** | PostgreSQL (Neon) |
| **Queue & Workers** | Redis, BullMQ |
| **AI** | Google Gemini |
| **Authentication** | Clerk |
| **Documentation** | OpenAPI (Swagger) |
| **Logging** | Pino |
| **Deployment** | Vercel, Render |

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

## Production Deployment

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend API | Render Web Service |
| PostgreSQL | Neon |
| Redis | Render Key Value |
| Authentication | Clerk |
| AI | Google Gemini |
| RSS Worker | Render Background Worker *(optional deployment)* |
| AI Classification Worker | Render Background Worker *(optional deployment)* |

> **Note**
>
> The API and background workers are deployed independently.
> This architecture allows ingestion and AI classification to scale separately from user-facing requests.

------------------------------------------------------------------------

## Engineering Decisions

CurioFeed was designed to follow production-oriented backend engineering principles rather than focusing solely on feature implementation.

### Service-Oriented Architecture

- Thin controllers with business logic encapsulated in service layers.
- Clear separation between routing, business logic and data access.
- Modular feature-based project structure.

### Asynchronous Processing

- RSS ingestion executes independently of user requests.
- AI-powered article classification is delegated to BullMQ workers.
- Expensive operations never block API response times.

### Reliability

- Startup dependency validation verifies PostgreSQL and Redis before accepting requests.
- Graceful shutdown ensures HTTP server, Prisma and Redis connections close cleanly.
- Background jobs automatically retry transient failures.

### Scalability

- Redis-backed distributed rate limiting.
- Background workers can scale independently from the API.
- Stateless REST API suitable for horizontal scaling.

### Observability

- Structured logging with Pino.
- Centralized error handling.
- Health endpoint for infrastructure monitoring.

### API Design

- RESTful API design.
- OpenAPI (Swagger) documentation.
- Request validation using Zod.

## Design Philosophy

CurioFeed prioritizes responsiveness by moving computationally expensive work—such as RSS ingestion and AI classification—into asynchronous background workers. User requests interact only with preprocessed data, allowing recommendation APIs to remain fast, predictable and scalable while keeping the architecture modular and production-ready.

------------------------------------------------------------------------

## Production Features

- 🔐 Clerk JWT authentication
- ⚡ Redis-backed distributed rate limiting
- 📈 Structured request logging with Pino
- ❤️ Health monitoring endpoint
- 🔄 Graceful shutdown lifecycle
- ✅ Startup dependency validation
- 📚 OpenAPI (Swagger) documentation
- 🛡 Request validation using Zod
- 🔁 Background job retries with exponential backoff
- 🌍 Environment-based configuration

-------------------------------------------------------------------------

## Roadmap

### Recommendation Engine

- [ ] Recommendation Engine V2
- [ ] Click-through ranking
- [ ] Collaborative filtering
- [ ] Source diversity optimization

### User Features

- [ ] Bookmarks
- [ ] Collections
- [ ] Search
- [ ] Reading history

### Platform

- [ ] Docker Compose
- [ ] CI/CD pipeline
- [ ] Monitoring & metrics
- [ ] User-based rate limiting
- [ ] Background worker autoscaling

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
---

## Acknowledgements

CurioFeed was built as a production-oriented backend engineering project to explore scalable system design, asynchronous processing, AI-assisted content classification, and modern full-stack development practices.

---

⭐ If you found CurioFeed interesting, consider giving the repository a star.

