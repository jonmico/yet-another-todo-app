const URL = import.meta.env.VITE_URL;

// TODO: Error handling!
// TODO: Maybe switch to a generic fetch helper.

type LoginSuccess = {
  message: string;
  user: {
    userId: string;
    token: string;
  };
};

type FormError = {
  error: {
    email?: string;
    password?: string;
  };
};

type ServerError = {
  error: {
    server: string;
  };
};

type LoginResult =
  | { type: 'success'; data: LoginSuccess }
  | { type: 'formError'; data: FormError }
  | { type: 'serverError'; data: ServerError };

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

    const data = await res.json();

    if (!res.ok) {
      if ('formError' in data) {
        return {
          type: 'formError',
          data,
        };
      }

      if ('serverError' in data) {
        return {
          type: 'serverError',
          data,
        };
      }
    }

    return data;
  } catch (err) {
    return {
      type: 'serverError',
      data: {
        error: {
          server: err instanceof Error ? err.message : 'Something went wrong.',
        },
      },
    };
  }
}
