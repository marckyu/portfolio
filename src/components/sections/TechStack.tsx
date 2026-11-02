import { motion } from "framer-motion";
import Section from "../ui/Section";

const stack = ["React", "TypeScript", "Tailwind CSS", "Node.js", "Framer Motion", "Next.js", "Vite", "Git"];

export default function TechStack() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 300, damping: 20 } 
    }
  };

  return (
    <Section id="stack" title="My Stack" subtitle="Technologies I use to build things.">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="flex flex-wrap gap-3 mt-8"
      >
        {stack.map((tech) => (
          <motion.div 
            key={tech}
            variants={item}
            className="px-5 py-2.5 bg-[#0a0a10] border border-white/10 rounded-full text-white font-mono text-sm hover:border-[#4f8cff] hover:bg-[#4f8cff]/10 transition-colors cursor-default"
          >
            {tech}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}