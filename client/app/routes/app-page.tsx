import { redirect } from 'react-router';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Route } from './+types/app-page';

const URL = process.env.VITE_URL;

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');

  if (!userId) {
    return redirect('/login');
  }

  const t = token.get('token');

  const todos = await fetch(`${URL}/api/todo`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `token=${t}`,
    },
  });

  console.log(todos);

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
