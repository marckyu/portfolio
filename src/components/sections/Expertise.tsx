import { motion } from "framer-motion";
import Section from "../ui/Section";
import { Globe, Gamepad2, Cpu } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Building responsive, modern web apps using React, TypeScript, and Tailwind.",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    desc: "Exploring game mechanics and systems using C# and Unity.",
  },
  {
    icon: Cpu,
    title: "Hardware & AI Workflows",
    desc: "12V automotive electronics troubleshooting and AI-augmented coding.",
  },
];

export default function Expertise() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <Section id="expertise" title="What I Do" subtitle="The skills and services I offer.">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        {services.map((service, i) => (
          <motion.div key={i} variants={item}>
            <div className="group p-8 rounded-3xl bg-[#050508] border border-white/5 hover:border-[#4f8cff]/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#4f8cff]/10 transition-all">
                <service.icon className="w-6 h-6 text-gray-300 group-hover:text-[#4f8cff] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}