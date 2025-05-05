import { sessionCookie } from '~/sessions.server';
import type { Route } from './+types/index';
import { redirect } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  if (session.get('userId')) {
    return redirect('/dashboard');
  }

  return null;
}

export default function Index() {
  return <div>Welcome to Yet Another Todo App</div>;
}
