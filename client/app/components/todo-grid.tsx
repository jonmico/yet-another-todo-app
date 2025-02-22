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
    <div>
      {todos.map((t) => {
        return (
          <div key={t.id}>
            <div>Title: {t.title}</div>
            <div>Description: {t.description}</div>
          </div>
        );
      })}
    </div>
  );
}
