import { useState } from 'react';
import { loginApi } from '../services/auth-api/login-api';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { authDispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const { userId } = await loginApi(email, password);

    authDispatch({ type: 'auth/login', payload: { id: userId } });

    console.log('handleSubmit function called.');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}
