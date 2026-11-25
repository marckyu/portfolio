import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  icon: ReactNode;
  title: string;
  summary: string;
  details: ReactNode;
  isCompact: boolean;
}

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

export default function BentoAccordionCard({ icon, title, summary, details, isCompact }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const active = !isCompact && isOpen;

  return (
    <motion.div
      layout
      transition={SPRING}
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      className="relative w-full rounded-3xl overflow-hidden bg-slate-950/65 border border-white/10 backdrop-blur-2xl shadow-lg"
    >
      <motion.div
        onClick={() => !isCompact && setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-4 min-h-[64px] ${
          !isCompact ? "cursor-pointer active:bg-white/5 transition-colors" : "cursor-default"
        }`}
        whileTap={!isCompact ? { scale: 0.985 } : undefined}
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/90 shadow-sm">
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-semibold text-white tracking-tight">{title}</h3>
            <p className="text-[13px] text-slate-400 mt-0.5">{summary}</p>
          </div>
        </div>
        
        {!isCompact && (
          <div className="p-2 text-slate-400">
            {active ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ...SPRING, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <motion.div 
              initial="hidden" animate="show" exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
              className="px-4 pb-5 pt-1"
            >
              <motion.div variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
                {details}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}