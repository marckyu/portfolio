import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Portrait } from "../../types";

interface LightboxProps {
  items: Portrait[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: LightboxProps) {
  const isOpen = index !== null;
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  // Reset failed state for the active index so a retry is possible.
  useEffect(() => {
    if (index !== null) setFailed((f) => ({ ...f, [index]: false }));
  }, [index]);

  // Save focus, lock scroll, focus close button. Restore on unmount.
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const focusId = window.setTimeout(
      () => closeBtnRef.current?.focus(),
      0
    );

    return () => {
      window.clearTimeout(focusId);

      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);

      const prev = previouslyFocused.current;
      if (prev && typeof prev.focus === "function") {
        // preventScroll keeps the page exactly where it was.
        prev.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % items.length);
  }, [index, items.length, onChange]);

  // Keyboard: Escape, arrows, focus trap.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter((n) => !n.hasAttribute("disabled"));
        if (nodes.length === 0) return;

        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (
          e.shiftKey &&
          (active === first || !dialogRef.current.contains(active))
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, goPrev, goNext, onClose]);

  // Preload neighboring images.
  useEffect(() => {
    if (index === null) return;
    const neighbors = [
      (index - 1 + items.length) % items.length,
      (index + 1) % items.length,
    ];
    for (const i of neighbors) {
      const img = new Image();
      img.src = items[i].src;
    }
  }, [index, items]);

  // Touch swipe.
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!swipeStart.current) return;
    const dx = e.clientX - swipeStart.current.x;
    const dy = e.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  if (typeof document === "undefined") return null;

  const safeIndex = index ?? 0;
  const item = items[safeIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Portrait viewer: ${item.alt}`}
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          {/* Backdrop — click to close */}
          <motion.button
            type="button"
            aria-label="Close lightbox"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            tabIndex={-1}
          />

          {/* Close */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-white/10 p-2.5 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff]"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous portrait"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2.5 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff] sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next portrait"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2.5 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff] sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image area */}
          <div
            className="relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col items-center px-12"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                  ease: "easeOut",
                }}
                className="flex w-full flex-col items-center"
              >
                {failed[safeIndex] ? (
                  <div
                    className="flex max-h-[85vh] w-auto items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#4f8cff]/40 to-[#8b5cf6]/40 px-16 py-32 font-[Space_Grotesk,sans-serif] text-5xl font-semibold text-white"
                    role="img"
                    aria-label={item.alt}
                  >
                    JM
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                    onError={() =>
                      setFailed((f) => ({ ...f, [safeIndex]: true }))
                    }
                  />
                )}
                <p className="mt-4 text-center text-sm text-white/70">
                  {item.alt}{" "}
                  <span className="ml-2 text-white/50">
                    {safeIndex + 1} / {items.length}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}