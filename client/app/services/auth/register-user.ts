const URL = import.meta.env.VITE_URL;

type RegisterData = {
  message: string;
  userData: {
    user: {
      email: string;
      id: string;
      createdAt: Date;
    };
    token: string;
  };
};

type RegisterReturn = {
  userData?: {
    email: string;
    id: string;
    createdAt: Date;
    token: string;
  };
  error?: {
    errorMessage: string[];
  };
};

export async function registerUser(
  email: string,
  password: string,
): Promise<RegisterReturn> {
  try {
    const res = await fetch(`${URL}/api/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (!res.ok) {
      const errorData: { errors: { user: string[] } } = await res.json();

      return {
        error: {
          errorMessage: errorData.errors.user,
        },
      };
    }

    const { userData }: RegisterData = await res.json();

    return {
      userData: {
        email: userData.user.email,
        id: userData.user.id,
        createdAt: userData.user.createdAt,
        token: userData.token,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return { error: { errorMessage: [err.message] } };
    } else {
      return { error: { errorMessage: ['Something went wrong!'] } };
    }
  }
}
