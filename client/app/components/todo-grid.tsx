import type { Todo } from '~/types/todo';
import TodoGridComponent from './todo-grid-component';

interface TodoGridProps {
  todos: Todo[] | undefined;
}

export default function TodoGrid({ todos }: TodoGridProps) {
  if (!todos || !todos.length) {
    return <div>No Todos!</div>;
  }

  const todoList = todos.map((t) => (
    <TodoGridComponent
      key={t.id}
      todo={t}
    />
  ));

  return <ul className='grid grid-cols-4 gap-4 p-4'>{todoList}</ul>;
}
