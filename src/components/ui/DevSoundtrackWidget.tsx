import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, Disc3 } from "lucide-react";
import { motion } from "framer-motion";

const tracks = [
  { title: "Ngalan Mo", artist: "Yden", src: "/audio/song1.mp3" },
  { title: "Deep Focus", artist: "Ambient Waves", src: "/audio/song2.mp3" },
  { title: "Neon Dreams", artist: "Synthwave", src: "/audio/song3.mp3" },
];

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function DevSoundtrackWidget() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    if (audio.duration) {
      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / audio.duration) * 100);
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-6 rounded-3xl bg-slate-950/70 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden group will-change-transform">
      <audio
        ref={audioRef}
        src={tracks[index].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={next}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-violet-600/30 rounded-full blur-[90px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60" />
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-600/30 rounded-full blur-[90px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60" />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black border border-white/20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] shrink-0">
              <motion.div
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-full h-full flex items-center justify-center will-change-transform"
              >
                <Disc3 className="w-8 h-8 text-violet-400" />
              </motion.div>
              {playing && <div className="absolute inset-0 rounded-full border-2 border-violet-500/50 animate-ping opacity-40" />}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">Now Playing</p>
                {playing && (
                  <div className="flex items-end gap-[2px] h-2">
                    <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-cyan-400 rounded-full" />
                    <motion.div animate={{ height: ["100%", "40%", "100%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-cyan-400 rounded-full" />
                    <motion.div animate={{ height: ["60%", "90%", "60%"] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-[2px] bg-cyan-400 rounded-full" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight leading-none mb-1">
                {tracks[index].title}
              </h2>
              <p className="text-sm font-medium text-slate-400">
                {tracks[index].artist}
              </p>
            </div>
          </div>

          <button onClick={next} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all duration-200 active:scale-95 outline-none will-change-transform">
            <SkipForward size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] outline-none shrink-0 will-change-transform">
            {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          <div
            ref={progressRef}
            onClick={handleSeek}
            className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative group/bar"
          >
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full will-change-[width]"
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                  <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#38bdf8,0_0_20px_#38bdf8] ${playing ? "animate-pulse" : ""}`} />
                  <div className={`absolute inset-0 w-3.5 h-3.5 rounded-full bg-[#38bdf8] blur-[4px] ${playing ? "opacity-80 animate-pulse" : "opacity-40"}`} />
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-white/0 group-hover/bar:bg-white/10 transition-colors rounded-full" />
          </div>
        </div>

        <div className="flex justify-between items-center px-1 text-[10px] font-mono text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}