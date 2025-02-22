import { Link, NavLink } from 'react-router';

// TODO: Figure out how to not have styles apply to /app
export default function AppNav() {
  return (
    <nav>
      <ul className='flex justify-center gap-4 p-3'>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? 'text-blue-300' : '';
            }}
            to={'/app'}
          >
            My Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'create-todo'}
            className={({ isActive }) => {
              return isActive ? 'text-blue-300' : '';
            }}
          >
            Create a Todo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

interface NavItemProps {
  children: React.ReactNode;
}

function NavItem({ children }: NavItemProps) {
  return <li className={``}>{children}</li>;
}
