import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}

export default function ButtonLink({ href, children, variant = "primary", external }: Props) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-accent-gradient text-white shadow-lg shadow-accent-violet/25"
      : "border border-line bg-white/5 text-slate-100 hover:bg-white/10";
  return (
    <a href={href} className={`${base} ${styles}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}