export async function registerApi(email: string, password: string) {
  const user = { email, password };

  const res = await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    body: JSON.stringify({ user }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: {
    user: {
      id: number;
      email: string;
    };
  } = await res.json();

  return { data };
}
