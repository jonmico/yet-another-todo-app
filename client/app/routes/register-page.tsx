import { redirect } from 'react-router';
import { registerUser } from '~/services/auth/register-user';
import type { Route } from './+types/register-page';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import { data } from 'react-router';
import FormInput from '~/ui/form-input';
import Button from '~/ui/button';
import Form from '~/ui/form';
import FormError from '~/ui/form-error';

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
// TODO: Make responsive. Add error handling.

export default function Register({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;
  return (
    <div className='flex flex-col pt-8 gap-4'>
      <h2 className=' text-center font-bold text-xl'>
        Sign up for Yet Another Todo App
      </h2>
      <Form method='post'>
        <FormError message='This is a test error.' />
        <FormInput
          htmlFor='email'
          label='Email'
          name='email'
          id='email'
          type='email'
        />
        <FormInput
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
