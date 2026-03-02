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
                className={`gallery-card-3d relative overflow-hidden rounded-lg cursor-pointer bg-[#141414] ${aspectRatioClass}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `
            rotateX(${transform.rotateX}deg)
            rotateY(${transform.rotateY}deg)
            translateZ(${isHovered ? 80 : 0}px)
            scale(${isHovered ? 1.03 : 1})
          `,
                    boxShadow: isHovered
                        ? '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,0,0,0.15)'
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

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 gallery-image-overlay transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Category Badge */}
                <div
                    className="absolute top-4 left-4 transition-all duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'scale(1)' : 'scale(0)',
                        transitionDelay: isHovered ? '0.1s' : '0s',
                        transitionTimingFunction: 'cubic-bezier(0.68,-0.55,0.265,1.55)',
                    }}
                >
                    <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-[#ff0000] text-white rounded-full">
                        {photo.category}
                    </span>
                </div>

                {/* Content */}
                <div
                    className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    }}
                >
                    <h3 className="text-xl font-semibold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {photo.title}
                    </h3>
                    <p className="text-sm text-white/70 mb-4 line-clamp-2">{photo.description}</p>
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full text-sm text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-300 hover:scale-105 active:scale-95">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                    </button>
                </div>

                {/* Border Glow */}
                <div
                    className="absolute inset-0 rounded-lg pointer-events-none transition-shadow duration-300"
                    style={{
                        boxShadow: isHovered
                            ? 'inset 0 0 0 1px rgba(255,255,255,0.2), 0 0 30px rgba(255,0,0,0.1)'
                            : 'inset 0 0 0 1px rgba(255,255,255,0)',
                    }}
                />
            </div>
        </div>
    );
}
