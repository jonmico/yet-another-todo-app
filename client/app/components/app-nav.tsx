import { Link, NavLink } from 'react-router';

export default function AppNav() {
  return (
    <nav>
      <ul className='flex justify-center gap-4 p-3'>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? 'border-b border-b-slate-300 text-slate-300'
                : 'text-slate-500 transition-colors hover:text-slate-400';
            }}
            to={'/dashboard'}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'create-todo'}
            className={({ isActive }) => {
              return isActive
                ? 'border-b border-b-slate-300 text-slate-300'
                : 'text-slate-500 transition-colors hover:text-slate-400';
            }}
          >
            Create a Todo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
