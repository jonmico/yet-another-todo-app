import type { Todo } from '~/types/todo';

const URL = import.meta.env.VITE_URL;

type GetTodoSuccess = {
  todo: Todo;
};

type GetTodoError = {
  error: {
    _server: string;
  };
};

type GetTodoResult =
  | { type: 'success'; data: GetTodoSuccess }
  | { type: 'error'; data: GetTodoError };

export async function getTodo(
  tokenString: string | undefined,
  todoId: string,
): Promise<GetTodoResult> {
  try {
    const res = await fetch(`${URL}/api/todo/${todoId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `token=${tokenString}`,
      },
    });

    if (!res.ok) {
      const error: GetTodoError = await res.json();

      return { type: 'error', data: error };
    }

    const data: GetTodoSuccess = await res.json();

    return { type: 'success', data };
  } catch (err) {
    return {
      type: 'error',
      data: {
        error: {
          _server:
            err instanceof Error
              ? `${err.name} ${err.message}`
              : 'Something went wrong.',
        },
      },
    };
  }
}
