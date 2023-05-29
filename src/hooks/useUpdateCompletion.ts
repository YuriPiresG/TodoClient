import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`/todo/${data.id}`, data);
      queryClient.refetchQueries(["todo"]);
      console.log(response);
    },
  });
}

export { useUpdateTodo };
