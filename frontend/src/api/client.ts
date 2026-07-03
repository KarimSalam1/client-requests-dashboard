import type { ClientRequest, Status } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.error || `Request failed (${res.status})`);
  }

  return body;
}

export function getRequests() {
  return request<ClientRequest[]>('/requests');
}

export function createRequest(data: { title: string; description?: string }) {
  return request<ClientRequest>('/requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateRequestStatus(id: string, status: Status) {
  return request<ClientRequest>(`/requests/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
