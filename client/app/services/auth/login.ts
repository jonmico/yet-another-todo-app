const URL = import.meta.env.VITE_URL;

// TODO: Error handling!
// TODO: Maybe switch to a generic fetch helper.

export async function login(email: string, password: string) {
  console.log('email', email);
  console.log('password', password);

  try {
    const res = await fetch(`${URL}/api/user/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
