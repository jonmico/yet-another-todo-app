import { Form, redirect } from 'react-router';
import type { Route } from './+types/register-page';
import { accessTokenCookie, refreshTokenCookie } from '~/cookies.server';

const URL = import.meta.env.VITE_URL;

interface DataType {
  error?: string;
  message?: string;
  user?: {
    id: string;
    createdAt: Date;
    refreshTokenVersion: number;
  };
  accessToken: string;
  refreshToken: string;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // TODO: Pull this fetch code out into a separate function
  try {
    const res = await fetch(`${URL}/api/user/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    const data: DataType = await res.json();

    return redirect('/app', {
      headers: [
        ['Set-Cookie', await refreshTokenCookie.serialize(data.refreshToken)],
        ['Set-Cookie', await accessTokenCookie.serialize(data.accessToken)],
      ],
    });
  } catch (err) {
    console.error(err);
  }
}

export default function Register() {
  return (
    <>
      <Form method='post'>
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
