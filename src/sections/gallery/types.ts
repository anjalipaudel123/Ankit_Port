export type PhotoCategory = 'all' | 'nature' | 'urban' | 'portrait' | 'architecture';

export interface Photo {
    id: number;
    src: string;
    title: string;
    category: Exclude<PhotoCategory, 'all'>;
    description: string;
    aspectRatio: '3:4' | '2:3' | '4:3';
}

export interface LightboxProps {
    photos: Photo[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSelect: (index: number) => void;
}

export interface PhotoCardProps {
    photo: Photo;
    index: number;
    onClick: () => void;
    isVisible: boolean;
}

export interface FilterBarProps {
    categories: { value: PhotoCategory; label: string }[];
    activeCategory: PhotoCategory;
    onSelect: (category: PhotoCategory) => void;
    photoCount: number;
}
