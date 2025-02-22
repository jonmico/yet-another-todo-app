import { useFetcher } from 'react-router';
import Button from '~/ui/button';
import FormInput from '~/ui/form-input';

export default function CreateTodo() {
  let fetcher = useFetcher();

  return (
    <fetcher.Form method='post'>
      <FormInput
        label='Title'
        name='title'
        id='title'
        htmlFor='title'
      />
      <FormInput
        label='Description'
        name='description'
        id='description'
        htmlFor='description'
      />
      <Button type='submit'>Create Todo</Button>
    </fetcher.Form>
  );
}
