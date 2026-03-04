import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from './types';

interface InceptionCarouselProps {
    photos: Photo[];
    onPhotoClick: (index: number) => void;
}

// Number of visible "dream layers"
const VISIBLE_LAYERS = 5;

export function InceptionCarousel({ photos, onPhotoClick }: InceptionCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
    const autoplayRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const transitioningRef = useRef(false);

    const total = photos.length;

    const getWrappedIndex = (index: number) => ((index % total) + total) % total;

    const navigate = useCallback((dir: 'next' | 'prev') => {
        if (transitioningRef.current) return;
        transitioningRef.current = true;
        setDirection(dir);
        setIsTransitioning(true);

        setTimeout(() => {
            setActiveIndex(prev =>
                dir === 'next'
                    ? getWrappedIndex(prev + 1)
                    : getWrappedIndex(prev - 1)
            );
            setIsTransitioning(false);
            setDirection(null);
            transitioningRef.current = false;
        }, 600);
    }, [total]);

    // Autoplay — stable interval that doesn't reset on state changes
    useEffect(() => {
        autoplayRef.current = setInterval(() => navigate('next'), 4000);
        return () => clearInterval(autoplayRef.current);
    }, [navigate]);

    // Pause autoplay on hover
    const pauseAutoplay = () => clearInterval(autoplayRef.current);
    const resumeAutoplay = () => {
        clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => navigate('next'), 4000);
    };

    // Keyboard nav
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            // Only handle if carousel is somewhat visible
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (!inView) return;
            if (e.key === 'ArrowLeft') navigate('prev');
            if (e.key === 'ArrowRight') navigate('next');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [navigate]);

    // Build the visible layers
    const layers = [];
    for (let i = 0; i < VISIBLE_LAYERS; i++) {
        const photoIndex = getWrappedIndex(activeIndex + i);
        layers.push({ photo: photos[photoIndex], depth: i, photoIndex });
    }

    return (
        <section
            ref={containerRef}
            className="relative py-20 px-4 overflow-hidden"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
        >
            {/* Section title */}
            <div className="text-center mb-16 relative z-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-white/30 mb-3 font-mono">
                    Infinite Depth
                </p>
                <h2
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    The <span className="text-[#ff0000]">Inception</span> Reel
                </h2>
            </div>

            {/* Carousel container with deep perspective */}
            <div className="relative max-w-5xl mx-auto" style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}>
                <div className="relative w-full flex items-center justify-center" style={{ height: '480px' }}>
                    {layers.map(({ photo, depth, photoIndex }) => {
                        // Each layer recedes deeper: scale down, push back, fade
                        const depthFactor = depth;
                        const scale = 1 - depthFactor * 0.13;
                        const zTranslate = -depthFactor * 120;
                        const yOffset = -depthFactor * 8;
                        const opacity = depth === 0 ? 1 : Math.max(0.15, 1 - depthFactor * 0.22);
                        const blur = depth === 0 ? 0 : depth * 1.5;

                        // Transition offsets when navigating
                        let transitionExtra = '';
                        if (isTransitioning && direction === 'next') {
                            // Everything moves one layer forward (closer)
                            if (depth === 0) {
                                transitionExtra = 'inception-exit-front';
                            } else {
                                transitionExtra = 'inception-shift-forward';
                            }
                        } else if (isTransitioning && direction === 'prev') {
                            if (depth === 0) {
                                transitionExtra = 'inception-shift-back';
                            }
                        }

                        const isTop = depth === 0;

                        return (
                            <div
                                key={`${photo.id}-${depth}`}
                                className={`absolute inception-layer ${transitionExtra}`}
                                style={{
                                    transform: `translateZ(${zTranslate}px) translateY(${yOffset}px) scale(${scale})`,
                                    zIndex: VISIBLE_LAYERS - depth,
                                    opacity,
                                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                                    transition: isTransitioning
                                        ? 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease, filter 0.6s ease'
                                        : 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease, filter 0.6s ease',
                                    transformStyle: 'preserve-3d',
                                    width: 'clamp(280px, 55vw, 640px)',
                                    aspectRatio: '16/10',
                                }}
                            >
                                {/* Photo frame with subtle border glow */}
                                <div
                                    className={`relative w-full h-full rounded-xl overflow-hidden shadow-2xl
                                        ${isTop ? 'cursor-pointer ring-1 ring-gray-200 dark:ring-white/10' : 'ring-1 ring-gray-200 dark:ring-white/5'}
                                    `}
                                    onClick={() => isTop && !isTransitioning && onPhotoClick(photoIndex)}
                                    style={{
                                        boxShadow: isTop
                                            ? '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)'
                                            : '0 15px 40px rgba(0,0,0,0.6)',
                                    }}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.title}
                                        className="w-full h-full object-cover"
                                        draggable={false}
                                    />

                                    {/* Recursive frame overlay — subtle inner border to sell the "frame in frame" look */}
                                    {depth < 3 && (
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '12px',
                                                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
                                            }}
                                        />
                                    )}

                                    {/* Dark vignette for depth layers */}
                                    {depth > 0 && (
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${0.15 + depth * 0.1}) 100%)`,
                                            }}
                                        />
                                    )}

                                    {/* Info overlay on front card */}
                                    {isTop && (
                                        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                                            <h3
                                                className="text-lg md:text-xl font-semibold text-white mb-1"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {photo.title}
                                            </h3>
                                            <p className="text-white/50 text-sm line-clamp-1">{photo.description}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Reflection for front card */}
                                {isTop && (
                                    <div
                                        className="w-full mt-2 rounded-xl overflow-hidden pointer-events-none"
                                        style={{
                                            height: '60px',
                                            transform: 'scaleY(-1)',
                                            opacity: 0.08,
                                            maskImage: 'linear-gradient(to top, transparent, black)',
                                            WebkitMaskImage: 'linear-gradient(to top, transparent, black)',
                                        }}
                                    >
                                        <img src={photo.src} alt="" className="w-full h-full object-cover object-bottom" draggable={false} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Vanishing point glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(255,0,0,0.06) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        zIndex: 0,
                    }}
                />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12 relative z-10">
                <button
                    onClick={() => navigate('prev')}
                    disabled={isTransitioning}
                    className="group w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center
                               text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/5
                               transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed
                               hover:scale-110 active:scale-90"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                    {photos.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (isTransitioning || idx === activeIndex) return;
                                // Jump directly
                                setActiveIndex(idx);
                            }}
                            className={`rounded-full transition-all duration-500 ${idx === activeIndex
                                ? 'w-8 h-2 bg-[#ff0000]'
                                : 'w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => navigate('next')}
                    disabled={isTransitioning}
                    className="group w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center
                               text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/5
                               transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed
                               hover:scale-110 active:scale-90"
                >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            {/* Depth indicator text */}
            <div className="text-center mt-6">
                <p className="text-gray-400 dark:text-white/20 text-xs font-mono tracking-widest uppercase">
                    Layer {activeIndex + 1} / {total}
                </p>
            </div>
        </section>
    );
}
