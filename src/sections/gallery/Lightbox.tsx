import { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LightboxProps } from './types';
import { useLockBodyScroll } from '../../hooks/useScrollReveal';

export function Lightbox({ photos, currentIndex, isOpen, onClose, onNext, onPrev, onSelect }: LightboxProps) {
    useLockBodyScroll(isOpen);
    const [visible, setVisible] = useState(true);
    const [shownIndex, setShownIndex] = useState(currentIndex);
    const transitioning = useRef(false);

    // Preload adjacent images so they're ready instantly
    useEffect(() => {
        if (!isOpen) return;
        const preload = (i: number) => {
            if (i >= 0 && i < photos.length) {
                const img = new Image();
                img.src = photos[i].src;
            }
        };
        preload(currentIndex - 1);
        preload(currentIndex + 1);
    }, [currentIndex, isOpen, photos]);

    // When currentIndex changes (from any source), do a quick fade-swap
    useEffect(() => {
        if (shownIndex === currentIndex) return;
        if (transitioning.current) return;
        transitioning.current = true;
        setVisible(false); // fade out
        const t = setTimeout(() => {
            setShownIndex(currentIndex); // swap image while invisible
            setVisible(true); // fade in
            transitioning.current = false;
        }, 200);
        return () => { clearTimeout(t); transitioning.current = false; };
    }, [currentIndex, shownIndex]);

    // Reset when lightbox opens
    useEffect(() => {
        if (isOpen) {
            setShownIndex(currentIndex);
            setVisible(true);
            transitioning.current = false;
        }
    }, [isOpen, currentIndex]);

    const handleNav = useCallback((dir: 'next' | 'prev') => {
        if (transitioning.current) return;
        if (dir === 'next') onNext();
        else onPrev();
    }, [onNext, onPrev]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handleNav('prev');
        if (e.key === 'ArrowRight') handleNav('next');
    }, [isOpen, onClose, handleNav]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const currentPhoto = photos[shownIndex];
    if (!isOpen || !currentPhoto) return null;

    return createPortal(
        <div className="gallery-lightbox-backdrop gallery-fade-in" onClick={onClose}>
            <div className="absolute inset-0 bg-black/95" />

            {/* Close */}
            <button
                className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-90 gallery-rotate-in"
                style={{ animationDelay: '0.3s' }}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Prev */}
            <button
                className="absolute left-2 sm:left-6 bottom-[72px] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-90 gallery-slide-in-left"
                style={{ animationDelay: '0.25s' }}
                onClick={(e) => { e.stopPropagation(); handleNav('prev'); }}
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next */}
            <button
                className="absolute right-2 sm:right-6 bottom-[72px] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-90 gallery-slide-in-right"
                style={{ animationDelay: '0.25s' }}
                onClick={(e) => { e.stopPropagation(); handleNav('next'); }}
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Main image */}
            <div
                className="relative w-full sm:w-[90vw] h-[65vh] sm:h-[80vh] flex items-center justify-center px-14 sm:px-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative max-w-full max-h-full"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'scale(1)' : 'scale(0.97)',
                        transition: 'opacity 200ms ease, transform 200ms ease',
                    }}
                >
                    <img
                        src={currentPhoto.src}
                        alt={currentPhoto.title}
                        className="max-w-full max-h-[62vh] sm:max-h-[75vh] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            </div>

            {/* Info */}
            <div
                className="absolute bottom-16 sm:bottom-24 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 text-center"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 200ms ease',
                }}
            >
                <h3 className="text-lg sm:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentPhoto.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">{currentPhoto.description}</p>
            </div>

            {/* Counter */}
            <div
                className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 gallery-fade-in-up"
                style={{ animationDelay: '0.5s' }}
            >
                <span className="text-[#e10600] font-black font-mono text-sm">P{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-white/40 text-xs">/</span>
                <span className="text-white/50 text-xs font-mono">{String(photos.length).padStart(2, '0')}</span>
            </div>

            {/* Thumbnails — hidden on mobile to avoid clutter */}
            <div
                className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 hidden sm:flex gap-2 gallery-fade-in-up"
                style={{ animationDelay: '0.3s' }}
            >
                {photos.map((photo, index) => (
                    <button
                        key={photo.id}
                        onClick={(e) => { e.stopPropagation(); onSelect(index); }}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${index === currentIndex ? 'border-[#e10600] scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                            }`}
                    >
                        <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Mobile dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex sm:hidden gap-1.5 mt-1" style={{ marginTop: '1.5rem' }}>
                {photos.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); onSelect(index); }}
                        className={`rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-4 h-1.5 bg-[#e10600]'
                                : 'w-1.5 h-1.5 bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>,
        document.body
    );
}
