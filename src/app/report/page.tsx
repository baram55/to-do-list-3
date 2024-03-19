import React from "react";
import type { Todo } from "../../../types";

const ReportPage = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    next: {
      revalidate: 10,
    },
  });
  const todos = await response.json();

  return (
    <div>
      <h1>Report</h1>
      <p>총 {todos.length}개의 투두리스트 목록이 존재합니다.</p>
      <p>
        이 중, {todos.filter((t: Todo) => t.isDone).length}개는 완료 목록입니다.
      </p>
      <p>{todos.filter((t: Todo) => !t.isDone).length}개는 할일 목록입니다.</p>
      <p>이 통계는 10초마다 갱신됩니다.</p>
    </div>
  );
};

export default ReportPage;
