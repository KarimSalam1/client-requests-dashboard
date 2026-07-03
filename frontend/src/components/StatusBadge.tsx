import type { Status } from '../types';

const styles: Record<Status, string> = {
  New: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Done: 'bg-green-100 text-green-700',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
