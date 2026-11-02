import { useState, useEffect } from "react";
import { User, Briefcase, Code2, Mail, Layers } from "lucide-react";

const links = [
  { name: "About", href: "#about", icon: <User className="w-5 h-5" /> },
  { name: "Expertise", href: "#expertise", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Stack", href: "#stack", icon: <Layers className="w-5 h-5" /> },
  { name: "Projects", href: "#projects", icon: <Code2 className="w-5 h-5" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="w-5 h-5" /> },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = links.map(link => link.href.replace("#", ""));
      let current = "about";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    e.currentTarget.blur(); 
    
    const id = targetId.replace("#", "");
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-6 inset-x-0 z-[999] hidden lg:flex justify-center px-4">
        <nav 
          className={`flex items-center justify-between px-2 py-2 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out w-full max-w-4xl
            ${isScrolled ? "bg-[#0a0a10]/90" : "bg-[#0a0a10]/50"}`}
        >
          <a 
            href="#top" 
            onClick={(e) => handleScrollTo(e, "#top")} 
            className="px-4 text-xl font-bold font-[Space_Grotesk] text-white hover:scale-105 transition-transform duration-300 focus:outline-none"
          >
            JM<span className="text-[#4f8cff]">.</span>
          </a>

          <div className="flex items-center relative h-10">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-300 z-10 cursor-pointer focus:outline-none
                    ${isActive ? "text-white" : "text-gray-400 hover:text-white hover:scale-105"}`}
                >
                  <span className={`absolute inset-0 bg-white/10 rounded-full transition-all duration-300 ease-out -z-10 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} />
                  {link.name}
                </a>
              );
            })}
          </div>

          <a 
            href="https://github.com/marckyu" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2.5 mr-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-all duration-300 hover:rotate-12 hover:scale-110 focus:outline-none"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </nav>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-[999] p-4 pb-6 flex justify-center lg:hidden">
        <nav className="flex items-center justify-around w-full max-w-sm px-2 py-2 bg-[#0a0a10]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 active:scale-90 cursor-pointer focus:outline-none
                  ${isActive ? "text-[#4f8cff]" : "text-gray-400"}`}
              >
                <span className={`absolute inset-0 bg-[#4f8cff]/10 rounded-xl transition-all duration-300 ease-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} />
                <span className="relative z-10 mb-1">{link.icon}</span>
                <span className="relative z-10 text-[10px] font-medium tracking-wide">
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}