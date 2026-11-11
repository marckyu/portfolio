import { useState, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react";

const tracks = [
  { title: "Ngalan Mo", artist: "Yden", src: "/videos/video1.mp4" },
  { title: "Deep Focus", artist: "Ambient Waves", src: "/videos/video2.mp4" },
  { title: "Neon Dreams", artist: "Synthwave", src: "/videos/video3.mp4" },
];

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function DevSoundtrackWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.pause();
    else video.play().catch(() => {});
    setPlaying(!playing);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % tracks.length);
    setPlaying(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 50);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.duration) {
      setDuration(video.duration);
      setProgress((video.currentTime / video.duration) * 100);
    }
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
    setCurrentTime(newTime);
    setProgress((newTime / video.duration) * 100);
  };

  return (
    <div 
      className="relative w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group will-change-transform"
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* Video Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black mb-4 border border-white/10 group/video">
        <video
          ref={videoRef}
          src={tracks[index].src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => next()}
          onLoadedMetadata={handleTimeUpdate}
          playsInline
          muted={muted}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Info Badge & Mute */}
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          <button 
            onClick={toggleMute} 
            className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        {/* Bottom Left Info */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-0.5">Now Playing</p>
          <h3 className="text-sm font-bold text-white truncate drop-shadow-md">{tracks[index].title}</h3>
          <p className="text-[10px] text-slate-300 truncate drop-shadow-md">{tracks[index].artist}</p>
        </div>

        {/* Center Play Button (if paused) */}
        {!playing && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer z-10"
            onClick={toggle}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#38bdf8] flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              <Play size={22} fill="white" className="ml-1 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Row */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggle} 
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#38bdf8] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_15px_rgba(139,92,246,0.3)] shrink-0 will-change-transform"
        >
          {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer relative group/bar"
          >
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full will-change-[width]"
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                  <div className={`w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#38bdf8,0_0_20px_#38bdf8] ${playing ? "animate-pulse" : ""}`} />
                  <div className={`absolute inset-0 w-3 h-3 rounded-full bg-[#38bdf8] blur-[4px] ${playing ? "opacity-80 animate-pulse" : "opacity-40"}`} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <button 
          onClick={next} 
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all duration-200 active:scale-95 outline-none shrink-0"
        >
          <SkipForward size={16} />
        </button>
      </div>
    </div>
  );
}