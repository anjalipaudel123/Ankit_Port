import { FilterBar } from './FilterBar';
import type { PhotoCategory } from './types';
import { categories } from './photos';

interface GalleryHeroProps {
    activeCategory: PhotoCategory;
    onCategoryChange: (category: PhotoCategory) => void;
    photoCount: number;
}

export function GalleryHero({ activeCategory, onCategoryChange, photoCount }: GalleryHeroProps) {
    return (
        <section className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden">
            {/* ── F1-style top ticker bar ── */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-[#e10600] h-8 flex items-center overflow-hidden">
                <div className="gallery-ticker flex items-center gap-0 whitespace-nowrap">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className="flex items-center gap-6 px-6">
                            <span className="text-white text-[10px] font-black tracking-[0.25em] uppercase">Ankit Paudel</span>
                            <span className="text-white/40 text-[10px]">·</span>
                            <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">Photo Gallery</span>
                            <span className="text-white/40 text-[10px]">·</span>
                            <span className="text-white/80 text-[10px] font-mono tracking-widest">{String(photoCount).padStart(2, '0')} FRAMES</span>
                            <span className="text-white/40 text-[10px]">·</span>
                            <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">Season 2026</span>
                            <span className="text-white/40 text-[10px]">·</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 dark:from-[#0a0a0a] dark:via-[#111111] to-gray-50 dark:to-[#0a0a0a]" />

            {/* F1-style scan-line grid */}
            <div className="absolute inset-0 pointer-events-none gallery-scan-grid" />

            {/* Glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#e10600]/5 blur-[100px] gallery-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#e10600]/3 blur-[120px] gallery-float-slow-reverse" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20 pb-12">

                {/* Main heading */}
                <div className="overflow-hidden mb-2">
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white tracking-tight gallery-flip-in"
                        style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.2s' }}
                    >
                        Photo
                    </h1>
                </div>
                <div className="overflow-hidden mb-8">
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gallery-flip-in"
                        style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.35s' }}
                    >
                        <span className="text-[#e10600]">Gallery</span>
                    </h1>
                </div>

                {/* F1 telemetry row */}
                <div
                    className="flex items-center justify-center gap-0 mb-10 gallery-fade-in-up"
                    style={{ animationDelay: '0.5s' }}
                >
                    <div className="flex items-center gap-3 px-5 py-2 border-l-2 border-[#e10600] bg-gray-900/5 dark:bg-white/5">
                        <span className="text-gray-400 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Frames</span>
                        <span className="text-gray-900 dark:text-white text-lg font-black font-mono">{String(photoCount).padStart(2, '0')}</span>
                    </div>
                    <div className="w-px h-10 bg-gray-300 dark:bg-white/10" />
                    <div className="flex items-center gap-3 px-5 py-2 border-r border-gray-200 dark:border-white/10 bg-gray-900/5 dark:bg-white/5">
                        <span className="text-gray-400 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Category</span>
                        <span className="text-[#e10600] text-sm font-black font-mono uppercase tracking-widest">{activeCategory}</span>
                    </div>
                    <div className="w-px h-10 bg-gray-300 dark:bg-white/10" />
                    <div className="flex items-center gap-3 px-5 py-2 bg-gray-900/5 dark:bg-white/5">
                        <span className="text-gray-400 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Lens</span>
                        <span className="text-gray-900 dark:text-white text-sm font-black font-mono tracking-wide">APT</span>
                    </div>
                </div>

                <FilterBar
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={onCategoryChange}
                    photoCount={photoCount}
                />
            </div>

            {/* F1-style bottom event tracker bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 h-10 border-t border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center px-6 gap-4">
                <div className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
                <span className="text-gray-500 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Live Session</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                <span className="text-gray-400 dark:text-white/30 text-[10px] font-mono tracking-widest">Gallery &nbsp;·&nbsp; 2026</span>
            </div>
        </section>
    );
}
