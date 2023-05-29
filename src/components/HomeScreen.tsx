import { Badge, Button, Card, Image, Table, Text } from "@mantine/core";
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import logo from "../assets/logo.png";
import { Todo, useGetTodos } from "../hooks/useGetTodos";
import CreateTodo from "./CreateTodo";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

function HomeScreen() {
  const { data: todos } = useGetTodos();
  const [selectedTodoToUpdate, setSelectedTodoToUpdate] = useState<Todo | null>(
    null
  );
  const [selectedTodoToDelete, setSelectedTodoToDelete] = useState<Todo | null>(
    null
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card shadow="sm" padding="md" radius="lg">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} width={100} height={100} radius="lg" />
            <Text
              style={{ marginLeft: 10, fontWeight: "bold", fontSize: "1.7rem" }}
            >
              Todo App
            </Text>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {todos?.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    <Badge
                      color={todo.completed ? "green" : "red"}
                      variant="light"
                      style={{ width: 100 }}
                    >
                      {todo.completed ? "Concluído" : "Pendente"}
                    </Badge>
                  </td>
                  <td>
                    <Button onClick={() => setSelectedTodoToUpdate(todo)}>
                      <MdOutlineModeEditOutline size="4vh" />
                    </Button>
                  </td>
                  <td>
                    <Button color="red" onClick={() => setSelectedTodoToDelete(todo)}>
                      <TiDeleteOutline size="4vh" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <CreateTodo />
        </Card>
      </div>
      {selectedTodoToUpdate && (
        <UpdateTodo
          open={!!selectedTodoToUpdate}
          close={() => {
            setSelectedTodoToUpdate(null);
          }}
          todo={selectedTodoToUpdate as any}
        />
      )}
      {selectedTodoToDelete && (
        <DeleteTodo
          open={!!selectedTodoToDelete}
          close={() => {
            setSelectedTodoToDelete(null);
          }}
          todo={selectedTodoToDelete as any}
        />
      )}
    </>
  );
}

export default HomeScreen;
