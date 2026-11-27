import type { Portrait } from "../../types";
import { portraits } from "../../data/portraits";

interface PortraitCardProps {
  item: Portrait;
  index: number;
  isDuplicate: boolean;
}

function PortraitCard({ item, index, isDuplicate }: PortraitCardProps) {
  const rotation = ((index % 5) - 2) * 1.5;
  const offset = ((index % 3) - 1) * 8;

  return (
    <li
      className="portrait-card shrink-0 px-2 pointer-events-none"
      style={{
        "--rotation": `${rotation}deg`,
        "--offset": `${offset}px`,
      } as React.CSSProperties}
    >
      <div
        aria-hidden={isDuplicate || undefined}
        className="glass relative block w-[240px] overflow-hidden rounded-2xl text-left sm:w-[280px]"
      >
        <img
          src={item.src}
          alt={item.alt}
          width={780}
          height={1040}
          loading={isDuplicate || index > 2 ? "lazy" : "eager"}
          fetchPriority={!isDuplicate && index === 0 ? "high" : "auto"}
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
      </div>
    </li>
  );
}

export default function InfinitePortraits() {
  return (
    <section aria-hidden="true" className="relative py-10 overflow-hidden pointer-events-none">
      <div className="marquee marquee-container overflow-hidden scale-105">
        <div className="marquee-track flex w-max">
          <ul className="flex shrink-0" aria-label="Photos">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`a-${i}`}
                item={item}
                index={i}
                isDuplicate={false}
              />
            ))}
          </ul>
          
          <ul className="marquee-dup flex shrink-0" aria-hidden="true">
            {portraits.map((item, i) => (
              <PortraitCard
                key={`b-${i}`}
                item={item}
                index={i}
                isDuplicate={true}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
