export async function checkSessionApi() {
  try {
    const res = await fetch('http://localhost:3001/user/checkSession', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: { isAuthenticated: boolean; user: { id: string } } =
      await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
