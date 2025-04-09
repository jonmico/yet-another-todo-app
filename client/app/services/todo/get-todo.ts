import type { Todo } from '~/types/todo';

type GetTodoSuccess = {
  todo: Todo;
};

type GetTodoError = {
  error: {
    _server: string;
  };
};

export async function getTodo() {}
