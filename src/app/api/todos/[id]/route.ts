export async function DELETE(_: any, { params }: { params: { id: string } }) {
  try {
    await fetch(`http://localhost:4000/todos/${params.id}`, {
      method: "DELETE",
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    throw new Error("internal Server Error");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { isDone } = await request.json();
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isDone }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("===========================");
    console.log(error);
    console.log("===========================");
  }
}
