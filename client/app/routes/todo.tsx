import { getTodo } from '~/services/todo/get-todo';
import { tokenCookie } from '~/sessions.server';
import type { Route } from './+types/todo';

import { Link, useFetcher, useLoaderData } from 'react-router';
import FormError from '~/ui/form-error';
import type { action } from './delete-todo';
import PageHeader from '~/components/page-header';

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
      <div className='flex gap-2'>
        <Link
          to={'edit'}
          className='rounded border border-yellow-500 bg-yellow-700/75 px-4 py-1 text-slate-200'
        >
          Edit
        </Link>
        <fetcher.Form
          method='delete'
          action='delete'
        >
          <button className='rounded border border-red-500 bg-red-700/75 px-4 py-1 text-slate-300'>
            Delete
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}

function Todo() {
  const loaderData = useLoaderData<typeof loader>();

  const { todo } = loaderData;

  if (!todo) return <div>{loaderData.error._server}</div>;

  return (
    <div className='flex flex-col gap-2'>
      <TodoTitle title={todo.title} />
      <div className='rounded bg-slate-900 p-3'>
        <div>{todo.description}</div>
        <TodoDueDate dueDate={todo.dueDate} />
      </div>
    </div>
  );
}

interface TodoTitleProps {
  title: string | undefined;
}

function TodoTitle(props: TodoTitleProps) {
  if (!props.title) return null;

  return <PageHeader>{props.title}</PageHeader>;
}

interface TodoDueDateProps {
  dueDate: string | undefined;
}

function TodoDueDate(props: TodoDueDateProps) {
  if (!props.dueDate) return null;

  const formattedDate = new Date(props.dueDate).toDateString();

  return <div>{formattedDate}</div>;
}
