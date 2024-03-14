export const GET = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos = await response.json();

  if (!todos) {
    return new Response("todos not found", { status: 404 });
  }

  return Response.json(todos);
};

export const POST = async (request: Request) => {
  const { title, contents } = await request.json();

  const response = await fetch(`http://localshost:4000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents, isDone: false }),
  });
  const todo = await response.json();

  return Response.json({ todo });
};
