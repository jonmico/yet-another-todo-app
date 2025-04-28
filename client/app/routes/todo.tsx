import { getTodo } from '~/services/todo/get-todo';
import { tokenCookie } from '~/sessions.server';
import type { Route } from './+types/todo';

import { Link, useFetcher, useLoaderData } from 'react-router';
import FormError from '~/ui/form-error';
import type { action } from './delete-todo';

// TODO: Style Todo component.

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const tokenString = token.get('token');

  const result = await getTodo(tokenString, params.todoId);

  if (result.type === 'error') {
    return { error: result.data.error };
  }

  return { todo: result.data.todo };
}

export default function TodoPage({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof action>();

  return (
    <div>
      {fetcher.data && <FormError message={fetcher.data.error._server} />}
      {loaderData.error && <div>Error: {loaderData.error._server}</div>}
      <Todo />
      <Link
        to={'edit'}
        className='rounded border px-4 py-1'
      >
        Edit
      </Link>
      <fetcher.Form
        method='delete'
        action='delete'
      >
        <button className='rounded border p-4'>Delete</button>
      </fetcher.Form>
    </div>
  );
}

function Todo() {
  const loaderData = useLoaderData<typeof loader>();

  const { todo } = loaderData;

  if (!todo) return <div>{loaderData.error._server}</div>;

  return (
    <div>
      {todo.title && <div>Title: {todo.title}</div>}
      <div>Description: {todo.description}</div>
      {todo.dueDate && <div>Due Date: {todo.dueDate}</div>}
    </div>
  );
}
