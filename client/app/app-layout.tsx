import { Form, Link, Outlet } from 'react-router';
import type { Route } from './+types/app-layout';
import { sessionCookie } from './sessions.server';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');

  // TODO: Look at this typing because what the hell
  return { userId: userId ? userId : undefined };
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div className='grid m-auto'>
      <Header userId={userId} />
      <Outlet />
    </div>
  );
}

interface HeaderProps {
  userId: string | undefined;
}

// TODO: Style this component because the header is running off the screen. Maybe we need to style the actual container?
function Header({ userId }: HeaderProps) {
  const isLoggedIn = !!userId;

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
          {!isLoggedIn ? (
            <>
              <li>
                <Link to={'login'}>Login</Link>
              </li>
              <li>
                <Link to={'register'}>Register</Link>
              </li>
            </>
          ) : (
            <li>
              <Form method='post'>
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
