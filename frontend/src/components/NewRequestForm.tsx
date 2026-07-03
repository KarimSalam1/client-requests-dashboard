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

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-3">
      <h2 className="font-semibold text-gray-800">New Request</h2>

      {createRequest.isError && (
        <p className="text-sm text-red-600">{createRequest.error.message}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!title.trim() || createRequest.isPending}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createRequest.isPending ? 'Adding…' : 'Add'}
        </button>
      </div>
    </form>
  );
}
