import { useState } from 'react';
import { GalleryHero } from './gallery/GalleryHero';
import { GalleryGrid } from './gallery/GalleryGrid';
import { photos } from './gallery/photos';
import type { PhotoCategory } from './gallery/types';

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');

    const filteredPhotoCount =
        activeCategory === 'all' ? photos.length : photos.filter((p) => p.category === activeCategory).length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white overflow-x-hidden">
            {/* Film grain overlay */}
            <div className="gallery-film-grain" />
            <main>
                <GalleryHero
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    photoCount={filteredPhotoCount}
                />
                <GalleryGrid photos={photos} activeCategory={activeCategory} />
            </main>
        </div>
    );
}
