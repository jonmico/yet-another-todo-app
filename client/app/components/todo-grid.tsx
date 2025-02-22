type Todo = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

interface TodoGridProps {
  todos: Todo[];
}

export default function TodoGrid({ todos }: TodoGridProps) {
  console.log(todos);

  if (!todos.length) {
    return <div>No Todos!</div>;
  }

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      {todos.map((t) => {
        return (
          <div
            className='rounded border border-blue-800/80 p-4'
            key={t.id}
          >
            <div>Title: {t.title}</div>
            <div>Description: {t.description}</div>
          </div>
        );
      })}
    </div>
  );
}
