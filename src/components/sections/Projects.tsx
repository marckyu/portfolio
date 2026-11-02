import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import Section from "../ui/Section";

export default function Projects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <Section
      id="projects" 
      title="Featured projects"
      subtitle="Things I've built. New projects get added here as I ship them."
    >
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 items-stretch"
      >
        {projects.map((project, index) => {
          // Ang unang project (SJC) ay lalapad (2 columns), tapos ang iba ay 1 column
          const isLarge = index === 0;

          return (
            <motion.div 
              key={project.slug || index} 
              variants={item}
              className={`h-full ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
            >
              <ProjectCard project={project} />
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}