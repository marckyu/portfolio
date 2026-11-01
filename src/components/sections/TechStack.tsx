import { tech, techGroups } from "../../data/tech";
import GlassCard from "../ui/GlassCard";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import TechBadge from "../ui/TechBadge";

export default function TechStack() {
  return (
    <Section
      id="stack"
      title="Technology stack"
      subtitle="Grouped by how I've actually used each one, so you can tell shipped work from learning."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {techGroups.map((group, i) => (
          <Reveal key={group.level} delay={i * 0.08} className="h-full">
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
          </Reveal>
        ))}
      </div>
    </Section>
  );
}