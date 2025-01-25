import FormError from './form-error';

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  id: string;
  htmlFor: string;
  required?: boolean;
  errorMessage?: string;
}

export default function FormInput(props: FormInputProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex flex-col'>
        <label
          className='font-semibold text-slate-300'
          htmlFor={props.htmlFor}
        >
          {props.label}
        </label>
        <input
          className='h-8 rounded bg-gray-950 px-2 focus:outline-none focus:ring focus:ring-blue-600'
          required={props.required}
          type={props.type}
          name={props.name}
          id={props.id}
        />
      </div>
      {props.errorMessage ? <FormError message={props.errorMessage} /> : null}
    </div>
  );
}
