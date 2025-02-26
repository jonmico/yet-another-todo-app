import { Form, Link } from 'react-router';

interface HeaderProps {
  userId: string | undefined;
}

// TODO: Style this component because the header is running off the screen. Maybe we need to style the actual container?
export default function Header({ userId }: HeaderProps) {
  const isLoggedIn = !!userId;

  return (
    <div className='flex items-center justify-between border-b border-b-slate-800/75 p-4'>
      <div>
        <Link
          to={'/'}
          className='text-xl font-bold'
        >
          YATA
        </Link>
        <div className='text-sm'>(Yet Another Todo App)</div>
      </div>
      <nav>
        <ul className='flex gap-5'>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to={'login'}>Login</Link>
              </li>
              <li>
                <Link to={'register'}>Register</Link>
              </li>
            </>
          ) : (
            <li>
              <Form method='post'>
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
