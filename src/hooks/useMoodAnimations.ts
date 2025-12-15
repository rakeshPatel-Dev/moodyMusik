import { useMemo } from "react";

export const useMoodAnimations = (mood: string) => {
  return useMemo(() => {
    switch (mood.toLowerCase()) {
      case "energetic":
        // Warm, confident, not childish
        return "linear-gradient(135deg, #f4a261 0%, #e76f51 50%, #9b2226 100%)";

      case "chill":
        // Calm, glassy, spa-like
        return "linear-gradient(135deg, #a1c4fd 0%, #3157b3 40%, #6ba4d9 100%)";

      case "romantic":
        // Soft luxury pink, not Valentine cringe
        return "linear-gradient(135deg, #fbc2eb 0%, #a18cd1 50%, #5f4b8b 100%)";

      case "sad":
        // Moody, cinematic blue
        return "linear-gradient(135deg, #2c3e50 0%, #4ca1af 50%, #2c3e50 100%)";

      case "focus":
        // Intelligent, techy, disciplined
        return "linear-gradient(135deg, #1f4037 0%, #3a7d44 50%, #99f2c8 100%)";

      default:
        // Neutral premium fallback
        return "linear-gradient(135deg, #232526 0%, #414345 100%)";
    }
  }, [mood]);
};
