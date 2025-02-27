import { redirect } from 'react-router';
import CreateTodoForm from '~/components/create-todo-form';
import PageHeader from '~/components/page-header';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import type { Todo } from '~/types/todo';
import type { Route } from './+types/create-todo';
import { createTodo } from '~/services/todo/create-todo';

const URL = process.env.VITE_URL;

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const session = await sessionCookie.getSession(request.headers.get('Cookie'));
  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const data = await createTodo(title, description, token.get('token'));

  if (data.type === 'error') {
    return { ok: false };
  }

  // const res = await fetch(`${URL}/api/todo`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     title,
  //     description,
  //     userId: session.get('userId'),
  //   }),
  // });

  // const data: { todo: Todo } = await res.json();

  return redirect(`/todo/${data.data.todo.id}`);
}

export default function CreateTodo() {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>New Todo</PageHeader>
      <CreateTodoForm />
    </div>
  );
}
