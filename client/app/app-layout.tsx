import { Link, Outlet, useLoaderData } from 'react-router';
import type { loader } from './root';

export default function AppLayout() {
  return (
    <div className='grid m-auto'>
      <Header />
      <Outlet />
    </div>
  );
}

/*
TODO:
Why does this useLoaderData call not work?
*/

function Header() {
  // const { userId } = use(AuthContext);
  const data = useLoaderData<typeof loader>();

  console.log(data);
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
          {!data ? (
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
