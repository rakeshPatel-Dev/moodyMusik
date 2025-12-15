import { Heart, Smile, Zap, Frown, GraduationCap } from "lucide-react";
import { useMoodAnimations } from "../../hooks/useMoodAnimations";


const moods = [
  { name: "Energetic", icon: <Zap />, desc: "Upbeat tunes to keep your spirits high" },
  { name: "Chill", icon: <Smile />, desc: "Relaxed and ambient sounds for unwinding" },
  { name: "Romantic", icon: <Heart />, desc: "Love-filled tunes for special moments" },
  { name: "Sad", icon: <Frown />, desc: "Emotional melodies for reflective moments" },
  { name: "Focus", icon: <GraduationCap />, desc: "Concentration-enhancing tracks for productivity" },
];

const MoodSelector = ({ selectedMood, setSelectedMood, handleGeneratePlaylist }: any) => {
  const moodGradient = useMoodAnimations(selectedMood);
  return (
    <section id="moods" className="py-16 md:py-24"
      style={{
        background: `radial-gradient(circle at top, ${moodGradient}, transparent 70%)`,
      }}>
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="heading text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          What's Your <span className="gradient-text">Mood</span> Today?
        </h2>

        <p className="text-center max-w-2xl mx-auto mb-16 text-gray-600 dark:text-gray-300">
          Select your current mood and let us create the perfect playlist to match
          or enhance how you're feeling.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.name;

            return (
              <div
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                style={
                  isSelected
                    ? {
                      background: moodGradient,
                    }
                    : undefined
                }
                className={`p-6 rounded-2xl text-center cursor-pointer transition-all duration-500
    ${isSelected
                    ? "text-white shadow-xl scale-[1.03]"
                    : "bg-white dark:bg-neutral-900 hover:shadow-lg dark:hover:bg-white/5"
                  }`}
              >

                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-500
    ${isSelected ? "text-white" : "bg-yellow-100 text-yellow-600 dark:bg-white/10 dark:text-purple-300"}
  `}
                  style={isSelected ? { background: moodGradient } : undefined}
                >
                  <span className="text-3xl">{mood.icon}</span>
                </div>


                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  {mood.name}
                </h3>

                <p className="text-sm dark:text-white">
                  {mood.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={handleGeneratePlaylist}
            className="btn-primary py-3 px-8 rounded-full text-white font-bold"
          >
            Generate My Playlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default MoodSelector;
