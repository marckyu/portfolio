import type { Project } from "../../types";
import { ArrowUpRight, Code2, Globe, CheckCircle2, Folder } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  const isResume = project.slug === "interactive-resume";

  return (
    <div className={`group relative flex flex-col w-full rounded-3xl border transition-all duration-500 overflow-hidden p-6 md:p-8 
      ${isResume ? 'bg-linear-to-br from-[#0a0a10] to-[#4f8cff]/10 border-[#4f8cff]/20 hover:border-[#4f8cff]' : 'bg-[#0a0a10] border-white/5 hover:border-white/20'}`}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#4f8cff]/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5">
        
        {/* Header Icons */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-[#4f8cff]/20 group-hover:border-[#4f8cff]/30 transition-all duration-300">
            {isResume ? (
              <Globe className="w-5 h-5 text-[#4f8cff] transition-colors" />
            ) : (
              <Folder className="w-5 h-5 text-gray-400 group-hover:text-[#4f8cff] transition-colors" />
            )}
          </div>
          
          <div className="flex gap-2">
            {project.repo && (
              <a 
                href={project.repo} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 border border-transparent hover:border-white/10"
                title="View Source Code"
              >
                <Code2 className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:block">Code</span>
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4f8cff]/10 hover:bg-[#4f8cff]/20 text-[#4f8cff] hover:text-white transition-all duration-300 border border-[#4f8cff]/20 hover:border-[#4f8cff]/40"
                title="View Live Demo"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:block">Live</span>
              </a>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-2xl font-bold font-[Space_Grotesk] text-white mb-2 group-hover:text-[#4f8cff] transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Features - Compact spacing */}
        {project.features && (
          <ul className="space-y-2">
            {project.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#4f8cff] shrink-0 mt-0.5" />
                <span className="leading-snug line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech?.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-mono text-gray-300 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}