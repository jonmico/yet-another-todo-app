interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <div className='border-2 rounded border-rose-500 p-2 bg-rose-950 text-slate-300 text-center'>
      {message}
    </div>
  );
}
