import { useState, useMemo } from 'react';
import { PhotoCard } from './PhotoCard';
import { Lightbox } from './Lightbox';
import type { Photo, PhotoCategory } from '@/types/gallery';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface GalleryGridProps {
  photos: Photo[];
  activeCategory: PhotoCategory;
}

export function GalleryGrid({ photos, activeCategory }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { ref: gridRef, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter(photo => photo.category === activeCategory);
  }, [photos, activeCategory]);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const goToPrev = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="transition-all duration-500"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <PhotoCard
                photo={photo}
                index={index}
                onClick={() => openLightbox(index)}
                isVisible={isVisible}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-white/40 text-lg">
              No photos found in this category
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        photos={filteredPhotos}
        currentIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrev={goToPrev}
        onSelect={goToPhoto}
      />
    </section>
  );
}
