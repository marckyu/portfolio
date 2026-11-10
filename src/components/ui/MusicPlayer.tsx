import { useRef, useState, } from "react";
import { Play, Pause, SkipForward, Music2 } from "lucide-react";
import { motion } from "framer-motion";

const tracks = [
  { title: "Midnight Coding", artist: "AI Generated", src: "/audio/song1.mp3" },
  { title: "Deep Focus", artist: "Lo-Fi Beats", src: "/audio/song2.mp3" },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log("Audio play failed:", err));
    }
    setPlaying(!playing);
  };

  const next = () => {
    const nextIndex = (index + 1) % tracks.length;
    setIndex(nextIndex);
    setPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch((err) => console.log("Audio play failed:", err));
    }, 50);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage || 0);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-4 p-3 pr-6 rounded-full bg-[#0a0a10]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
      <audio 
        ref={audioRef} 
        src={tracks[index].src} 
        onEnded={next} 
        onTimeUpdate={handleTimeUpdate}
      />
      
      {/* Album Art Placeholder */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#4f8cff] to-[#8b5cf6] flex items-center justify-center shrink-0">
        <Music2 className="w-5 h-5 text-white/80" />
        {playing && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-white/50 rounded-full"
          />
        )}
      </div>

      {/* Track Info */}
      <div className="flex flex-col min-w-[120px]">
        <span className="text-sm font-semibold text-white leading-tight truncate">
          {tracks[index].title}
        </span>
        <span className="text-xs text-gray-400 font-mono truncate">
          {tracks[index].artist}
        </span>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-[#4f8cff] rounded-full transition-all duration-300 ease-linear" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 ml-2">
        <button 
          onClick={toggle}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        >
          {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
        
        <button 
          onClick={next}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>
    </motion.div>
  );
}