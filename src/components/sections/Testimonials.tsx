import { Star, StarHalf } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    text:
      "MoodyMusik has completely changed how I listen to music. The mood detection is spot on, and the playlists always match exactly how I'm feeling.",
  },
  {
    name: "Sarah Miller",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    text:
      "I've discovered so many new artists through MoodyMusik. The playlists are perfectly curated and really help enhance whatever mood I'm in.",
  },
  {
    name: "Michael Chen",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    text:
      "As a music producer, I'm impressed with the algorithm. It understands nuanced moods and creates cohesive playlists that flow perfectly together.",
  },
];

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
      {halfStar && <StarHalf size={16} fill="currentColor" />}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
      <h2 className="heading text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
        What Our <span className="gradient-text">Users Say</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="p-8 rounded-2xl transition-all duration-300
                       bg-white dark:bg-neutral-900
                       shadow-lg dark:shadow-black/40
                       hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h4>
                <RatingStars rating={item.rating} />
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              “{item.text}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
