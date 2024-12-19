import { createCookie, Form, redirect } from 'react-router';
import type { Route } from './+types/register-page';

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

export const refreshTokenCookie = createCookie('refreshToken', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

export const accessTokenCookie = createCookie('accessToken', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000, // 15min
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

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

    return redirect('/', {
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
