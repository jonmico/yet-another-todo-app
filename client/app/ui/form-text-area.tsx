interface FormTextAreaProps {
  label: string;
  type?: string;
  name: string;
  id: string;
  htmlFor: string;
  required?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  navigationState?: 'idle' | 'loading' | 'submitting';
  defaultValue?: string;
}

export default function FormTextArea(props: FormTextAreaProps) {
  const isError = !!props.errorMessage;
  let isNavigating = false;

  if (props.navigationState && props.navigationState !== 'idle') {
    isNavigating = true;
  }
  return (
    <div className='flex flex-col'>
      <label
        className='font-semibold text-slate-300'
        htmlFor={props.htmlFor}
      >
        {props.label}
      </label>
      <textarea
        name='description'
        id='description'
        disabled={isNavigating}
        className={`rounded-sm bg-gray-950 px-2 py-1 focus:outline-hidden disabled:bg-gray-950/50 ${isError ? 'border border-red-400' : 'focus:ring-3 focus:ring-blue-600'}`}
        defaultValue={props.defaultValue}
      ></textarea>
      {props.errorMessage && (
        <div className='text-red-400'>{props.errorMessage}</div>
      )}
    </div>
  );
}
