import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";

const tracks = [
  { title: "Midnight Coding", artist: "Lo-Fi Beats", src: "/audio/song1.mp3" },
  { title: "Deep Focus", artist: "Ambient Waves", src: "/audio/song2.mp3" },
  { title: "Neon Dreams", artist: "Synthwave", src: "/audio/song3.mp3" },
];

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function MiniMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (playing) audio.play().catch(() => setPlaying(false));
  }, [index]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play().catch(() => {});
    setPlaying(!playing);
  };

  const pick = (i: number) => {
    setIndex(i);
    setPlaying(true);
  };

  const next = () => pick((index + 1) % tracks.length);
  const prev = () => pick((index - 1 + tracks.length) % tracks.length);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (audioRef.current && duration) {
      audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
    }
  };

  return (
    <div className="group relative p-6 md:p-8 rounded-3xl bg-[#0c0c12] border border-white/5 transition-all duration-300 ease-out hover:border-[#4f8cff]/40 overflow-hidden shadow-2xl flex flex-col justify-between h-full">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#4f8cff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <audio
        ref={audioRef}
        src={tracks[index].src}
        // 👇 Nilagyan ng tamang type ang event target
        onTimeUpdate={(e: React.SyntheticEvent<HTMLAudioElement>) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e: React.SyntheticEvent<HTMLAudioElement>) => setDuration(e.currentTarget.duration)}
        onEnded={next}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#4f8cff]/10 border border-[#4f8cff]/20">
              <Music className="w-6 h-6 text-[#4f8cff]" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#4f8cff] uppercase tracking-wider">Now Playing</p>
              <h3 className="text-lg font-semibold text-white font-[Space_Grotesk]">{tracks[index].title}</h3>
            </div>
          </div>
          <span className="text-xs font-mono text-gray-500">{tracks[index].artist}</span>
        </div>

        <div 
          onClick={seek} 
          className="h-1.5 w-full bg-white/10 rounded-full cursor-pointer mb-2 relative overflow-hidden"
        >
          <div 
            className="h-full bg-gradient-to-r from-[#4f8cff] to-[#8b5cf6] rounded-full transition-all duration-300 ease-linear"
            style={{ width: `${duration ? (time / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-6">
          <span>{formatTime(time)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-6">
        <button onClick={prev} className="text-gray-400 hover:text-white transition-colors">
          <SkipBack size={20} />
        </button>
        <button 
          onClick={toggle} 
          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        <button onClick={next} className="text-gray-400 hover:text-white transition-colors">
          <SkipForward size={20} />
        </button>
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-white/5">
        {tracks.map((t, i) => (
          <div 
            key={t.src} 
            onClick={() => pick(i)} 
            className={`flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer text-sm transition-colors ${
              i === index ? "bg-white/5 text-[#4f8cff]" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{i + 1}. {t.title}</span>
            {i === index && playing && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f8cff] animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}