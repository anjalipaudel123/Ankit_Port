import { useState } from 'react';
import { GalleryHero } from '@/sections/GalleryHero';
import { GalleryGrid } from '@/sections/GalleryGrid';
import { Footer } from '@/sections/Footer';
import { photos } from '@/data/photos';
import type { PhotoCategory } from '@/types/gallery';

function App() {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');

  const filteredPhotoCount = activeCategory === 'all' 
    ? photos.length 
    : photos.filter(p => p.category === activeCategory).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Film Grain Overlay */}
      <div className="film-grain" />
      
      {/* Main Content */}
      <main>
        {/* Hero Section with Filters */}
        <GalleryHero 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          photoCount={filteredPhotoCount}
        />
        
        {/* Photo Gallery Grid */}
        <GalleryGrid 
          photos={photos}
          activeCategory={activeCategory}
        />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
