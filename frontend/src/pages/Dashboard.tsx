import { useNavigate } from 'react-router-dom';
import { useRequests } from '../hooks/useRequests';
import { logout } from '../auth/auth';
import NewRequestForm from '../components/NewRequestForm';
import RequestTable from '../components/RequestTable';

export default function Dashboard() {
  const { data: requests, isLoading, isError, error } = useRequests();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Client Requests</h1>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-800">
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <NewRequestForm />

        {isLoading && <p className="text-gray-500 text-sm py-8 text-center">Loading requests…</p>}

        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-4">
            Failed to load requests: {error.message}
          </div>
        )}

        {requests && <RequestTable requests={requests} />}
      </main>
    </div>
  );
}
