import { Link } from 'react-router';
import type { Todo } from '~/types/todo';

interface TodoProps {
  todo: Todo;
}

export default function TodoComponent({ todo }: TodoProps) {
  return (
    <li
      className='rounded-sm border border-blue-800/80 transition-colors hover:bg-slate-900'
      key={todo.id}
    >
      <Link
        className='inline-block p-4'
        to={`/todo/${todo.id}`}
      >
        <div>Title: {todo.title}</div>
        <div>Description: {todo.description}</div>
      </Link>
    </li>
  );
}
