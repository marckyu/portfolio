import { useCallback, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import DevLoader from "./components/layout/DevLoader";
import BackgroundShapes from "./components/layout/BackgroundShapes";
import ScrollProgress from "./components/layout/ScrollProgress";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Expertise from "./components/sections/Expertise";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Workflow from "./components/sections/Workflow";
import LearningJourney from "./components/sections/LearningJourney";
import Contact from "./components/sections/Contact";

export default function App() {
  const [playing, setPlaying] = useState(true);
  const endIntro = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    
    if (playing) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [playing]);

  return (
    <div id="top" className="overflow-x-clip relative min-h-screen bg-[#050508]">
      <BackgroundShapes isLoading={playing} />
      <ScrollProgress />

      <AnimatePresence>
        {playing && <DevLoader key="devloader" onFinish={endIntro} />}
      </AnimatePresence>

      {!playing && <Navbar />}
      
      <motion.main 
        id="main" 
        className="relative z-10 origin-top"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ 
          opacity: playing ? 0 : 1, 
          scale: playing ? 0.98 : 1,
          y: playing ? 10 : 0
        }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
      >
        <Hero />
        <About />
        <Expertise />
        <TechStack />
        <Projects />
        <Workflow />
        <LearningJourney />
        <Contact />
      </motion.main>
    </div>
  );
}