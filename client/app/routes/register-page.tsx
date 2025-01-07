import { Form, redirect } from 'react-router';
import { sessionCookie, tokenCookie } from '~/cookies.server';
import { registerUser } from '~/services/auth/register-user';
import type { Route } from './+types/register-page';

// TODO: Figure out error on errorMessage.

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { userData, error } = await registerUser(email, password);

  if (error) {
    return { errorMessage: error.errorMessage };
  }

  if (userData) {
    return redirect('/app', {
      headers: [
        ['Set-Cookie', await sessionCookie.serialize(userData.id)],
        ['Set-Cookie', await tokenCookie.serialize(userData.token)],
      ],
    });
  }
}

export default function Register({ actionData }: Route.ComponentProps) {
  return (
    <>
      <Form method='post'>
        {actionData && (
          <div>
            <p>Error: {actionData.errorMessage}</p>
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
