import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRequest, getRequests, updateRequestStatus } from "../api/client";
import type { ClientRequest, Status } from "../types";

export function useRequests() {
  return useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["requests"] }),
  });
}

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateRequestStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["requests"] });
      const previous = queryClient.getQueryData<ClientRequest[]>(["requests"]);
      queryClient.setQueryData<ClientRequest[]>(["requests"], (old) =>
        old?.map((r) => (r._id === id ? { ...r, status } : r)),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["requests"], context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["requests"] }),
  });
}
