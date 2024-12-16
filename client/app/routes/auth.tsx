import { Outlet } from 'react-router';
import { checkSessionApi } from '~/services/auth/check-session-api';
import type { Route } from './+types/auth';
import { use } from 'react';
import { AuthContext } from '~/contexts/auth-context';

export async function loader() {
  const data = await checkSessionApi();

  return data;
}

export default function Auth({ loaderData }: Route.ComponentProps) {
  const { setUser } = use(AuthContext);
  const { data, error } = loaderData;

  if (error) {
    console.log(error);
  }

  if (data) {
    setUser(data.user.id, data.isAuthenticated);
  }

  return <Outlet />;
}
