const URL = import.meta.env.VITE_URL;

interface CheckSessionApiReturn {
  data?: {
    isAuthenticated: boolean;
    user: { id: string };
  };
  error?: string;
}

export async function checkSessionApi(): Promise<CheckSessionApiReturn> {
  try {
    const res = await fetch(`${URL}/api/user/checkSession`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData: { error: string } = await res.json();
      return errorData;
    }

    const data: { isAuthenticated: boolean; user: { id: string } } =
      await res.json();

    return { data, error: undefined };
  } catch (err) {
    console.error(err);
    return { error: `Something went wrong: ${err}` };
  }
}
