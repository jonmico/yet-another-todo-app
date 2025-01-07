import { sessionCookie } from '~/cookies.server';
import type { Route } from './+types/app-page';
import { redirect } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const userId = await sessionCookie.parse(cookieHeader);

  if (!userId) {
    return redirect('/login');
  }

  return { userId };
}

export default function AppPage({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div>
      {userId}
      <div>This is the App page.</div>
    </div>
  );
}
