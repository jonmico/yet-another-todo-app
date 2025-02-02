const URL = import.meta.env.VITE_URL;

type LoginSuccess = {
  message: string;
  user: {
    userId: string;
    token: string;
  };
};

type LoginError = {
  error: {
    email?: string;
    password?: string;
    _server?: string;
  };
};

type LoginResult =
  | { type: 'success'; data: LoginSuccess }
  | { type: 'error'; data: LoginError };

export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  try {
    const res = await fetch(`${URL}/api/user/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const error: {
        error: { email?: string; password?: string; _server?: string };
      } = await res.json();

      if ('error' in error) {
        return {
          type: 'error',
          data: error,
        };
      }
    }
    const data = await res.json();

    return {
      type: 'success',
      data,
    };
  } catch (err) {
    return {
      type: 'error',
      data: {
        error: {
          _server: err instanceof Error ? err.message : 'Something went wrong.',
        },
      },
    };
  }
}
