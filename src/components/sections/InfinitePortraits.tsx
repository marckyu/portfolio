import { useState } from "react";
import type { Portrait } from "../../types";
import { portraits } from "../../data/portraits";
import Lightbox from "../ui/Lightbox";

interface PortraitCardProps {
  item: Portrait;
  index: number;
  isDuplicate: boolean;
  onOpen: (index: number) => void;
}

function PortraitCard({ item, index, isDuplicate, onOpen }: PortraitCardProps) {
  const rotation = ((index % 5) - 2) * 1.5;
  const offset = ((index % 3) - 1) * 8;

  return (
    <li
      className="portrait-card shrink-0 px-2"
      style={{
        "--rotation": `${rotation}deg`,
        "--offset": `${offset}px`,
      } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpen(index);
        }}
        tabIndex={isDuplicate ? -1 : 0}
        aria-hidden={isDuplicate || undefined}
        aria-label={`Open photo: ${item.alt}`}
        className="glass group relative block w-[240px] cursor-pointer overflow-hidden rounded-2xl text-left transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff] sm:w-[280px]"
      >
        <img
          src={item.src}
          alt={item.alt}
          width={780}
          height={1040}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement("div");
              fallback.className = "flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-[#4f8cff]/40 to-[#8b5cf6]/40 font-[Space_Grotesk,sans-serif] text-3xl font-semibold text-white";
              fallback.innerText = "JM";
              parent.appendChild(fallback);
            }
          }}
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setOpenIndex(index);
    onOpenPhoto(index);
  };

  const handleClose = () => {
    setOpenIndex(null);
    onOpenPhoto(-1);
  };

  return (
    <section aria-label="Photo gallery" className="relative py-10 overflow-hidden">
      <div className="marquee-container overflow-hidden scale-105">
        <div 
          className="flex w-max"
          style={{
            animation: isPaused ? "none" : "marquee-scroll 40s linear infinite",
            willChange: "transform",
          }}
        >
          <ul className="flex shrink-0" aria-label="Photos">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`a-${i}`}
                item={item}
                index={i}
                isDuplicate={false}
                onOpen={handleOpen}
              />
            ))}
          </ul>
          
          <ul className="flex shrink-0" aria-hidden="true">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`b-${i}`}
                item={item}
                index={i}
                isDuplicate={true}
                onOpen={handleOpen}
              />
            ))}
          </ul>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={portraits}
          index={openIndex}
          onClose={handleClose}
          onChange={handleOpen}
        />
      )}
    </section>
  );
}