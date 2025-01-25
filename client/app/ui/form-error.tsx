interface FormErrorProps {
  message: string | undefined;
}

export default function FormError({ message }: FormErrorProps) {
  return <div className='text-rose-500'>{message}</div>;
}
