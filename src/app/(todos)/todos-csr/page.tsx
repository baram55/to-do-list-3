"use client";

import { GET, POST } from "@/app/api/todos/route";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const TodosCsr = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => GET(),
  });

  const newTodoMutation = useMutation({
    mutationFn: () => POST({ title, contents }),
  });

  if (isLoading) {
    <p className="m-4">불러오는 중입니다...</p>;
  }

  if (isError) {
    <p className="m-4">불러오는 실패했습니다...</p>;
  }
  return (
    <main>
      <form>
        <div className="m-4">
          <label htmlFor="title">제목 : </label>
          <input
            id="title"
            type="text"
            placeholder="todo 제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="m-4">
          <label htmlFor="contents">내용 : </label>
          <input
            id="contents"
            type="text"
            placeholder="todo 내용을 입력하세요."
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
      </form>
    </main>
  );
};

export default TodosCsr;
