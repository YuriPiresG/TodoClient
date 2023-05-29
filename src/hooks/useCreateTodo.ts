import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface CreateTodo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTodo) => {
      const response = await api.post("/todo", data);
      queryClient.refetchQueries(["todo"]);
      console.log(response);
    },
  });
};
