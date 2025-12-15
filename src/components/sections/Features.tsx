import { Brain, Music, Rocket } from "lucide-react";

const features = [
  {
    title: "Mood Detection",
    description:
      "Our advanced algorithm analyzes your mood through your choices and creates the perfect soundtrack.",
    icon: Brain,
  },
  {
    title: "Curated Playlists",
    description:
      "Get access to thousands of expertly curated songs that perfectly match every emotional state.",
    icon: Music,
  },
  {
    title: "Smart Learning",
    description:
      "The more you use MoodyMusik, the better it gets at predicting what music will enhance your mood.",
    icon: Rocket,
  },
];

const Features = () => {
  return (
    <section className="  py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="heading text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Why Choose <span className="gradient-text">MoodyMusik</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="p-8 rounded-2xl transition-all duration-300
                         bg-white dark:bg-neutral-900
                         shadow-lg dark:shadow-black/40
                         hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-16 h-16 mb-6 gradient-bg rounded-2xl flex items-center justify-center text-white">
                <Icon size={28} />
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
