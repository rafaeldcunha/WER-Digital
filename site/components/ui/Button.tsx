import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface LinkProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

type Props = ButtonProps | LinkProps;

const base =
  "inline-flex items-center justify-center font-display uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-neon text-brand-black hover:brightness-110 hover:shadow-neon-sm rounded-sm",
  secondary:
    "border border-neon text-neon bg-transparent hover:bg-neon/10 rounded-sm",
  ghost:
    "text-brand-gray hover:text-neon underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-4 py-2 min-h-[36px]",
  md: "text-sm px-6 py-3 min-h-[44px]",
  lg: "text-base px-8 py-4 min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...props
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("wa.me");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
