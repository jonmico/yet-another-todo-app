import type { Todo } from '~/types/todo';

const URL = import.meta.env.VITE_URL;

type GetTodosSuccess = {
  todos: Todo[];
};

type GetTodosError = {
  error: {
    _server?: string;
  };
};

type GetTodosResult =
  | { type: 'success'; data: GetTodosSuccess }
  | { type: 'error'; data: GetTodosError };

export async function getTodos(tokenString: string): Promise<GetTodosResult> {
  try {
    const res = await fetch(`${URL}/api/todo`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `token=${tokenString}`,
      },
    });

    if (!res.ok) {
      const error: GetTodosError = await res.json();

      return {
        type: 'error',
        data: error,
      };
    }

    const data: GetTodosSuccess = await res.json();

    return {
      type: 'success',
      data,
    };
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
