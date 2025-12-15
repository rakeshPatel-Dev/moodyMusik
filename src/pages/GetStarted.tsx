import { motion } from "framer-motion";
import { Music2, Camera } from "lucide-react";
import toast from "react-hot-toast";

import { Heart, Smile, Zap, Frown, GraduationCap } from "lucide-react";
import Header from "../components/sections/Header";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12 }
  })
};

const moods = [
  { name: "Energetic", icon: <Zap /> },
  { name: "Chill", icon: <Smile /> },
  { name: "Romantic", icon: <Heart /> },
  { name: "Sad", icon: <Frown /> },
  { name: "Focus", icon: <GraduationCap /> },
];

interface GetStartedProps {
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  handleGeneratePlaylist: () => void;
}

const GetStarted = ({
  selectedMood,
  setSelectedMood,
  handleGeneratePlaylist,
}: GetStartedProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 h-72 w-72 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 bg-blue-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col"
      >
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white"
          >
            How are you feeling today?
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-4 text-gray-600 dark:text-gray-400 text-center"
          >
            Choose a mood and let us do the magic
          </motion.p>

          {/* Mood selector */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12"
          >
            {moods.map((mood) => {
              const active = selectedMood === mood.name;
              return (
                <button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood.name)}
                  className={`h-36 w-36 rounded-full flex flex-col items-center justify-center
                    transition border
                    ${active
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                    }`}
                >
                  <span className="text-3xl">{mood.icon}</span>
                  <span className="mt-2 font-semibold">{mood.name}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Actions */}
          <motion.button
            onClick={handleGeneratePlaylist}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 w-full max-w-xs h-12 rounded-full
                       bg-purple-600 text-white font-bold"
          >
            Generate Playlist
          </motion.button>

          <button
            onClick={() => toast("Camera mood detection coming soon")}
            className="mt-6 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Camera size={18} />
            Use camera for AI mood detection
          </button>
        </main>
      </motion.div>
    </div>
  );
};

export default GetStarted;
