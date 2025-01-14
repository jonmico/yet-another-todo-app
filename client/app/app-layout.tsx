import { Outlet } from 'react-router';
import type { Route } from './+types/app-layout';
import { sessionCookie } from './sessions.server';
import Header from './components/header';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');

  return { userId: userId };
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
