import Link from "next/link";
import React from "react";
import { Todo } from "../../../types";

const TodosSsrPage = async () => {
  const response = await fetch("http://localhost:4000/todos");
  const todos = await response.json();

  return (
    <div>
      <h1>SSR</h1>
      <Link href="/report">할일정보 통계보러 가기</Link>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            {todo.title}-{todo.contents}-{todo.isDone ? "완료" : "미완료"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosSsrPage;
