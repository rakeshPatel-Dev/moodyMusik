import { useMemo } from "react";

export const useMoodAnimations = (mood: string) => {
  return useMemo(() => {
    switch (mood.toLowerCase()) {
      case "happy":
        return "linear-gradient(135deg, #ffe259 0%, #ffa751 100%)";
      case "sad":
        return "linear-gradient(135deg, #667db6 0%, #0082c8 50%, #667db6 100%)";
      case "calm":
        return "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)";
      case "energetic":
        return "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)";
      case "romantic":
        return "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)";
      default:
        return "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)";
    }
  }, [mood]);
};
