import { tokenCookie } from '~/cookies.server';
import type { Route } from './+types/home-page';

const URL = process.env.VITE_URL;

export async function loader({ request }: Route.LoaderArgs) {
  const token = await tokenCookie.parse(request.headers.get('Cookie'));
  const res = await fetch(`${URL}/api/user/cookieTest`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  console.log(data);
}

export default function HomePage() {
  return <div>this is the home page!</div>;
}
