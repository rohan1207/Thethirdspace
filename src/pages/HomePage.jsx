import { useEffect } from "react";
import Navbar from "../components/Navbar";
import GHero from "../components/GHero";
import Architecture from "../components/Architecture";
import Categories from "../components/Categories";
import Territory from "../components/Territory";
import Footer from "../components/Footer";
import ArchitectureHero from "../components/Architecturehero";
import ScrollNarrative from "../components/ScrollNarrative";
import Reviews from "../components/Reviews";
import Gallery from "../components/Gallery";
import MarqueeStrip from "../components/MarqueeStrip";
import { HERO_IMAGES } from "../constants/heroImages";
import { NARRATIVE_IMAGES } from "../constants/scrollNarrative";
import { WORK_PROJECTS } from "../constants/projects";
import { preloadImagesInBackground } from "../utils/preloadImages";

export default function HomePage() {
  useEffect(() => {
    const projectCovers = WORK_PROJECTS.map((project) => project.image);
    preloadImagesInBackground([...HERO_IMAGES, ...NARRATIVE_IMAGES, ...projectCovers]);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <GHero />
        <ArchitectureHero />
        
        <MarqueeStrip />
        <Categories />
        <ScrollNarrative />
        <Architecture />
        <Gallery />
        <Territory />
        <Reviews />
        <Footer />
      </main>
    </>
  );
}
