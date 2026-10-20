# 📰 CurioFeed

### AI-Powered Personalized News Aggregation Platform

A production-oriented full-stack application that asynchronously ingests, classifies, and ranks news articles using modern backend engineering practices.

> **Status:** Production Deployed  
> CurioFeed is deployed with a Next.js frontend on Vercel and an Express API on Render. Docker Compose is also available for local development and containerized execution.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Redis](https://img.shields.io/badge/Redis-BullMQ-DC382D?logo=redis)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)
![Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google&logoColor=white)
![Docker](https://img.shields.io/badge/Containerization-Docker-2496ED?logo=docker)

CurioFeed demonstrates how AI-powered recommendation systems can be built using asynchronous processing, distributed workers, and production-oriented backend engineering practices.

---

## 🌐 Live Demo

| Resource | URL |
|---|---|
| Frontend | https://curio-feed-wine.vercel.app |
| Backend API | https://curiofeed-api.onrender.com |
| Swagger Documentation | https://curiofeed-api.onrender.com/api-docs |

> The backend uses Render's free tier, so the first request after inactivity may take a few seconds while the server wakes up.

---

## Why CurioFeed?

Most news aggregators display articles chronologically or rely on basic topic filtering.

CurioFeed explores how a personalized recommendation platform can combine automated content ingestion, AI-based topic classification, and confidence-based ranking.

Instead of performing expensive operations during user requests, ingestion and classification run asynchronously in background workers. The API serves preprocessed data, helping keep user-facing requests responsive.

## Key Highlights

- 🤖 AI-powered article classification using Google Gemini
- 📰 Automated RSS aggregation pipeline
- 🎯 Personalized recommendation engine
- ⚡ Redis and BullMQ background processing
- 🔐 Clerk authentication
- 📚 OpenAPI and Swagger documentation
- 📈 Structured logging with Pino
- 🛡️ Startup dependency validation
- 🔄 Graceful shutdown and background-job retries
- 🐳 Dockerfiles and Docker Compose orchestration

---

## System Architecture

### Production architecture

```text
                    Users
                      |
                      v
             Next.js Frontend
                  (Vercel)
                      |
                HTTPS + JWT
                      |
                      v
               Express REST API
                   (Render)
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
     PostgreSQL     Clerk       Redis
       (Neon)                    |
                                 |
                    +------------+------------+
                    |                         |
                    v                         v
             RSS Ingestion             AI Classification
                 Worker                    Worker
                    |                         |
                    +------------+------------+
                                 |
                                 v
                            Gemini API
```

### Local Docker architecture

Docker Compose provides separate containers for the frontend, API, RSS worker, classification worker, PostgreSQL, and Redis.

```text
                  Docker Compose
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
       Frontend        API          Redis
          |             |             |
          |             +------ Queue-+
          |             |
          |       +-----+------+
          |       |            |
          |       v            v
          |   RSS Worker   Classification
          |                    Worker
          |                      |
          +----------------------+ 
                                 |
                          PostgreSQL
                       or external Neon DB
```

The database connection is configured through `DATABASE_URL`. When using the bundled PostgreSQL container, services connect through the Compose network. An external PostgreSQL database, such as Neon, can also be configured.

---

## Recommendation Pipeline

```text
             User Preferences
                    |
                    v
        Classified Candidate Articles
                    |
                    v
          AI Topic Confidence Matching
                    |
                    v
          Personalized Relevance Score
                    |
                    v
             Recency Score Boost
                    |
                    v
           Final Ranking and Sorting
                    |
                    v
           Personalized Feed Response
```

The recommendation engine combines:

- Primary topic confidence
- Secondary topic confidence
- User topic preferences
- Publication recency

Topic confidence scores are generated asynchronously and stored in PostgreSQL. Feed requests use the stored classification results rather than invoking AI directly.

---

## Features

### Frontend

- Personalized AI-powered news feed
- Explore feed for discovering new content
- India-specific news feed
- Follow and unfollow news sources
- Secure authentication with Clerk
- Responsive UI built with Next.js and Tailwind CSS

### Backend Platform

- Automated RSS ingestion pipeline
- AI-powered topic classification using Gemini
- Asynchronous background processing with BullMQ
- Confidence-based recommendation engine
- PostgreSQL and Prisma ORM
- Redis-backed distributed rate limiting
- OpenAPI and Swagger documentation
- Request validation with Zod
- Structured logging with Pino
- Health monitoring endpoint
- Graceful shutdown and startup dependency validation

### Background Processing

- RSS ingestion executes independently of user requests.
- AI classification is delegated to BullMQ workers.
- Background jobs support retries with exponential backoff.
- Recommendation requests do not invoke AI classification directly.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Node.js 22, Express 5, Prisma ORM, Zod |
| Database | PostgreSQL, Neon |
| Queue and Workers | Redis, BullMQ |
| AI | Google Gemini |
| Authentication | Clerk |
| API Documentation | OpenAPI, Swagger |
| Logging | Pino |
| Containerization | Docker, Docker Compose |
| Production Deployment | Vercel, Render, Neon |

---

## API Reference

### Articles

| Method | Endpoint |
|---|---|
| GET | `/api/v1/articles` |
| GET | `/api/v1/articles/{id}` |
| GET | `/api/v1/articles/{id}/open` |

### Feeds

| Method | Endpoint |
|---|---|
| GET | `/api/v1/feed` |
| GET | `/api/v1/feed/explore` |
| GET | `/api/v1/feed/india` |
| GET | `/api/v1/feed/following` |

### Topics

| Method | Endpoint |
|---|---|
| GET | `/api/v1/topics` |

### Sources

| Method | Endpoint |
|---|---|
| POST | `/api/v1/sources/{sourceId}/follow` |
| DELETE | `/api/v1/sources/{sourceId}/follow` |

### Users

| Method | Endpoint |
|---|---|
| POST | `/api/v1/users/preferences` |
| GET | `/api/v1/users/me/following` |

### Health and Webhooks

| Method | Endpoint |
|---|---|
| GET | `/health` |
| POST | `/api/v1/webhooks/clerk` |

Interactive API documentation is available at `/api-docs`.

---

## 🐳 Docker Setup

CurioFeed supports local containerized execution using Docker Compose.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) with Docker Compose
- A Clerk application and its required keys
- A Google Gemini API key
- Access to PostgreSQL, either through the bundled container or an external database

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Curiofeed
```

Replace `<YOUR_REPOSITORY_URL>` with your Git repository URL.

### 2. Configure environment variables

Create a local `.env` file from the example.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Linux or macOS:**

```bash
cp .env.example .env
```

Fill in the required values in `.env`. Do not commit this file or share its secrets.

Important configuration variables include:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `POSTGRES_PASSWORD` | Password for the bundled PostgreSQL service |
| `CLERK_SECRET_KEY` | Clerk server-side authentication |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key used by the backend, if required |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook verification |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key embedded in the frontend build |
| `GEMINI_API_KEY` | Google Gemini API access |
| `NEXT_PUBLIC_BACKEND_URL` | Backend URL embedded in the frontend build |
| `FRONTEND_URL` | Frontend origin used by the backend |
| `ENABLE_SCHEDULERS` | Enables or disables backend scheduling |
| `LOG_LEVEL` | Application logging level |

### 3. Configure the database

For the bundled PostgreSQL service, use a connection string in this format:

```env
DATABASE_URL=postgresql://curiofeed:curiofeed_local_dev@postgres:5432/curiofeed
```

Ensure the password in the URL matches `POSTGRES_PASSWORD` if you change the default configuration.

Alternatively, set `DATABASE_URL` to your existing Neon PostgreSQL connection string.

The hostname `postgres` is used for connections from containers on the Compose network. If you connect to a database from your host machine, the hostname and port will differ.

### 4. Build and start the application

From the repository root:

```bash
docker compose up --build -d
```

This builds the frontend and backend images, starts the supporting services, applies Prisma migrations through the API startup command, and launches the background workers.

The frontend's `NEXT_PUBLIC_*` values are supplied during the image build. If you change these values, rebuild the frontend image.

```bash
docker compose up --build -d frontend
```

### 5. Access the application

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Swagger Documentation | http://localhost:5000/api-docs |
| Health Check | http://localhost:5000/health |

### 6. Inspect service status

```bash
docker compose ps
```

View API logs:

```bash
docker compose logs -f api
```

View background worker logs:

```bash
docker compose logs -f rss-worker classification-worker
```

View frontend logs:

```bash
docker compose logs -f frontend
```

### 7. Stop the application

Stop the containers while retaining persistent volumes:

```bash
docker compose down
```

To remove the Compose-managed volumes as well:

```bash
docker compose down -v
```

**Warning:** Removing volumes permanently deletes the data stored in those local volumes. Do not run the second command unless you intend to reset local state.

### Docker service overview

| Service | Responsibility |
|---|---|
| `frontend` | Serves the Next.js application |
| `api` | Runs the Express API and applies Prisma migrations at startup |
| `rss-worker` | Processes RSS ingestion jobs |
| `classification-worker` | Processes AI classification jobs |
| `postgres` | Optional local PostgreSQL database |
| `redis` | Queue infrastructure for BullMQ |

The Compose configuration starts the bundled PostgreSQL service even when `DATABASE_URL` points to Neon. In that case, the application uses Neon while the local PostgreSQL container remains available.

---

## Local Development Without Docker

### Backend

Run these commands from `curiofeed-backend`:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Configure the backend environment variables before starting the application.

### Background Workers

Start the workers in separate terminals from `curiofeed-backend`:

```bash
npm run workers:rss
```

```bash
npm run workers:classification
```

### Frontend

Run these commands from `curiofeed-frontend`:

```bash
npm install
npm run dev
```

Configure the frontend environment variables before starting Next.js.

---

## Environment Variables

### Backend

The backend uses the following configuration categories:

```env
DATABASE_URL=
REDIS_HOST=
REDIS_PORT=
NODE_ENV=
PORT=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_WEBHOOK_SECRET=
GEMINI_API_KEY=
CURSOR_SECRET=
LOG_LEVEL=info
ENABLE_SCHEDULERS=true
FRONTEND_URL=
```

### Frontend

```env
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

The Docker Compose configuration also uses `POSTGRES_PASSWORD` for the bundled PostgreSQL service.

Keep real credentials in local environment files or your deployment platform's secret configuration. Never commit `.env`, `.env.local`, or other files containing secrets.

---

## Production Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend API | Render Web Service |
| PostgreSQL | Neon |
| Redis | Render Key Value or another compatible Redis service |
| Authentication | Clerk |
| AI Classification | Google Gemini |
| RSS Worker | Render Background Worker, when deployed separately |
| Classification Worker | Render Background Worker, when deployed separately |

The API and background workers are deployed independently. This allows ingestion and classification workloads to scale separately from user-facing requests.

Docker Compose provides a local containerized environment; it does not replace the existing production deployment.

---

## Engineering Decisions

### Service-Oriented Architecture

- Thin controllers with business logic encapsulated in service layers.
- Separation between routing, business logic, and data access.
- Modular service organization.

### Asynchronous Processing

- RSS ingestion runs independently of user requests.
- AI classification is delegated to BullMQ workers.
- Expensive operations do not block recommendation requests.

### Reliability

- Startup dependency validation checks required services.
- Graceful shutdown closes application connections.
- Background jobs retry transient failures.

### Scalability

- Redis-backed distributed rate limiting.
- Background workers can scale independently from the API.
- Stateless REST API architecture supports horizontal scaling.

### Observability

- Structured logging with Pino.
- Centralized error handling.
- Health endpoint for infrastructure monitoring.

### API Design

- RESTful endpoint organization.
- OpenAPI and Swagger documentation.
- Request validation using Zod.

---

## Production Features

- 🔐 Clerk JWT authentication
- ⚡ Redis-backed distributed rate limiting
- 📈 Structured request logging with Pino
- ❤️ Health monitoring endpoint
- 🔄 Graceful shutdown lifecycle
- ✅ Startup dependency validation
- 📚 OpenAPI and Swagger documentation
- 🛡️ Request validation with Zod
- 🔁 Background job retries with exponential backoff
- 🌍 Environment-based configuration
- 🐳 Dockerized application services
- 🗄️ Prisma-managed database migrations

---

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

- [ ] CI/CD pipeline
- [ ] Monitoring and metrics
- [ ] User-based rate limiting
- [ ] Background worker autoscaling

---

## Acknowledgements

CurioFeed was built as a production-oriented backend engineering project to explore scalable system design, asynchronous processing, AI-assisted content classification, and modern full-stack development practices.

If you find CurioFeed interesting, consider giving the repository a star.

