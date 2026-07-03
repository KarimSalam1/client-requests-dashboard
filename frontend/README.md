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

Auth is mocked — any non-empty username and password will log you in. A flag is kept in
localStorage; logging out clears it. Real auth (JWT/session) is intentionally out of scope.
