import { useState, useEffect } from "react";
import { User, Code2, Mail, Layers, Briefcase } from "lucide-react";

const links = [
  { name: "About", href: "#about", icon: <User className="w-5 h-5" /> },
  { name: "Expertise", href: "#expertise", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Stack", href: "#stack", icon: <Layers className="w-5 h-5" /> },
  { name: "Projects", href: "#projects", icon: <Code2 className="w-5 h-5" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="w-5 h-5" /> },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.href.replace("#", ""));
      let current = "about";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 inset-x-0 z-[999] hidden lg:flex justify-center px-4">
        <nav className="flex items-center justify-between px-2 py-2 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl bg-[#0a0a10]/80 w-full max-w-4xl">
          <a href="#top" className="px-4 text-xl font-bold font-[Space_Grotesk] text-white">
            JM<span className="text-[#4f8cff]">.</span>
          </a>
          <div className="flex items-center relative h-10">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-300 z-10 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className={`absolute inset-0 bg-white/10 rounded-full transition-all duration-300 ease-out -z-10 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} />
                  {link.name}
                </a>
              );
            })}
          </div>
          <a href="https://github.com/marckyu" target="_blank" rel="noreferrer" className="p-2.5 mr-2 bg-white/5 rounded-full text-gray-300 hover:text-white">
            <Code2 className="w-4 h-4" />
          </a>
        </nav>
      </div>

      <div className="fixed bottom-4 inset-x-0 z-[999] px-4 flex justify-center lg:hidden pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-around w-full max-w-sm px-2 py-2 bg-[#0a0a10]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${
                  isActive ? "text-[#4f8cff]" : "text-gray-400"
                }`}
              >
                <span className={`absolute inset-0 bg-[#4f8cff]/10 rounded-xl transition-all duration-300 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} />
                <span className="relative z-10 mb-1">{link.icon}</span>
                <span className="relative z-10 text-[9px] font-medium">{link.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}