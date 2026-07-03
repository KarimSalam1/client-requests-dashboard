import { useState } from 'react';
import { useCreateRequest } from '../hooks/useRequests';

export default function NewRequestForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createRequest = useCreateRequest();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    createRequest.mutate(
      { title: title.trim(), description: description.trim() },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
        },
      }
    );
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-card ring-1 ring-slate-200 space-y-4"
    >
      <h2 className="text-sm font-semibold text-slate-900">New request</h2>

      {createRequest.isError && (
        <p className="text-sm text-red-600 bg-red-50 ring-1 ring-inset ring-red-200 rounded-lg px-3 py-2">
          {createRequest.error.message}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={!title.trim() || createRequest.isPending}
          className="shrink-0 bg-brand-600 text-white text-sm font-medium rounded-lg px-5 py-2 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {createRequest.isPending ? 'Adding…' : 'Add request'}
        </button>
      </div>
    </form>
  );
}
