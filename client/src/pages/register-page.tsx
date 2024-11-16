import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, authState } = useAuth();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    register(email, password);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <button type='submit'>Sign up</button>
      </form>
      {authState.id ? <User id={authState.id} /> : null}
    </div>
  );
}

interface UserProps {
  id: number;
}

function User({ id }: UserProps) {
  return (
    <div>
      <h4>{id}</h4>
    </div>
  );
}
