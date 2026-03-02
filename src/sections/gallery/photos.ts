import type { Photo, PhotoCategory } from './types';

export const photos: Photo[] = [
    {
        id: 1,
        src: '/images/photo1-mountain.jpg',
        title: 'Mountain Serenity',
        category: 'nature',
        description: 'Snow-capped peak reflected in calm waters at dawn',
        aspectRatio: '3:4',
    },
    {
        id: 2,
        src: '/images/photo2-city.jpg',
        title: 'Urban Velocity',
        category: 'urban',
        description: 'City lights painting the night with motion',
        aspectRatio: '2:3',
    },
    {
        id: 3,
        src: '/images/photo3-portrait.jpg',
        title: 'Quiet Contemplation',
        category: 'portrait',
        description: 'Intimate moment captured in natural window light',
        aspectRatio: '3:4',
    },
    {
        id: 4,
        src: '/images/photo4-desert.jpg',
        title: 'Golden Dunes',
        category: 'nature',
        description: 'Desert waves sculpted by wind and time',
        aspectRatio: '4:3',
    },
    {
        id: 5,
        src: '/images/photo5-street.jpg',
        title: 'Rainy Solitude',
        category: 'urban',
        description: 'A solitary figure beneath the crimson umbrella',
        aspectRatio: '2:3',
    },
    {
        id: 6,
        src: '/images/photo6-architecture.jpg',
        title: 'Glass Dreams',
        category: 'architecture',
        description: 'Modern geometry reflecting the sky',
        aspectRatio: '3:4',
    },
    {
        id: 7,
        src: '/images/photo7-forest.jpg',
        title: 'Enchanted Path',
        category: 'nature',
        description: 'Sunbeams piercing through the ancient canopy',
        aspectRatio: '2:3',
    },
    {
        id: 8,
        src: '/images/photo8-ocean.jpg',
        title: 'Eternal Waves',
        category: 'nature',
        description: "The ocean's power against rocky shores",
        aspectRatio: '4:3',
    },
    {
        id: 9,
        src: '/images/photo9-culture.jpg',
        title: 'Cultural Rhythm',
        category: 'portrait',
        description: 'Traditional dance in vibrant celebration',
        aspectRatio: '3:4',
    },
];

export const categories: { value: PhotoCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'nature', label: 'Nature' },
    { value: 'urban', label: 'Urban' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'architecture', label: 'Architecture' },
];
