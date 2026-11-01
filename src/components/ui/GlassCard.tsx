import type { ElementType, ReactNode } from "react";

interface Props { children: ReactNode; className?: string; as?: ElementType; }

export default function GlassCard({ children, className = "", as: Tag = "div" }: Props) {
  return <Tag className={`glass rounded-3xl ${className}`}>{children}</Tag>;
}
