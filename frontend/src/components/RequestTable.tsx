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
    return (
      <div className="bg-white rounded-xl shadow-card ring-1 ring-slate-200 py-16 text-center">
        <p className="text-sm font-medium text-slate-900">No requests yet</p>
        <p className="text-sm text-slate-500 mt-1">Add your first request using the form above.</p>
      </div>
    );
  }

  const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400';
  const td = 'px-4 py-3 text-sm';

  return (
    <div className="bg-white rounded-xl shadow-card ring-1 ring-slate-200 overflow-hidden">
      {updateStatus.isError && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 border-b border-red-100">
          {updateStatus.error.message}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className={th}>Title</th>
              <th className={th}>Description</th>
              <th className={th}>Status</th>
              <th className={th}>Created</th>
              <th className={`${th} text-right`}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req) => {
              const next = NEXT_STATUS[req.status];
              return (
                <tr key={req._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className={`${td} font-medium text-slate-900`}>{req.title}</td>
                  <td className={`${td} text-slate-500 max-w-xs truncate`}>
                    {req.description || '—'}
                  </td>
                  <td className={td}>
                    <StatusBadge status={req.status} />
                  </td>
                  <td className={`${td} text-slate-500 whitespace-nowrap`}>
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className={`${td} text-right`}>
                    {next ? (
                      <button
                        onClick={() => updateStatus.mutate({ id: req._id, status: next })}
                        title={`Move to ${next}`}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20 hover:bg-brand-100 transition"
                      >
                        Move to {next} <span aria-hidden="true">→</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-200">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
