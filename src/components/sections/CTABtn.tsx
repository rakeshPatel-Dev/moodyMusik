const CTABtn = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 z-1 skew-y-3 origin-top-right gradient-bg" />

      <div className="container relative z-2   mx-auto px-4">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12
                     bg-white dark:bg-neutral-900
                     shadow-2xl dark:shadow-black/50"
        >
          <div className="text-center mb-10">
            <h2 className="heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to discover music that matches your{" "}
              <span className="gradient-text">mood</span>?
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Sign up now and get personalized playlists based on your emotions.
              Free for the first 30 days!
            </p>
          </div>

          <form
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="grow py-3 px-6 rounded-full
                         bg-transparent
                         border border-gray-300 dark:border-neutral-700
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              className="btn-primary py-3 px-8 rounded-full font-bold text-white
                         transition hover:scale-[1.03]"
            >
              Start Free Trial
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTABtn;
