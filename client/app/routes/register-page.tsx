import { Form, redirect } from 'react-router';
import { registerUser } from '~/services/auth/register-user';
import type { Route } from './+types/register-page';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import { data } from 'react-router';

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

// TODO: Make better validation for frontend.

export async function action({ request }: Route.ActionArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { userData, error } = await registerUser(email, password);

  if (error) {
    session.flash('error', error.errorMessage);
    token.flash('error', error.errorMessage);

    return redirect('/register', {
      headers: [
        ['Set-Cookie', await sessionCookie.commitSession(session)],
        ['Set-Cookie', await tokenCookie.commitSession(token)],
      ],
    });
  }

  if (userData) {
    session.set('userId', userData.id);
    token.set('token', userData.token);

    return redirect('/app', {
      headers: [
        ['Set-Cookie', await sessionCookie.commitSession(session)],
        ['Set-Cookie', await tokenCookie.commitSession(token)],
      ],
    });
  }
}

// TODO: Style this page. Start a ui folder and start making some basic UI components; input, form, button, etc.

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
