interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

export function Card({
  children,
  className = "",
  hover = true,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`bg-brand-surface border border-brand-border rounded-md overflow-hidden ${
        hover ? "transition-colors duration-200 hover:border-neon/50" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

interface CardBadgeProps {
  children: React.ReactNode;
  variant?: "neon" | "red" | "gray";
}

export function CardBadge({ children, variant = "neon" }: CardBadgeProps) {
  const colors = {
    neon: "bg-neon/10 text-neon border border-neon/30",
    red: "bg-brand-red/10 text-brand-red border border-brand-red/30",
    gray: "bg-brand-border text-brand-gray border border-brand-border",
  };

  return (
    <span
      className={`inline-block text-xs font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${colors[variant]}`}
    >
      {children}
    </span>
  );
}
