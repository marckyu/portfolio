import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Disc3, Music2 } from "lucide-react";
import Section from "../ui/Section";
import { motion } from "framer-motion";

const tracks = [
  { title: "Midnight Coding", artist: "Lo-Fi Beats", duration: "3:45", src: "/audio/song1.mp3" },
  { title: "Deep Focus", artist: "Ambient Waves", duration: "4:20", src: "/audio/song2.mp3" },
  { title: "Neon Dreams", artist: "Synthwave", duration: "2:50", src: "/audio/song3.mp3" },
  { title: "Algorithm Flow", artist: "Electronic", duration: "3:15", src: "/audio/song4.mp3" },
];

export default function Playlist() {
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

  const pick = (i: number) => {
    setIndex(i);
    setPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (playing) audio.play().catch(() => setPlaying(false));
  }, [index]);

  const next = () => pick((index + 1) % tracks.length);
  const prev = () => pick((index - 1 + tracks.length) % tracks.length);

  return (
    <Section id="playlist" title="Dev Soundtrack" subtitle="The beats that keep me in the flow state.">
      <audio
        ref={audioRef}
        src={tracks[index].src}
        onEnded={next}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-[#0a0a10] border border-white/5 rounded-3xl p-6 md:p-8">
        
        {/* Left Side: Album Art & Controls */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-8">
          
          <motion.div 
            animate={{ rotate: playing ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="relative w-48 h-48 rounded-full border border-white/10 bg-gradient-to-br from-[#12121a] to-[#050508] flex items-center justify-center shadow-2xl mb-8"
          >
            <Disc3 className="w-16 h-16 text-[#4f8cff]/50" />
            <div className="absolute inset-0 rounded-full border border-[#4f8cff]/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
          </motion.div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white font-[Space_Grotesk]">{tracks[index].title}</h3>
            <p className="text-sm text-gray-400 font-mono">{tracks[index].artist}</p>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={prev} className="text-gray-400 hover:text-white transition-colors">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={toggle} 
              className="w-16 h-16 rounded-full bg-[#4f8cff] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(79,140,255,0.4)]"
            >
              {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={next} className="text-gray-400 hover:text-white transition-colors">
              <SkipForward size={24} />
            </button>
          </div>
        </div>

        {/* Right Side: Tracklist */}
        <div className="md:col-span-2 flex flex-col justify-center pl-0 md:pl-8">
          <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Tracklist</h4>
          <div className="flex flex-col gap-2">
            {tracks.map((track, i) => (
              <div 
                key={i}
                onClick={() => pick(i)}
                className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  i === index ? "bg-[#4f8cff]/10 border border-[#4f8cff]/20" : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 flex justify-center shrink-0">
                    {i === index && playing ? (
                       <Music2 size={16} className="text-[#4f8cff] animate-pulse" />
                    ) : (
                      <span className={`text-sm font-mono ${i === index ? "text-[#4f8cff]" : "text-gray-500"}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className={`text-base font-semibold transition-colors ${i === index ? "text-[#4f8cff]" : "text-white group-hover:text-white"}`}>
                      {track.title}
                    </h5>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{track.artist}</p>
                  </div>
                </div>
                <span className="text-sm font-mono text-gray-500">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}