import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, SkipForward, ArrowRight, GripVertical, ChevronDown, ChevronUp } from "lucide-react";

const tracks = [
  { id: 1, title: "Ngalan Mo", artist: "Yden", src: "/videos/video1.mp4" },
  { id: 2, title: "Mas Gusto Kita", artist: "Yden", src: "/videos/video2.mp4" },
  { id: 3, title: "Naiilang", artist: "Le John", src: "/videos/video3.mp4" },
  { id: 4, title: "Pag-Ibig (Meron ba?)", artist: "Ace Banzuelo", src: "/videos/video4.mp4" },
];

const EqualizerBars = ({ playing }: { playing: boolean }) => (
  <div className="flex items-end gap-[2px] h-2.5">
    {[0.4, 0.8, 0.6, 0.9].map((val, i) => (
      <motion.div
        key={i}
        animate={{ height: playing ? ["20%", `${val * 100}%`, "20%"] : "20%" }}
        transition={{ repeat: Infinity, duration: 0.6 + i * 0.15, ease: "easeInOut" }}
        className="w-[2px] bg-cyan-400 rounded-full will-change-[height]"
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
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 100);
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

  return (
    <motion.div 
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative w-full will-change-transform transform-gpu z-20"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isExpanded ? (
          <motion.div 
            key="collapsed"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between w-full rounded-full bg-slate-950/70 backdrop-blur-xl border border-cyan-500/30 px-4 py-2 shadow-lg"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-black border border-white/10">
                <video 
                  ref={videoRef}
                  src={currentTrack.src}
                  muted={muted}
                  playsInline
                  onEnded={handleNext}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2.5 min-w-0">
                <EqualizerBars playing={playing} />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white truncate leading-tight">{currentTrack.title}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button 
                onClick={togglePlay} 
                className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/30 transition-colors"
              >
                {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
              </button>
              <button 
                onClick={() => setIsExpanded(true)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="expanded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-3xl bg-slate-950/80 backdrop-blur-3xl border border-white/10 shadow-xl p-4 md:p-5 overflow-hidden relative"
          >
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-600/20 rounded-full blur-[60px] pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-black shrink-0 shadow-lg border border-white/5">
                <video 
                  ref={videoRef}
                  src={currentTrack.src}
                  muted={muted}
                  playsInline
                  onEnded={handleNext}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">Now Playing</p>
                  <EqualizerBars playing={playing} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrack.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-none mb-1 truncate">{currentTrack.title}</h3>
                    <p className="text-sm text-slate-400 font-medium truncate">{currentTrack.artist}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-5 relative z-10" onClick={(e) => e.stopPropagation()}>
              <div
                ref={progressRef}
                onClick={handleSeek}
                className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer relative group/bar"
              >
                <motion.div
                  layout
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full will-change-[width]"
                  style={{ width: `${progress}%` }}
                >
                  {progress > 0 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                      <div className={`w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#38bdf8] ${playing ? "animate-pulse" : ""}`} />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200 outline-none will-change-transform"
                >
                  <SkipForward size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200 outline-none will-change-transform"
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 text-white flex items-center justify-center transition-colors duration-200 outline-none will-change-transform shadow-[0_0_20px_rgba(56,189,248,0.3)] ml-2"
                >
                  {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </motion.button>
              </div>

              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
              >
                <ChevronUp size={20} />
              </button>
            </div>

            <motion.div 
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3 cursor-pointer transition-colors group/upnext relative z-10 will-change-transform transform-gpu"
              onClick={handleNext}
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black border border-cyan-500/30 shadow-md">
                <video src={nextTrack.src} muted loop autoPlay playsInline className="w-full h-full object-cover group-hover/upnext:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:upnext:bg-cyan-500/20 transition-colors">
                  <ArrowRight size={16} className="text-white drop-shadow-md" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-0.5">Up Next • Queued</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={nextTrack.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
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
  );
}