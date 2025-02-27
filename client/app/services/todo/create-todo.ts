import type { Todo } from '~/types/todo';

const URL = import.meta.env.VITE_URL;

type CreateTodoSuccess = { message: string; todo: Todo };
type CreateTodoError = {
  error: { title?: string; description?: string; _server?: string };
};
type CreateTodoResult =
  | { type: 'success'; data: CreateTodoSuccess }
  | { type: 'error'; data: CreateTodoError };

export async function createTodo(
  title: string,
  description: string,
  token: string,
): Promise<CreateTodoResult> {
  try {
    const res = await fetch(`${URL}/api/todo`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        userId: token,
      }),
    });

    if (!res.ok) {
      const error = await res.json();

      if ('error' in error) {
        return { type: 'error', data: error };
      }
    }

    const data = await res.json();

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
