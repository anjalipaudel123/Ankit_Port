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
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

            {/* Floating orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#ff0000]/5 blur-[100px] gallery-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#ff0000]/3 blur-[120px] gallery-float-slow-reverse" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="overflow-hidden mb-4">
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight gallery-flip-in"
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
                        <span className="text-[#ff0000]">Gallery</span>
                    </h1>
                </div>

                <p
                    className="text-lg md:text-xl text-white/60 font-light mb-12 max-w-2xl mx-auto gallery-blur-reveal"
                    style={{ animationDelay: '0.6s' }}
                >
                    A curated collection of moments frozen in time,{' '}
                    <br className="hidden md:block" />
                    each frame telling its own unique story
                </p>

                <FilterBar
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={onCategoryChange}
                    photoCount={photoCount}
                />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </section>
    );
}
