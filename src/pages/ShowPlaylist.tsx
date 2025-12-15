"use client"

import React, { useState, useEffect, useRef } from "react";
import PlayVideo from "./PlayVideo";
import { ListPlus, Play, Shuffle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { moods } from "./Home";

interface ShowPlaylistProps {
  mood: string;
  playlists: any[];
}

const ShowPlaylist: React.FC<ShowPlaylistProps> = ({ mood, playlists }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [selectedMood] = useState<string>(mood);
  const [shuffledPlaylists, setShuffledPlaylists] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedVideos, setSearchedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchTimeout = useRef<any>(null);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  // 🔀 Shuffle logic
  useEffect(() => {
    if (playlists && playlists.length > 0) {
      const shuffled = [...playlists].sort(() => Math.random() - 0.5);
      setShuffledPlaylists(shuffled);
    }
  }, [playlists]);

  // ✅ Filter only embeddable videos
  const embeddableVideos = shuffledPlaylists.filter(
    (video) => video.status?.embeddable ?? true
  );

  // ✅ Language-based filtering
  const filteredVideos = embeddableVideos.filter((video) => {
    if (languageFilter === "All") return true;

    const title = video.snippet.title.toLowerCase();
    const channel = video.snippet.channelTitle.toLowerCase();

    if (languageFilter === "Hindi") return title.includes("hindi") || channel.includes("india");
    if (languageFilter === "Nepali") return title.includes("nepali") || channel.includes("nepal");
    if (languageFilter === "English")
      return !title.includes("hindi") && !title.includes("nepali") && !channel.includes("india") && !channel.includes("nepal");

    return true;
  });

  // Decide which list to show: searched results or regular playlist
  const listToShow = searchTerm ? searchedVideos : filteredVideos;

  // 🔍 Handle search input with debounce
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      if (value.trim() !== "") fetchSearchedSongs(value);
      else setSearchedVideos([]);
    }, 600);
  };

  // 🔍 Fetch searched songs from YouTube
  const fetchSearchedSongs = async (query: string) => {
    setLoading(true);
    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&videoDuration=medium&q=${query}+official+music+video&maxResults=30&videoEmbeddable=true&key=${API_KEY}`
      );
      const searchData = await searchResponse.json();

      if (!searchData.items?.length) {
        toast.error("No results found 😕");
        setSearchedVideos([]);
        return;
      }

      const videoIds = searchData.items.map((v: any) => v.id.videoId).join(",");
      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`
      );
      const videoData = await videoResponse.json();

      const videosWithDetails = searchData.items.map((item: any, index: number) => {
        const durationISO = videoData.items[index]?.contentDetails?.duration;
        const duration = formatYouTubeDuration(durationISO);

        const title = item.snippet.title.toLowerCase();
        let language = "English";
        if (title.match(/नेपाली|nepali|नेपाल|kathmandu/)) language = "Nepali";
        else if (title.match(/हिन्दी|hindi|bollywood|india|mumbai/)) language = "Hindi";

        return { ...item, duration, language };
      });

      setSearchedVideos(videosWithDetails);
    } catch (err) {
      toast.error("Search failed 😕");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAll = () => {
    listToShow.forEach((v: any) =>
      window.open(`https://www.youtube.com/watch?v=${v.id.videoId}`, "_blank")
    );
  };

  const handleSave = () => {
    localStorage.setItem(
      "savedPlaylist",
      JSON.stringify({ mood: selectedMood, playlists: listToShow })
    );
    toast.success("Playlist saved successfully! 🎵");
  };

  function formatYouTubeDuration(isoDuration: string) {
    if (!isoDuration) return "N/A";
    const match = isoDuration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = match?.[1] ? parseInt(match[1]) : 0;
    const seconds = match?.[2] ? parseInt(match[2]) : 0;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // ✅ PlayVideo conditional render
  if (currentIndex !== null) {
    return (
      <PlayVideo
        videos={listToShow}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        goBackToPlaylist={() => setCurrentIndex(null)}
        changeMood={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen dark:bg-[#0d0714]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-blue-800/20 h-96 w-96 blur-3xl fixed -translate-1/2 top-1/2 left-1/2"></div>
      <div className="bg-blue-800/20 h-40 w-40 blur-3xl fixed bottom-0 right-40"></div>
      {/* STAR / DOT BACKGROUND */}
      <div className="fixed h-full w-ful inset-0 pointer-events-none">

        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-black/50 dark:bg-white/50 rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.9 + 0.1,
              filter: "blur(1px)",
              animation: `float ${Math.random() * 8 + 6}s infinite ease-in-out`,
              transformOrigin: `${Math.random() * 100}% ${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <main className="py-4 px-4 max-w-7xl mx-auto sm:px-6 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-6 md:px-10 py-3 backdrop-blur-sm rounded-full">
          <div className="flex items-center gap-4 dark:text-white">
            <div className="size-6 text-primary">
              {moods.find((m) => m.name === selectedMood)?.icon}
            </div>
            <h2 className="dark:text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em]">Feeling {selectedMood}</h2>
          </div>
          <button onClick={() => window.location.reload()} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black/10 dark:bg-white/10 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-neutral-500/50 active:scale-95 transition-colors">
            <span className="truncate">New Mood</span>
          </button>
        </div>
        {/* Search Bar */}
        <div className="w-full  flex flex-col justify-center items-center gap-2 px-6 pb-10 dark:text-white outline-none transition-all relative">
          <input
            type="text"
            placeholder="Can't find what you want? Search here ..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="rounded-full w-full sm:w-3/4 md:w-2/3 lg:w-1/2 dark:bg-white/5 bg-black/5 focus:bg-black/4 dark:focus:bg-white/4 px-6 py-4 backdrop-blur-2xl focus:ring-2 ring-purple-950 border border-neutral-500/20 outline-none "
          />
          {loading && (
            <span className=" font-mono dark:text-white flex flex-row  font-bold px-2 animate-pulse absolute bottom-0"> loading UR Choice... 🥴🥸</span>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex justify-stretch my-6">

          {/* Language Filter & Mood selector */}
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
            <div className="flex flex-wrap gap-3 p-2 border-b sm:border-0 border-gray-400/20">
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {["All", "English", "Hindi", "Nepali"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguageFilter(lang)}
                    className={`px-6 py-2 cursor-pointer rounded-full font-bold transition ${languageFilter === lang
                      ? "bg-[#7f13ec] dark:text-white"
                      : " bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            {/* Actions btns  */}
            <div className="flex flex-row gap-2">
              <button
                onClick={handlePlayAll}
                className="flex cursor-pointer hover:scale-105 active:scale-95 items-center justify-center gap-2 rounded-full h-12 px-5 bg-[#7f13ec] dark:text-white font-bold hover:bg-[#6a0ec7] transition"
              >
                <Play />
                <span>Play All</span>
              </button>
              <button
                title="Suffle"
                onClick={() =>
                  setShuffledPlaylists((prev) => [...prev].sort(() => Math.random() - 0.5))
                }
                className="flex cursor-pointer hover:scale-105 active:scale-95 items-center justify-center gap-2 rounded-full h-12 px-6 dark:bg-white/10 bg-black/10 dark:text-white font-bold dark:hover:bg-white/20  transition"
              >
                <Shuffle />
              </button>
              <button
                title="Save"
                onClick={handleSave}
                className="flex cursor-pointer hover:scale-105 active:scale-95 items-center justify-center rounded-full h-12 px-6 dark:bg-white/10 bg-black/10 dark:text-white font-bold dark:hover:bg-white/20 transition"
              >
                <ListPlus />
              </button>
            </div>
          </div>
        </div>
        {/* Playlist Items */}
        <div className="flex flex-col gap-2 px-4">
          {listToShow.map((video, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-black/5 dark:bg-white/5  backdrop-blur-2xl px-4 min-h-[72px] py-2 justify-between rounded-2xl dark:hover:bg-white/10 border dark:border-white/20 border-black/20 cursor-pointer hover:scale-105 transition duration-300"
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center gap-4 w-full">
                <div
                  className="bg-center bg-cover rounded-lg size-14"
                  style={{
                    backgroundImage: `url(${video.snippet.thumbnails.default.url})`,
                  }}
                />
                <div className="flex flex-col justify-center grow">
                  <p className="dark:text-white text-base font-medium line-clamp-1">
                    {video.snippet.title}
                  </p>
                  <p className="text-[#7f4fb3] text-sm line-clamp-2">
                    {video.snippet.channelTitle}
                  </p>
                </div>
                <button className="dark:text-white/70 dark:hover:text-white">
                  {video.duration || "⏱️"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowPlaylist;
