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
    <Section id="about" className="py-16 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        
        {/* Left Side: Images (Responsive) */}
        <Reveal className="lg:col-span-5 w-full" delay={0.1}>
          <div className="relative w-full max-w-[320px] md:max-w-none mx-auto">
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
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Mobile Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex lg:hidden gap-2 z-20">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-[#4f8cff] w-6" : "bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>

            {/* Desktop Floating Sticker */}
            <div 
              className="hidden lg:block absolute -bottom-6 -right-6 w-40 h-52 rounded-2xl overflow-hidden border-4 border-[#050508] z-20 shadow-2xl transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
            >
               <img src={photos[(currentIndex + 1) % photos.length].src} alt="Next" className="w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <Reveal delay={0.2}>
            <h2 className="text-xs md:text-sm font-mono text-[#4f8cff] tracking-widest uppercase mb-3 md:mb-4">
              About Me
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold font-[Space_Grotesk] text-white leading-tight mb-4 md:mb-6">
              A working student learning to bridge hardware troubleshooting and modern software.
            </h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4 md:mb-6">
              I am currently pursuing a BS in Information Technology while gaining hands-on experience in 12V automotive electronics, accessory installation, and office records.
            </p>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6 md:mb-8">
              I'm actively learning the full system flow—how to plan projects, design the architecture, build with AI-augmented workflows, and debug efficiently. My goal is to master how everything connects, not just write code.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-[#0a0a10] border border-white/5">
                <div className="p-2 md:p-3 bg-white/5 rounded-xl text-[#4f8cff]"><GraduationCap size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 font-mono uppercase">Education</p>
                  <p className="text-xs md:text-sm text-white font-medium">BS in IT (St. Jude College)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-[#0a0a10] border border-white/5">
                <div className="p-2 md:p-3 bg-white/5 rounded-xl text-[#8b5cf6]"><MapPin size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 font-mono uppercase">Location</p>
                  <p className="text-xs md:text-sm text-white font-medium">Quezon City, PH</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-[#0a0a10] border border-white/5">
                <div className="p-2 md:p-3 bg-white/5 rounded-xl text-emerald-400"><Briefcase size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 font-mono uppercase">Status</p>
                  <p className="text-xs md:text-sm text-white font-medium">Working Student</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-[#0a0a10] border border-white/5">
                <div className="p-2 md:p-3 bg-white/5 rounded-xl text-gray-300"><Mail size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 font-mono uppercase">Email</p>
                  <p className="text-xs md:text-sm text-white font-medium truncate">johnmarc.asuncion@gmail.com</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}