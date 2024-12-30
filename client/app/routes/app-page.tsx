import { useAuth } from '~/hooks/useAuth';

export async function loader() {}

export default function AppPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <div>This is the App page.</div>
      <div>{user}</div>
    </div>
  );
}
