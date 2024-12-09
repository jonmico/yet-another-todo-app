import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useAuth } from '../hooks/useAuth';
import { loginApi } from '../services/auth-api/login-api';

export default function LoginPage() {
  const { authDispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isPending, startTransition] = useTransition();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const { userId } = await loginApi(email, password);

      authDispatch({ type: 'auth/login', payload: { id: userId } });
    },
    null
  );

  // function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
  //   evt.preventDefault();

  //   startTransition(async () => {
  //     const { userId } = await loginApi(email, password);

  //     authDispatch({ type: 'auth/login', payload: { id: userId } });

  //     console.log('handleSubmit function called.');
  //   });
  // }

  return (
    <div>
      <h2>Login</h2>
      <form action={submitAction}>
        {/* <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            id='email'
            type='email'
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            id='password'
            type='Password'
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div> */}
        <FormInputs />
      </form>
    </div>
  );
}

function FormInputs() {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <label htmlFor='email'>Email</label>
        <input name='email' id='email' type='email' />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input name='password' id='password' type='Password' />
      </div>
      <button disabled={pending}>Login</button>
    </>
  );
}
