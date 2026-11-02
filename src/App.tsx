import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Preloader from "./components/layout/Preloader";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Expertise from "./components/sections/Expertise";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Workflow from "./components/sections/Workflow";
import LearningJourney from "./components/sections/LearningJourney";
import { shouldPlayIntro } from "./lib/intro";

export default function App() {
  const [playing, setPlaying] = useState(shouldPlayIntro);
  const endIntro = useCallback(() => setPlaying(false), []);

  return (
    <div id="top" className="overflow-x-hidden">
      <AnimatePresence>
        {playing && <Preloader key="preloader" onFinish={endIntro} />}
      </AnimatePresence>

      <Navbar />
      <main id="main">
        {/* Hero mounts as the curtain lifts, so its entrance animation is visible.
            Walang InfinitePortraits dito. Hero na ang humahawak nito. */}
        {!playing && <Hero />}
        <About />
        <Expertise />
        <TechStack />
        <Projects />
        <Workflow />
        <LearningJourney />
      </main>
    </div>
  );
}