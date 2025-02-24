import { Outlet } from 'react-router';
import AppNav from '~/components/app-nav';

export default function ProtectedAppLayout() {
  return (
    <div>
      <AppNav />
      <Outlet />
    </div>
  );
}
