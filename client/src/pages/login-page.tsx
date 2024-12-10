import { useActionState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { loginApi } from '../services/auth-api/login-api';

interface LoginFormState {
  email: string;
  password: string;
  errors: {
    emailError?: string;
    passwordError?: string;
    general?: string;
  };
}

export default function LoginPage() {
  const { authDispatch } = useAuth();

  const [formState, formAction, isPending] = useActionState<
    LoginFormState,
    FormData
  >(
    async (currentState, formData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      let emailError = '';
      if (!email) {
        emailError = 'Please enter a valid email.';
      }

      let passwordError = '';
      if (!password || password.length < 8) {
        passwordError = 'Please enter a valid password.';
      }

      if (emailError || passwordError) {
        return {
          email,
          password,
          errors: {
            emailError,
            passwordError,
            general: '',
          },
        };
      }

      // TODO: Return appropriate errors from this.
      const { userId } = await loginApi(email, password);

      authDispatch({ type: 'auth/login', payload: { id: userId } });

      return { ...currentState, errors: {} };
    },
    { email: '', password: '', errors: {} }
  );

  return (
    <div>
      <h2>Login</h2>
      <form action={formAction}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            id='email'
            type='email'
            defaultValue={formState.email}
            placeholder='Enter email'
          />
          {formState.errors.emailError && (
            <div>{formState.errors.emailError}</div>
          )}
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            id='password'
            type='Password'
            defaultValue={formState.password}
            placeholder='Your super secure password'
          />
          {formState.errors.passwordError && (
            <div>{formState.errors.passwordError}</div>
          )}
        </div>
        <button disabled={isPending}>Login</button>
      </form>
    </div>
  );
}
