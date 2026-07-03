import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRequest, getRequests, updateRequestStatus } from '../api/client';
import type { Status } from '../types';

export function useRequests() {
  return useQuery({
    queryKey: ['requests'],
    queryFn: getRequests,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['requests'] }),
  });
}

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateRequestStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['requests'] }),
  });
}
