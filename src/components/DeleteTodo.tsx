import { Button, Modal, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { Todo } from "../hooks/useGetTodos";

interface Props {
  todo: Todo;
  open: boolean;
  close: () => void;
}

function DeleteTodo(props: Props) {
  const todoId = props.todo.id;
  const { mutateAsync, isLoading } = useDeleteTodo();

  const handleDelete = async () => {
    try {
      await mutateAsync(todoId);
      toast.success("Tarefa deletada com sucesso!");
      props.close();
    } catch (error) {
      toast.error("Erro ao deletar Tarefa!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Deseja deletar ${props.todo.title}?`}
      >
        <Modal.Body>
          <Stack spacing="xs">
            <Button color="red" onClick={handleDelete} loading={isLoading}>
              {`Sim, desejo deletar ${props.todo.title}.`}
            </Button>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteTodo;
