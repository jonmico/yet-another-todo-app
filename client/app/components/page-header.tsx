interface PageHeaderProps {
  children: React.ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  return (
    <h1 className='border-b border-b-slate-800/75 pb-1 text-2xl font-bold'>
      {children}
    </h1>
  );
}
