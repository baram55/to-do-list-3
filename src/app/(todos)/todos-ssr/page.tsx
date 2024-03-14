import { Todo } from "@/types";
import React from "react";

const GET = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos = await response.json();

  return todos;
};

const TodosSsr = async () => {
  const todos: Todo[] | null = GET();

  return (
    <main>
      <h1>todos 목록</h1>
    </main>
  );
};

export default TodosSsr;
