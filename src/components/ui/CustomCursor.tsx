import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Inner dot (Mabilis sumunod)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"]'));
    };

    const loop = () => {
      // Outer ring (May spring effect)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Inner Crosshair Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#4f8cff] rounded-full will-change-transform z-10"
        style={{ 
          opacity: isHovering ? 0 : 1, 
          transition: "opacity 0.2s",
          boxShadow: "0 0 10px #4f8cff"
        }}
      />

      {/* Outer Scanner Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 flex items-center justify-center will-change-transform transition-all duration-300 ease-out ${
          isHovering 
            ? "w-16 h-16 rounded-full bg-[#4f8cff]/20 border border-[#4f8cff] backdrop-blur-sm" 
            : "w-10 h-10 border border-[#4f8cff]/50"
        }`}
        style={{
          clipPath: isHovering 
            ? "circle(50% at 50% 50%)" 
            : "polygon(0 0, 30% 0, 30% 5%, 5% 5%, 5% 30%, 0 30%, 0 70%, 5% 70%, 5% 95%, 30% 95%, 30% 100%, 70% 100%, 70% 95%, 95% 95%, 95% 70%, 100% 70%, 100% 30%, 95% 30%, 95% 5%, 70% 5%, 70% 0, 100% 0, 100% 100%, 0 100%)"
        }}
      >
        {/* Scanner Lines (Lumalabas lang pag hindi hover) */}
        {!isHovering && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[#4f8cff]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[#4f8cff]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-[#4f8cff]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-[#4f8cff]" />
          </>
        )}

        {/* Text sa loob ng cursor pag hover */}
        {isHovering && (
          <span className="text-[#4f8cff] text-[9px] font-bold tracking-widest font-mono">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}