"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music2, Camera, Heart, Smile, Zap, Frown, GraduationCap } from "lucide-react";
import ShowPlaylist from "./pages/ShowPlaylist";
import toast, { Toaster } from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const moods = [
  { name: "Energetic", icon: <Zap /> },
  { name: "Chill", icon: <Smile /> },
  { name: "Romantic", icon: <Heart /> },
  { name: "Sad", icon: <Frown /> },
  { name: "Focus", icon: <GraduationCap /> },
];

const App = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const [background, setBackground] = useState(
    "linear-gradient(to bottom right, #140423, #2c1a3f)"
  );

  const handleGeneratePlaylist = async () => {
    if (!selectedMood) return toast.error("Select your mood first!!");
    toast.success("Loading your playlist!!");
    setLoading(true);

    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&videoDuration=medium&q=${selectedMood}+official+music+video&maxResults=50&videoEmbeddable=true&key=${API_KEY}`
      );

      const searchData = await searchResponse.json();
      if (!searchData.items || searchData.items.length === 0) {
        toast.error("No playable videos found 😕");
        return;
      }

      // Extract all video IDs
      const videoIds = searchData.items.map((v: any) => v.id.videoId).join(",");

      // Fetch duration info
      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`
      );
      const videoData = await videoResponse.json();

      // Merge duration info into original items
      const videosWithDetails = searchData.items.map((item: any, index: number) => {
        const durationISO = videoData.items[index]?.contentDetails?.duration;
        const duration = formatYouTubeDuration(durationISO);

        // Detect language from title
        const title = item.snippet.title.toLowerCase();
        let language = "English";
        if (title.match(/नेपाली|nepali|नेपाल|kathmandu/)) language = "Nepali";
        else if (title.match(/हिन्दी|hindi|bollywood|india|mumbai/)) language = "Hindi";

        return { ...item, duration, language };
      });

      setPlaylists(videosWithDetails);
      setShowPlaylist(true);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      toast.error("Failed to fetch Videos.");
    } finally {
      setLoading(false);
    }
  };

  function formatYouTubeDuration(isoDuration: string) {
    if (!isoDuration) return "N/A";
    const match = isoDuration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = match?.[1] ? parseInt(match[1]) : 0;
    const seconds = match?.[2] ? parseInt(match[2]) : 0;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (showPlaylist) {
    return (
      <ShowPlaylist
        playlists={playlists}
        mood={selectedMood}
        API_KEY={API_KEY} // pass API key for search
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="transition-all duration-1000 font-display text-gray-800 dark:text-white min-h-screen flex flex-col"
      style={{ background }}
    >
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-[#362348] px-4 md:px-10 lg:px-40 py-3">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-gray-900 dark:text-white"
        >
          <div className="h-20 rounded-full p-3 bg-white">

          <img className="h-full" src="/public/moodymusik logo.svg" alt="logo" />
          </div>
          <h2 className="text-5xl font-bold tracking-tight">moodyMusik</h2>
        </motion.div>
      </header>

      <main className="flex flex-col items-center flex-1 py-10 md:py-16 px-4">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold text-center pb-3 pt-6"
        >
          How are you feeling today?
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-gray-600 dark:text-gray-300 text-base text-center pb-8 md:pb-12"
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`flex flex-col items-center justify-center gap-3 rounded-lg p-4 aspect-square cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-[#7f13ec] dark:border-[#7f13ec] shadow-lg shadow-[#7f13ec]/20"
                    : "border-gray-200 dark:border-[#4d3267] bg-white dark:bg-[#261933]"
                }`}
              >
                {mood.icon}
                <h2 className="text-gray-900 dark:text-white text-base font-bold">{mood.name}</h2>
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
            {loading ? "Loading..." : "Generate Playlist"}
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

      <Toaster position="top-right" reverseOrder={false} />
    </motion.div>
  );
};

export default App;
