import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Code2, Copy, User, X } from "lucide-react";
import { site } from "../../data/site";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Allow closing with Escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-start justify-center pt-[10vh] md:pt-[20vh] px-4 md:px-0"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            // Added w-full, max-h to prevent overflowing on Android screens
            className="w-full max-w-lg bg-[#0a0a10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] md:max-h-[60vh]"
          >
            <Command label="Command Menu" className="w-full flex flex-col overflow-hidden">
              
              {/* Search Header */}
              <div className="flex items-center px-4 border-b border-white/10 shrink-0">
                <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command..."
                  className="w-full bg-transparent py-4 text-base text-white outline-none placeholder:text-gray-500"
                />
                {/* Mobile Close Button */}
                <button 
                  onClick={() => setOpen(false)}
                  className="md:hidden p-2 ml-2 text-gray-400 hover:text-white bg-white/5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Scrollable List */}
              <Command.List className="overflow-y-auto p-2 overscroll-contain custom-scrollbar">
                <Command.Empty className="p-4 text-center text-sm text-gray-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs font-mono text-gray-500 px-2 py-1">
                  {site.nav.map((item) => (
                    <Command.Item
                      key={item.id}
                      onSelect={() => runCommand(() => scrollToSection(item.id))}
                      // Increased py-4 for better mobile touch targets
                      className="flex items-center gap-3 px-3 py-4 md:py-3 mt-1 text-sm text-gray-300 rounded-xl cursor-pointer hover:bg-white/10 data-[selected=true]:bg-[#4f8cff]/20 data-[selected=true]:text-white active:bg-white/20 transition-colors"
                    >
                      <Home className="w-4 h-4 shrink-0" />
                      Go to {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="text-xs font-mono text-gray-500 px-2 py-1 mt-4">
                  <Command.Item
                    onSelect={() => runCommand(() => {
                      navigator.clipboard.writeText(site.email);
                      alert("Email copied to clipboard!");
                    })}
                    className="flex items-center gap-3 px-3 py-4 md:py-3 mt-1 text-sm text-gray-300 rounded-xl cursor-pointer hover:bg-white/10 data-[selected=true]:bg-[#4f8cff]/20 data-[selected=true]:text-white active:bg-white/20 transition-colors"
                  >
                    <Copy className="w-4 h-4 shrink-0" />
                    Copy Email Address
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => window.open(site.github, "_blank"))}
                    className="flex items-center gap-3 px-3 py-4 md:py-3 mt-1 text-sm text-gray-300 rounded-xl cursor-pointer hover:bg-white/10 data-[selected=true]:bg-[#4f8cff]/20 data-[selected=true]:text-white active:bg-white/20 transition-colors"
                  >
                    <Code2 className="w-4 h-4 shrink-0" />
                    Open GitHub
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => window.open("https://www.linkedin.com/in/john-marc-asuncion-704625386/", "_blank"))}
                    className="flex items-center gap-3 px-3 py-4 md:py-3 mt-1 text-sm text-gray-300 rounded-xl cursor-pointer hover:bg-white/10 data-[selected=true]:bg-[#4f8cff]/20 data-[selected=true]:text-white active:bg-white/20 transition-colors"
                  >
                    <User className="w-4 h-4 shrink-0" />
                    Open LinkedIn
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}