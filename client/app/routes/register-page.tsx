import { data, Form, redirect } from 'react-router';
import { createUser } from '~/.server/auth';
import { sessionCookie } from '~/sessions.server';
import type { Route } from './+types/register-page';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/app');
  }

  return data(
    { error: session.get('error') },
    {
      headers: {
        'Set-Cookie': await sessionCookie.commitSession(session),
      },
    }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await createUser(email, password);

  session.set('userId', user.id);

  return redirect('/app', {
    headers: {
      'Set-Cookie': await sessionCookie.commitSession(session),
    },
  });
}

export default function Register({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;
  return (
    <>
      <Form method='post'>
        {error && (
          <div>
            <p>Error: {error}</p>
          </div>
        )}
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </>
  );
}
