import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useGetTodos";

function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/todo/${id}`);
    },
    onSuccess: (data, id) => {
      console.log(data);
      queryClient.setQueryData(["todo"], (prevData: Todo[] | undefined) =>
        prevData?.filter((todo) => todo.id !== id)
      );
    },
  });
}

export { useDeleteTodo };
