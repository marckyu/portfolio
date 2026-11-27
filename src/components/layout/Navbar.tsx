import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, LayoutGroup, useDragControls } from "framer-motion";
import { User, Code2, Mail, Layers, Briefcase, Menu, X, Search, Camera } from "lucide-react";

const LINKS = [
  { name: "About", href: "#about", icon: <User size={20} /> },
  { name: "Expertise", href: "#expertise", icon: <Briefcase size={20} /> },
  { name: "Stack", href: "#stack", icon: <Layers size={20} /> },
  { name: "Projects", href: "#projects", icon: <Code2 size={20} /> },
  { name: "Hobbies", href: "#hobbies", icon: <Camera size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail size={20} /> },
];
const SECTION_IDS = LINKS.map((link) => link.href.slice(1));

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = "about";
          for (const section of SECTION_IDS) {
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
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previouslyFocused?.focus({ preventScroll: true });
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
        <nav aria-label="Primary navigation" className="pointer-events-auto flex items-center justify-between w-full max-w-[800px] h-[64px] p-2 rounded-full bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-2xl relative overflow-hidden backdrop-blur-lg">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--md-primary)]/40 to-transparent" />
          <BrandLogo />

          <LayoutGroup id="desktop-nav">
            <div className="flex items-center h-full gap-1">
              {LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a key={link.name} href={link.href} aria-current={isActive ? "location" : undefined} className={`relative flex items-center justify-center px-4 h-full text-sm font-medium tracking-wide rounded-full outline-none transition-colors duration-300 ${isActive ? "text-[var(--md-on-primary-container)]" : "text-gray-400 hover:text-white"}`}>
                    {isActive && <motion.div layoutId="desktop-nav-pill" className="absolute inset-0 bg-[var(--md-primary-container)] rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-1">
            <button type="button" onClick={openCommandMenu} aria-label="Open command menu" className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors outline-none">
              <Search size={18} />
            </button>
            <ActionButton />
          </div>
        </nav>
      </div>

      {/* MOBILE NAVBAR (BOTTOM) - Compact */}
      <div className="fixed bottom-4 inset-x-0 z-[999] flex lg:hidden justify-center px-4 pointer-events-none" style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        <nav aria-label="Mobile controls" className="pointer-events-auto flex items-center justify-between w-full max-w-[340px] h-[56px] px-2 rounded-full bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-2xl backdrop-blur-lg">
          <BrandLogo />
          <div className="flex items-center gap-1">
            <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={openCommandMenu} aria-label="Open command menu" className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--md-surface-container-high)] text-white">
              <Search size={18} />
            </motion.button>
            <motion.button ref={menuButtonRef} type="button" whileTap={{ scale: 0.9 }} onClick={handleOpenMobile} aria-label="Open navigation" aria-expanded={isMobileOpen} aria-controls="mobile-navigation-sheet" className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]">
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.button type="button" aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-[1000] border-0 bg-black/60 p-0 backdrop-blur-md lg:hidden" />
            <motion.div
              ref={sheetRef}
              id="mobile-navigation-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 26, stiffness: 420 }}
              drag="y" dragControls={dragControls} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.8 }}
              dragListener={false}
              onDragEnd={(_, info) => { if (info.offset.y > 100 || info.velocity.y > 500) setIsMobileOpen(false); }}
              onKeyDown={(event) => {
                if (event.key !== "Tab" || !sheetRef.current) return;
                const focusable = Array.from(sheetRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first?.focus();
                }
              }}
              className="fixed bottom-0 inset-x-0 z-[1001] flex max-h-[85vh] flex-col rounded-t-[32px] border-t border-[var(--md-outline)] bg-[var(--md-surface-container-high)] p-6 pb-12 backdrop-blur-xl lg:hidden"
              style={{ maxHeight: "85dvh", paddingBottom: "max(3rem, env(safe-area-inset-bottom))" }}
            >
              <div onPointerDown={(event) => dragControls.start(event)} className="w-full flex justify-center py-2 mb-4 touch-none cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="flex justify-between items-center mb-8">
                <h2 id="mobile-navigation-title" className="text-2xl font-bold text-white">Navigation</h2>
                <button ref={closeButtonRef} type="button" onClick={() => setIsMobileOpen(false)} aria-label="Close navigation" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                {LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                  <a key={link.name} href={link.href} aria-current={isActive ? "location" : undefined} onClick={() => setIsMobileOpen(false)} className={`group flex items-center gap-4 w-full px-5 py-4 rounded-[20px] border transition-all duration-300 ${isActive ? "bg-[var(--md-primary-container)] border-[var(--md-primary)]/30 text-[var(--md-on-primary-container)]" : "bg-[var(--md-surface)] border-[var(--md-outline)] text-gray-300"}`}>
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
