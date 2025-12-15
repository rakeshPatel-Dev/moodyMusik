"use client";

import { Heart, Smile, Zap, Frown, GraduationCap } from "lucide-react";
import Hero from "../components/sections/Hero";
import Header from "../components/sections/Header";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import MoodSelector from "../components/sections/MoodSelector";
import CTABtn from "../components/sections/CTABtn";
import Testimonials from "../components/sections/Testimonials";
import Footer from "../components/sections/Footer";
import { Toaster } from "react-hot-toast";



export const moods = [
  { name: "Energetic", icon: <Zap /> },
  { name: "Chill", icon: <Smile /> },
  { name: "Romantic", icon: <Heart /> },
  { name: "Sad", icon: <Frown /> },
  { name: "Focus", icon: <GraduationCap /> },
];

const Home = ({ selectedMood, setSelectedMood, handleGeneratePlaylist }: any) => {
  return (

    <div className="overflow-hidden dark:bg-[#121212]  ">
      <Toaster />
      <div id="canvas-container" />
      <div className="absolute z-50 blob blob-1" />
      <div className="absolute z-50 blob blob-2" />

      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <MoodSelector selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        handleGeneratePlaylist={handleGeneratePlaylist} />
      <Testimonials />
      <CTABtn />
      <Footer />
    </div>

  );
};

export default Home;
