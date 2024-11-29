export async function loginApi(email: string, password: string) {
  const res = await fetch('http://localhost:3000/user/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data: { userId: string } = await res.json();

  return data;
}
