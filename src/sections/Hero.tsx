import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const starCount = 150;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.01,
    }));

    let time = 0;
    const animate = () => {
      time += 0.01;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient planet curve at bottom
      const gradient = ctx.createLinearGradient(0, canvas.height - 200, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0)');
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.3)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.6)');
      
      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2,
        canvas.height + 300,
        canvas.width * 0.8,
        400,
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw stars with twinkling effect
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.speed * 100) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setTimeout(() => setIsLoaded(true), 300);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('portfolio-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* Large Typography */}
        <div className="text-center">
          <h1 
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="block">ML ENGINEER</span>
          </h1>
          <h1 
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mt-2 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="block">&</span>
          </h1>
          <h1 
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mt-2 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="block">BACKEND DEV</span>
          </h1>
        </div>

        {/* 3D Avatar */}
        <div 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <img 
            src="/avatar-3d.png" 
            alt="Ankit Paudel" 
            className="w-64 sm:w-80 md:w-96 lg:w-[450px] h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 0 50px rgba(99, 102, 241, 0.5))',
            }}
          />
        </div>

        {/* Explore Button */}
        <button 
          onClick={scrollToProjects}
          className={`absolute bottom-8 right-8 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold tracking-wider rounded hover:bg-blue-700 transition-all duration-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          EXPLORE
        </button>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <span className="text-xs text-gray-400 tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
