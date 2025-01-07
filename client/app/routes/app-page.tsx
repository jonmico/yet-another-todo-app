import { data, redirect } from 'react-router';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/app-page';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('userId')) {
    return redirect('/login');
  }

  return {
    userId: session.get('userId'),
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  };
}

export default function AppPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div>This is the App page.</div>
      {loaderData.userId}
    </div>
  );
}
