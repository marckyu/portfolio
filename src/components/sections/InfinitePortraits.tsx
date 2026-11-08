import { useEffect, useRef } from "react";
import type { Portrait } from "../../types";
import { portraits } from "../../data/portraits";

interface PortraitCardProps {
  item: Portrait;
  index: number;
  isDuplicate: boolean;
  onOpen: (index: number) => void;
}

function PortraitCard({ item, index, isDuplicate, onOpen }: PortraitCardProps) {
  const rotation = ((index % 5) - 2) * 1.5;
  const offset = ((index % 3) - 1) * 8;

  // 👇 Fallback image gamit ang DOM manipulation imbes na useState
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.style.display = "none";
    const parent = target.parentElement;
    if (parent) {
      const fallback = document.createElement("div");
      fallback.className = "flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-[#4f8cff]/40 to-[#8b5cf6]/40 font-[Space_Grotesk,sans-serif] text-3xl font-semibold text-white";
      fallback.innerText = "JM";
      parent.appendChild(fallback);
    }
  };

  return (
    <li
      className="portrait-card shrink-0 px-3"
      style={{
        "--rotation": `${rotation}deg`,
        "--offset": `${offset}px`,
      } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onOpen(index);
        }}
        tabIndex={isDuplicate ? -1 : 0}
        aria-label={`Open photo: ${item.alt}`}
        aria-hidden={isDuplicate || undefined}
        className="glass group relative block w-[200px] cursor-pointer overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff] sm:w-[240px] will-change-transform"
      >
        <img
          src={item.src}
          alt={item.alt}
          width={780}
          height={1040}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={handleImageError}
          className="aspect-[3/4] w-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </button>
    </li>
  );
}

interface InfinitePortraitsProps {
  onOpenPhoto: (index: number) => void;
  isPaused: boolean;
}

export default function InfinitePortraits({ onOpenPhoto, isPaused }: InfinitePortraitsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    if (isPaused) {
      marquee.classList.add("is-paused");
    } else {
      marquee.classList.remove("is-paused");
    }
  }, [isPaused]);

  return (
    <section aria-label="Photo gallery" className="relative py-10">
      <div
        ref={marqueeRef}
        className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="marquee-track flex py-8">
          <ul className="flex" aria-label="Photos">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`a-${i}-${item.src}`}
                item={item}
                index={i}
                isDuplicate={false}
                onOpen={onOpenPhoto}
              />
            ))}
          </ul>
          <ul className="marquee-dup flex" aria-hidden="true">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`b-${i}-${item.src}`}
                item={item}
                index={i}
                isDuplicate={true}
                onOpen={onOpenPhoto}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}