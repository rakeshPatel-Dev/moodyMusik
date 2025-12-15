import { Menu } from 'lucide-react'
import WaveBar from '../ui/WaveBar'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Header = () => {
  return (
    <div>
      <header className="container mx-auto py-6 px-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-end space-x-2">
            <WaveBar />
            <span className="heading text-xl md:text-2xl font-bold gradient-text">
              MoodyMusik
            </span>
          </div>
          <div className="hidden text-black dark:text-white  md:flex space-x-8 items-center">
            <Link to="/" className="font-medium hover:text-purple-600 transition">
              Home
            </Link>
            <a
              href="/#how-it-works"
              className="font-medium hover:text-purple-600 transition"
            >
              How It Works
            </a>
            <a href="/#moods" className="font-medium hover:text-purple-600 transition">
              Moods
            </a>
            <a href="/#" className="font-medium hover:text-purple-600 transition">
              About
            </a>
          </div>
          <div>
            <button
              onClick={() => {
                toast("Not available RN!")
              }}
              className="hidden md:block bg-white py-2 px-5 rounded-full shadow-md font-semibold text-purple-700 hover:shadow-lg transition">
              Sign In
            </button>
            <button title='menubar' className="md:hidden text-2xl">
              <Menu />
            </button>
          </div>
        </nav>
      </header>


    </div>
  )
}

export default Header
