import { GraduationCap, Lightbulb, Sparkles } from "lucide-react";
import Reveal from "../ui/Reveal";
import GlassCard from "../ui/GlassCard";
import Section from "../ui/Section";

const points = [
  {
    icon: GraduationCap,
    title: "IT student",
    text: "Studying information technology and building real projects alongside my coursework.",
  },
  {
    icon: Sparkles,
    title: "AI as a tool",
    text: "I use AI to speed up my workflow, from explaining concepts to drafting boilerplate.",
  },
  {
    icon: Lightbulb,
    title: "I stay in control",
    text: "I make the decisions and read what I ship, so I understand the code, logic, architecture and implementation.",
  },
];

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <div className="max-w-xl space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            <p>
              I'm an IT student interested in web development, game development and AI-assisted
              development. I like turning an idea into something people can actually use.
            </p>
            <p>
              My recent work is SJC Lost &amp; Found, a team project where I was the developer. It
              taught me how a frontend, a backend and an AI matching service fit together.
            </p>
            <p>
              AI helps me work faster, but I don't treat it as a shortcut around understanding. If I
              can't explain how something works, I'm not done with it yet.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {points.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <GlassCard className="flex gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-gradient text-white">
                  <Icon size={20} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}