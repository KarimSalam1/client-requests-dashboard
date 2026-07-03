import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Please enter a username and password.');
      return;
    }

    login(username.trim());
    navigate('/', { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="h-11 w-11 rounded-xl bg-brand-600 flex items-center justify-center shadow-card">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="mt-3 text-lg font-semibold text-slate-900">Client Requests</h1>
          <p className="text-sm text-slate-500">Sign in to your dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-card ring-1 ring-slate-200 space-y-4"
        >
          {error && (
            <p className="text-sm text-red-600 bg-red-50 ring-1 ring-inset ring-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 text-white text-sm font-medium rounded-lg py-2.5 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition"
          >
            Sign in
          </button>

          <p className="text-center text-xs text-slate-400">
            Demo login — any username and password works.
          </p>
        </form>
      </div>
    </div>
  );
}
