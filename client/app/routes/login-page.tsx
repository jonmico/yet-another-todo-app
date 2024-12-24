import { Form, useFetcher } from 'react-router';

// TODO: Read this - https://reactrouter.com/explanation/sessions-and-cookies
// TODO: Should I use a fetcher for this? I think I want to use a regular form as I will be navigating after submission. Right?

export async function action() {}

export default function Login() {
  const fetcher = useFetcher();
  return (
    <div>
      <fetcher.Form></fetcher.Form>
    </div>
  );
}
