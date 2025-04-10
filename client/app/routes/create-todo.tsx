import { redirect, useNavigation } from 'react-router';
import PageHeader from '~/components/page-header';
import { createTodo } from '~/services/todo/create-todo';
import { tokenCookie } from '~/sessions.server';
import type { Route } from './+types/create-todo';
import Button from '~/ui/button';
import FormInput from '~/ui/form-input';
import ServerError from '~/ui/server-error';

// TODO: Add form validation.
// FIXME: Why is this refreshing?

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const token = await tokenCookie.getSession(request.headers.get('Cookie'));

  const tokenString = token.get('token');

  if (!tokenString) {
    return redirect('/login');
  }

  const result = await createTodo(title, description, tokenString);

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
      <CreateTodoForm error={actionData?.error} />
    </div>
  );
}

interface CreateTodoFormProps {
  error:
    | {
        title?: string;
        description?: string;
        _server?: string;
      }
    | undefined;
}

// TODO: Figure out what props to send to CreateTodoForm for validaton and whatnot.
// TODO: Probably restyle this as it doesn't really look very good.
function CreateTodoForm({ error }: CreateTodoFormProps) {
  const navigation = useNavigation();

  return (
    <div className='rounded-sm border border-slate-700/80 bg-slate-900 p-4'>
      <form
        method='post'
        className='flex flex-col gap-4'
      >
        {error?._server && <ServerError message={error._server} />}
        <FormInput
          label='Title'
          name='title'
          id='title'
          htmlFor='title'
          errorMessage={error?.title}
        />
        <FormInput
          label='Description'
          name='description'
          id='description'
          htmlFor='description'
          errorMessage={error?.description}
        />
        <Button type='submit'>Create Todo</Button>
      </form>
    </div>
  );
}
