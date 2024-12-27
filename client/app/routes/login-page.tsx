import { Form } from 'react-router';
import type { Route } from './+types/login-page';

// TODO: Read this - https://reactrouter.com/explanation/sessions-and-cookies

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
}

export default function Login() {
  return (
    <div className='w-full'>
      <div className='w-1/4 m-auto'>
        <h2 className='text-center'>Log In to Yet Another Todo App</h2>
        <Form className='p-4 border rounded flex flex-col gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input className='rounded' name='email' type='email' id='email' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              className='rounded'
              name='password'
              type='password'
              id='password'
            />
          </div>
          <button type='submit' className='bg-slate-500 rounded p-2'>
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
