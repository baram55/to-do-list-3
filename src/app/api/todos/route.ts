export const GET = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos = await response.json();

  return Response.json(todos);
};
