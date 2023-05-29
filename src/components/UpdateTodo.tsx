import {
  Button,
  Modal,
  Stack,
  Switch,
  TextInput
} from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { Todo } from "../hooks/useGetTodos";
import { useUpdateTodo } from "../hooks/useUpdateCompletion";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface Props {
  todo: Todo;
  open: boolean;
  close: () => void;
}

function UpdateTodo(props: Props) {
  const [title, setTitle] = useState(props.todo.title);
  const [description, setDescription] = useState(props.todo.description);
  const [completed, setCompleted] = useState(props.todo.completed);

  const { mutateAsync, isLoading } = useUpdateTodo();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      id: props.todo.id,
      title,
      description,
      completed,
    });
    props.close();
    toast.success("TODO atualizada com sucesso!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Atualizar uma tarefa"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <TextInput
                label="Nome da tarefa"
                type="text"
                placeholder="Nome da tarefa"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextInput
                label="Descrição da tarefa"
                type="text"
                placeholder="Descrição da tarefa"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Switch
                label="Status da tarefa"
                placeholder="Status da tarefa"
                checked={completed}
                onChange={(event) => setCompleted(event.currentTarget.checked)}
              />

              <Button color="blue" type="submit" loading={isLoading}>
                Atualizar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateTodo;
