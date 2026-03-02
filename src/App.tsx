import { useState, useEffect, useCallback, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Terminal from './components/Terminal';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { useTheme } from './hooks/useTheme';

type Page = 'home' | 'about' | 'skills';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transitionState, setTransitionState] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pendingPageRef = useRef<Page | null>(null);

  const handleLoadingComplete = useCallback(() => {
    setShowLoader(false);
    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  // Terminal toggle with backtick key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Don't toggle if user is typing in an input/textarea
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePageChange = (page: Page) => {
    if (page === currentPage || transitionState !== 'idle') return;

    pendingPageRef.current = page;

    // Phase 1: Zoom out (GTA V pull-away)
    setTransitionState('exit');

    setTimeout(() => {
      // Phase 2: Swap page at peak zoom-out
      setCurrentPage(page);
      window.scrollTo({ top: 0 });
      setTransitionState('enter');

      // Phase 3: Zoom back in (GTA V drop-in)
      setTimeout(() => {
        setTransitionState('idle');
        pendingPageRef.current = null;
      }, 700);
    }, 500);
  };

  // Build GTA V transition classes
  const getPageClasses = () => {
    if (transitionState === 'exit') return 'gta-zoom-out';
    if (transitionState === 'enter') return 'gta-zoom-in';
    return 'gta-idle';
  };

  return (
    <>
      {/* Loading Screen */}
      {showLoader && <LoadingScreen onComplete={handleLoadingComplete} />}

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
              <button
                onClick={() => handlePageChange('skills')}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-500 ${currentPage === 'skills'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Skills
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 group"
              aria-label="Toggle dark mode"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Sun className={`w-4.5 h-4.5 absolute transition-all duration-500 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
              <Moon className={`w-4.5 h-4.5 absolute transition-all duration-500 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`min-h-screen bg-white transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Page Content */}
        <main className="pt-20 overflow-hidden">
          <div
            key={currentPage}
            className={`page-transition ${getPageClasses()}`}
          >
            {currentPage === 'home' && <Home />}
            {currentPage === 'about' && <About />}
            {currentPage === 'skills' && <Skills />}
          </div>
        </main>
      </div>

      {/* Terminal Easter Egg */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Terminal Hint - bottom right */}
      <button
        onClick={() => setTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-[9998] group flex items-center gap-2 px-3 py-2 bg-gray-900 text-gray-400 rounded-full text-xs font-mono hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-60 hover:opacity-100"
        title="Open terminal"
      >
        <span className="text-emerald-400">$</span>
        <span className="hidden sm:inline">Press ` for terminal</span>
        <span className="sm:hidden">Terminal</span>
      </button>

      {/* Custom Cursor */}
      <CustomCursor />
    </>
  );
}

export default App;
