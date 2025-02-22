import { useState } from 'react';
import { redirect, useFetcher } from 'react-router';
import TodoGrid from '~/components/todo-grid';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Route } from './+types/app-page';
import CreateTodo from '~/components/create-todo';

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
  const { userId, todos } = loaderData;

  return (
    <div>
      <p>{userId}</p>
      <div>This is the App page.</div>
      <CreateTodo />
      <TodoGrid todos={todos} />
    </div>
  );
}
