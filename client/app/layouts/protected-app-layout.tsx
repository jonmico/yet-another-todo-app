import { Outlet, redirect } from 'react-router';
import AppNav from '~/components/app-nav';
import type { Route } from './+types/protected-app-layout';
import { sessionCookie } from '~/sessions.server';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  if (!session.get('userId')) {
    return redirect('/login');
  }
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
