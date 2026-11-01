import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

type GlassCardProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className" | "as">;

export default function GlassCard<T extends ElementType = "div">({
  children,
  className = "",
  as,
  ...props
}: GlassCardProps<T>) {
  const Tag = as || "div";
  return (
    <Tag className={`glass rounded-3xl ${className}`} {...props}>
      {children}
    </Tag>
  );
}