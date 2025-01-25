import { redirect } from 'react-router';
import { login } from '~/services/auth/login';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import Button from '~/ui/button';
import Form from '~/ui/form';
import FormInput from '~/ui/form-input';
import type { Route } from './+types/login-page';

// TODO: Frontend validation.

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

  const result = await login(email, password);

  console.log(result);

  if (result.type === 'success') {
    const { data } = result;
    session.set('userId', data.user.userId);
    token.set('token', data.user.token);

    return redirect('/app', {
      headers: [
        ['Set-Cookie', await tokenCookie.commitSession(token)],
        ['Set-Cookie', await sessionCookie.commitSession(session)],
      ],
    });
  }

  if (result.type === 'formError') {
    const { data } = result;
    return {
      formError: {
        email: data.error.email,
        password: data.error.password,
      },
    };
  }

  if (result.type === 'serverError') {
    const { data } = result;
    return {
      serverError: {
        error: {
          server: data,
        },
      },
    };
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  console.log(actionData);
  return (
    <div className='flex flex-col gap-4 pt-8'>
      <h2 className='text-center text-xl font-bold'>
        Log in to Yet Another Todo App
      </h2>
      <Form method='post'>
        <FormInput
          label='Email'
          type='email'
          id='email'
          htmlFor='email'
          name='email'
          required={true}
        />
        <FormInput
          label='Password'
          type='password'
          id='password'
          htmlFor='password'
          name='password'
          required={true}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
}
