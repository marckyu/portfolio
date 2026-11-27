import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const SPRING = { type: "spring", stiffness: 420, damping: 26, mass: 0.8 } as const;

interface Props {
  icon: ReactNode;
  title: string;
  summary: string;
  details: ReactNode;
  isCompact: boolean;
}

export default function M3BentoCard({ icon, title, summary, details, isCompact }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const active = !isCompact && isOpen;

  return (
    <motion.div
      layout
      transition={SPRING}
      className="relative w-full rounded-[28px] overflow-hidden bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-lg gpu-accelerated"
    >
      <motion.div
        onClick={() => !isCompact && setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-4 min-h-[72px] ${
          !isCompact ? "cursor-pointer active:bg-white/5 transition-colors" : "cursor-default"
        }`}
        whileTap={!isCompact ? { scale: 0.98 } : undefined}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-[16px] bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] shadow-sm">
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-white tracking-tight">{title}</h3>
            <p className="text-[13px] text-gray-400 mt-0.5">{summary}</p>
          </div>
        </div>
        
        {!isCompact && (
          <div className="p-2 text-gray-400">
            {active ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
              className="px-5 pb-5 pt-2"
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