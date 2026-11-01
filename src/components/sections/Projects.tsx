import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Featured projects"
      subtitle="Things I've built. New projects get added here as I ship them."
    >
      <div className="grid gap-8">
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}