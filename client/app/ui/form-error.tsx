interface FormErrorProps {
  message: string[];
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <div className='rounded border-2 border-rose-500 bg-rose-950 p-2 text-center text-slate-300'>
      {message.map((e) => (
        <p>{e}</p>
      ))}
    </div>
  );
}
