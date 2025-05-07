import { Outlet, redirect } from 'react-router';
import AppNav from '~/components/app-nav';
import type { Route } from './+types/protected-app-layout';
import { sessionCookie, tokenCookie } from '~/sessions.server';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  if (!session.get('userId')) {
    return redirect('/login', {
      headers: [
        ['Set-Cookie', await tokenCookie.destroySession(token)],
        ['Set-Cookie', await sessionCookie.destroySession(session)],
      ],
    });
  }

  return null;
}

export default function ProtectedAppLayout() {
  return (
    <div>
      <AppNav />
      <div className='m-auto w-4/5'>
        <Outlet />
      </div>
    </div>
  );
}
