import { redirect } from 'react-router';
import PageHeader from '~/components/page-header';
import TodoGrid from '~/components/todo-grid';
import { getTodos } from '~/services/todo/get-todos';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Route } from './+types/dashboard';

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
    return { error: result.data.error };
  }

  return { todos: result.data.todos };
}

// FIXME: Why do my redirects for expired tokens not destroySession?
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Dashboard</PageHeader>
      <TodoGrid todos={loaderData.todos} />
    </div>
  );
}
