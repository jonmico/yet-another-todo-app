const URL = import.meta.env.VITE_URL;

export async function editTodo(
  token: string | undefined,
  todoId: string,
  title: string,
  description: string,
) {
  try {
    const res = await fetch(`${URL}/api/todo/${todoId}/edit`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      console.log(res);
    }

    const data = await res.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong.' };
  }
}
