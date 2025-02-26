interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
}

export default function Button({ type, children }: ButtonProps) {
  return (
    <button
      className='font-semibold transition background-color ease-in-out delay-150 bg-blue-600 rounded-sm p-2  hover:bg-blue-700'
      type={type}
    >
      {children}
    </button>
  );
}
