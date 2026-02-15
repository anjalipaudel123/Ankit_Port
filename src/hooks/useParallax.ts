import { useEffect, useState } from 'react';

interface ParallaxOptions {
    speed?: number;
    direction?: 'up' | 'down';
}

export const useParallax = (options: ParallaxOptions = {}) => {
    const { speed = 0.5, direction = 'up' } = options;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const value = direction === 'up' ? scrolled * speed : -scrolled * speed;
            setOffset(value);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, direction]);

    return offset;
};

export const useSmoothParallax = (speed: number = 0.5) => {
    const [transform, setTransform] = useState(0);

    useEffect(() => {
        let rafId: number;
        let currentScroll = 0;
        let targetScroll = 0;

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const handleScroll = () => {
            targetScroll = window.pageYOffset * speed;
        };

        const animate = () => {
            currentScroll = lerp(currentScroll, targetScroll, 0.1);
            setTransform(currentScroll);
            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, [speed]);

    return transform;
};
