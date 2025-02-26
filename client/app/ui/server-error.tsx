interface FormErrorProps {
  message: string | undefined;
}

export default function ServerError({ message }: FormErrorProps) {
  return (
    <div className='rounded-sm border-2 border-rose-500 bg-rose-950 p-2 text-center text-slate-300'>
      {message}
    </div>
  );
}
