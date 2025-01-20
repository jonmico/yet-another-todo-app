import { Form, redirect } from 'react-router';
import { login } from '~/services/auth/login';
import type { Route } from './+types/login-page';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import Button from '~/ui/button';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/app');
  }
}

export async function action({ request }: Route.ActionArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/app');
  }

  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const data = await login(email, password);

  if (data.error) {
    return { error: data.error };
  }

  if (data.user) {
    session.set('userId', data.user.userId);
    token.set('token', data.user.token);

    return redirect('/app', {
      headers: [
        ['Set-Cookie', await tokenCookie.commitSession(token)],
        ['Set-Cookie', await sessionCookie.commitSession(session)],
      ],
    });
  }

  return null;
}

// TODO: Make this look halfway decent. Kinda like register page.
// Maybe just break register component out and reuse here?

export default function Login() {
  return (
    <div className='w-full'>
      <div className='w-1/4 m-auto'>
        <h2 className='text-center'>Log in to Yet Another Todo App</h2>
        <Form
          method='post'
          className='p-4 border border-slate-900 rounded flex flex-col gap-2'
        >
          <div className='flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input className='rounded' name='email' type='email' id='email' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              className='rounded'
              name='password'
              type='password'
              id='password'
            />
          </div>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  );
}
