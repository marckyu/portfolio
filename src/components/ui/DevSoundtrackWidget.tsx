import { useState, useRef } from "react";
import { Play, Pause, SkipForward, Disc3 } from "lucide-react";
import { motion } from "framer-motion";

const tracks = [
  { title: "Midnight Coding", artist: "Lo-Fi Beats", src: "/audio/song1.mp3" },
  { title: "Deep Focus", artist: "Ambient Waves", src: "/audio/song2.mp3" },
  { title: "Neon Dreams", artist: "Synthwave", src: "/audio/song3.mp3" },
];

export default function DevSoundtrackWidget() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play().catch(() => {});
    setPlaying(!playing);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % tracks.length);
    setPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 50);
  };

  return (
    <div className="group relative p-6 md:p-8 rounded-3xl bg-[#0c0c12] border border-white/5 transition-all duration-300 ease-out hover:border-[#8b5cf6]/40 overflow-hidden shadow-2xl flex flex-col justify-center min-h-[140px]">
      <audio ref={audioRef} src={tracks[index].src} onEnded={next} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 relative overflow-hidden">
             <motion.div animate={{ rotate: playing ? 360 : 0 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
               <Disc3 className="w-5 h-5 text-[#8b5cf6]" />
             </motion.div>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-wider">Now Playing</p>
            <h3 className="text-sm font-semibold text-white truncate max-w-[150px]">{tracks[index].title}</h3>
          </div>
        </div>
        <button onClick={next} className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <SkipForward size={16} />
        </button>
      </div>

      <div className="relative z-10 flex items-center gap-3 mt-2">
        <button 
          onClick={toggle} 
          className="w-10 h-10 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)] shrink-0"
        >
          {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </button>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#4f8cff]" 
             initial={{ width: "0%" }}
             animate={{ width: playing ? "100%" : "0%" }}
             transition={{ duration: 30, ease: "linear", repeat: playing ? Infinity : 0 }}
           />
        </div>
      </div>
    </div>
  );
}