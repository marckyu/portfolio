import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "../../data/projects";
import Section from "../ui/Section";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <Section id="projects" className="py-24 overflow-hidden relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <span className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2 block">
            03 — Selected Works
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-[Space_Grotesk] text-white">
            Project <span className="text-[#c6a869]">Collection.</span>
          </h2>
        </div>
        <p className="text-gray-400 max-w-sm mt-4 md:mt-0">
          Use the arrows to explore my projects, from full-stack web apps to interactive game interfaces.
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full h-[500px] md:h-[550px] flex items-center justify-center perspective-[1200px] mt-10">
        
        <button 
          onClick={handlePrev} 
          className="absolute left-4 md:left-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative w-full max-w-[340px] h-[420px] md:h-[480px] transform-style-3d">
          {projects.map((project, index) => {
            const offset = (index - currentIndex + projects.length) % projects.length;
            const isCenter = offset === 0;
            const isLeft = offset === projects.length - 1;
            const isRight = offset === 1;

            // CSS Styles per position
            let transform = "translate3d(0, 0, -300px) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let pointerEvents: "auto" | "none" = "none";

            if (isCenter) {
              transform = "translate3d(0, 0, 0) rotateY(0deg) scale(1)";
              opacity = 1;
              zIndex = 30;
              pointerEvents = "auto";
            } else if (isLeft) {
              transform = "translate3d(-70%, 0, -150px) rotateY(35deg) scale(0.85)";
              opacity = 0.4;
              zIndex = 20;
              pointerEvents = "auto";
            } else if (isRight) {
              transform = "translate3d(70%, 0, -150px) rotateY(-35deg) scale(0.85)";
              opacity = 0.4;
              zIndex = 20;
              pointerEvents = "auto";
            }

            return (
              <div
                key={project.slug || index}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  pointerEvents,
                  transition: "all 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
                  transformStyle: "preserve-3d",
                }}
                className={`absolute inset-0 rounded-3xl border border-white/10 bg-[#0a0a10] shadow-2xl overflow-hidden flex flex-col will-change-[transform,opacity] ${
                  isCenter ? "cursor-default" : "cursor-pointer"
                }`}
              >
                
                {/* Image Container */}
                <div className="relative w-full h-[60%] bg-[#12121a] border-b border-white/5 overflow-hidden group">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Floating "Open Project" Button */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                      <a 
                        href={project.demo || project.repo || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform shadow-xl"
                      >
                        OPEN PROJECT <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-[#0a0a10]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                         {project.tech?.[0] || "Web App"}
                       </span>
                       <span className="text-xs font-mono text-gray-600">2024</span>
                    </div>
                    <h4 className="text-2xl font-bold font-[Space_Grotesk] text-white mb-2 line-clamp-1">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                     {project.tech?.slice(0, 3).map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-mono text-gray-400 border border-white/5">
                          {t}
                        </span>
                     ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={handleNext} 
          className="absolute right-4 md:right-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-12 relative z-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 transition-all duration-300 rounded-full ${i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </Section>
  );
}