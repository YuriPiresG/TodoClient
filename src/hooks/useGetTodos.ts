import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const response = await api.get<Todo[]>(`/todo`);
      return response.data;
    },
  });
};
