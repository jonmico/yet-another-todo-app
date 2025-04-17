import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Route } from './+types/dashboard';
import { redirect } from 'react-router';
import type { Todo } from '~/types/todo';
import TodoGrid from '~/components/todo-grid';
import PageHeader from '~/components/page-header';
import { getTodos } from '~/services/todo/get-todos';

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionCookie.getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  const token = await tokenCookie.getSession(request.headers.get('Cookie'));
  const tokenString = token.get('token');

  if (!userId || !tokenString) {
    return redirect('/login', {
      headers: [
        ['Set-Cookie', await tokenCookie.destroySession(token)],
        ['Set-Cookie', await sessionCookie.destroySession(session)],
      ],
    });
  }

  // TODO: Look into making a generic handleFetch function to simplify API calls.
  const result = await getTodos(tokenString);

  if (result.type === 'error') {
    console.log('getTodos error:', result.data);
    return { ...result.data };
  }

  return { todos: result.data.todos };
}

// FIXME: Why do my redirects for expired tokens not destroySession?

// FIXME: Why is this returning undefined todos with the error?
/*
Band-aid fix: Change TodoGrid to accept todos as Todo[] or undefined.
Handle undefined case in todos.length check.

Update: This might actually be intended.
*/
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Dashboard</PageHeader>
      <TodoGrid todos={loaderData.todos} />
    </div>
  );
}
