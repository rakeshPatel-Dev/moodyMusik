import { Menu, X } from "lucide-react";
import WaveBar from "../ui/WaveBar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="container mx-auto py-6 px-4 relative z-50">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-end space-x-2">
          <WaveBar />
          <span className="heading text-xl md:text-2xl font-bold gradient-text">
            MoodyMusik
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-black dark:text-white">
          <Link to="/" className="font-medium hover:text-purple-600 transition">
            Home
          </Link>
          <a href="/#how-it-works" className="font-medium hover:text-purple-600 transition">
            How It Works
          </a>
          <a href="/#moods" className="font-medium hover:text-purple-600 transition">
            Moods
          </a>
          <Link to="/my-playlists" className="font-medium hover:text-purple-600 transition">
            My Playlists
          </Link>

        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast("Not available RN!")}
            className="hidden md:block bg-white py-2 px-5 rounded-full shadow-md font-semibold text-purple-700 hover:shadow-lg transition"
          >
            Sign In
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black dark:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-neutral-900 shadow-xl rounded-2xl mt-4 p-6 flex flex-col gap-4 text-black dark:text-white">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-medium hover:text-purple-600 transition"
          >
            Home
          </Link>

          <a
            href="/#how-it-works"
            onClick={() => setIsOpen(false)}
            className="font-medium hover:text-purple-600 transition"
          >
            How It Works
          </a>

          <a
            href="/#moods"
            onClick={() => setIsOpen(false)}
            className="font-medium hover:text-purple-600 transition"
          >
            Moods
          </a>

          <a
            href="/#"
            onClick={() => setIsOpen(false)}
            className="font-medium hover:text-purple-600 transition"
          >
            About
          </a>

          <button
            onClick={() => {
              toast("Not available RN!");
              setIsOpen(false);
            }}
            className="mt-2 bg-purple-600 text-white py-2 rounded-full font-semibold"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
