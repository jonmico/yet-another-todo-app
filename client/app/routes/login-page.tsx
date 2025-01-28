import { redirect } from 'react-router';
import { login } from '~/services/auth/login';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import Button from '~/ui/button';
import Form from '~/ui/form';
import FormInput from '~/ui/form-input';
import type { Route } from './+types/login-page';
import ServerError from '~/ui/server-error';

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

  if (result.type === 'error') {
    const { data } = result;

    return {
      error: {
        email: data.error.email,
        password: data.error.password,
        _server: data.error._server,
      },
    };
  }

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

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-4 pt-8'>
      <h2 className='text-center text-xl font-bold'>
        Log in to Yet Another Todo App
      </h2>
      <Form method='post'>
        {actionData?.error._server && (
          <ServerError message={actionData.error._server} />
        )}
        <FormInput
          label='Email'
          type='email'
          id='email'
          htmlFor='email'
          name='email'
          required={true}
          errorMessage={actionData?.error.email}
        />
        <FormInput
          label='Password'
          type='password'
          id='password'
          htmlFor='password'
          name='password'
          required={true}
          errorMessage={actionData?.error.password}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
}
