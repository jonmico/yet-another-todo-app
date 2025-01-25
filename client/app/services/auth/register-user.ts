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

type RegisterResult =
  | { type: 'success'; data: RegisterSuccess }
  | { type: 'formError'; data: FormValidationError }
  | { type: 'serverError'; data: ServerError };

type FormValidationError = {
  formError: {
    email?: string;
    password?: string;
  };
};

type ServerError = {
  message: string;
};

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
      const data = await res.json();

      if ('formError' in data) {
        return {
          type: 'formError',
          data: { formError: data.formError },
        };
      }

      return {
        type: 'serverError',
        data: { message: data.message },
      };
    }

    const data = await res.json();

    return {
      type: 'success',
      data,
    };
  } catch (err) {
    return {
      type: 'serverError',
      data: {
        message: err instanceof Error ? err.message : 'Something went wrong.',
      },
    };
  }
}
