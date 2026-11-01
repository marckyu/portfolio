import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import InfinitePortraits from "./components/sections/InfinitePortraits";

/** Ordered list of sections. Later steps add their sections below. */
export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <InfinitePortraits />
      </main>
    </>
  );
}