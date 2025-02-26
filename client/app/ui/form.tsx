import { Form as RouterForm, type HTMLFormMethod } from 'react-router';

interface FormProps {
  children: React.ReactNode;
  method: HTMLFormMethod | undefined;
}

export default function Form({ children, method }: FormProps) {
  return (
    <RouterForm
      method={method}
      className='border border-blue-600 rounded-sm bg-slate-900 w-1/3 m-auto flex flex-col gap-4 p-4'
    >
      {children}
    </RouterForm>
  );
}
