import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { site } from "../../data/site";

type HistoryItem = {
  type: "input" | "output" | "error";
  text: string;
};

const COMMANDS: Record<string, string> = {
  help: "Available commands: about, skills, projects, contact, clear",
  about: `I am ${site.name}, an ${site.role}. ${site.intro}`,
  skills: "Frontend: React, TypeScript, Tailwind. Backend: Node.js, PocketBase, SQLite. Tools: Git, AI Workflows.",
  projects: "1. SJC Lost & Found (Next.js, PocketBase). 2. BioSphere (HTML/CSS/JS). 3. Interactive Web Resume (Vanilla JS).",
  contact: `Email: johnmarc.asuncion@gmail.com | GitHub: github.com/marckyu | FB: fb.com/johnmarc.f.asuncion20`,
  clear: "CLEAR",
};

export default function TerminalWidget() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "Welcome to JM-OS v1.0.0" },
    { type: "output", text: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    setHistory((prev) => {
      const newHistory: HistoryItem[] = [...prev, { type: "input", text: cmd }];
      if (cmd === "clear") return [];
      if (COMMANDS[cmd]) return [...newHistory, { type: "output", text: COMMANDS[cmd] }];
      return [...newHistory, { type: "error", text: `command not found: ${cmd}. Type 'help' for options.` }];
    });
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="w-full max-w-lg rounded-xl overflow-hidden border border-white/10 bg-[#0a0a10]/90 backdrop-blur-xl shadow-2xl font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-gray-400">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-xs">jm@portfolio: ~</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="p-4 h-[300px] overflow-y-auto custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            {item.type === "input" && (
              <div className="flex items-center gap-2">
                <span className="text-[#4f8cff]">➜</span>
                <span className="text-[#4f8cff]">~</span>
                <span className="text-white">{item.text}</span>
              </div>
            )}
            {item.type === "output" && (
              <div className="text-gray-300 whitespace-pre-wrap pl-5">{item.text}</div>
            )}
            {item.type === "error" && (
              <div className="text-red-400 whitespace-pre-wrap pl-5">{item.text}</div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
          <span className="text-emerald-400">➜</span>
          <span className="text-[#4f8cff]">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600"
            placeholder="Type a command..."
            autoComplete="off"
            autoCapitalize="none"
            spellCheck="false"
          />
          <button type="submit" className="text-gray-500 hover:text-white transition-colors">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}