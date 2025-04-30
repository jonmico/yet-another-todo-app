import { Form, redirect, useNavigation } from 'react-router';
import { getTodo } from '~/services/todo/get-todo';
import { sessionCookie, tokenCookie } from '~/sessions.server';
import FormInput from '~/ui/form-input';
import FormTextArea from '~/ui/form-text-area';
import type { Route } from './+types/edit-todo';
import Button from '~/ui/button';
import { editTodo } from '~/services/todo/edit-todo';
import PageHeader from '~/components/page-header';

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
    return { error: result.data.error };
  }

  return { todo: result.data.todo };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dueDate = formData.get('dueDate') as string | undefined;

  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const tokenString = token.get('token');

  const { todoId } = params;

  const result = await editTodo(
    tokenString,
    todoId,
    title,
    description,
    dueDate,
  );

  if (result.type === 'error') {
    return { error: result.data.error };
  }

  return redirect(`/todo/${todoId}`);
}

export default function EditTodo({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();

  if (loaderData.error) {
    return (
      <div>
        <p>No Todo found.</p>
      </div>
    );
  }

  // This is to format dueDate so the defaultValue attribute works.
  let dueDateString = '';

  if (loaderData.todo.dueDate) {
    dueDateString = loaderData.todo.dueDate.substring(0, 10);
  }

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Edit Todo</PageHeader>
      <div className='rounded-sm border border-slate-700/80 bg-slate-900 p-4'>
        <Form method='put'>
          <fieldset
            className='flex flex-col gap-4'
            disabled={navigation.state !== 'idle'}
          >
            <FormInput
              label='Title'
              name='title'
              id='title'
              htmlFor='title'
              defaultValue={loaderData.todo.title}
            />
            <FormTextArea
              label='Description'
              name='description'
              id='description'
              htmlFor='description'
              defaultValue={loaderData.todo.description}
              errorMessage={actionData?.error.description}
            />
            <div>
              <label htmlFor='dueDate'>Due Date: </label>
              <input
                type='date'
                name='dueDate'
                id='dueDate'
                defaultValue={dueDateString}
              />
            </div>
            <Button>Edit Todo</Button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
