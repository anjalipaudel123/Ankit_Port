import { useState, useEffect } from 'react';
import Home from './sections/Home';
import About from './sections/About';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Enhanced load animation with stagger
    setTimeout(() => setIsLoaded(true), 150);
  }, []);

  const handlePageChange = (page: 'home' | 'about') => {
    if (page === currentPage) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  return (
    <>
      {/* Navigation - outside main wrapper to prevent transform breaking fixed positioning */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-900/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => handlePageChange('home')}
              className="group relative"
            >
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                  Ankit Paudel
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  IAM Intern | ML Engineer | Backend Dev
                </span>
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-out" />
            </button>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-gray-100/80 backdrop-blur-sm rounded-full">
              <button
                onClick={() => handlePageChange('home')}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-500 ${currentPage === 'home'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Work
              </button>
              <button
                onClick={() => handlePageChange('about')}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-500 ${currentPage === 'about'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                About
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Page Content */}
        <main className="pt-20">
          <div
            key={currentPage}
            className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            {currentPage === 'home' ? <Home /> : <About />}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
