import { useRef, useCallback, type MouseEvent } from "react";

export function use3DTilt(maxTilt: number = 15) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rotateX = ((y / height) - 0.5) * -maxTilt * 2;
      const rotateY = ((x / width) - 0.5) * maxTilt * 2;
      
      ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      ref.current.style.setProperty("--mouse-x", `${x}px`);
      ref.current.style.setProperty("--mouse-y", `${y}px`);
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}