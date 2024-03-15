import { NewTodo, Todo } from "@/types";

export const GET = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos = await response.json();

  // if (!todos) {
  //   return new Response("todos not found", { status: 404 });
  // }

  //return Response.json(todos);
  return todos;
};

export const POST = async (newTodo: NewTodo) => {
  const { title, contents } = newTodo;

  const response = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents, isDone: false }),
  });
  const todo = await response.json();

  return Response.json({ todo });
};

export const DELETE = async (id: string) => {
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
  });
  const todo = await response.json();

  return Response.json({ todo });
};

export const PATCH = async (todo: Todo) => {
  const id = todo.id;
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "POST",
    body: JSON.stringify({ ...todo, isDone: !todo.isDone }),
  });
  const tempTodo = await response.json();

  return Response.json({ tempTodo });
};
