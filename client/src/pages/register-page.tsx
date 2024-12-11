import { useActionState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { registerApi } from '../services/auth-api/register-api';

interface RegisterFormState {
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
  };
}

const initalState: RegisterFormState = {
  email: '',
  password: '',
  confirmPassword: '',
  errors: {},
};

export default function RegisterPage() {
  const { authState, authDispatch } = useAuth();
  const [formState, formAction, isPending] = useActionState<
    RegisterFormState,
    FormData
  >(async (_, formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const data = await registerApi(email, password);

    authDispatch({ type: 'auth/createUser', payload: { id: data.user.id } });

    return { email: '', password: '', confirmPassword: '', errors: {} };
  }, initalState);

  return (
    <>
      {isPending ? (
        <div>PENDING...</div>
      ) : (
        <div>
          <form action={formAction}>
            <h2>Sign up</h2>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                defaultValue={formState.email}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                defaultValue={formState.password}
              />
            </div>
            <button type='submit'>Sign up</button>
          </form>
          {authState.id ? <User id={authState.id} /> : <div>Not logged in</div>}
        </div>
      )}
    </>
  );
}

interface UserProps {
  id: string;
}

function User({ id }: UserProps) {
  return (
    <div>
      <h4>{id}</h4>
    </div>
  );
}
