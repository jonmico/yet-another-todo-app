import { Link, Outlet } from 'react-router';
import { checkSessionApi } from './services/auth/check-session-api';
import type { Route } from './+types/app-layout';
import { use } from 'react';
import { AuthContext } from './contexts/auth-context';

export async function loader() {
  const data = await checkSessionApi();

  return data;
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);

  return (
    <div className='grid m-auto'>
      <Header />
      <Outlet />
    </div>
  );
}

function Header() {
  const { isAuthenticated } = use(AuthContext);
  return (
    <div className='p-4 flex justify-between items-center'>
      <div>
        <Link to={'/'} className='font-bold text-xl'>
          YATA
        </Link>
        <div className='text-sm '>(Yet Another Todo App)</div>
      </div>
      <nav>
        <ul className='flex gap-5'>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to={'login'}>Login</Link>
              </li>
              <li>
                <Link to={'register'}>Register</Link>
              </li>
            </>
          ) : (
            <li>Logout</li>
          )}
        </ul>
        <div></div>
        <div></div>
      </nav>
    </div>
  );
}
