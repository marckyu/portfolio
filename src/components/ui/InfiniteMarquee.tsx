import type { ReactNode } from "react";

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function InfiniteMarquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  return (
    <div
      className={`group relative flex w-full overflow-hidden ${className}`}
      style={{
        "--marquee-duration": `${speed}s`,
        "--marquee-direction": direction === "left" ? "normal" : "reverse",
      } as React.CSSProperties}
    >
      <div
        className={`flex w-max will-change-transform ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `marquee-scroll var(--marquee-duration) linear infinite var(--marquee-direction)`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}