import { useState } from "react";
import type { CSSProperties } from "react";
import { portraits } from "../../data/portraits";
import type { Portrait } from "../../types";

// Small variations so the cards feel hand-placed, not machine-aligned
const rotations = [-3, 2, -1.5, 3, -2, 1];
const offsets = [0, 18, -10, 14, -14, 8];

function PortraitCard({ portrait, index }: { portrait: Portrait; index: number }) {
  const [failed, setFailed] = useState(false);
  const style = {
    "--r": `${rotations[index % rotations.length]}deg`,
    marginTop: `${offsets[index % offsets.length]}px`,
  } as CSSProperties;

  return (
    <li
      style={style}
      className="glass h-72 w-52 shrink-0 rotate-[var(--r)] overflow-hidden rounded-3xl transition-transform duration-500 hover:rotate-0 hover:scale-105 sm:h-80 sm:w-60"
    >
      {failed ? (
        <div className="grid h-full w-full place-items-center bg-accent-gradient/30 font-display text-4xl font-bold text-white/70">
          JM
        </div>
      ) : (
        <img
          src={portrait.src}
          alt={portrait.alt}
          width={480}
          height={640}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </li>
  );
}

export default function InfinitePortraits() {
  return (
    <section aria-label="Photo gallery" className="relative py-10">
      <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex py-8">
          {/* The list is rendered twice. The animation moves exactly -50%, so the loop has no visible reset. */}
          <ul className="flex shrink-0 gap-5 pr-5">
            {portraits.map((p, i) => (
              <PortraitCard key={p.src} portrait={p} index={i} />
            ))}
          </ul>
          <ul className="marquee-dup flex shrink-0 gap-5 pr-5" aria-hidden="true">
            {portraits.map((p, i) => (
              <PortraitCard key={`dup-${p.src}`} portrait={{ ...p, alt: "" }} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}