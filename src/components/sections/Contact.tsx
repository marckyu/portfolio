import { useState } from "react";
import { Mail, Send } from "lucide-react";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

// Custom SVG para iwas error sa lucide-react
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:johnmarc.asuncion@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message} (Reply to: ${formData.email})`;
    window.location.href = mailtoLink;
  };

  const socials = [
    {
      name: "Email",
      value: "johnmarc.asuncion@gmail.com",
      href: "mailto:johnmarc.asuncion@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:border-[#4f8cff]/50 hover:bg-[#4f8cff]/10",
    },
    {
      name: "GitHub",
      value: "@marckyu",
      href: "https://github.com/marckyu",
      icon: <GithubIcon className="w-5 h-5" />,
      color: "hover:border-white/30 hover:bg-white/10",
    },
    {
      name: "Facebook",
      value: "John Marc Asuncion",
      href: "https://web.facebook.com/johnmarc.f.asuncion20/",
      icon: <FacebookIcon className="w-5 h-5" />,
      color: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10",
    },
    {
      name: "LinkedIn",
      value: "John Marc Asuncion",
      href: "https://www.linkedin.com/in/john-marc-asuncion-704625386/",
      icon: <LinkedinIcon className="w-5 h-5" />,
      color: "hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10",
    },
  ];

  return (
    <Section
      id="contact"
      title="Get in touch"
      subtitle="Have a project in mind or just want to say hi? My inbox is always open."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        
        {/* Left Side: Socials */}
        <div className="flex flex-col gap-4">
          <Reveal delay={0.1}>
            <h3 className="text-3xl md:text-5xl font-bold font-[Space_Grotesk] text-white leading-tight mb-6">
              Let's build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f8cff] to-[#8b5cf6]">
                something great.
              </span>
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Currently open for freelance work, collaborations, or just tech talks. I usually reply within 24 hours.
            </p>
          </Reveal>

          <div className="flex flex-col gap-3">
            {socials.map((social, i) => (
              <Reveal key={social.name} delay={0.2 + i * 0.1}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a10] border border-white/5 transition-all duration-300 ${social.color}`}
                >
                  <div className="p-3 rounded-xl bg-white/5 text-gray-300 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                    {social.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono mb-1 uppercase">{social.name}</p>
                    <p className="text-sm text-white font-medium">{social.value}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <Reveal delay={0.3}>
          <div className="p-8 md:p-10 rounded-3xl bg-[#0a0a10] border border-white/5 relative h-full flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#4f8cff]/50 transition-all"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#4f8cff]/50 transition-all"
                  placeholder="juan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#4f8cff]/50 transition-all resize-none"
                  placeholder="Hi Marc, I'd like to talk about..."
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-[#4f8cff] to-[#8b5cf6] text-white font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(79,140,255,0.4)] transition-all duration-300"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </Reveal>

      </div>
    </Section>
  );
}