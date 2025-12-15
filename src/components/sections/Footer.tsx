import WaveBar from '../ui/WaveBar'

const Footer = () => {
  return (
    <div>
      <footer className="dark:text-white py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-end space-x-2">
                <WaveBar />
                <span className="heading text-2xl font-bold gradient-text">
                  MoodyMusik
                </span>
              </div>
              <p className="text-gray-400 mt-4 max-w-xs">
                Personalized playlists based on your mood, making your music
                experience more intuitive than ever.
              </p>
              <div className="flex space-x-4 mt-6">
                <a title='link' href="#" className="text-gray-400 hover:text-white transition">
                  <i className="fab fa-facebook-f" />
                </a>
                <a title='link' href="#" className="text-gray-400 hover:text-white transition">
                  <i className="fab fa-twitter" />
                </a>
                <a title='link' href="#" className="text-gray-400 hover:text-white transition">
                  <i className="fab fa-instagram" />
                </a>
                <a title='link' href="#" className="text-gray-400 hover:text-white transition">
                  <i className="fab fa-spotify" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Features</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Mood Detection
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Playlist Creation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Music Discovery
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Smart Learning
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 MoodyMusik. All rights reserved.
            </p>
            <div>
              <h1 className='text-gray-400'>Created by: <a className='underline' target='_blank' rel='noopener' href="https://rakeshthedev.vercel.app/">Rakesh Patel</a></h1>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer
