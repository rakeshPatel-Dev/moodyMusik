"use client";

import { useState } from "react";
import Home from "./pages/Home";
import ShowPlaylist from "./pages/ShowPlaylist";
import toast, { Toaster } from "react-hot-toast";
import { fetchPlaylist } from "./utils/fetchPlaylist";
import { Route, Routes } from "react-router-dom";
import GetStarted from "./pages/GetStarted";

const App = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;


  const handleGeneratePlaylist = async () => {
    if (!selectedMood) return toast.error("Select your mood first!!");

    toast.success("Loading your playlist...");
    const data = await fetchPlaylist(selectedMood, API_KEY);

    if (!data.length) return toast.error("No playable videos found 😕");

    setPlaylists(data);
    setShowPlaylist(true);
  };

  if (showPlaylist) {
    return (
      <>
        <ShowPlaylist playlists={playlists} mood={selectedMood} API_KEY={API_KEY} />
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <div className="overflow-hidden">
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          handleGeneratePlaylist={handleGeneratePlaylist}
        />} />
        <Route path="get-started" element={<GetStarted
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          handleGeneratePlaylist={handleGeneratePlaylist}
        />} />
      </Routes>
    </div>
  );
};

export default App;
