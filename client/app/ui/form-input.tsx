import FormError from './form-error';

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  id: string;
  htmlFor: string;
  required?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FormInput(props: FormInputProps) {
  const isError = !!props.errorMessage;
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
          className={`h-8 rounded-sm bg-gray-950 px-2 focus:outline-hidden ${isError ? 'border border-rose-500' : 'focus:ring-3 focus:ring-blue-600'}`}
          required={props.required}
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      {props.errorMessage ? <FormError message={props.errorMessage} /> : null}
    </div>
  );
}
