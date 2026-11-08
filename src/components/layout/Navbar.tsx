import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";

const links = site.nav.filter((link) => ["about", "expertise", "projects", "workflow", "contact"].includes(link.id));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(links.map((link) => link.id));
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 sm:px-6 ${scrolled ? "pt-3" : "pt-5"}`}>
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 backdrop-blur-xl transition-colors ${scrolled ? "border-white/15 bg-[#080b11]/90" : "border-white/10 bg-[#080b11]/65"}`} aria-label="Primary navigation">
        <a href="#top" className="flex items-center gap-2 rounded-xl px-2 py-2 font-display text-sm font-semibold text-white" onClick={() => setOpen(false)}><span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-300 text-[11px] font-bold text-slate-950">JM</span><span className="hidden sm:inline">AI-Augmented Developer</span></a>
        <div className="hidden items-center gap-1 lg:flex">{links.map((link) => <a key={link.id} href={`#${link.id}`} className={`rounded-xl px-3 py-2 text-xs transition-colors ${active === link.id ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}>{link.label}</a>)}</div>
        <div className="flex items-center gap-2"><a href={site.github} target="_blank" rel="noreferrer" className="hidden items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-300/40 hover:text-white sm:flex">GitHub <ArrowUpRight size={13} aria-hidden /></a><button type="button" className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-slate-200 lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X size={18} /> : <Menu size={18} />}</button></div>
      </nav>
      {open && <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-[#080b11]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden">{links.map((link) => <a key={link.id} href={`#${link.id}`} className="block rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)}>{link.label}</a>)}</div>}
    </header>
  );
}
