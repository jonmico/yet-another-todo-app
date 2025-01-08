import { redirect } from 'react-router';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/app-page';

/*
TODO:
Try to store userId in the session, but store the token in a cookie. Send the cookie to the server for requests.
Validate the token on the server. Use the session to keep the user logged in. I need to go to work. But this might
be something to work on tonight/tomorrow/Friday/whenever I can code again.
*/

export async function loader({ request }: Route.LoaderArgs) {
  // const cookieHeader = request.headers.get('Cookie');
  // const userId = await sessionCookie.parse(cookieHeader);
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const token = session.get('token');

  if (userId === undefined) {
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  return { userId, token };
}

export default function AppPage({ loaderData }: Route.ComponentProps) {
  const { userId, token } = loaderData;

  return (
    <div>
      <p>{userId}</p>
      <p>{token}</p>
      <div>This is the App page.</div>
    </div>
  );
}
