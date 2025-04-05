import type { Todo } from '~/types/todo';

type GetTodosSuccess = {
  todos: Todo[];
};

type GetTodosError = {};
