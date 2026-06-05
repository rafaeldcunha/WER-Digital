import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  surface?: boolean;
  id?: string;
  narrow?: boolean;
}

export function Section({
  children,
  className = "",
  surface = false,
  id,
  narrow = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${
        surface ? "bg-brand-surface" : "bg-brand-black"
      } ${className}`}
    >
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  className = "",
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? "text-center" : ""} ${className}`}>
      {label && (
        <p className="text-neon text-xs uppercase tracking-widest mb-3 font-body font-semibold">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-brand-white mb-4">
        {title}
      </h2>
      <div
        className={`h-0.5 w-12 bg-neon ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      {subtitle && (
        <p className="mt-4 text-brand-gray text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
