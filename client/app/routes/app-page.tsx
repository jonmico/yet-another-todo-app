import { redirect } from 'react-router';
import { sessionCookie } from '~/sessions.server';
import type { Route } from './+types/app-page';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');

  if (!userId) {
    throw redirect('/login');
  }

  return { userId };
}

export default function AppPage({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div>
      <p>{userId}</p>
      <div>This is the App page.</div>
    </div>
  );
}
