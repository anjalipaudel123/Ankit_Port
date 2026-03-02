import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LightboxProps } from './types';
import { useLockBodyScroll } from '../../hooks/useScrollReveal';

export function Lightbox({ photos, currentIndex, isOpen, onClose, onNext, onPrev, onSelect }: LightboxProps) {
    useLockBodyScroll(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayIndex, setDisplayIndex] = useState(currentIndex);

    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => { onNext(); setIsAnimating(false); }, 300);
    }, [isAnimating, onNext]);

    const handlePrev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => { onPrev(); setIsAnimating(false); }, 300);
    }, [isAnimating, onPrev]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    }, [isOpen, onClose, handlePrev, handleNext]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (currentIndex !== displayIndex && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => { setDisplayIndex(currentIndex); setIsAnimating(false); }, 300);
        }
    }, [currentIndex, displayIndex, isAnimating]);

    const currentPhoto = photos[displayIndex];
    if (!isOpen || !currentPhoto) return null;

    return createPortal(
        <div className="gallery-lightbox-backdrop gallery-fade-in" onClick={onClose}>
            <div className="absolute inset-0 bg-black/95" />

            {/* Close */}
            <button
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-90 gallery-rotate-in"
                style={{ animationDelay: '0.3s' }}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
                <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-translate-x-1 active:scale-90 gallery-slide-in-left"
                style={{ animationDelay: '0.25s' }}
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:translate-x-1 active:scale-90 gallery-slide-in-right"
                style={{ animationDelay: '0.25s' }}
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main image */}
            <div
                className="relative w-[90vw] h-[80vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative max-w-full max-h-full transition-all duration-500"
                    style={{
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating ? 'rotateY(-30deg)' : 'rotateY(0)',
                        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                        perspective: '1500px',
                    }}
                >
                    <img
                        src={currentPhoto.src}
                        alt={currentPhoto.title}
                        className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            </div>

            {/* Info */}
            <div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center gallery-fade-in-up"
                style={{ animationDelay: '0.4s' }}
            >
                <h3 className="text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentPhoto.title}
                </h3>
                <p className="text-white/60 text-sm">{currentPhoto.description}</p>
            </div>

            {/* Counter */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 gallery-fade-in-up"
                style={{ animationDelay: '0.5s' }}
            >
                <span className="text-white font-medium">{currentIndex + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/60">{photos.length}</span>
            </div>

            {/* Thumbnails */}
            <div
                className="absolute bottom-6 right-6 flex gap-2 gallery-fade-in-up"
                style={{ animationDelay: '0.3s' }}
            >
                {photos.map((photo, index) => (
                    <button
                        key={photo.id}
                        onClick={(e) => { e.stopPropagation(); onSelect(index); }}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${index === currentIndex ? 'border-[#ff0000] scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                            }`}
                    >
                        <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>,
        document.body
    );
}
