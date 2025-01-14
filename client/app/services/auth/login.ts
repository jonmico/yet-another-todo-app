const URL = import.meta.env.VITE_URL;

// TODO: Error handling!
// TODO: Maybe switch to a generic fetch helper.

interface LoginData {
  message?: string;
  user?: {
    userId: string;
    token: string;
  };
  error?: {
    message: string;
  };
}

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${URL}/api/user/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: LoginData = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return { error: { message: err.message } };
    } else {
      return { error: { message: 'Something went wrong.' } };
    }
  }
}
