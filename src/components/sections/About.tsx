import { MapPin, Mail, Briefcase, GraduationCap } from "lucide-react";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section id="about" className="pt-32 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        <Reveal className="lg:col-span-5" delay={0.1}>
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a10]">
            <img
              src="/asuncion.jpg"
              alt="John Marc Asuncion"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
          </div>
        </Reveal>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <Reveal delay={0.2}>
            <h2 className="text-sm font-mono text-[#4f8cff] tracking-widest uppercase mb-4">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-[Space_Grotesk] text-white leading-tight mb-6">
              A working student learning to bridge hardware troubleshooting and modern software.
            </h3>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              I am currently pursuing a BS in Information Technology while gaining hands-on experience in 12V automotive electronics, accessory installation, and office records.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              I'm actively learning the full system flow—how to plan projects, design the architecture, build with AI-augmented workflows, and debug efficiently. My goal is to master how everything connects, not just write code.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a10] border border-white/5 hover:border-white/20 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl text-[#4f8cff]"><GraduationCap size={20} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Education</p>
                  <p className="text-sm text-white font-medium">BS in IT (St. Jude College)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a10] border border-white/5 hover:border-white/20 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl text-[#8b5cf6]"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Location</p>
                  <p className="text-sm text-white font-medium">Quezon City, PH</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a10] border border-white/5 hover:border-white/20 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl text-emerald-400"><Briefcase size={20} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Current Status</p>
                  <p className="text-sm text-white font-medium">Working Student & Learner</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a10] border border-white/5 hover:border-white/20 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl text-gray-300"><Mail size={20} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Email</p>
                  <p className="text-sm text-white font-medium">johnmarc.asuncion@gmail.com</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
} 