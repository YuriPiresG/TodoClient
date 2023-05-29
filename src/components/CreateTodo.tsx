import { Button, Group, Modal, Stack, TextInput, Switch } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateTodo } from "../hooks/useCreateTodo";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

function CreateTodo() {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutateAsync, isLoading } = useCreateTodo();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.checked;
    setCompleted(newValue);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      title,
      description,
      completed,
      id,
    });
    close();
    toast.success("TODO criada com sucesso!");
  };
  const handleClose = () => {
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar uma tarefa">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <TextInput
                label="Nome da tarefa"
                type="text"
                placeholder="Nome da tarefa"
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextInput
                label="Descrição da tarefa"
                type="text"
                placeholder="Descrição da tarefa"
                onChange={(event) => setDescription(event.target.value)}
              />
              <Switch
                label="Completada?"
                onChange={handleChange}
              />
              <Button color="green" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green">
          Criar uma TODO
        </Button>
      </Group>
    </>
  );
}
export default CreateTodo;
