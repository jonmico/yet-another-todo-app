import TodoComponent from './todo';

type Todo = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

interface TodoGridProps {
  todos: Todo[] | undefined;
}

export default function TodoGrid({ todos }: TodoGridProps) {
  if (!todos || !todos.length) {
    return <div>No Todos!</div>;
  }

  const todoList = todos.map((t) => (
    <TodoComponent
      key={t.id}
      todo={t}
    />
  ));

  return <ul className='grid grid-cols-4 gap-4 p-4'>{todoList}</ul>;
}
