import { tokenCookie } from '~/sessions.server';
import type { Todo } from '~/types/todo';
import type { Route } from './+types/todo';

const URL = process.env.VITE_URL;

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const tokenString = token.get('token');

  // Not sure if I want to check for tokenString being undefined here, or if I just want to let backend handle it.

  // TODO: Make this a getTodo function.
  const res = await fetch(`${URL}/api/todo/${params.todoId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `token=${token.get('token')}`,
    },
  });

  const data: { todo: Todo } = await res.json();

  return data;
}

export default function TodoPage({ loaderData }: Route.ComponentProps) {
  const { todo } = loaderData;
  return (
    <div>
      <div>Title: {todo.title}</div>
      <div>Description: {todo.description}</div>
    </div>
  );
}
