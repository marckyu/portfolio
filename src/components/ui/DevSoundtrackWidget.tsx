import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useLayoutEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Maximize2,
  ListMusic,
  Music,
  Quote,
} from "lucide-react";
import { playlistData, type Track } from "../../data/playlist";

const formatTime = (time: number) => {
  if (isNaN(time) || time === 0) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Morning playlist";
  if (h < 18) return "Afternoon grind";
  if (h < 22) return "Evening wind-down";
  return "Late-night coding";
};

const CoverMedia = memo(({ 
  src, 
  className, 
  onLoadEnd,
  isThumbnail = false,
  priority = false,
}: { 
  src: string; 
  className?: string; 
  onLoadEnd?: () => void;
  isThumbnail?: boolean;
  priority?: boolean;
}) => {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!isVideo && imgRef.current && src) {
      const img = imgRef.current;
      if (img.complete && img.naturalWidth > 0) {
        if (onLoadEnd) onLoadEnd();
      } else {
        img.decode().then(() => {
          if (onLoadEnd) onLoadEnd();
        }).catch(() => {});
      }
    }
  }, [src, isVideo, onLoadEnd]);

  if (!src || error) {
    return (
      <div className={`${className} bg-gradient-to-br from-cyan-900 to-slate-900 flex items-center justify-center`}>
        <Music size={isThumbnail ? 14 : 24} className="text-white/40" />
      </div>
    );
  }

  if (isVideo) {
    return (
      <video
        src={src}
        muted
        playsInline
        autoPlay
        loop
        onCanPlay={onLoadEnd}
        className={`${className} object-cover transition-opacity duration-300`}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt="Cover"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={onLoadEnd}
      onError={() => setError(true)}
      className={`${className} object-cover`}
    />
  );
});

const EqualizerBars = memo(({ playing }: { playing: boolean }) => (
  <div className="flex items-end gap-[1.5px] h-3 w-3 shrink-0">
    {[0.6, 1, 0.8].map((val, i) => (
      <motion.div
        key={i}
        animate={{ scaleY: playing ? [1, val * 2, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "easeInOut" }}
        className="w-[2px] h-full bg-[var(--accent)] rounded-full origin-bottom"
      />
    ))}
  </div>
));

const TrackRow = memo(({ 
  track, 
  isActive, 
  isPlaying, 
  onPlay 
}: { 
  track: Track; 
  isActive: boolean; 
  isPlaying: boolean; 
  onPlay: () => void;
}) => {
  return (
    <div
      data-active={isActive}
      onClick={onPlay}
      className={`group flex items-center gap-3 px-2 py-1.5 rounded-[12px] cursor-pointer transition-colors duration-150 touch-pan-y ${
        isActive ? "bg-[var(--tonal)]" : "hover:bg-white/5"
      }`}
      style={{ minHeight: '48px' }}
    >
      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-black/40 relative">
        <CoverMedia src={track.cover} className="w-full h-full" isThumbnail />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h5 className={`text-[14px] font-medium truncate ${isActive ? "text-[var(--accent)]" : "text-white"}`}>
          {track.title}
        </h5>
        {track.tags && track.tags.length > 0 ? (
          <div className="relative h-4 mt-0.5">
            <p className="absolute inset-0 text-[12px] text-white/50 truncate transition-opacity duration-150 group-hover:opacity-0">
              {track.artist}
            </p>
            <p className="absolute inset-0 text-[11px] font-mono text-white/50 truncate opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {track.tags.join(" • ")}
            </p>
          </div>
        ) : (
          <p className="text-[12px] text-white/50 truncate mt-0.5">{track.artist}</p>
        )}
      </div>
      <div className="shrink-0 pr-1">
        {isActive && isPlaying ? (
          <EqualizerBars playing={true} />
        ) : (
          <span className="text-[12px] tabular-nums text-white/40">
            {formatTime(track.duration || 0)}
          </span>
        )}
      </div>
    </div>
  );
}, (prev, next) => {
  return prev.track.id === next.track.id && prev.isActive === next.isActive && prev.isPlaying === next.isPlaying;
});

const WavyProgress = memo(({ 
  isPlaying, 
  isLoading, 
  onSeek, 
  videoRef 
}: { 
  isPlaying: boolean; 
  isLoading: boolean; 
  onSeek: (e: React.PointerEvent<HTMLDivElement>) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const playedPathRef = useRef<SVGPathElement>(null);
  const remainingPathRef = useRef<SVGPathElement>(null);
  const thumbOuterRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef<HTMLSpanElement>(null);

  const phase = useRef(0);
  const amplitude = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTime = useRef(0);
  const isDragging = useRef(false);

  const [trackWidth, setTrackWidth] = useState(200);
  const viewBoxW = 200;
  const height = 12;
  const mid = height / 2;
  const frequency = 0.15;
  const r = 6;

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setTrackWidth(entry.contentRect.width);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const draw = useCallback((time: number) => {
    const dt = time - lastTime.current;
    lastTime.current = time;

    const video = videoRef.current;
    if (!video) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    const targetAmp = (isPlaying || isLoading) ? 4 : 0;
    amplitude.current += (targetAmp - amplitude.current) * 0.05;

    if (isPlaying || isLoading) {
      phase.current += dt * 0.005;
    }

    const dur = video.duration;
    const cur = video.currentTime;
    
    const p = (Number.isFinite(dur) && dur > 0) ? Math.max(0, Math.min(1, cur / dur)) : 0;
    
    let effectiveP = p;
    if (isLoading && !isDragging.current) effectiveP = 0;

    const usableW = viewBoxW - 2 * r;
    const x = r + effectiveP * usableW;

    let playedD = `M 0 ${mid}`;
    for (let sx = 0; sx <= x; sx += 2) {
      const ramp = Math.min(1, sx / 24);
      const y = mid + Math.sin(sx * frequency + phase.current) * amplitude.current * ramp;
      playedD += ` L ${sx} ${y}`;
    }
    if (x > 0) {
      const lastRamp = Math.min(1, x / 24);
      const lastY = mid + Math.sin(x * frequency + phase.current) * amplitude.current * lastRamp;
      playedD += ` L ${x} ${lastY}`;
    }

    if (playedPathRef.current) playedPathRef.current.setAttribute("d", playedD);

    const remainingD = `M ${x} ${mid} L ${viewBoxW} ${mid}`;
    if (remainingPathRef.current) remainingPathRef.current.setAttribute("d", remainingD);

    if (thumbOuterRef.current) {
      const pctX = (x / viewBoxW) * trackWidth;
      const clamped = Math.max(r + 2, Math.min(trackWidth - r - 2, pctX));
      thumbOuterRef.current.style.transform = `translate3d(${clamped}px, 0, 0)`;
      thumbOuterRef.current.style.opacity = (!isLoading && p === 0) ? "0" : "1";
    }

    if (timeRef.current) {
      timeRef.current.textContent = (isLoading || !Number.isFinite(dur) || dur <= 0) ? "--:--" : formatTime(cur);
    }
    if (durationRef.current) {
      durationRef.current.textContent = (Number.isFinite(dur) && dur > 0) ? formatTime(dur) : "--:--";
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [isPlaying, isLoading, videoRef, trackWidth]);

  useEffect(() => {
    let isHidden = false;
    const handleVisibility = () => { isHidden = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const loop = (time: number) => {
      if (!isHidden) draw(time);
      else rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [draw]);

  const handleLocalSeek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isLoading) return;
    isDragging.current = true;
    const el = trackRef.current;
    const video = videoRef.current;
    if (!el || !video || !Number.isFinite(video.duration)) return;

    const rect = el.getBoundingClientRect();
    const seek = (clientX: number) => {
      const localX = Math.max(r, Math.min(rect.width - r, clientX - rect.left));
      const pct = (localX - r) / (rect.width - 2 * r);
      video.currentTime = pct * video.duration;
    };
    seek(e.clientX);

    const onMove = (ev: PointerEvent) => seek(ev.clientX);
    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    onSeek(e);
  };

  return (
    <div className="flex-1 flex items-center gap-3 px-2">
      <span ref={timeRef} className="text-[13px] font-medium tabular-nums tracking-wide shrink-0 text-[var(--accent)] min-w-[32px] text-right">
        --:--
      </span>
      <div 
        ref={trackRef}
        className="relative flex-1 h-8 flex items-center cursor-pointer group touch-none"
        onPointerDown={handleLocalSeek}
        role="slider"
        aria-label="Seek audio"
        aria-disabled={isLoading}
        style={{ touchAction: 'none' }}
      >
        <svg viewBox={`0 0 ${viewBoxW} ${height}`} className="w-full h-full overflow-visible">
          <path ref={remainingPathRef} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />
          <path ref={playedPathRef} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        
        <div 
          ref={thumbOuterRef}
          className="absolute top-1/2 left-0 will-change-transform pointer-events-none"
          style={{ 
            transform: "translate3d(0,0,0)",
            marginTop: '-6px',
            transition: isDragging.current ? 'none' : 'transform 240ms cubic-bezier(0.32, 0.72, 0, 1)'
          }}
        >
          <div className={`w-3 h-3 rounded-full bg-[var(--accent)] shadow-sm transition-transform duration-75 group-hover:scale-125 ${isLoading ? 'animate-pulse' : ''}`} />
        </div>
      </div>
      <span ref={durationRef} className="text-[13px] font-medium tabular-nums tracking-wide shrink-0 text-[var(--accent)] min-w-[32px]">
        --:--
      </span>
    </div>
  );
});

export default function DevSoundtrackWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const [vinylEgg, setVinylEgg] = useState(false);
  
  const [audioReady, setAudioReady] = useState(false);
  const [coverReady, setCoverReady] = useState(false);

  const currentTrack = playlistData.tracks[index];

  useEffect(() => {
    setIsLoading(!audioReady || !coverReady);
  }, [audioReady, coverReady]);

  const colors = useMemo(() => {
    const base = "#38bdf8";
    return {
      container: `color-mix(in srgb, ${base} 10%, #0a0a10)`,
      onContainer: `color-mix(in srgb, ${base} 60%, white)`,
      accent: base,
      tonal: `color-mix(in srgb, ${base} 14%, transparent)`, 
    };
  }, []);

  const handleCoverLoad = useCallback(() => setCoverReady(true), []);
  const handleAudioLoad = useCallback(() => setAudioReady(true), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const onReady = () => handleAudioLoad();
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    
    video.addEventListener("canplay", onReady);
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("playing", onReady);
    video.addEventListener("playing", onPlay);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    
    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("playing", onReady);
      video.removeEventListener("playing", onPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [handleAudioLoad]);

  useEffect(() => {
    if (isLibraryOpen && listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const topPos = activeEl.offsetTop - listRef.current.offsetTop;
        listRef.current.scrollTop = topPos - 50;
      }
    }
  }, [isLibraryOpen, index]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(8);
    }

    if (playing) video.pause();
    else video.play().catch(() => {});
  }, [playing]);

  const playTrack = useCallback((newIndex: number) => {
    setAudioReady(false);
    setCoverReady(false);
    setIndex(newIndex);
    
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }, 10);
  }, []);

  const handleNext = useCallback((e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    playTrack((index + 1) % playlistData.tracks.length);
  }, [index, playTrack]);

  const handlePrev = useCallback((e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    playTrack((index - 1 + playlistData.tracks.length) % playlistData.tracks.length);
  }, [index, playTrack]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.code === "Space" && e.target === headerRef.current) {
    } else if (e.code === "Space") {
      e.preventDefault(); 
      togglePlay();
    }
    else if (e.code === "ArrowRight" && videoRef.current) videoRef.current.currentTime += 5;
    else if (e.code === "ArrowLeft" && videoRef.current) videoRef.current.currentTime -= 5;
    else if (e.code === "Escape" && isLibraryOpen) {
      setIsLibraryOpen(false);
      headerRef.current?.focus();
    }
  }, [togglePlay, isLibraryOpen]);

  const toggleLibrary = useCallback(() => {
    setIsLibraryOpen(prev => !prev);
  }, []);

  const handleCoverClick = () => {
    setVinylEgg(true);
    setTimeout(() => setVinylEgg(false), 2000);
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  const greeting = useMemo(() => getGreeting(), []);
  const totalMinutes = useMemo(() => {
    const totalSecs = playlistData.tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
    return Math.ceil(totalSecs / 60);
  }, []);

  return (
    <div
      className="relative w-full max-w-[400px] mx-auto z-20 transform-gpu outline-none"
      style={{
        transform: "translate3d(0,0,0)",
        "--container": colors.container,
        "--onContainer": colors.onContainer,
        "--accent": colors.accent,
        "--tonal": colors.tonal,
        transition: "all 0.5s ease",
      } as React.CSSProperties}
      tabIndex={isExpanded ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <video ref={videoRef} src={currentTrack.src} muted={muted} playsInline onEnded={handleNext} className="hidden" preload="auto" />

      <AnimatePresence initial={false} mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.3, ease }}
            className="flex flex-col w-full gap-2"
          >
            <div 
              className="relative flex gap-4 p-4 rounded-[32px] shadow-lg border border-white/5 transition-colors duration-500"
              style={{ backgroundColor: "var(--container)" }}
            >
              <div 
                className={`relative w-[112px] h-[112px] shrink-0 rounded-[24px] overflow-hidden bg-black/40 cursor-pointer group/cover ${vinylEgg ? 'animate-spin-once' : ''}`}
                onClick={handleCoverClick}
                onMouseEnter={() => setShowNote(true)}
                onMouseLeave={() => setShowNote(false)}
              >
                {!coverReady && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse z-10 pointer-events-none" />}
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`cover-${currentTrack.id}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <CoverMedia src={currentTrack.cover} className="w-full h-full" priority onLoadEnd={handleCoverLoad} />
                  </motion.div>
                </AnimatePresence>
                
                <AnimatePresence>
                  {showNote && currentTrack.note && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 p-2 flex flex-col items-center justify-center text-center z-20"
                    >
                      <Quote size={14} className="text-[var(--accent)] mb-1 opacity-50" />
                      <p className="text-[10px] text-white/90 italic leading-tight line-clamp-3">{currentTrack.note}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                <div className="flex flex-col min-w-0 relative">
                  <div className="absolute top-0 right-0 flex gap-1 z-10">
                    <button
                      onClick={toggleLibrary}
                      className={`p-1 rounded-full transition-colors outline-none ${isLibraryOpen ? "text-[var(--accent)] bg-[var(--tonal)]" : "text-white/50 hover:text-white"}`}
                      aria-label={isLibraryOpen ? "Hide tracks" : "Show tracks"}
                      aria-expanded={isLibraryOpen}
                    >
                      <ListMusic size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        setIsLibraryOpen(false);
                      }}
                      className="p-1 rounded-full text-white/50 hover:text-white transition-colors outline-none"
                      aria-label="Collapse player"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`info-${currentTrack.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="pr-12"
                    >
                      <h3 className="text-[20px] font-semibold text-white tracking-tight truncate leading-tight">
                        {currentTrack.title}
                      </h3>
                      <p className="text-[14px] font-medium truncate mt-0.5" style={{ color: "var(--accent)" }}>
                        {currentTrack.artist}
                      </p>
                      <p className="text-[10px] font-mono text-white/40 truncate mt-1">
                        {vinylEgg ? "you found the vinyl" : `${playlistData.library.codingPrefix || '> now coding to:'} ${currentTrack.artist} - ${currentTrack.title}`}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handlePrev}
                    disabled={isLoading}
                    className="w-[52px] h-[52px] rounded-[22px] flex items-center justify-center transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none hover:rounded-[18px]"
                    style={{ backgroundColor: "var(--tonal)", color: "var(--onContainer)" }}
                  >
                    <SkipBack size={22} fill="currentColor" />
                  </button>
                  <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="flex-1 h-[52px] rounded-[22px] flex items-center justify-center transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none shadow-md hover:rounded-[18px]"
                    style={{ backgroundColor: "var(--accent)", color: "#050508" }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div key={playing ? "pause" : "play"} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}>
                        {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="w-[52px] h-[52px] rounded-[22px] flex items-center justify-center transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none hover:rounded-[18px]"
                    style={{ backgroundColor: "var(--tonal)", color: "var(--onContainer)" }}
                  >
                    <SkipForward size={22} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>

            <div 
              className="flex items-center py-3 rounded-full shadow-md border border-white/5 transition-colors duration-500"
              style={{ backgroundColor: "var(--container)" }}
            >
              <WavyProgress isPlaying={playing} isLoading={isLoading} onSeek={() => {}} videoRef={videoRef} />
            </div>

            <section 
              className="w-full rounded-[24px] border border-white/5 shadow-md transition-colors duration-500 overflow-hidden"
              style={{ backgroundColor: "var(--container)" }}
            >
              <button
                ref={headerRef}
                onClick={toggleLibrary}
                aria-expanded={isLibraryOpen}
                aria-controls="track-list"
                className="w-full px-3.5 py-2.5 grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none transition-colors active:scale-[0.98] group"
              >
                <div className="w-10 h-10 rounded-xl bg-black/40 overflow-hidden shrink-0">
                  <CoverMedia src={playlistData.library.cover} className="w-full h-full" isThumbnail />
                </div>
                <div className="flex flex-col min-w-0 items-start">
                  <h4 className="text-[14px] font-semibold text-white truncate w-full text-left leading-tight">{playlistData.library.title}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5 w-full">
                    {!isLibraryOpen && playing ? (
                      <div className="flex items-center gap-1.5 text-[var(--accent)] text-[11px] font-mono truncate">
                        <EqualizerBars playing={playing} />
                        <span className="truncate">▶ {currentTrack.title}</span>
                      </div>
                    ) : (
                      <p className="text-[11px] font-mono text-white/50 truncate w-full text-left">
                        {playlistData.library.subtitle === "Songs I code to" ? greeting : playlistData.library.subtitle}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-white/50 whitespace-nowrap shrink-0 text-right">
                  <span className="hidden sm:inline">{playlistData.tracks.length} tracks · {totalMinutes} min</span>
                  <span className="sm:hidden">{playlistData.tracks.length} tracks</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-white/50 transition-transform duration-300 group-hover:text-white`} 
                  style={{ 
                    transform: isLibraryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)'
                  }} 
                />
              </button>

              <div 
                className="grid w-full"
                style={{ 
                  gridTemplateRows: isLibraryOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 380ms cubic-bezier(0.32, 0.72, 0, 1)"
                }}
              >
                <div className="overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-[var(--container)] to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-[var(--container)] to-transparent z-10 pointer-events-none" />
                    
                    <div 
                      ref={listRef}
                      id="track-list"
                      className="flex flex-col max-h-[170px] sm:max-h-[min(40vh,240px)] overflow-y-auto px-2 pb-2 min-h-0
                        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-y"
                    >
                      <div className="border-t border-white/10 mx-2 mb-1 mt-1 shrink-0" />
                      
                      {playlistData.tracks.map((track, i) => {
                        const isActive = i === index;
                        const nextTrack = playlistData.tracks[i + 1];
                        const showDivider = nextTrack && !isActive && i + 1 !== index;
                        
                        return (
                          <div key={track.id} className="relative shrink-0">
                            <TrackRow 
                              track={track} 
                              isActive={isActive} 
                              isPlaying={playing} 
                              onPlay={() => playTrack(i)} 
                            />
                            {showDivider && (
                              <div className="h-px bg-white/5 ml-14 mr-2" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between w-full rounded-full p-2 pr-3 shadow-lg cursor-pointer border border-white/5 transition-colors duration-500"
            style={{ backgroundColor: "var(--container)" }}
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-black/20">
                <CoverMedia src={currentTrack.cover} className="w-full h-full" isThumbnail />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[13px] font-semibold text-white truncate leading-tight">{currentTrack.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors outline-none" style={{ backgroundColor: "var(--accent)", color: "#050508" }}>
                {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
              </button>
              <div className="p-1 rounded-full text-white/50"><Maximize2 size={14} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}