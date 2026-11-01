import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";
import type { Project } from "../../types";
import ButtonLink from "./ButtonLink";
import GithubIcon from "./GithubIcon";
import GlassCard from "./GlassCard";
import TechBadge from "./TechBadge";

export default function ProjectCard({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const { name, description, image, tech, features, repo, demo } = project;

  return (
    <GlassCard as="article" className="grid overflow-hidden lg:grid-cols-[1.05fr_1fr]">
      {/* Screenshot (falls back to a gradient panel if the file is missing) */}
      <div className="relative aspect-[16/10] bg-surface lg:aspect-auto lg:min-h-full">
        {failed ? (
          <div className="grid h-full w-full place-items-center bg-accent-gradient/20 px-6 text-center font-display text-2xl font-semibold text-white/70">
            {name}
          </div>
        ) : (
          <img
            src={image}
            alt={`Screenshot of ${name}`}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
      </div>

      <div className="flex flex-col p-7">
        <h3 className="font-display text-2xl font-semibold text-white">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>

        <ul className="mt-5 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex gap-2 text-sm leading-relaxed text-muted">
              <Check size={16} className="mt-0.5 shrink-0 text-accent-blue" aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <TechBadge key={t} name={t} />
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {demo && (
            <ButtonLink href={demo} external>
              <ExternalLink size={16} aria-hidden /> Live demo
            </ButtonLink>
          )}
          <ButtonLink href={repo} variant="ghost" external>
            <GithubIcon size={16} /> Repository
          </ButtonLink>
        </div>
      </div>
    </GlassCard>
  );
}