const URL = import.meta.env.VITE_URL;

type RegisterSuccess = {
  message: string;
  user: {
    email: string;
    id: string;
    createdAt: Date;
  };
  token: string;
};

type RegisterError = {
  error: {
    email?: string;
    password?: string;
    _server?: string;
  };
};

type RegisterResult =
  | { type: 'success'; data: RegisterSuccess }
  | { type: 'error'; data: RegisterError };

export async function registerUser(
  email: string,
  password: string,
): Promise<RegisterResult> {
  try {
    const res = await fetch(`${URL}/api/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();

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
