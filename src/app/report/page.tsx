import { Todo } from "@/types";
import React from "react";

const GET = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    next: {
      revalidate: 10,
    },
  });
  const todos = await response.json();

  if (!todos) {
    return "todos를 불러오는데 실패했습니다.";
  }
  return todos;
};

const Report = async () => {
  const todos: Todo[] | string = await GET();
  let totalCount = 0;
  let doneCount = 0;

  if (typeof todos === "string") {
    return <p>{todos}</p>;
  } else {
    todos.forEach((todo: Todo) => {
      if (todo.isDone) {
        doneCount++;
      }
      totalCount++;
    });

    return (
      <main className="m-4">
        <h1 className="my-1">통계</h1>
        <p className="my-1">총 todo 갯수 : {totalCount}</p>
        <p className="my-1">완료한 todo 갯수 : {doneCount}</p>
      </main>
    );
  }
};

export default Report;
