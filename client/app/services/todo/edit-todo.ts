import type { Todo } from '~/types/todo';

const URL = import.meta.env.VITE_URL;

type EditTodoSuccess = {
  message: string;
  todo: Todo;
};

type EditTodoError = {
  error: {
    title?: string;
    description?: string;
    _server?: string;
  };
};

type EditTodoResult =
  | { type: 'success'; data: EditTodoSuccess }
  | { type: 'error'; data: EditTodoError };

export async function editTodo(
  token: string | undefined,
  todoId: string | undefined,
  title: string,
  description: string,
  dueDate: string | undefined,
): Promise<EditTodoResult> {
  try {
    const res = await fetch(`${URL}/api/todo/${todoId}/edit`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
      body: JSON.stringify({ title, description, dueDate }),
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
