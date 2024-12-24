import { Link, Outlet } from 'react-router';
import { useAuth } from './hooks/useAuth';

export default function AppLayout() {
  return (
    <div className='grid m-auto'>
      <Header />
      <Outlet />
    </div>
  );
}

function Header() {
  const { user } = useAuth();

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
          {!user ? (
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
      </nav>
    </div>
  );
}
