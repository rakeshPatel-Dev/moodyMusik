import { Pause, SkipBack, SkipForward, StepForward } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "../ui/FadeUpAnimation";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="container overflow-hidden mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="heading text-4xl md:text-7xl text-center sm:text-left font-extrabold mb-6 leading-tight text-gray-900 dark:text-white"
          >
            Music that matches your{" "}
            <span className="gradient-text">mood</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-lg mb-8 text-center sm:text-left text-gray-600 dark:text-gray-300"
          >
            MoodyMusik creates personalized playlists based on how you're
            feeling. Let your emotions guide your music discovery journey.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() => navigate("/get-started")}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="btn-primary py-3 px-8 rounded-full text-white font-bold"
            >
              Get Started
            </motion.button>

            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-2 py-3 px-8 rounded-full font-bold transition
                         bg-white text-purple-700 shadow-md hover:shadow-lg
                         dark:bg-white/10 dark:text-purple-300 dark:hover:bg-white/20"
            >
              <a href="#moods" className="flex items-center gap-2">
                <StepForward /> See how it works
              </a>
            </motion.button>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="rounded-3xl overflow-hidden shadow-2xl
                         bg-white dark:bg-neutral-900"
            >
              <div className="gradient-bg p-6 text-white">
                <h3 className="text-xl font-bold mb-1">
                  Currently Playing
                </h3>
                <p className="opacity-80">
                  Based on your “Energetic” mood
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&q=80"
                      className="w-full h-full object-cover"
                      alt="Album cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                      Higher Power
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Coldplay
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full h-1 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <div
                      className="gradient-bg h-full rounded-full"
                      style={{ width: "65%" }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-1 text-gray-500 dark:text-gray-400">
                    <span>2:14</span>
                    <span>3:30</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button title="Button" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition">
                    <SkipBack />
                  </button>

                  <button title="Button" className="gradient-bg w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg pulsing-animation">
                    <Pause strokeWidth={3} />
                  </button>

                  <button title="Button" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition">
                    <SkipForward />
                  </button>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    {
                      title: "Don't Stop Me Now",
                      artist: "Queen",
                      time: "3:29",
                      img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=100&q=80"
                    },
                    {
                      title: "Blinding Lights",
                      artist: "The Weeknd",
                      time: "3:20",
                      img: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?auto=format&fit=crop&w=100&q=80"
                    }
                  ].map((song) => (
                    <div
                      key={song.title}
                      className="flex items-center p-3 rounded-xl
                                 bg-gray-50 dark:bg-white/5"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 shrink-0">
                        <img
                          src={song.img}
                          className="w-full h-full object-cover"
                          alt="Album"
                        />
                      </div>
                      <div className="grow">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {song.title}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {song.artist}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {song.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
