import { expertise } from "../../data/expertise";
import Reveal from "../ui/Reveal";
import GlassCard from "../ui/GlassCard";
import Section from "../ui/Section";

export default function Expertise() {
  return (
    <Section
      id="expertise"
      title="Expertise"
      subtitle="Two areas I care about equally. One I've shipped in, and one I'm actively learning."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {expertise.map(({ icon: Icon, title, intro, status, items }, i) => (
          <Reveal key={title} delay={i * 0.1} className="h-full">
            <GlassCard className="flex h-full flex-col p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-gradient text-white">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{intro}</p>

              <ul className="mt-6 space-y-4">
                {items.map(({ icon: ItemIcon, title: itemTitle, text }) => (
                  <li key={itemTitle} className="flex gap-3">
                    <ItemIcon size={18} className="mt-0.5 shrink-0 text-accent-blue" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-white">{itemTitle}</p>
                      <p className="text-sm leading-relaxed text-muted">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-auto inline-block self-start rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-slate-200">
                {status}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}