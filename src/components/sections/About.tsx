import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Briefcase, GraduationCap } from "lucide-react";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

const photos = [
  { src: "/asuncion.jpg", alt: "John Marc Asuncion" },
  { src: "/library.jpg", alt: "John Marc sa Library" },
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Section id="about" className="pt-32 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Images */}
        <Reveal className="lg:col-span-5 w-full" delay={0.1}>
          <div className="relative">
            
            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a10] z-10 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
              
              {/* Dark Gradient para readable yung dots sa mobile */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Mobile Controls (Clickable Dots) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex lg:hidden gap-2 z-20">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-[#4f8cff] w-6" : "bg-white/50 w-2 hover:bg-white"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>

            {/* Floating Sticker (Desktop Only) */}
            <div 
              className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-40 md:w-40 md:h-52 rounded-2xl overflow-hidden border-4 border-[#050508] z-20 shadow-2xl transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
              title="Click to change photo"
            >
               <img
                src={photos[(currentIndex + 1) % photos.length].src} 
                alt="Next photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold font-mono">NEXT</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <Reveal delay={0.2}>
            <h2 className="text-sm font-mono text-[#4f8cff] tracking-widest uppercase mb-4">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-[Space_Grotesk] text-white leading-tight mb-6">
              A working student learning to bridge hardware troubleshooting and modern software.
            </h3>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              I am currently pursuing a BS in Information Technology while gaining hands on experience in 12V automotive electronics, accessory installation, and office records.
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