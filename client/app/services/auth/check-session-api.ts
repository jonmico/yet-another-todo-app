const URL = import.meta.env.VITE_URL;

interface CheckSessionApiReturn {
  data: {
    isAuthenticated: boolean;
    user: { id: string };
  } | null;
  error: { error: string; details: string };
}

// TODO: Probably delete all of this.

export async function checkSessionApi(
  request: Request
): Promise<CheckSessionApiReturn> {
  try {
    const cookieHeader = request.headers.get('Cookie');

    // const accessToken = await accessTokenCookie.parse(cookieHeader);

    // const refreshToken = await refreshTokenCookie.parse(cookieHeader);

    if (!refreshToken || !accessToken) {
      return { data: null, error: 'No tokens provided.' };
    }

    const res = await fetch(`${URL}/api/user/checkSession`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    if (!res.ok) {
      const errorData: { error: string; details: string } = await res.json();
      return {
        data: null,
        error: { error: errorData.error, details: errorData.details },
      };
    }

    const data: { isAuthenticated: boolean; user: { id: string } } =
      await res.json();

    return { data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: `Something went wrong: ${err}` };
  }
}
