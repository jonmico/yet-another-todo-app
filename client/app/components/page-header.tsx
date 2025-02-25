interface PageHeaderProps {
  children: React.ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  return <h1 className='text-2xl font-bold'>{children}</h1>;
}
