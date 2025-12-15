const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24"
    >
      <h2 className="heading text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
        How <span className="gradient-text">MoodyMusik</span> Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            step: "1",
            title: "Select Your Mood",
            desc: "Choose from a variety of moods or let our AI detect how you're feeling.",
          },
          {
            step: "2",
            title: "Customize Preferences",
            desc: "Fine-tune your music preferences by genre, tempo, or artist.",
          },
          {
            step: "3",
            title: "Generate Playlist",
            desc: "Our algorithm creates a personalized playlist based on your inputs.",
          },
          {
            step: "4",
            title: "Enjoy & Share",
            desc: "Listen to your perfect mood-based playlist and share it with friends.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="flex flex-col items-center text-center p-6 rounded-2xl
                       bg-white dark:bg-neutral-900
                       shadow-md dark:shadow-black/40
                       transition hover:shadow-lg"
          >
            <div className="w-20 h-20 mb-6 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold">
              {item.step}
            </div>

            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {item.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
