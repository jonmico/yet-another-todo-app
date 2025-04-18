import { Form, redirect, useNavigation } from 'react-router';
import PageHeader from '~/components/page-header';
import { createTodo } from '~/services/todo/create-todo';
import { tokenCookie } from '~/sessions.server';
import type { Route } from './+types/create-todo';
import Button from '~/ui/button';
import FormInput from '~/ui/form-input';
import ServerError from '~/ui/server-error';

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

// TODO: Probably restyle this as it doesn't really look very good.
function CreateTodoForm({ error }: CreateTodoFormProps) {
  const navigation = useNavigation();

  return (
    <div className='rounded-sm border border-slate-700/80 bg-slate-900 p-4'>
      <Form method='post'>
        <fieldset
          className='flex flex-col gap-4'
          disabled={navigation.state !== 'idle'}
        >
          {error?._server && <ServerError message={error._server} />}
          <FormInput
            label='Title'
            name='title'
            id='title'
            htmlFor='title'
            navigationState={navigation.state}
            errorMessage={error?.title}
          />
          <div className='flex flex-col'>
            <label
              className='font-semibold text-slate-300'
              htmlFor='description'
            >
              Description
            </label>
            <textarea
              name='description'
              id='description'
              disabled={navigation.state != 'idle'}
              className={`rounded-sm bg-gray-950 px-2 py-1 focus:outline-hidden disabled:bg-gray-950/50 ${error?.description ? 'border border-red-400' : 'focus:ring-3 focus:ring-blue-600'}`}
            ></textarea>
            {error?.description && (
              <div className='text-red-400'>{error?.description}</div>
            )}
          </div>
          <Button
            type='submit'
            loadingState={navigation.state}
          >
            Create Todo
          </Button>
        </fieldset>
      </Form>
    </div>
  );
}
