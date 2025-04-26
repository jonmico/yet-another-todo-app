const URL = import.meta.env.VITE_URL;

// TODO: Finish this.

type DeleteTodoSuccess = {
  message: string;
};

type DeleteTodoError = {
  error: {
    _server: string;
  };
};

type DeleteTodoResult =
  | { type: 'success'; data: DeleteTodoSuccess }
  | { type: 'error'; data: DeleteTodoError };

export async function deleteTodo(
  token: string | undefined,
  todoId: string,
): Promise<DeleteTodoResult> {
  try {
    const res = await fetch(`${URL}/api/todo/${todoId}/delete`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Cookie: `token=${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const error: DeleteTodoError = await res.json();

      return { type: 'error', data: error };
    }

    const data: DeleteTodoSuccess = await res.json();

    return { type: 'success', data };
  } catch (err) {
    return {
      type: 'error',
      data: {
        error: {
          _server: err instanceof Error ? err.message : 'Something went wrong.',
        },
      },
    };
  }
}
