import { useState } from "react";
import { tech, techGroups } from "../../data/tech";
import type { TechLevel } from "../../types";
import GlassCard from "../ui/GlassCard";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import TechBadge from "../ui/TechBadge";

const dot: Record<TechLevel, string> = {
  used: "bg-accent-blue",
  familiar: "bg-accent-violet",
  learning: "bg-amber-300",
};

export default function TechStack() {
  const [active, setActive] = useState<TechLevel | null>(null);

  return (
    <Section
      id="stack"
      title="Technology stack"
      subtitle="Grouped by how I've actually used each one, so you can tell shipped work from learning."
    >
      <div role="group" aria-label="Highlight technologies by how I use them" className="mb-8 flex flex-wrap gap-2">
        {techGroups.map((g) => {
          const on = active === g.level;
          return (
            <button
              key={g.level}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(on ? null : g.level)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                on
                  ? "border-white bg-white font-medium text-ink"
                  : "border-line bg-white/5 text-slate-200 hover:-translate-y-0.5 hover:bg-white/10"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${dot[g.level]}`} aria-hidden />
              {g.title}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {techGroups.map((group, i) => (
          <Reveal key={group.level} delay={i * 0.08} className="h-full">
            <div
              className={`h-full transition duration-500 ${
                active && active !== group.level ? "opacity-25 grayscale" : ""
              }`}
            >
              <GlassCard className="h-full p-6">
                <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
                <p className="mb-5 mt-1 text-sm text-muted">{group.blurb}</p>
                <ul className="flex flex-wrap gap-2">
                  {tech
                    .filter((t) => t.level === group.level)
                    .map((t) => (
                      <li key={t.name}>
                        <TechBadge name={t.name} level={t.level} />
                      </li>
                    ))}
                </ul>
              </GlassCard>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}