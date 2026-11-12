import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ArrowRight,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const tracks = [
  { id: 1, title: "Ngalan Mo", artist: "Yden", src: "/videos/video1.mp4" },
  { id: 2, title: "Mas Gusto Kita", artist: "Yden", src: "/videos/video2.mp4" },
  { id: 3, title: "Naiilang", artist: "Le John", src: "/videos/video3.mp4" },
  { id: 4, title: "Pag-Ibig (Meron ba?)", artist: "Ace Banzuelo", src: "/videos/video4.mp4" },
];

const EqualizerBars = ({ playing }: { playing: boolean }) => (
  <div className="flex items-end gap-[2px] h-3">
    {[0.4, 0.8, 0.6, 0.9].map((val, i) => (
      <motion.div
        key={i}
        animate={{ height: playing ? ["20%", `${val * 100}%`, "20%"] : "20%" }}
        transition={{ repeat: Infinity, duration: 0.6 + i * 0.15, ease: "easeInOut" }}
        className="w-[2px] bg-cyan-400 rounded-full transform-gpu"
        style={{ willChange: "height" }}
      />
    ))}
  </div>
);

export default function DevSoundtrackWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextIndex = (index + 1) % tracks.length;
  const prevIndex = (index - 1 + tracks.length) % tracks.length;
  const nextTrack = tracks[nextIndex];
  const currentTrack = tracks[index];

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [handleTimeUpdate]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  const handleNext = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setIndex(nextIndex);
    setProgress(0);
    setPlaying(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 50);
  };

  const handlePrev = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setIndex(prevIndex);
    setProgress(0);
    setPlaying(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 50);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.duration;
    video.currentTime = newTime;
    setProgress((newTime / video.duration) * 100);
  };

  const springConfig = { type: "spring" as const, stiffness: 400, damping: 35, mass: 0.8 };

  return (
    <motion.div
      layout
      transition={springConfig}
      className="relative w-full max-w-[340px] mx-auto z-20 transform-gpu"
      style={{ willChange: "transform" }}
    >
      <motion.div
        layout
        transition={springConfig}
        className={`relative flex flex-col overflow-hidden origin-top ${
          isExpanded
            ? "w-full rounded-3xl bg-slate-950/80 backdrop-blur-3xl border border-white/10 shadow-2xl p-4"
            : "w-full rounded-full bg-slate-950/70 backdrop-blur-3xl border border-cyan-500/30 px-3 py-2 shadow-lg"
        }`}
      >
        {isExpanded && (
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-600/20 rounded-full blur-[60px] pointer-events-none" />
        )}

        <video
          ref={videoRef}
          src={currentTrack.src}
          muted={muted}
          playsInline
          onEnded={handleNext}
          className="hidden"
        />

        <div className={`relative z-10 flex ${isExpanded ? "flex-col gap-3 w-full" : "items-center justify-between w-full"}`}>
          <div className={`flex items-center ${isExpanded ? "gap-4" : "gap-3 min-w-0 flex-1"}`}>
            <motion.div
              layout
              transition={springConfig}
              className={`relative shrink-0 overflow-hidden bg-black border border-white/10 shadow-lg ${
                isExpanded ? "w-20 h-20 sm:w-24 sm:h-24 rounded-2xl" : "w-10 h-10 rounded-full"
              }`}
            >
              <video
                src={currentTrack.src}
                muted
                playsInline
                autoPlay
                loop
                className="w-full h-full object-cover transform-gpu"
              />
            </motion.div>

            <div className={`flex flex-col min-w-0 ${isExpanded ? "flex-1" : ""}`}>
              {isExpanded ? (
                <>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Now Playing</p>
                    <EqualizerBars playing={playing} />
                  </div>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={currentTrack.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="min-w-0"
                    >
                      <h3 className="text-base font-bold text-white tracking-tight leading-tight truncate">{currentTrack.title}</h3>
                      <p className="text-xs text-slate-400 font-medium truncate">{currentTrack.artist}</p>
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex items-center gap-2.5 min-w-0">
                  <EqualizerBars playing={playing} />
                  <span className="text-sm font-bold text-white truncate leading-tight">{currentTrack.title}</span>
                </div>
              )}
            </div>
          </div>

          {isExpanded ? (
            <div className="flex items-center justify-between w-full mt-1">
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors outline-none"
                >
                  <SkipBack size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="w-11 h-11 mx-1 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 text-white flex items-center justify-center transition-all outline-none shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                  {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors outline-none"
                >
                  <SkipForward size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={toggleMute}
                  className="w-9 h-9 ml-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors outline-none"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </motion.button>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0 outline-none"
              >
                <ChevronUp size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/30 transition-colors outline-none"
              >
                {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
              </button>
              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors outline-none"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full relative z-10 overflow-hidden"
            >
              <div className="w-full py-3" onClick={(e) => e.stopPropagation()}>
                <div
                  ref={progressRef}
                  onClick={handleSeek}
                  className="w-full h-1 bg-white/10 rounded-full cursor-pointer relative group/bar"
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_12px_#38bdf8] pointer-events-none opacity-0 group-hover/bar:opacity-100 transition-opacity"
                    style={{ left: `${progress}%` }}
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.98 }}
                className="p-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3 cursor-pointer transition-colors group/upnext relative z-10"
                onClick={handleNext}
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-black border border-cyan-500/30 shadow-md">
                  <video src={nextTrack.src} muted loop autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/upnext:bg-cyan-500/20 transition-colors">
                    <ArrowRight size={14} className="text-white drop-shadow-md" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-0.5">Up Next • Queued</p>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={nextTrack.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <h4 className="text-sm font-semibold text-white truncate leading-tight">{nextTrack.title}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{nextTrack.artist}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <motion.div whileHover={{ x: 3 }} className="text-gray-600 group-hover/upnext:text-cyan-400 transition-colors">
                  <GripVertical size={16} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}