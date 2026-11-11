import { workflow } from "../../data/workflow";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import { User, Bot } from "lucide-react";

export default function Workflow() {
  return (
    <Section id="workflow" className="py-16 md:py-24">
      <Reveal>
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[Space_Grotesk] text-white mb-2 md:mb-4">
            My AI-Augmented Workflow
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            How I combine my system understanding with AI-assisted execution.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-3 md:gap-4 max-w-4xl mx-auto">
        {workflow.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-5 md:p-8 rounded-2xl md:rounded-3xl bg-[#050508] border border-white/5 hover:border-[#4f8cff]/30 transition-all duration-300">
              
              <div className="md:col-span-3 flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl font-black font-[Space_Grotesk] text-white/10 group-hover:text-[#4f8cff]/30 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white font-[Space_Grotesk]">
                  {step.title}
                </h3>
              </div>

              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-[#4f8cff]/10 border border-[#4f8cff]/20 text-[#4f8cff] shrink-0 mt-0.5">
                    <User size={14} className="md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-mono text-[#4f8cff] uppercase tracking-wider mb-1">I Handle</p>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{step.you}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] shrink-0 mt-0.5">
                    <Bot size={14} className="md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-mono text-[#8b5cf6] uppercase tracking-wider mb-1">AI Assists</p>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{step.ai}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}