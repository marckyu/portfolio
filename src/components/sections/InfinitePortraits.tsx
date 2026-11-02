import { useEffect, useRef, useState } from "react";
import type { Portrait } from "../../types";
import { portraits } from "../../data/portraits";
import Lightbox from "../ui/Lightbox";

interface PortraitCardProps {
  item: Portrait;
  index: number;
  isDuplicate: boolean;
  onOpen: (index: number) => void;
}

function PortraitCard({
  item,
  index,
  isDuplicate,
  onOpen,
}: PortraitCardProps) {
  const [failed, setFailed] = useState(false);

  // Small variations so the cards feel hand-placed.
  const rotation = ((index % 5) - 2) * 1.5;
  const offset = ((index % 3) - 1) * 8;

  return (
    <li
      className="portrait-card shrink-0 px-3"
      style={
        {
          "--rotation": `${rotation}deg`,
          "--offset": `${offset}px`,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        tabIndex={isDuplicate ? -1 : 0}
        aria-label={`Open photo: ${item.alt}`}
        aria-hidden={isDuplicate || undefined}
        className="glass group relative block w-[200px] cursor-pointer overflow-hidden rounded-2xl text-left transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff] sm:w-[240px]"
      >
        {failed ? (
          <div
            role="img"
            aria-label={item.alt}
            className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-[#4f8cff]/40 to-[#8b5cf6]/40 font-[Space_Grotesk,sans-serif] text-3xl font-semibold text-white"
          >
            JM
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            width={780}
            height={1040}
            loading="lazy"
            decoding="async"  
            draggable={false}
            onError={() => setFailed(true)}
            className="aspect-[3/4] w-full object-cover"
            style={{ objectPosition: "center" }}
          />
        )}
      </button>
    </li>
  );
}

export default function InfinitePortraits() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause on open; on close, explicitly restart the CSS animation so the
  // loop resumes cleanly in every browser — even if focus/hover still
  // sits on a card (Lightbox restores focus to the triggering card).
  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;

    if (openIndex !== null) {
      marquee.classList.add("is-paused");
      return;
    }

    // Closed: remove pause, then force a clean restart of the animation.
    marquee.classList.remove("is-paused");
    track.style.animation = "none";
    // Force reflow so the browser registers the "none" state.
    void track.offsetWidth;
    track.style.animation = "";
  }, [openIndex]);

  return (
    <section aria-label="Photo gallery" className="relative py-10">
      <div
        ref={marqueeRef}
        className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div ref={trackRef} className="marquee-track flex py-8">
          {/* The list is rendered twice. The animation moves exactly -50%,
              so the loop never visibly resets. */}
          <ul className="flex" aria-label="Photos">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`a-${i}-${item.src}`}
                item={item}
                index={i}
                isDuplicate={false}
                onOpen={setOpenIndex}
              />
            ))}
          </ul>
          <ul className="marquee-dup flex" aria-hidden="true">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`b-${i}-${item.src}`}
                item={item}
                index={i}
                isDuplicate
                onOpen={setOpenIndex}
              />
            ))}
          </ul>
        </div>
      </div>

      <Lightbox
        items={portraits}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </section>
  );
}