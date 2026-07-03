import StatusBadge from './StatusBadge';
import { useUpdateStatus } from '../hooks/useRequests';
import type { ClientRequest, Status } from '../types';

const NEXT_STATUS: Partial<Record<Status, Status>> = {
  New: 'In Progress',
  'In Progress': 'Done',
};

export default function RequestTable({ requests }: { requests: ClientRequest[] }) {
  const updateStatus = useUpdateStatus();

  if (requests.length === 0) {
    return <p className="text-gray-500 text-sm py-8 text-center">No requests yet.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      {updateStatus.isError && (
        <p className="text-sm text-red-600 px-4 pt-3">{updateStatus.error.message}</p>
      )}

      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => {
            const next = NEXT_STATUS[req.status];
            return (
              <tr key={req._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{req.title}</td>
                <td className="px-4 py-3 text-gray-500">{req.description || '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {next ? (
                    <button
                      onClick={() => updateStatus.mutate({ id: req._id, status: next })}
                      disabled={updateStatus.isPending}
                      className="text-blue-600 hover:underline disabled:opacity-50"
                    >
                      Move to {next}
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
