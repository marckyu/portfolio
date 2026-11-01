import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import InfinitePortraits from "./components/sections/InfinitePortraits";
import About from "./components/sections/About";
import Expertise from "./components/sections/Expertise";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Workflow from "./components/sections/Workflow";
import LearningJourney from "./components/sections/LearningJourney";

/** Ordered list of sections. The last step adds Contact and Footer. */
export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <InfinitePortraits />
        <About />
        <Expertise />
        <TechStack />
        <Projects />
        <Workflow />
        <LearningJourney />
      </main>
    </>
  );
}