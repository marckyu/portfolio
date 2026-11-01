import { BookOpen, FlaskConical, Rocket, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { learning } from "../../data/learning";
import type { LearningEntry } from "../../types";
import GlassCard from "../ui/GlassCard";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

const status: Record<LearningEntry["status"], { label: string; icon: LucideIcon; style: string }> = {
  learning: { label: "Learning", icon: BookOpen, style: "border-amber-300/40 text-amber-200" },
  experimenting: { label: "Experimenting", icon: FlaskConical, style: "border-accent-violet/50 text-violet-200" },
  planned: { label: "Planned", icon: Rocket, style: "border-line text-muted" },
};

export default function LearningJourney() {
  return (
    <Section
      id="learning"
      title="Learning journey"
      subtitle="My progress in game development. Experiments and prototypes get added here as I build them."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {learning.map((entry, i) => {
          const { label, icon: Icon, style } = status[entry.status];
          return (
            <Reveal key={entry.title} delay={i * 0.08} className="h-full">
              <GlassCard className="flex h-full flex-col p-6">
                <span className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs ${style}`}>
                  <Icon size={14} aria-hidden /> {label}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{entry.note}</p>
                {entry.date && <p className="mt-auto pt-4 font-mono text-xs text-muted">{entry.date}</p>}
              </GlassCard>
            </Reveal>
          );
        })}

        <Reveal delay={learning.length * 0.08} className="h-full">
          <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-line p-6 text-center">
            <Plus size={22} className="text-muted" aria-hidden />
            <p className="mt-2 text-sm text-muted">Next experiment goes here</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}