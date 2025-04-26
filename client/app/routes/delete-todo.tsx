import { redirect } from 'react-router';
import type { Route } from './+types/delete-todo';
import { deleteTodo } from '~/services/todo/delete-todo';
import { tokenCookie } from '~/sessions.server';

export async function action({ request, params }: Route.ActionArgs) {
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const tokenString = token.get('token');
  const { todoId } = params;

  const result = await deleteTodo(tokenString, todoId);

  if (result.type === 'error') {
    return { error: result.data.error };
  }

  return redirect('/dashboard');
}
