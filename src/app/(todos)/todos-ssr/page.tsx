import { Todo } from "@/types";
import Link from "next/link";
import React from "react";

const GET = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos = await response.json();

  if (!todos) {
    return "todos를 불러오는데 실패했습니다.";
  }
  return todos;
};

const TodosSsr = async () => {
  const todos: Todo[] | string = await GET();

  if (typeof todos === "string") {
    return <p>{todos}</p>;
  }
  return (
    <main>
      <h1 className="m-4">todos 목록</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className="m-4 border-solid border-2 border-y-teal-900"
          >
            <h1>제목 : {todo.title}</h1>
            <p>내용 : {todo.contents}</p>
            <p>완료 : {todo.isDone ? "O" : "X"}</p>
          </li>
        ))}
      </ul>
      <Link href="/report">할 일 정보 통계 보러가기</Link>
    </main>
  );
};

export default TodosSsr;
