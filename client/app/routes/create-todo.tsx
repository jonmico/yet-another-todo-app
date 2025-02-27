import { redirect } from 'react-router';
import CreateTodoForm from '~/components/create-todo-form';
import PageHeader from '~/components/page-header';
import { createTodo } from '~/services/todo/create-todo';
import { tokenCookie } from '~/sessions.server';
import type { Route } from './+types/create-todo';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const t = token.get('token');

  if (!t) {
    return redirect('/login');
  }

  const result = await createTodo(title, description, t);

  if (result.type === 'error') {
    console.log('createTodo error:', result.data);
    return { ...result.data };
  }

  const { data } = result;

  return redirect(`/todo/${data.todo.id}`);
}

export default function CreateTodo({ actionData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>New Todo</PageHeader>
      <CreateTodoForm />
    </div>
  );
}
