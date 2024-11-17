export async function checkSessionApi() {
  try {
    const res = await fetch('http://localhost:3000/user/checkSession', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
