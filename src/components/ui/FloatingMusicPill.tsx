import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Minimize2, Music, ListMusic, X } from "lucide-react";
import { musicLibrary } from "../../data/tracksAndAlbumsData";

const SPRING = { type: "spring", stiffness: 400, damping: 28, mass: 0.8 } as const;

function ProgressBar({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
  }, [videoRef]);

  return (
    <div 
      className="mt-2 group cursor-pointer w-full" 
      style={{ touchAction: 'none' }}
      onClick={(e) => e.stopPropagation()} // <-- PARA HINDI MAG-MINIMIZE PAG PININDOT ANG PROGRESS BAR
    >
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--md-primary)] rounded-full transition-all" 
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function FloatingMusicPill({ isCompact }: { isCompact: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isExpanded, setIsExpanded] = useState(!isCompact);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  
  const [playing, setPlaying] = useState(false);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [mediaError, setMediaError] = useState(false);

  const currentAlbum = musicLibrary[albumIndex];
  const currentTrack = currentAlbum.tracks[trackIndex];

  useEffect(() => {
    if (isCompact) setIsExpanded(false);
  }, [isCompact]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(8);
    if (playing) video.pause(); else video.play().catch(() => setPlaying(false));
    setPlaying(!playing);
  };

  const playTrack = (index: number) => {
    setTrackIndex(index);
    setMediaError(false);
  };

  const handleNext = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setMediaError(false);
    setTrackIndex((i) => (i + 1) % currentAlbum.tracks.length);
  };

  const handlePrev = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setMediaError(false);
    setTrackIndex((i) => (i - 1 + currentAlbum.tracks.length) % currentAlbum.tracks.length);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    if (playing) {
      video.play().catch(() => setPlaying(false));
    }
  }, [trackIndex]);

  return (
    <div className="w-full relative z-20 flex justify-end">
      <video 
        ref={videoRef} 
        src={currentTrack.audioSrc} 
        playsInline 
        className="hidden" 
        onEnded={handleNext}
      />

      <AnimatePresence mode="wait">
        {/* STATE 1: COMPACT PILL */}
        {!isExpanded && (
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={SPRING}
            className="flex items-center justify-between p-2 pr-3 rounded-full bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-lg cursor-pointer w-full max-w-sm gpu-accelerated"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                {mediaError ? <Music className="text-white/40 p-2" size={20} /> : <video src={currentTrack.coverImage} autoPlay loop muted playsInline className="w-full h-full object-cover" />}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-semibold text-white truncate">{currentTrack.title}</span>
                <span className="text-[12px] text-gray-400 truncate">{currentTrack.artist}</span>
              </div>
            </div>
            <motion.button whileTap={{ scale: 0.85 }} onClick={togglePlay} className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--md-primary)] text-black shadow-sm shrink-0">
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </motion.button>
          </motion.div>
        )}

        {/* STATE 2: EXPANDED ALBUM PLAYER */}
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={SPRING}
            onClick={() => setIsExpanded(false)} // <-- MINIMIZE WHEN TAPPING THE CARD (EXCEPT BUTTONS)
            className="flex flex-col w-full max-w-sm rounded-[28px] bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-2xl overflow-hidden gpu-accelerated cursor-pointer"
          >
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ background: `radial-gradient(circle at top left, ${currentAlbum.accentColor}, transparent 70%)` }} 
            />

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[var(--md-primary)] uppercase tracking-widest">Now Playing</span>
                <span className="text-sm font-semibold text-white">{currentAlbum.name}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsQueueOpen(true); }} 
                  className="p-2 rounded-full bg-white/5 text-gray-300 hover:text-white"
                >
                  <ListMusic size={18} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} 
                  className="p-2 rounded-full bg-white/5 text-gray-300 hover:text-white"
                >
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>

            {/* ALBUM ART & INFO */}
            <div className="px-6 pb-4 relative z-10 flex flex-col items-center pointer-events-none">
              <div className="w-48 h-48 rounded-[24px] overflow-hidden shadow-2xl border border-white/10 mb-4 relative">
                 {mediaError ? <Music className="w-full h-full p-12 text-white/20" /> : <video src={currentTrack.coverImage} autoPlay loop muted playsInline className="w-full h-full object-cover" />}
              </div>
              <h2 className="text-xl font-bold text-white text-center">{currentTrack.title}</h2>
              <p className="text-sm text-gray-400">{currentTrack.artist}</p>
            </div>

            {/* CONTROLS */}
            <div className="px-6 pb-6 relative z-10">
              <ProgressBar videoRef={videoRef} />
              <div className="flex justify-center items-center gap-8 mt-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrev(e); }} 
                  className="text-gray-400 hover:text-white p-2"
                >
                  <SkipBack size={24} />
                </button>
                <button 
                  onClick={togglePlay} 
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--md-primary)] text-black shadow-lg hover:scale-105 transition-transform"
                >
                  {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(e); }} 
                  className="text-gray-400 hover:text-white p-2"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>

            {/* UP NEXT PILL */}
            <div 
              className="mx-4 mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors relative z-10"
              onClick={(e) => { e.stopPropagation(); setIsQueueOpen(true); }}
            >
               <div className="flex items-center gap-3">
                 <span className="text-[10px] font-bold text-[var(--md-primary)] uppercase tracking-widest">Up Next</span>
                 <span className="text-sm font-medium text-white truncate">{currentAlbum.tracks[(trackIndex + 1) % currentAlbum.tracks.length].title}</span>
               </div>
               <ListMusic size={16} className="text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUEUE DRAWER OVERLAY */}
      <AnimatePresence>
        {isQueueOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center p-4"
            onClick={() => setIsQueueOpen(false)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={SPRING}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm bg-[var(--md-surface-container)] border border-[var(--md-outline)] rounded-[28px] overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
            >
              <div className="p-4 border-b border-[var(--md-outline)] flex justify-between items-center bg-[var(--md-surface-container-high)]">
                <h3 className="text-lg font-bold text-white">Queue</h3>
                <button onClick={() => setIsQueueOpen(false)} className="p-2 rounded-full bg-white/5 text-gray-400"><X size={18} /></button>
              </div>
              <div className="p-2 overflow-y-auto custom-scrollbar">
                {currentAlbum.tracks.map((track, i) => (
                  <div 
                    key={track.id}
                    onClick={() => { playTrack(i); setIsQueueOpen(false); }}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${i === trackIndex ? "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]" : "hover:bg-white/5 text-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono">{i + 1}</span>
                      <div>
                        <p className={`text-sm font-semibold ${i === trackIndex ? "text-[var(--md-on-primary-container)]" : "text-white"}`}>{track.title}</p>
                        <p className="text-[11px] opacity-70">{track.artist}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono">{track.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}