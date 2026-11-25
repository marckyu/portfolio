import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, LayoutGroup, useDragControls } from "framer-motion";
import { User, Code2, Mail, Layers, Briefcase, Menu, X, Search, MoveDown } from "lucide-react";

const LINKS = [
  { name: "About", href: "#about", icon: <User size={20} /> },
  { name: "Expertise", href: "#expertise", icon: <Briefcase size={20} /> },
  { name: "Stack", href: "#stack", icon: <Layers size={20} /> },
  { name: "Projects", href: "#projects", icon: <Code2 size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail size={20} /> },
];

const BrandLogo = memo(() => (
  <a
    href="#top"
    className="relative flex items-center gap-2.5 px-4 h-full group outline-none"
    aria-label="Home"
  >
    <span className="text-xl font-bold font-[Space_Grotesk] text-white transition-transform duration-300 group-hover:scale-105 will-change-transform">
      JM<span className="text-[#4f8cff]">.</span>
    </span>
    <div className="relative flex h-2 w-2 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4f8cff] opacity-60"></span>
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4f8cff] shadow-[0_0_8px_#4f8cff]"></span>
    </div>
  </a>
));
BrandLogo.displayName = "BrandLogo";

const ActionButton = memo(() => (
  <a
    href="https://github.com/marckyu"
    target="_blank"
    rel="noreferrer"
    aria-label="View Source Code"
    className="relative flex items-center justify-center w-10 h-10 mr-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-[#4f8cff] hover:bg-[#4f8cff]/10 hover:border-[#4f8cff]/30 hover:shadow-[0_0_15px_rgba(79,140,255,0.25)] active:scale-95 transition-all duration-300 will-change-transform"
  >
    <Code2 size={18} />
  </a>
));
ActionButton.displayName = "ActionButton";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = LINKS.map((link) => link.href.replace("#", ""));
          let current = "about";
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 300) current = section;
            }
          }
          setActiveSection((prev) => (prev !== current ? current : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleOpenMobile = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
    setIsMobileOpen(true);
  };

  const openCommandMenu = () => {
    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
    document.dispatchEvent(event);
  };

  return (
    <>
      <div className="fixed top-4 inset-x-0 z-[999] hidden lg:flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-[800px] h-[60px] p-1.5 rounded-full border border-white/10 bg-[#050508]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden transform-gpu will-change-transform">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#4f8cff]/40 to-transparent" />
          <BrandLogo />

          <LayoutGroup id="desktop-nav">
            <div className="flex items-center h-full gap-1">
              {LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center justify-center px-4 h-full text-sm font-medium tracking-wide rounded-full outline-none transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="desktop-nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-1">
            <button
              onClick={openCommandMenu}
              className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors outline-none"
              aria-label="Open Command Menu"
            >
              <Search size={18} />
            </button>
            <ActionButton />
          </div>
        </nav>
      </div>

      <div className="fixed top-4 inset-x-0 z-[999] flex lg:hidden justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-sm h-[56px] px-2 rounded-full border border-white/10 bg-[#050508]/80 backdrop-blur-2xl shadow-lg relative overflow-hidden transform-gpu will-change-transform">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#4f8cff]/40 to-transparent" />
          <BrandLogo />

          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={openCommandMenu}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white outline-none"
              aria-label="Open Command Menu"
            >
              <Search size={18} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleOpenMobile}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white outline-none"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.8 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsMobileOpen(false);
                }
              }}
              className="fixed bottom-0 inset-x-0 z-[1001] bg-[#0a0a10] border-t border-white/10 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:hidden flex flex-col max-h-[85vh] will-change-transform"
            >
              <div 
                className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing touch-none"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              <div className="px-6 pb-10 flex flex-col items-center overflow-y-auto custom-scrollbar">
                <div className="flex w-full justify-between items-center mb-6">
                  <h2 className="text-xl font-bold font-[Space_Grotesk] text-white">Navigation</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                  }}
                  className="flex flex-col gap-3 w-full"
                >
                  {LINKS.map((link) => {
                    const isActive = activeSection === link.href.replace("#", "");
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        variants={{
                          hidden: { opacity: 0, y: 20, scale: 0.95 },
                          show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
                        }}
                        whileTap={{ scale: 0.96 }}
                        className={`group flex items-center gap-4 w-full px-5 py-4 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "bg-[#4f8cff]/15 border-[#4f8cff]/40 text-[#4f8cff]"
                            : "bg-[#14141d] border-white/5 text-gray-300"
                        }`}
                      >
                        <span className={`p-2 rounded-xl ${isActive ? "bg-[#4f8cff]/20" : "bg-white/5"}`}>
                          {link.icon}
                        </span>
                        <span className="text-lg font-semibold font-[Space_Grotesk] tracking-wide">{link.name}</span>
                        
                        {isActive && (
                          <motion.div 
                            layoutId="active-dot"
                            className="ml-auto w-2 h-2 rounded-full bg-[#4f8cff] shadow-[0_0_10px_#4f8cff]" 
                          />
                        )}
                      </motion.a>
                    );
                  })}
                </motion.div>

                <motion.a
                  href="https://github.com/marckyu"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-6 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4f8cff] to-[#8b5cf6] text-white font-bold shadow-[0_0_30px_rgba(79,140,255,0.4)] w-full"
                >
                  <Code2 size={20} />
                  View GitHub
                </motion.a>
                
                <p className="mt-6 text-xs text-gray-500 font-mono flex items-center gap-2">
                  <MoveDown size={12} className="animate-bounce" /> Swipe down to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}