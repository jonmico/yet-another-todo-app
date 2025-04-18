import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Route } from './+types/edit-todo';
import { redirect } from 'react-router';
import { getTodo } from '~/services/todo/get-todo';

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));

  if (!session.get('userId')) {
    return redirect('/login', {
      headers: {
        'Set-Cookie': await sessionCookie.destroySession(session),
      },
    });
  }

  const tokenSession = await tokenCookie.getSession(
    request.headers.get('Cookie'),
  );

  const token = tokenSession.get('token');

  const result = await getTodo(token, params.todoId);

  if (result.type === 'error') {
    return result.data;
  }

  return result.data;
}

export default function EditTodo({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return (
    <div>
      <h2>This is the EditTodo page.</h2>
    </div>
  );
}
