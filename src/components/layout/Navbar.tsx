import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import GithubIcon from "../ui/GithubIcon";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => site.nav.map((n) => n.id), []);
  const active = useActiveSection(ids);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <a
        href="#main"
        className="sr-only rounded-full bg-white px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-2.5"
      >
        <a href="#top" className="font-display text-base font-bold tracking-tight text-white" aria-label="Back to top">
          JM<span className="text-accent-blue">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === id ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {label}
                {active === id && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-accent-gradient" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-white"
          >
            <GithubIcon size={18} />
          </a>
          <button
            type="button"
            className="rounded-full p-2 text-slate-200 hover:bg-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-2 md:hidden"
          >
            {site.nav.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-base ${
                    active === id ? "bg-white/10 text-white" : "text-muted"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}