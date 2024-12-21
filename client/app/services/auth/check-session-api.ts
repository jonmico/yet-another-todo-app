import { accessTokenCookie, refreshTokenCookie } from '~/routes/register-page';

const URL = import.meta.env.VITE_URL;

interface CheckSessionApiReturn {
  data: {
    isAuthenticated: boolean;
    user: { id: string };
  } | null;
  error: string | null;
}

export async function checkSessionApi(
  request: Request
): Promise<CheckSessionApiReturn> {
  try {
    const cookieHeader = request.headers.get('Cookie');

    const accessToken = await accessTokenCookie.parse(cookieHeader);

    const refreshToken = await refreshTokenCookie.parse(cookieHeader);

    const res = await fetch(`${URL}/api/user/checkSession`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    if (!res.ok) {
      const errorData: { error: string } = await res.json();
      return { data: null, error: errorData.error };
    }

    const data: { isAuthenticated: boolean; user: { id: string } } =
      await res.json();

    return { data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: `Something went wrong: ${err}` };
  }
}
