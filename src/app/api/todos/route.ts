export async function GET(request: Request) {
  try {
    const response = await fetch("http://localhost:4000/todos");
    const todos = await response.json();

    return Response.json({ todos });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export async function POST(request: Request) {
  try {
    const newTodo = await request.json();
    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      body: JSON.stringify({ ...newTodo, isDone: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Response.json(await response.json());
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
