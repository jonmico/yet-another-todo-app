interface FormErrorProps {
  message: string | undefined;
}

export default function FormError({ message }: FormErrorProps) {
  return <div className='text-red-400'>{message}</div>;
}
