"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music2, Camera, Heart, Smile, Zap, Frown, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export const moods = [
  { name: "Energetic", icon: <Zap /> },
  { name: "Chill", icon: <Smile /> },
  { name: "Romantic", icon: <Heart /> },
  { name: "Sad", icon: <Frown /> },
  { name: "Focus", icon: <GraduationCap /> },
];

const Home = ({ selectedMood, setSelectedMood, handleGeneratePlaylist }: any) => {
  return (
    <div className="h-screen w-full overflow-hidden">
        <div className="bg-orange-400/30 animation-spin h-70 w-84 rounded-full absolute top-0 left-0"></div>
        <div className="bg-blue-600/10 h-60 w-60 animate-pulse rounded-full absolute top-1/4  left-3/5">
        </div>
        <div className="bg-blue-600/10 h-60 w-60 animate-pulse rounded-full absolute top-3/5 left-1/4">
        </div>

        <div className="bg-orange-400/30 animation-pulse h-70 w-80 rounded-full absolute bottom-0 right-0"></div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="transition-all duration-1000 font-display backdrop-blur-3xl text-gray-800 dark:text-white overflow-hidden min-h-screen flex flex-col"
    >
      <header className="flex items-center justify-between px-4 md:px-10 lg:px-40 py-3">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-blue-800 dark:text-white"
         >
          <Music2 size={30} className="text-blue-900" />
          <h2 className="text-2xl sm:5xl font-bold tracking-tight">moodyMusik</h2>
        </motion.div>
        <motion.div
         initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        className="bg-white/10 px-6 hover:bg-white/20 transition-all cursor-pointer py-2 rounded-full text-md" onClick={()=> {
            toast("We are working on it.", {icon: "🥸"})
        }}>
            <h1>Login</h1>
        </motion.div>
      </header>

      <main className="flex flex-col items-center flex-1 py-10 md:py-16 px-4">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-gray-900 dark:text-white text-3xl sm:5xl md:text-7xl font-bold text-center pb-3 pt-6"
        >
          How are you feeling today?
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-gray-600 dark:text-gray-300 text-base sm:text-xl font-mono text-center pb-8 md:pb-12"
        >
          Select a mood below to generate your personalized playlist.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 p-4 w-full max-w-4xl"
        >
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.name;
            return (
              <motion.div
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`flex flex-col items-center justify-center gap-3 rounded-full h-40 w-40 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 active:translate-y-0 hover:-translate-y-2 ${
                  isSelected
                    ? "border-[#7f13ec]  shadow-lg shadow-[#7f13ec]/20"
                    : "border-gray-200 backdrop-blur-3xl dark:border-[#4d3267] bg-white/5 iconShadow border  hover:bg-white/10"
                }`}
              >
                {mood.icon}
                <h2 className="text-gray-900 dark:text-white text-lg font-bold">{mood.name}</h2>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex px-4 py-8 md:py-12 justify-center w-full"
        >
          <motion.button
            onClick={handleGeneratePlaylist}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-xs h-12 px-6 rounded-full bg-[#7f13ec] text-white font-bold text-base shadow-lg shadow-[#7f13ec]/30 hover:bg-[#7f13ec]/90 transition-all"
          >
            Generate Playlist
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex px-4 py-3 justify-center"
          onClick={() => {
            toast("Camera isn't available RN!", { icon: "🫠" });
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 h-10 px-4 rounded-full text-gray-500 dark:text-gray-400 text-sm font-bold hover:text-[#7f13ec] dark:hover:text-white transition-colors"
          >
            <Camera className="w-5 h-5" />
            Use Camera for AI Mood Detection
          </motion.button>
        </motion.div>
      </main>
    </motion.div>
        </div>

  );
};

export default Home;
