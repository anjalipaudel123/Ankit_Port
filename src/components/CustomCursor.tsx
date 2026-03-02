import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch devices — don't show custom cursor
        const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(touch);
        if (touch) return;

        const pos = { x: 0, y: 0 };
        const ring = { x: 0, y: 0 };
        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            pos.x = e.clientX;
            pos.y = e.clientY;
            if (!isVisible) setIsVisible(true);

            // Dot follows instantly
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
            }
        };

        // Ring follows with smooth lerp
        const animateRing = () => {
            ring.x += (pos.x - ring.x) * 0.15;
            ring.y += (pos.y - ring.y) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
            }
            rafId = requestAnimationFrame(animateRing);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Detect hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
            setIsHovering(!!interactive);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        rafId = requestAnimationFrame(animateRing);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(rafId);
        };
    }, [isVisible]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Dot — small, instant follow */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[99999] pointer-events-none"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <div
                    className="rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out"
                    style={{
                        width: isHovering ? '8px' : '6px',
                        height: isHovering ? '8px' : '6px',
                        backgroundColor: isClicking ? 'rgb(99, 102, 241)' : 'rgb(17, 24, 39)',
                        mixBlendMode: 'difference',
                        filter: 'invert(1)',
                    }}
                />
            </div>

            {/* Ring — larger, trails with lerp */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[99998] pointer-events-none"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <div
                    className="rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                    style={{
                        width: isHovering ? '48px' : isClicking ? '28px' : '36px',
                        height: isHovering ? '48px' : isClicking ? '28px' : '36px',
                        border: `1.5px solid ${isHovering ? 'rgb(99, 102, 241)' : 'rgba(17, 24, 39, 0.4)'}`,
                        backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                        mixBlendMode: 'difference',
                        filter: 'invert(1)',
                    }}
                />
            </div>

            {/* Hide default cursor globally */}
            <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
        </>
    );
};

export default CustomCursor;
