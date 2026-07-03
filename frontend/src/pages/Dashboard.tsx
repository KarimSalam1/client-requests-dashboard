import { useNavigate } from 'react-router-dom';
import { useRequests } from '../hooks/useRequests';
import { getUsername, logout } from '../auth/auth';
import NewRequestForm from '../components/NewRequestForm';
import RequestTable from '../components/RequestTable';

export default function Dashboard() {
  const { data: requests, isLoading, isError, error } = useRequests();
  const navigate = useNavigate();
  const username = getUsername();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-slate-900">Client Requests</span>
          </div>
          <div className="flex items-center gap-4">
            {username && (
              <span className="hidden sm:inline text-sm text-slate-500">
                Signed in as <span className="font-medium text-slate-700">{username}</span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Requests</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track client requests from New through In Progress to Done.
          </p>
        </div>

        <NewRequestForm />

        {isLoading && (
          <div className="bg-white rounded-xl shadow-card ring-1 ring-slate-200 py-16 text-center text-sm text-slate-500">
            Loading requests…
          </div>
        )}

        {isError && (
          <div className="bg-red-50 ring-1 ring-inset ring-red-200 text-red-700 text-sm rounded-xl p-4">
            Failed to load requests: {error.message}
          </div>
        )}

        {requests && <RequestTable requests={requests} />}
      </main>
    </div>
  );
}
