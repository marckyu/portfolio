import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code2, CheckCircle2 } from "lucide-react";
import type { Project } from "../../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0a0a10] border border-white/10 rounded-3xl shadow-2xl flex flex-col"
          >
            {/* Image Header */}
            <div className="relative w-full h-64 md:h-80 shrink-0 overflow-hidden rounded-t-3xl">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-[#0a0a10]/40 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col gap-6">
              
              {/* Title & Tags */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech?.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-[#4f8cff]/10 border border-[#4f8cff]/20 rounded-md text-[10px] font-mono text-[#4f8cff]">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-[Space_Grotesk] text-white">
                  {project.name}
                </h2>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Purpose & Description</h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && (
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#4f8cff] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 mt-4 border-t border-white/10">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4f8cff] text-white font-semibold hover:bg-[#3b7aeb] transition-colors"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Source Code <Code2 size={16} />
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}