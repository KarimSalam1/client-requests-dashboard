# Frontend

React (Vite) dashboard for tracking client requests. Uses TanStack Query for data fetching and Tailwind for styling.

## Requirements

- Node 18+
- The backend running (see `../backend/README.md`)

## Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Then edit `.env`:

| Variable | Description | Default |
| --- | --- | --- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:4000/api` |

Run the dev server:

```bash
npm run dev
```

Open http://localhost:5173.

## Login

Auth is mocked per the brief ("no need for a full auth system, mock is fine"). Any non-empty
username and password logs you in; the username is kept in localStorage and shown in the
dashboard header, and logging out clears it. Real auth (JWT/session) is intentionally out of scope.
