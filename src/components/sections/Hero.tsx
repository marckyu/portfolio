import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDown, Gamepad2, Globe } from "lucide-react";
import type { PointerEvent } from "react";
import { site } from "../../data/site";
import ButtonLink from "../ui/ButtonLink";
import GithubIcon from "../ui/GithubIcon";
import InfinitePortraits from "./InfinitePortraits";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const specialties = [
  { icon: Globe, title: "Web Development", text: "Frontend, backend, and web app architecture with responsive UI.", status: "Used in real projects" },
  { icon: Gamepad2, title: "Game Development", text: "Game mechanics, logic, and gameplay systems.", status: "Learning and experimenting" },
];

function SpecialtyStack() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="relative [perspective:1000px] w-full" onPointerMove={reduce ? undefined : onMove} onPointerLeave={reduce ? undefined : onLeave}>
      <motion.div style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }} className="grid gap-4 w-full">
        {specialties.map(({ icon: Icon, title, text, status }, i) => (
          <div 
            key={title} 
            style={reduce ? undefined : { transform: `translateZ(${30 + i * 10}px)` }} 
            className={`glass rounded-3xl p-5 ${!reduce ? 'animate-float' : ''}`}
            {...(!reduce && { style: { animationDelay: `${i * 1.5}s`, ...(reduce ? {} : { transform: `translateZ(${30 + i * 10}px)` }) } })}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-gradient text-white">
                <Icon size={20} aria-hidden />
              </span>
              <h2 className="font-display text-base font-semibold text-white">{title}</h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">{text}</p>
            <p className="mt-3 inline-block rounded-full border border-line bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-200">{status}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-40 min-h-[90vh] flex flex-col justify-center">
      {/* Continuous Background Orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-accent-blue/25 blur-[110px] bg-ambient-orb" />
        <div className="absolute -right-24 top-48 h-96 w-96 rounded-full bg-accent-violet/25 blur-[110px] bg-ambient-orb" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[20rem_1fr_20rem]">
          
          {/* 1. LEFT CAROUSEL - Hidden sa mobile, nasa kaliwa sa desktop */}
          <div className="hidden lg:flex items-center justify-start overflow-hidden py-10">
            <InfinitePortraits />
          </div>

          {/* 2. CENTER CONTENT */}
          <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show" className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h1 variants={item}>
              <span className="block font-display text-lg text-muted sm:text-xl">{site.name}</span>
              <span className="mt-2 block font-display text-5xl font-bold leading-[1.05] tracking-tight text-accent-gradient sm:text-6xl lg:text-7xl">
                {site.role}
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              {site.intro}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <ButtonLink href="#projects"><ArrowDown size={16} aria-hidden /> Explore projects</ButtonLink>
              <ButtonLink href={site.github} variant="ghost" external><GithubIcon size={16} /> GitHub</ButtonLink>
            </motion.div>
          </motion.div>

          {/* 3. RIGHT CARDS */}
          <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }} className="hidden lg:block w-full justify-self-end">
            <SpecialtyStack />
          </motion.div>
        </div>

        {/* 4. MOBILE VIEW CAROUSEL - Iisang instance lang, lumalabas lang sa mobile */}
        <div className="lg:hidden mt-12 w-full overflow-hidden">
          <InfinitePortraits />
        </div>
      </div>
    </section>
  );
}