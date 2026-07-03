# Backend

Express + TypeScript REST API for the client requests dashboard. Data lives in MongoDB via Mongoose.

## Requirements

- Node 18+

A hosted MongoDB Atlas cluster comes pre-configured in `.env.example`, already
loaded with sample data — no database setup needed.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

`.env` variables:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port the API listens on | `4000` |
| `MONGODB_URI` | Mongo connection string | pre-configured Atlas cluster |
| `CLIENT_ORIGIN` | Frontend origin allowed by CORS | `http://localhost:5173` |

Run the dev server:

```bash
npm run dev
```

## API

All routes are prefixed with `/api`.

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| `GET` | `/requests` | — | `200` all requests, newest first |
| `POST` | `/requests` | `{ title, description? }` | `201` created request, `400` if title missing |
| `PATCH` | `/requests/:id/status` | `{ status }` | `200` updated request, `400` invalid status, `404` unknown id |

Allowed statuses: `New`, `In Progress`, `Done`.
