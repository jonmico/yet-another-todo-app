import { Outlet } from 'react-router';
import AppNav from '~/components/app-nav';

export default function AppPage() {
  return (
    <div>
      <AppNav />
      <Outlet />
    </div>
  );
}
