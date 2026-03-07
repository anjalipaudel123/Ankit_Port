import { useState, useRef } from 'react';
import { Eye } from 'lucide-react';
import type { PhotoCardProps } from './types';

export function PhotoCard({ photo, index, onClick, isVisible }: PhotoCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setTransform({
            rotateX: (y - centerY) / 20,
            rotateY: (centerX - x) / 20,
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTransform({ rotateX: 0, rotateY: 0 });
    };

    const aspectRatioClass = {
        '3:4': 'aspect-[3/4]',
        '2:3': 'aspect-[2/3]',
        '4:3': 'aspect-[4/3]',
    }[photo.aspectRatio];

    return (
        <div
            ref={cardRef}
            className={`gallery-perspective transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
            style={{
                transitionDelay: `${index * 80}ms`,
                transformStyle: 'preserve-3d',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <div
                className={`gallery-card-3d relative overflow-hidden rounded-lg cursor-pointer bg-gray-200 dark:bg-[#141414] ${aspectRatioClass}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `
            rotateX(${transform.rotateX}deg)
            rotateY(${transform.rotateY}deg)
            translateZ(${isHovered ? 80 : 0}px)
            scale(${isHovered ? 1.03 : 1})
          `,
                    boxShadow: isHovered
                        ? '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(225,6,0,0.18)'
                        : '0 10px 30px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
                }}
            >
                {/* Image */}
                <div
                    className="absolute inset-0 overflow-hidden transition-transform duration-500"
                    style={{
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    }}
                >
                    <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" loading="lazy" />
                </div>

                {/* Gradient Overlay — always-on on touch, hover-only on desktop */}
                <div
                    className="absolute inset-0 gallery-image-overlay gallery-card-overlay transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : undefined }}
                />

                {/* F1 Driver-style position number — always visible */}
                <div className="absolute top-3 right-3 z-10">
                    <span
                        className="text-white/25 font-black font-mono leading-none transition-all duration-300"
                        style={{
                            fontSize: '2.5rem',
                            opacity: isHovered ? 0 : 1,
                            lineHeight: 1,
                        }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* Category Badge — sharp, F1-style */}
                <div
                    className="absolute top-3 left-3 transition-all duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0.7,
                        transform: isHovered ? 'translateY(0)' : 'translateY(-4px)',
                        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    }}
                >
                    <span
                        className="px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#e10600] text-white"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        {photo.category}
                    </span>
                </div>

                {/* Content — always slightly visible on touch (mobile), hover-only on desktop */}
                <div
                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transition-all duration-300 gallery-card-content"
                    style={{
                        opacity: isHovered ? 1 : undefined,
                        transform: isHovered ? 'translateY(0)' : undefined,
                        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    }}
                >
                    {/* F1 position line */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#e10600] font-black font-mono text-xs tracking-widest">
                            P{String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {photo.title}
                    </h3>
                    <p className="text-sm text-white/70 mb-4 line-clamp-2">{photo.description}</p>
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 text-sm text-white hover:bg-[#e10600] hover:border-[#e10600] transition-all duration-300 hover:scale-105 active:scale-95">
                        <Eye className="w-4 h-4" />
                        <span className="font-mono tracking-widest text-xs uppercase">View</span>
                    </button>
                </div>

                {/* Border Glow */}
                <div
                    className="absolute inset-0 rounded-lg pointer-events-none transition-shadow duration-300"
                    style={{
                        boxShadow: isHovered
                            ? 'inset 0 0 0 1px rgba(225,6,0,0.4), 0 0 30px rgba(225,6,0,0.12)'
                            : 'inset 0 0 0 1px rgba(255,255,255,0)',
                    }}
                />
            </div>
        </div>
    );
}
