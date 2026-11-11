import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { User, Code2, Mail, Layers, Briefcase, Menu, X } from "lucide-react";

const LINKS = [
  { name: "About", href: "#about", icon: <User size={18} /> },
  { name: "Expertise", href: "#expertise", icon: <Briefcase size={18} /> },
  { name: "Stack", href: "#stack", icon: <Layers size={18} /> },
  { name: "Projects", href: "#projects", icon: <Code2 size={18} /> },
  { name: "Contact", href: "#contact", icon: <Mail size={18} /> },
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

          <ActionButton />
        </nav>
      </div>

      <div className="fixed top-4 inset-x-0 z-[999] flex lg:hidden justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-sm h-[56px] px-2 rounded-full border border-white/10 bg-[#050508]/80 backdrop-blur-2xl shadow-lg relative overflow-hidden transform-gpu will-change-transform">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#4f8cff]/40 to-transparent" />
          
          <BrandLogo />

          <button
            onClick={() => setIsMobileOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white active:scale-95 transition-transform will-change-transform outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-[#020204]/95 backdrop-blur-3xl flex flex-col lg:hidden transform-gpu will-change-transform"
          >
            <div className="flex justify-end p-4 pt-6">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 text-white active:scale-95 transition-transform outline-none"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 -mt-10 gap-8 px-6">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                }}
                className="flex flex-col items-center gap-8 w-full"
              >
                {LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      variants={{
                        hidden: { opacity: 0, y: 15, scale: 0.95 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      className={`group flex items-center justify-center gap-4 w-full max-w-[280px] py-4 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "bg-[#4f8cff]/10 border-[#4f8cff]/30 text-[#4f8cff]"
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className={isActive ? "text-[#4f8cff]" : "text-gray-500 group-hover:text-white"}>
                        {link.icon}
                      </span>
                      <span className="text-2xl font-bold font-[Space_Grotesk] tracking-wide">{link.name}</span>
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
                className="mt-8 flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#4f8cff] text-white font-semibold shadow-[0_0_20px_rgba(79,140,255,0.3)] active:scale-95 transition-transform w-full max-w-[280px] will-change-transform"
              >
                <Code2 size={20} />
                View GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}