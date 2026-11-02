import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section id="about" title="About me" subtitle="A little bit about who I am and what I do.">
      <Reveal delay={0.1}>
        <div className="glass p-8 md:p-12 rounded-3xl max-w-4xl border border-white/10 relative overflow-hidden group hover:border-[#4f8cff]/30 transition-colors duration-500 mt-8">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4f8cff]/5 blur-[80px] rounded-full group-hover:bg-[#4f8cff]/10 transition-colors duration-500 pointer-events-none" />
          
          <div className="relative z-10 space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              I am a working student pursuing a <strong className="text-white">BS in Information Technology</strong>, with hands-on experience in both 12V automotive electronics and full-stack software development. 
            </p>
            <p>
              I bridge the gap between hardware troubleshooting and modern web technologies. Using AI-augmented workflows, I build practical, reliable digital solutions—from full-stack web applications to interactive gaming systems. 
            </p>
            <p>
              When I'm not building web apps or diagnosing car electrical faults, I'm constantly exploring new tools to optimize my workflow and ship code faster without sacrificing quality.
            </p>
          </div>

        </div>
      </Reveal>
    </Section>
  );
}