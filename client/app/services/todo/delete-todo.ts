const URL = import.meta.env.VITE_URL;

// TODO: Finish this.

export async function deleteTodo(token: string | undefined, todoId: string) {
  try {
    const res = await fetch(`${URL}/api/todo/${todoId}/delete`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Cookie: `token=${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    return { error: { _server: 'Something went wrong.' } };
  }
}
