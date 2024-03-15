"use client";

import { DELETE, PATCH, GET, POST } from "@/app/api/todos/route";
import { NewTodo, Todo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";

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

  const postMutation = useMutation({
    mutationFn: ({ title, contents }: NewTodo) => POST({ title, contents }),
  });

  const editMutation = useMutation({
    mutationFn: (todo: Todo) => PATCH(todo),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => DELETE(id),
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    postMutation.mutate(
      { title, contents },
      {
        onSuccess: () => {
          setTitle("");
          setContents("");
          queryClient.invalidateQueries({ queryKey: ["Todos"] });
        },
      }
    );
  };

  const editHandler = (todo: Todo) => {
    editMutation.mutate(todo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
      },
    });
  };

  const deleteHandler = (todo: Todo) => {
    deleteMutation.mutate(todo.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
      },
    });
  };

  if (isLoading) {
    <p className="m-4">불러오는 중입니다...</p>;
  }

  if (isError) {
    <p className="m-4">불러오는 실패했습니다...</p>;
  }

  if (!todos) {
    return <p className="m-4">todos가 없습니다.</p>;
  }
  return (
    <main>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <span className="m-4">
          <label htmlFor="title">제목 : </label>
          <input
            id="title"
            type="text"
            placeholder="todo 제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </span>
        <span className="m-4">
          <label htmlFor="contents">내용 : </label>
          <input
            id="contents"
            type="text"
            placeholder="todo 내용을 입력하세요."
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </span>
        <button className="m-4">추가하기</button>
      </form>
      <section>
        <h1 className="m-4">진행 중</h1>
        <ul className="flex-row">
          {todos.map((todo: Todo) => {
            if (!todo.isDone)
              return (
                <li
                  key={todo.id}
                  className="m-4 border-solid border-2 border-y-teal-900"
                >
                  <h1>제목 : {todo.title}</h1>
                  <p>내용 : {todo.contents}</p>
                  <p>완료 : {todo.isDone ? "O" : "X"}</p>
                  <button className="mx-2" onClick={() => deleteHandler(todo)}>
                    삭제
                  </button>
                  <button className="mx-2" onClick={() => editHandler(todo)}>
                    완료
                  </button>
                </li>
              );
          })}
        </ul>
      </section>
      <section>
        <h1 className="m-4">완료</h1>
        <ul className="flex-row">
          {todos.map((todo: Todo) => {
            if (todo.isDone)
              return (
                <li
                  key={todo.id}
                  className="m-4 border-solid border-2 border-y-teal-900"
                >
                  <h1>제목 : {todo.title}</h1>
                  <p>내용 : {todo.contents}</p>
                  <p>완료 : {todo.isDone ? "O" : "X"}</p>
                  <button className="mx-2" onClick={() => deleteHandler(todo)}>
                    삭제
                  </button>
                  <button className="mx-2" onClick={() => editHandler(todo)}>
                    작업 중
                  </button>
                </li>
              );
          })}
        </ul>
      </section>
    </main>
  );
};

export default TodosCsr;
