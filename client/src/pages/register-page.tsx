import { useState } from 'react';

interface User {
  id: number;
  email: string;
}

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const user = { email, password };

    try {
      const res = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        body: JSON.stringify({ user }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData: { error: string } = await res.json();
        setError(errorData.error);
      }

      const data: {
        user: {
          id: number;
          email: string;
        };
      } = await res.json();

      console.log(data);

      setUser({ id: data.user.id, email: data.user.email });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong.');
      }
    }
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
      {user ? <User user={user} /> : null}
    </div>
  );
}

interface UserProps {
  user: User;
}

function User(props: UserProps) {
  return (
    <div>
      <h3>{props.user.email}</h3>
      <h4>{props.user.id}</h4>
    </div>
  );
}
