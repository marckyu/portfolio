import { learning } from "../../data/learning";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";

const statusConfig = {
  learning: { icon: Clock, color: "text-[#4f8cff]", bg: "bg-[#4f8cff]/10", label: "Learning" },
  experimenting: { icon: PlayCircle, color: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10", label: "Experimenting" },
  planned: { icon: CheckCircle2, color: "text-gray-500", bg: "bg-gray-500/10", label: "Planned" },
  completed: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Completed" },
};

export default function LearningJourney() {
  return (
    <Section id="learning" title="Learning Journey" subtitle="My continuous path to mastering full stack development.">
      <div className="max-w-3xl mx-auto mt-12 relative border-l border-white/10 pl-8 md:pl-12 space-y-8">
        {learning.map((item, i) => {
          const config = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.learning;
          const Icon = config.icon;
          
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-6 h-6 rounded-full bg-[#0a0a10] border border-white/20 flex items-center justify-center group-hover:border-[#4f8cff] transition-colors">
                  <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                </div>
                
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${config.bg} border-white/5 hover:border-white/20`}>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold text-white font-[Space_Grotesk]">{item.title}</h3>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${config.color} ${config.bg} border border-white/10`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.note}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}