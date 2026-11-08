import { Code2, Briefcase, Mail } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-white font-bold font-[Space_Grotesk] text-lg">
            JM<span className="text-[#4f8cff]">.</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            &copy; {new Date().getFullYear()} John Marc F. Asuncion. Built with React & Tailwind.
          </p>
        </div>
        
        <div className="flex gap-4">
          <a href="https://github.com/marckyu" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-white transition-colors">
            <Code2 size={20} />
          </a>
          <a href="https://web.facebook.com/johnmarc.f.asuncion20/" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#1877F2] transition-colors">
            <Briefcase size={20} />
          </a>
          <a href="https://www.linkedin.com/in/john-marc-asuncion-704625386/" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#0A66C2] transition-colors">
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a href="mailto:johnmarc.asuncion@gmail.com" className="p-2 text-gray-400 hover:text-[#4f8cff] transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}