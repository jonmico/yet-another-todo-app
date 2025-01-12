import { redirect } from 'react-router';
import { sessionCookie } from '~/sessions.server';
import type { Route } from './+types/app-page';

/*
TODO:
Try to store userId in the session, but store the token in a cookie. Send the cookie to the server for requests.
Validate the token on the server. Use the session to keep the user logged in. I need to go to work. But this might
be something to work on tonight/tomorrow/Friday/whenever I can code again.
*/

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');

  if (userId === undefined) {
    return redirect('/login', {
      headers: {
        'Set-Cookie': await sessionCookie.destroySession(session),
      },
    });
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
