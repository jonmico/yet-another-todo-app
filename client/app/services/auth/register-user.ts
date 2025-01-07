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
    errorMessage: string;
    details?: string[];
  };
};

export async function registerUser(
  email: string,
  password: string
): Promise<RegisterReturn> {
  try {
    const res = await fetch(`${URL}/api/user/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (!res.ok) {
      const errorData: { error: string; details?: string[] } = await res.json();
      return {
        error: {
          errorMessage: errorData.error,
          details: errorData.details ? errorData.details : undefined,
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
      return { error: { errorMessage: err.message } };
    } else {
      return { error: { errorMessage: 'Something went wrong!' } };
    }
  }
}
