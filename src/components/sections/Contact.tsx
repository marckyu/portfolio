import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase, Code2, Send, ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:johnmarc.asuncion@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message} (Reply to: ${formData.email})`;
    window.location.href = mailtoLink;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  const socials = [
    {
      name: "Email",
      value: "johnmarc.asuncion@gmail.com",
      href: "mailto:johnmarc.asuncion@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:border-[#4f8cff]/50 hover:bg-[#4f8cff]/5",
    },
    {
      name: "GitHub",
      value: "@marckyu",
      href: "https://github.com/marckyu",
      icon: <Code2 className="w-5 h-5" />,
      color: "hover:border-white/30 hover:bg-white/5",
    },
    {
      name: "Facebook",
      value: "John Marc Asuncion",
      href: "https://web.facebook.com/johnmarc.f.asuncion20/",
      icon: <Briefcase className="w-5 h-5" />,
      color: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5",
    },
  ];

  return (
    <Section
      id="contact"
      title="Get in touch"
      subtitle="Have a project in mind or just want to say hi? My inbox is always open."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        
        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <h3 className="text-3xl md:text-5xl font-bold font-[Space_Grotesk] text-white leading-tight mb-4">
              Let's build something <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4f8cff] to-[#8b5cf6]">
                amazing together.
              </span>
            </h3>
            <p className="text-gray-400 text-lg max-w-md">
              Currently open for freelance work, collaborations, or just tech talks. I usually reply within 24 hours.
            </p>
          </Reveal>

          <div className="flex flex-col gap-4 mt-4">
            {socials.map((social, i) => (
              <Reveal key={social.name} delay={0.2 + i * 0.1}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center justify-between p-5 rounded-2xl bg-[#0a0a10] border border-white/5 transition-all duration-300 ${social.color}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 text-gray-300 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-mono mb-1">{social.name}</p>
                      <p className="text-white font-medium">{social.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4f8cff]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#4f8cff]/50 focus:ring-1 focus:ring-[#4f8cff]/50 transition-all"
                  placeholder="Juan Dela Cruz"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#4f8cff]/50 focus:ring-1 focus:ring-[#4f8cff]/50 transition-all"
                  placeholder="juan@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#4f8cff]/50 focus:ring-1 focus:ring-[#4f8cff]/50 transition-all resize-none"
                  placeholder="Hi Marc, I'd like to talk about..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-full py-4 rounded-xl bg-linear-to-r from-[#4f8cff] to-[#8b5cf6] text-white font-medium flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,140,255,0.3)] hover:shadow-[0_0_30px_rgba(79,140,255,0.6)] transition-all duration-300"
              >
                {isSent ? "Opening Email..." : "Send Message"}
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </Reveal>

      </div>
    </Section>
  );
}