import { motion, type Variants } from "framer-motion";
import { ArrowDown, Globe, Gamepad2 } from "lucide-react";
import { site } from "../../data/site";
import { Button } from "../ui/Button";
import GithubIcon from "../ui/GithubIcon";
import InfinitePortraits from "./InfinitePortraits";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  },
};

// Dahil string array lang ang nasa site.ts mo, gagawa tayo ng local mapping para sa cards
const specialtiesData = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description: "Frontend, backend, and web app architecture with responsive UI.",
    status: "Shipped in real projects",
  },
  {
    id: "game",
    icon: Gamepad2,
    title: "Game Development",
    description: "Game mechanics, logic, and gameplay systems.",
    status: "Currently experimenting",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-[#050508]">
      
      {/* 1. Background Pictures */}
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none scale-110">
        <InfinitePortraits />
      </div>

      {/* 2. Ambient Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4f8cff]/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-start"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-gray-300 tracking-wider uppercase">
                Available for work
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold font-[Space_Grotesk] leading-[1.1] tracking-tight">
              <span className="block text-gray-400 text-lg md:text-2xl font-mono mb-2 font-normal">
                {site.name}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {site.role.split(" ")[0]}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f8cff] to-[#8b5cf6]">
                {site.role.split(" ")[1]}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-8 text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
              {site.intro}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#projects">
                Explore Projects <ArrowDown size={16} />
              </Button>
              <Button href={site.github} variant="secondary" target="_blank" rel="noreferrer">
                <GithubIcon size={16} /> GitHub
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Bento Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {specialtiesData.map((spec) => {
              const Icon = spec.icon;
              return (
                <motion.div 
                  key={spec.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative p-6 md:p-8 rounded-3xl bg-[#0a0a10]/80 backdrop-blur-md border border-white/5 hover:border-[#4f8cff]/30 transition-colors overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4f8cff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-[#4f8cff]/10 group-hover:border-[#4f8cff]/20 transition-all duration-300">
                      <Icon className="w-6 h-6 text-gray-300 group-hover:text-[#4f8cff] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-[Space_Grotesk]">
                        {spec.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                        {spec.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8cff]" />
                        {spec.status}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}