import { Link, Outlet } from 'react-router-dom';

export default function IndexPage() {
  return (
    <div>
      <h1>YATA</h1>
      <h4>(Yet Another Todo App)</h4>
      <Link to={'register'}>Register</Link>
      <Link to={'login'}>Login</Link>
      <Outlet />
    </div>
  );
}
