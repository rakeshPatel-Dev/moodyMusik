"use client";

import React, { useState, useEffect, useRef } from "react";
import PlayVideo from "./PlayVideo";
import { ListPlus, Play, RotateCcw, Shuffle, SquarePen } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface ShowPlaylistProps {
  mood: string;
  playlists: any[];
}

const ShowPlaylist: React.FC<ShowPlaylistProps> = ({ mood, playlists }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [selectedMood, setSelectedMood] = useState<string>(mood);
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
    <div className="min-h-screen bg-[#0d0714]">
      <Toaster position="top-right" reverseOrder={false} />
      <main className="mt-8 px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-4 p-4">
          <p className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em] min-w-72">
            Your {selectedMood} Playlist
          </p>

          {/* Language Filter & Mood selector */}
          <div className="flex flex-wrap gap-3 px-2">
            <div className="flex text-sm sm:text-md flex-wrap gap-3">
              {["All", "English", "Hindi", "Nepali"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguageFilter(lang)}
                  className={`px-6 py-2 cursor-pointer rounded-full font-bold transition ${languageFilter === lang
                    ? "bg-[#7f13ec] text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="w-full md:w-fit">
              <button
                onClick={() => window.location.reload()}
                className="px-6 flex flex-row text-sm sm:text-md items-center justify-center gap-2 py-3 h-12 cursor-pointer rounded-full font-bold bg-white/10 text-white hover:bg-white/20 transition"
              >
                <RotateCcw/>
                Change Mood
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-stretch my-6">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
            <button
              onClick={handlePlayAll}
              className="flex cursor-pointer hover:scale-105 active:scale-95 items-center justify-center gap-2 rounded-full h-12 px-5 bg-[#7f13ec] text-white font-bold hover:bg-[#6a0ec7] transition"
            >
              <Play />
              <span>Play All</span>
            </button>
            <button
              onClick={handleSave}
              className="flex cursor-pointer hover:scale-105 active:scale-95 items-center justify-center gap-2 rounded-full h-12 px-5 bg-white/10 text-white font-bold hover:bg-white/20 transition"
            >
              <ListPlus />
              <span>Save Playlist</span>
            </button>
            <button
              onClick={() =>
                setShuffledPlaylists((prev) => [...prev].sort(() => Math.random() - 0.5))
              }
              className="flex cursor-pointer hover:scale-105 active:scale-95 items-center justify-center gap-2 rounded-full h-12 px-5 bg-white/10 text-white font-bold hover:bg-white/20 transition"
            >
              <Shuffle /> <span>Shuffle</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-between items-center gap-2 mb-4 px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white outline-none transition-all">
          <input
            type="text"
            placeholder="Can't find what you want? Search here ..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="min-w-4/5 outline-none "
            />
            {loading && (
              <span className="text-white flex flex-row  font-bold px-2 animate-pulse">... loading 🥴🥸</span>
            )}
        </div>

        {/* Playlist Items */}
        <div className="flex flex-col gap-2">
          {listToShow.map((video, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-4 min-h-[72px] py-2 justify-between rounded hover:bg-white/10 transition duration-300"
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center gap-4 w-full">
                <div
                  className="bg-center bg-cover rounded-lg size-14"
                  style={{
                    backgroundImage: `url(${video.snippet.thumbnails.default.url})`,
                  }}
                />
                <div className="flex flex-col justify-center flex-grow">
                  <p className="text-white text-base font-medium line-clamp-1">
                    {video.snippet.title}
                  </p>
                  <p className="text-[#ad92c9] text-sm line-clamp-2">
                    {video.snippet.channelTitle}
                  </p>
                </div>
                <button className="text-white/70 hover:text-white">
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
