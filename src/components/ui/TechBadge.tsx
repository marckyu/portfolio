import type { TechLevel } from "../../types";

const dot: Record<TechLevel, string> = {
  used: "bg-accent-blue",
  familiar: "bg-accent-violet",
  learning: "bg-amber-300",
};

export default function TechBadge({ name, level }: { name: string; level?: TechLevel }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-xs text-slate-200">
      {level && <span className={`h-1.5 w-1.5 rounded-full ${dot[level]}`} aria-hidden />}
      {name}
    </span>
  );
}
