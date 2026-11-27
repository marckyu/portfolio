import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, LayoutGroup, useDragControls } from "framer-motion";
import { User, Code2, Mail, Layers, Briefcase, Menu, X, Search, Camera } from "lucide-react";

const LINKS = [
  { name: "About", href: "#about", icon: <User size={20} /> },
  { name: "Expertise", href: "#expertise", icon: <Briefcase size={20} /> },
  { name: "Stack", href: "#stack", icon: <Layers size={20} /> },
  { name: "Projects", href: "#projects", icon: <Code2 size={20} /> },
  { name: "Hobbies", href: "#lifestyle", icon: <Camera size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail size={20} /> },
];

const BrandLogo = memo(() => (
  <a href="#top" className="relative flex items-center gap-2.5 px-4 h-full group outline-none" aria-label="Home">
    <span className="text-xl font-bold text-white transition-transform duration-300 group-hover:scale-105 will-change-transform">
      JM<span className="text-[var(--md-primary)]">.</span>
    </span>
    <div className="relative flex h-2 w-2 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--md-primary)] opacity-60"></span>
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--md-primary)] shadow-[0_0_8px_var(--md-primary)]"></span>
    </div>
  </a>
));
BrandLogo.displayName = "BrandLogo";

const ActionButton = memo(() => (
  <a href="https://github.com/marckyu" target="_blank" rel="noreferrer" aria-label="View Source Code" className="relative flex items-center justify-center w-10 h-10 mr-1.5 rounded-full bg-[var(--md-surface-container-high)] border border-[var(--md-outline)] text-gray-400 hover:text-[var(--md-primary)] hover:border-[var(--md-primary)]/50 active:scale-95 transition-all duration-300">
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
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
    setIsMobileOpen(true);
  };

  const openCommandMenu = () => {
    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
    document.dispatchEvent(event);
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className="fixed top-6 inset-x-0 z-[999] hidden lg:flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-[800px] h-[64px] p-2 rounded-full bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--md-primary)]/40 to-transparent" />
          <BrandLogo />

          <LayoutGroup id="desktop-nav">
            <div className="flex items-center h-full gap-1">
              {LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a key={link.name} href={link.href} className={`relative flex items-center justify-center px-4 h-full text-sm font-medium tracking-wide rounded-full outline-none transition-colors duration-300 ${isActive ? "text-[var(--md-on-primary-container)]" : "text-gray-400 hover:text-white"}`}>
                    {isActive && <motion.div layoutId="desktop-nav-pill" className="absolute inset-0 bg-[var(--md-primary-container)] rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-1">
            <button onClick={openCommandMenu} className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors outline-none">
              <Search size={18} />
            </button>
            <ActionButton />
          </div>
        </nav>
      </div>

      {/* MOBILE NAVBAR (BOTTOM) - Compact */}
      <div className="fixed bottom-4 inset-x-0 z-[999] flex lg:hidden justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-[340px] h-[56px] px-2 rounded-full bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-2xl">
          <BrandLogo />
          <div className="flex items-center gap-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={openCommandMenu} className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--md-surface-container-high)] text-white">
              <Search size={18} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleOpenMobile} className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]">
              <Menu size={20} />
            </motion.button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm lg:hidden" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 26, stiffness: 420 }}
              drag="y" dragControls={dragControls} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.8 }}
              onDragEnd={(_, info) => { if (info.offset.y > 100 || info.velocity.y > 500) setIsMobileOpen(false); }}
              className="fixed bottom-0 inset-x-0 z-[1001] bg-[var(--md-surface-container-high)] border-t border-[var(--md-outline)] rounded-t-[32px] p-6 pb-12 lg:hidden flex flex-col max-h-[85vh]"
            >
              <div className="w-full flex justify-center py-2 mb-4">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Navigation</h2>
                <button onClick={() => setIsMobileOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                {LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <a key={link.name} href={link.href} onClick={() => setIsMobileOpen(false)} className={`group flex items-center gap-4 w-full px-5 py-4 rounded-[20px] border transition-all duration-300 ${isActive ? "bg-[var(--md-primary-container)] border-[var(--md-primary)]/30 text-[var(--md-on-primary-container)]" : "bg-[var(--md-surface)] border-[var(--md-outline)] text-gray-300"}`}>
                      <span className={`p-2 rounded-xl ${isActive ? "bg-[var(--md-primary)]/20" : "bg-white/5"}`}>{link.icon}</span>
                      <span className="text-lg font-semibold">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}