import { ChevronLeft, ChevronRight, Edit, ListEnd, RotateCcw } from "lucide-react";
// import React, {useState} from "react";


interface PlayVideoProps {
  videos: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  goBackToPlaylist: () => void;
  changeMood: () => void;
}

const PlayVideo: React.FC<PlayVideoProps> = ({
  
  videos,
  currentIndex,
  setCurrentIndex,
  goBackToPlaylist,
  changeMood,
}) => {
  const video = videos[currentIndex];

  const nextVideo = () => setCurrentIndex((currentIndex + 1) % videos.length);
  const prevVideo = () =>
    setCurrentIndex((currentIndex - 1 + videos.length) % videos.length);


  return (
    <div className="min-h-screen bg-[#0d0714]">
      <div className="flex flex-col items-center py-10 px-4 max-w-6xl mx-auto">
        <h1 className="text-white text-center text-xl sm:text-3xl font-bold mb-4">{video.snippet.title}</h1>
        <p className="text-white/70 mb-6">{video.snippet.channelTitle}</p>

        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
          title={video.snippet.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="rounded-lg mb-6 sm:px-20"
        />

        <div className="flex gap-4 mb-6">
          <button
            onClick={prevVideo}
            className="px-4 py-2 cursor-pointer active:scale-95 transition-all flex flow-row gap-2 bg-[#7f13ec] text-white rounded-full hover:bg-[#6a0ec7]"
          >
            <ChevronLeft/> Previous
          </button>
          <button
            onClick={nextVideo}
            className="px-4 py-2 cursor-pointer active:scale-95 transition-all flex flex-row gap-2 bg-[#7f13ec] text-white rounded-full hover:bg-[#6a0ec7]"
          >
           Next<ChevronRight/> 
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={goBackToPlaylist}
            className="px-4 py-2 cursor-pointer active:scale-95 transition-all flex flex-row gap-2 bg-white/10 text-white rounded-full hover:bg-white/20"
          >
           <ListEnd/> Back to Playlist
          </button>
          <button
            onClick={changeMood}
            className="px-4 py-2 cursor-pointer active:scale-95 transition-all flex flow-row gap-2 bg-white/10 text-white rounded-full hover:bg-white/20"
          >
            <RotateCcw/>Change Mood
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
