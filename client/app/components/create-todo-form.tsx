import { useState } from 'react';
import { useFetcher } from 'react-router';
import Button from '~/ui/button';
import FormInput from '~/ui/form-input';

export default function CreateTodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetcher = useFetcher();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    // TODO: Build in some type of form validation eventually.
    await fetcher.submit({ title, description }, { method: 'POST' });

    setTitle('');
    setDescription('');
  }

  return (
    <div className='rounded-sm border border-slate-700/80 bg-slate-900 p-4'>
      {fetcher.state !== 'idle' && <p>Creating Todo...</p>}
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Title'
          name='title'
          id='title'
          htmlFor='title'
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <FormInput
          label='Description'
          name='description'
          id='description'
          htmlFor='description'
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <Button type='submit'>Create Todo</Button>
      </form>
    </div>
  );
}
