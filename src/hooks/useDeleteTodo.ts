import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/todo/${id}`);
      queryClient.refetchQueries(["todo"]);
      console.log(response);
    },
  });
}

export { useDeleteTodo  };
