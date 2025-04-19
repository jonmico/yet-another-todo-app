import Spinner from './spinner';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  loadingState?: 'idle' | 'loading' | 'submitting';
}

/*
FIXME: Loading spinner shows on navigation, which is unintended. We do not want to show a loading spinner when we are navigating
between pages, only when a form is submitted. Possible fix: only show loading spinner on 'submitting'?
*/
export default function Button({ type, children, loadingState }: ButtonProps) {
  return (
    <button
      className='background-color flex items-center justify-center gap-2 rounded-sm bg-blue-600 p-2 font-semibold transition delay-150 ease-in-out hover:bg-blue-700'
      type={type}
    >
      {loadingState === 'loading' && <Spinner />} {children}
    </button>
  );
}
