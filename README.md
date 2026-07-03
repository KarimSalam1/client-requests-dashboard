# Client Requests Dashboard

Internal dashboard for tracking client requests through a New -> In Progress -> Done workflow.

## Structure
- `backend/`  — Node + Express REST API, MongoDB (Mongoose)
- `frontend/` — React (Vite) dashboard

## Quick start

You need Node 18+ and a MongoDB instance (local or Atlas).

```bash
npm run install:all
cp backend/.env.example backend/.env    # set MONGODB_URI if not using local Mongo
cp frontend/.env.example frontend/.env
npm run seed --prefix backend           # optional sample data
npm run dev                             # starts backend + frontend together
```

Frontend runs on http://localhost:5173, API on http://localhost:4000.

For details see `backend/README.md` and `frontend/README.md`.
