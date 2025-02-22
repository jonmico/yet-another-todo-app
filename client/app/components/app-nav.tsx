import { Link } from 'react-router';

export default function AppNav() {
  return (
    <nav>
      <ul className='flex gap-4'>
        <li>
          <Link to={'/app'}>My Todos</Link>
        </li>
        <li>
          <Link to={'create-todo'}>Create a Todo</Link>
        </li>
      </ul>
    </nav>
  );
}
