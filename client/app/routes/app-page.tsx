import { redirect, useFetcher } from 'react-router';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Route } from './+types/app-page';
import FormInput from '~/ui/form-input';
import Button from '~/ui/button';

const URL = process.env.VITE_URL;

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');

  if (!userId) {
    return redirect('/login');
  }

  const token = await tokenCookie.getSession(request.headers.get('Cookie'));
  const tokenString = token.get('token');

  const res = await fetch(`${URL}/api/todo`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `token=${tokenString}`,
    },
  });

  const data = await res.json();

  console.log('todos', data);

  return { userId };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  const res = await fetch(`${URL}/api/todo`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      userId: session.get('userId'),
    }),
  });

  const data = await res.json();

  console.log(data);
}

export default function AppPage({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;
  const fetcher = useFetcher();

  return (
    <div>
      <p>{userId}</p>
      <div>This is the App page.</div>
      <fetcher.Form method='post'>
        <FormInput
          label='title'
          name='title'
          id='title'
          htmlFor='title'
        />
        <FormInput
          label='description'
          name='description'
          id='description'
          htmlFor='description'
        />
        <Button>Create Todo</Button>
      </fetcher.Form>
    </div>
  );
}
