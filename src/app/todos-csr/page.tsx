"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import type { NewTodo, Todo } from "../../../types";

const TodosCsr = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/todos");
      return response.json();
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
    },
  });

  const removeTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: async ({ id, isDone }: { id: number; isDone: boolean }) => {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone }),
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const todos = data.todos;

  return (
    <div>
      <h1>Todos</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await addTodoMutation.mutateAsync(
            { title, contents },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["todos"],
                });

                setTitle("");
                setContents("");
              },
              onError: () => {
                alert("처리 중 오류가 발생했습니다.");
              },
            }
          );
        }}
      >
        <input
          className="m-2 p-2 border rounded-md"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="m-2 p-2 border rounded-md"
          type="text"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button
          className="m-2 p-2 border bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
          type="submit"
        >
          Add
        </button>
      </form>
      <section>
        <div className="p-4 m-4 border">
          <h3>할 일 목록</h3>
          {todos
            .filter((t: Todo) => t.isDone === false)
            .map((todo: Todo) => (
              <div key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={async () => {
                    await toggleTodoMutation.mutateAsync(
                      {
                        id: todo.id,
                        isDone: !todo.isDone,
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["todos"],
                          });
                        },
                        onError: () => {
                          alert("처리 중 오류가 발생하였습니다.");
                        },
                      }
                    );
                  }}
                />
                <span>
                  [{todo.title}]{todo.contents}
                </span>
                <button
                  className="p-1 m-1 border bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
                  onClick={async () => {
                    await removeTodoMutation.mutateAsync(todo.id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["todos"],
                        });
                      },
                    });
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
        </div>
      </section>
      <section>
        <div className="p-4 m-4 border">
          <h3>완료한 목록</h3>
          {todos
            .filter((t: Todo) => t.isDone === true)
            .map((todo: Todo) => (
              <div key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={async () => {
                    await toggleTodoMutation.mutateAsync(
                      {
                        id: todo.id,
                        isDone: !todo.isDone,
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["todos"],
                          });
                        },
                        onError: () => {
                          alert("처리 중 오류가 발생하였습니다.");
                        },
                      }
                    );
                  }}
                />
                <span>
                  [{todo.title}]{todo.contents}
                </span>
                <button
                  className="p-1 m-1 border bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
                  onClick={async () => {
                    await removeTodoMutation.mutateAsync(todo.id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["todos"],
                        });
                      },
                    });
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default TodosCsr;
