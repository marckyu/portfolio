import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Minimize2 } from "lucide-react";
import { playlistData } from "../../data/playlist";

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

export default function RefinedMusicPill({ isCompact }: { isCompact: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [playing, setPlaying] = useState(false);
  const [expandedState, setExpandedState] = useState({
    isCompact,
    expanded: !isCompact,
  });
  if (expandedState.isCompact !== isCompact) {
    setExpandedState({
      isCompact,
      expanded: isCompact ? false : expandedState.expanded,
    });
  }
  const expanded = expandedState.expanded;
  const setExpanded = (value: boolean) =>
    setExpandedState((current) => ({ ...current, expanded: value }));
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = playlistData.tracks[index];
  const nextTrack = playlistData.tracks[(index + 1) % playlistData.tracks.length];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => setCurrentTime(video.currentTime);
    const meta = () => setDuration(video.duration);
    video.addEventListener("timeupdate", update);
    video.addEventListener("loadedmetadata", meta);
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("loadedmetadata", meta);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.pause(); else video.play();
    setPlaying(!playing);
  };

  return (
    <div className="w-full relative z-20">
      <video 
        ref={videoRef} 
        src={currentTrack.src} 
        playsInline 
        className="hidden" 
        onEnded={() => setIndex((i) => (i + 1) % playlistData.tracks.length)}
      />

      <motion.div layout transition={SPRING} style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={SPRING}
              className="flex flex-col gap-3 p-4 rounded-3xl bg-slate-950/65 border border-white/10 backdrop-blur-2xl shadow-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3.5 items-center">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border border-white/10">
                    <img src={currentTrack.cover} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[15px] font-semibold text-white tracking-tight">{currentTrack.title}</h3>
                    <p className="text-[13px] text-slate-400 mt-0.5">{currentTrack.artist}</p>
                  </div>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setExpanded(false)} 
                  className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white"
                >
                  <Minimize2 size={16} />
                </motion.button>
              </div>

              <div className="mt-1 group cursor-pointer" style={{ touchAction: 'none' }}>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all" 
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center gap-6 mt-1">
                <motion.button whileTap={{ scale: 0.85 }} className="p-2 text-slate-400 hover:text-white"><SkipBack size={22} /></motion.button>
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </motion.button>
                <motion.button whileTap={{ scale: 0.85 }} className="p-2 text-slate-400 hover:text-white"><SkipForward size={22} /></motion.button>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="mt-2 p-2.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3"
              >
                <img src={nextTrack.cover} className="w-10 h-10 rounded-xl object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Up Next</p>
                  <p className="text-[13px] font-medium text-white truncate mt-0.5">{nextTrack.title}</p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={SPRING}
              className="flex items-center justify-between p-2 pr-3 rounded-full bg-slate-950/65 border border-white/10 backdrop-blur-2xl shadow-lg cursor-pointer min-h-[60px]"
              onClick={() => setExpanded(true)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={currentTrack.cover} className="w-10 h-10 rounded-full object-cover border border-white/10" alt="" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-semibold text-white truncate">{currentTrack.title}</span>
                  <span className="text-[12px] text-slate-400 truncate">{currentTrack.artist}</span>
                </div>
              </div>
              <motion.button 
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black shadow-sm shrink-0"
              >
                {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
