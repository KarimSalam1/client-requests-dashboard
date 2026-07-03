# Client Requests Dashboard

Internal dashboard for tracking client requests through a New -> In Progress -> Done workflow.

## Structure
- `backend/`  — Node + Express REST API, MongoDB (Mongoose)
- `frontend/` — React (Vite) dashboard

## Quick start

You need Node 18+. **No database setup required** — a hosted MongoDB Atlas
cluster comes pre-configured in `backend/.env.example`, already loaded with
sample data.

```bash
npm run install:all
cp backend/.env.example backend/.env    # Atlas connection string is included
cp frontend/.env.example frontend/.env
npm run dev                             # starts backend + frontend together
```

Frontend runs on http://localhost:5173, API on http://localhost:4000.

> **Note:** the Atlas cluster in `.env.example` is a disposable instance
> scoped to sample data only, provided so the app runs with zero setup.

For details see `backend/README.md` and `frontend/README.md`.
