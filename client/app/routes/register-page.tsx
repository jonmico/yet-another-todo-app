import { redirect } from 'react-router';
import { registerUser } from '~/services/auth/register-user';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import Button from '~/ui/button';
import Form from '~/ui/form';
import FormInput from '~/ui/form-input';
import type { Route } from './+types/register-page';
import FormError from '~/ui/form-error';
import ServerError from '~/ui/server-error';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/app');
  }
}

// TODO: Make better validation for frontend.

export async function action({ request }: Route.ActionArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = await registerUser(email, password);

  if (result.type === 'success') {
    session.set('userId', result.data.user.id);
    token.set('token', result.data.token);

    throw redirect('/app', {
      headers: [
        ['Set-Cookie', await sessionCookie.commitSession(session)],
        ['Set-Cookie', await tokenCookie.commitSession(token)],
      ],
    });
  }

  if (result.type === 'formError') {
    const formError = {
      email: result.data.formError.email,
      password: result.data.formError.password,
    };

    return { formError };
  }

  if (result.type === 'serverError') {
    return { serverError: result.data.message };
  }

  return { error: 'Registration failed.' };
}

// TODO: Figure out typing

export default function Register({ actionData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-4 pt-8'>
      <h2 className='text-center text-xl font-bold'>
        Sign up for Yet Another Todo App
      </h2>
      <Form method='post'>
        {actionData?.serverError ? (
          <ServerError message={actionData.serverError} />
        ) : null}
        <FormInput
          required={true}
          htmlFor='email'
          label='Email'
          name='email'
          id='email'
          type='email'
          errorMessage={actionData?.formError?.email}
        />
        <FormInput
          required={true}
          htmlFor='password'
          label='Password'
          name='password'
          id='password'
          type='password'
          errorMessage={actionData?.formError?.password}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
}
