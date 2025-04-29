import Spinner from './spinner';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  loadingState?: 'idle' | 'loading' | 'submitting';
}

export default function Button({ type, children, loadingState }: ButtonProps) {
  return (
    <button
      className='background-color flex items-center justify-center gap-2 rounded-sm bg-blue-600 p-2 font-semibold transition delay-150 ease-in-out hover:bg-blue-700'
      type={type}
    >
      {loadingState === 'submitting' && <Spinner />} {children}
    </button>
  );
}
