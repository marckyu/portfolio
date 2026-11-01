import { ShieldCheck } from "lucide-react";
import { workflow } from "../../data/workflow";
import GlassCard from "../ui/GlassCard";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Workflow() {
  return (
    <Section
      id="workflow"
      title="How I work with AI"
      subtitle="Seven steps from idea to deployed app. AI helps at each one, but the decisions stay with me."
    >
      {/* Numbers are appropriate here because the steps really are a sequence */}
      <ol className="relative space-y-5 border-l border-line pl-8 sm:pl-10">
        {workflow.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-12 top-5 grid h-8 w-8 place-items-center rounded-full bg-accent-gradient font-mono text-xs font-medium text-white ring-4 ring-ink sm:-left-14">
              {i + 1}
            </span>
            <Reveal>
              <GlassCard className="p-6">
                <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-accent-blue">What I do</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.you}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-accent-violet">How AI helps</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.ai}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-10">
        <GlassCard className="flex gap-4 p-6">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-accent-blue" aria-hidden />
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            AI suggests and I decide. I read what it writes, test it, and change it. If I can't
            explain a piece of code, it isn't finished.
          </p>
        </GlassCard>
      </Reveal>
    </Section>
  );
}