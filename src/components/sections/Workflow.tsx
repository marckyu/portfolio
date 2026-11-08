import { workflow } from "../../data/workflow";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import { User, Bot } from "lucide-react";

export default function Workflow() {
  return (
    <Section 
      id="workflow" 
      title="My AI-Augmented Workflow" 
      subtitle="How I combine my system understanding with AI-assisted execution."
    >
      <div className="mt-12 flex flex-col gap-4">
        {workflow.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-6 md:p-8 rounded-3xl bg-[#050508] border border-white/5 hover:border-[#4f8cff]/30 transition-all duration-300">
              
              <div className="lg:col-span-3 flex items-center gap-4">
                <span className="text-3xl font-black font-[Space_Grotesk] text-white/10 group-hover:text-[#4f8cff]/30 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-white font-[Space_Grotesk]">
                  {step.title}
                </h3>
              </div>

              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#4f8cff]/10 border border-[#4f8cff]/20 text-[#4f8cff] shrink-0 mt-0.5">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#4f8cff] uppercase tracking-wider mb-1">I Handle</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{step.you}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] shrink-0 mt-0.5">
                    <Bot size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#8b5cf6] uppercase tracking-wider mb-1">AI Assists</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.ai}</p>
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