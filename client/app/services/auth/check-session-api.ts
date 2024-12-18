const URL = import.meta.env.VITE_URL;

interface CheckSessionApiReturn {
  data?: {
    isAuthenticated: boolean;
    user: { id: string };
  };
  error?: string;
}

/*
TODO: 
Make checkSessionApi a POST request and send accessToken/refreshToken in JSON body.
Receive on server and change server middleware to process req.body instead of req.cookies.
Probably pass request object from loader to checkSessionApi, or at least the tokens from the req.
  -> I think we could parse the cookies in the loader and then pass the strings to checkSessionApi.
*/

export async function checkSessionApi(): Promise<CheckSessionApiReturn> {
  try {
    const res = await fetch(`${URL}/api/user/checkSession`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accessToken, refreshToken),
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
