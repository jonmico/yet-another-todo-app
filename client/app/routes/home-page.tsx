import type { Route } from './+types/home-page';

const URL = process.env.VITE_URL;

export async function loader({ request }: Route.LoaderArgs) {}

export default function HomePage() {
  return <div>this is the home page!</div>;
}
