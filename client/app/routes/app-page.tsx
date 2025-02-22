import { useState } from 'react';
import { redirect, useFetcher } from 'react-router';
import TodoGrid from '~/components/todo-grid';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Route } from './+types/app-page';

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

  const data: { todos: Todo[] } = await res.json();

  return { userId, todos: data.todos };
}

type Todo = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

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

  const data: { todo: Todo } = await res.json();

  return data;
}

export default function AppPage({ loaderData }: Route.ComponentProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { userId, todos } = loaderData;

  const fetcher = useFetcher();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    // TODO: Build in some type of form validation eventually.
    await fetcher.submit({ title, description }, { method: 'POST' });

    setTitle('');
    setDescription('');
  }

  return (
    <div>
      <p>{userId}</p>
      <div>This is the App page.</div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            name='title'
            id='title'
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input
            name='description'
            id='description'
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
        </div>
        <button>Submit?</button>
      </form>
      <TodoGrid todos={todos} />
    </div>
  );
}
