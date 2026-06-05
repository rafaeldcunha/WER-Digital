interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className = "", narrow = false }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 md:px-8 ${
        narrow ? "max-w-3xl" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}
