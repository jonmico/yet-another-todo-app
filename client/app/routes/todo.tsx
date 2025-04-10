import { getTodo } from '~/services/todo/get-todo';
import { tokenCookie } from '~/sessions.server';
import type { Route } from './+types/todo';

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const tokenString = token.get('token');

  const result = await getTodo(tokenString, params.todoId);

  if (result.type === 'error') {
    return { ...result.data };
  }

  return { todo: result.data.todo };
}

export default function TodoPage({ loaderData }: Route.ComponentProps) {
  const { todo } = loaderData;

  if (!todo) return null;

  return (
    <div>
      <div>Title: {todo.title}</div>
      <div>Description: {todo.description}</div>
    </div>
  );
}
