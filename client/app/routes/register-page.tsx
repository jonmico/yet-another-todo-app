import { redirect } from 'react-router';
import { registerUser } from '~/services/auth/register-user';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import Button from '~/ui/button';
import Form from '~/ui/form';
import FormError from '~/ui/form-error';
import FormInput from '~/ui/form-input';
import type { Route } from './+types/register-page';

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

  const { userData, error } = await registerUser(email, password);

  if (error) {
    return {
      formError: error.errorMessage,
    };
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

  return { formError: ['Registration failed.'] };
}
// TODO: Make responsive. Add error handling.

export default function Register({ actionData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-4 pt-8'>
      <h2 className='text-center text-xl font-bold'>
        Sign up for Yet Another Todo App
      </h2>
      <Form method='post'>
        {actionData ? <FormError message={actionData.formError} /> : null}
        {/* <FormError message='This is a test error.' /> */}
        <FormInput
          required={true}
          htmlFor='email'
          label='Email'
          name='email'
          id='email'
          type='email'
        />
        <FormInput
          required={true}
          htmlFor='password'
          label='Password'
          name='password'
          id='password'
          type='password'
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
}
