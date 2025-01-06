import { redirect } from 'react-router';
import { useAuth } from '~/hooks/useAuth';
import { checkSessionApi } from '~/services/auth/check-session-api';
import type { Route } from './+types/app-page';

export async function loader({ request }: Route.LoaderArgs) {
  const { data, error } = await checkSessionApi(request);

  if (error) {
    console.log(error.error);
    return redirect('/login');
  }

  return data;
}

export default function AppPage({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <div>This is the App page.</div>
      <div>{user}</div>
    </div>
  );
}
