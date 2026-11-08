import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import { Code2, Database, Layout, Sparkles } from "lucide-react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiPocketbase,
  SiSqlite,
  SiPython,
  SiLua,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";

const techCategories = [
  {
    title: "Web & Frontend",
    icon: <Layout className="w-5 h-5 text-[#4f8cff]" />,
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS3", icon: SiCss, color: "text-[#1572B6]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ],
  },
  {
    title: "Backend & Database",
    icon: <Database className="w-5 h-5 text-[#8b5cf6]" />,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "PocketBase", icon: SiPocketbase, color: "text-white" },
      { name: "SQLite", icon: SiSqlite, color: "text-[#003B57]" },
    ],
  },
  {
    title: "Programming Languages",
    icon: <Code2 className="w-5 h-5 text-emerald-400" />,
    skills: [
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "Lua", icon: SiLua, color: "text-[#2C2D72]" },
      { name: "Java", icon: Code2, color: "text-[#007396]" },
      { name: "C++", icon: Code2, color: "text-[#00599C]" },
      { name: "C#", icon: Code2, color: "text-[#239120]" },
    ],
  },
  {
    title: "Tools & AI Workflows",
    icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
    skills: [
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
      { name: "GitHub", icon: SiGithub, color: "text-white" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
      { name: "VS Code", icon: Code2, color: "text-[#007ACC]" },
      { name: "OpenAI", icon: Sparkles, color: "text-white" },
    ],
  },
];

export default function TechStack() {
  return (
    <Section id="stack" className="py-24 bg-[#0a0a10]/50 border-y border-white/5">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[Space_Grotesk] text-white mb-4">
            Technical Arsenal
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The tools and technologies I use to build scalable, practical solutions.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {techCategories.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.1}>
            <div className="group p-8 rounded-3xl bg-[#050508] border border-white/5 hover:border-white/20 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white font-[Space_Grotesk]">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="group/skill flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300 cursor-default"
                    >
                      <Icon className={`w-4 h-4 ${skill.color} opacity-70 group-hover/skill:opacity-100 group-hover/skill:scale-110 transition-all duration-300`} />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}