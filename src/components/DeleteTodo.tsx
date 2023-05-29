import { Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { Todo } from "../hooks/useGetTodos";

interface Props {
  todo: Todo;
  open: boolean;
  close: () => void;
}

function DeleteTodo(props: Props) {
  const [todoId] = useState<number>(props.todo.id);
  const { mutateAsync, isLoading } = useDeleteTodo();
  const handleDelete = async () => {
    await mutateAsync(todoId);
    props.close();
    toast.success("TODO deletado com sucesso!");
    toast.error("Erro ao deletar TODO!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Deseja deletar ${props.todo.title}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
              {`Sim desejo deletar ${props.todo.title}?`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteTodo;
