import type { Route } from './+types/dashboard';

// export async function loader({ request }: Route.LoaderArgs) {
//   const session = await sessionCookie.getSession(request.headers.get('Cookie'));

//   const userId = session.get('userId');

//   if (!userId) {
//     return redirect('/login');
//   }

//   const token = await tokenCookie.getSession(request.headers.get('Cookie'));
//   const tokenString = token.get('token');

//   const res = await fetch(`${URL}/api/todo`, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       Cookie: `token=${tokenString}`,
//     },
//   });

//   const data: { todos: Todo[] } = await res.json();

//   return { userId, todos: data.todos ? data.todos : [] };
// }

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div>This is the dashboard</div>
      {/* <TodoGrid todos={loaderData.todos} /> */}
    </div>
  );
}
