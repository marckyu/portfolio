import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "../../data/projects";
import Section from "../ui/Section";
import ProjectModal from "../ui/ProjectModal";
import type { Project } from "../../types";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    setTouchStart(null);
  };

  return (
    <Section id="projects" className="py-16 md:py-24 overflow-hidden relative">
      <div className="text-center md:text-left mb-10 md:mb-16 px-5 md:px-6">
        <h2 className="text-3xl md:text-6xl font-bold font-[Space_Grotesk] text-white">
          Project <span className="text-[#4f8cff]">Collection.</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 mt-2">Swipe to explore.</p>
      </div>

      <div 
        className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center perspective-[1200px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={handlePrev} className="hidden md:block absolute left-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10">
          <ChevronLeft size={24} />
        </button>
        <button onClick={handleNext} className="hidden md:block absolute right-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10">
          <ChevronRight size={24} />
        </button>

        <div className="relative w-full max-w-[300px] md:max-w-[340px] h-[400px] md:h-[480px] transform-style-3d">
          {projects.map((project, index) => {
            const offset = (index - currentIndex + projects.length) % projects.length;
            const isCenter = offset === 0;
            const isLeft = offset === projects.length - 1;
            const isRight = offset === 1;

            let transform = "translate3d(0, 0, -300px)";
            let opacity = 0;
            let zIndex = 0;

            if (isCenter) { transform = "translate3d(0, 0, 0) scale(1)"; opacity = 1; zIndex = 30; }
            else if (isLeft) { transform = "translate3d(-60%, 0, -150px) rotateY(20deg) scale(0.85)"; opacity = 0.2; zIndex = 20; }
            else if (isRight) { transform = "translate3d(60%, 0, -150px) rotateY(-20deg) scale(0.85)"; opacity = 0.2; zIndex = 20; }

            return (
              <div
                key={project.slug}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                  if (isCenter) setSelectedProject(project);
                }}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  transition: "all 0.5s ease-out",
                  transformStyle: "preserve-3d",
                }}
                className={`absolute inset-0 rounded-3xl border border-white/10 bg-[#0a0a10] shadow-2xl overflow-hidden flex flex-col ${isCenter ? "cursor-pointer" : ""}`}
              >
                <div className="relative w-full h-[55%] border-b border-white/5">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover object-top" />
                  {isCenter && (
                    <div className="absolute bottom-3 right-3">
                      <button className="flex items-center gap-1 px-4 py-2 bg-white text-black text-xs rounded-full font-semibold shadow-lg">
                        VIEW <ExternalLink size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1 line-clamp-1">{project.name}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                     {project.tech?.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[9px] text-gray-400">{t}</span>
                     ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-center gap-1.5 mt-8">
        {projects.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? "w-6 bg-[#4f8cff]" : "w-1.5 bg-white/20"}`} />
        ))}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
}