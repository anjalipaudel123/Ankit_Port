import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Spark particle type ───
interface Spark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
}

const CustomCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Refs for animation state
    const posRef = useRef({ x: -100, y: -100 });
    const portalPosRef = useRef({ x: -100, y: -100 });
    const sparksRef = useRef<Spark[]>([]);
    const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);
    const lastMoveRef = useRef(0);
    const velocityRef = useRef({ x: 0, y: 0 });
    const prevPosRef = useRef({ x: 0, y: 0 });
    const isVisibleRef = useRef(false);

    // Spawn sparks on move
    const spawnSparks = useCallback((x: number, y: number, count: number, spread: number = 1) => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 2 + 0.5) * spread;
            sparksRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: Math.random() * 30 + 15,
                size: Math.random() * 2.5 + 0.8,
                hue: Math.random() * 40 + 20, // Orange-gold range (20-60)
            });
        }
        // Cap particles
        if (sparksRef.current.length > 200) {
            sparksRef.current = sparksRef.current.slice(-200);
        }
    }, []);

    useEffect(() => {
        const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(touch);
        if (touch) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Size canvas to window
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            prevPosRef.current = { ...posRef.current };
            posRef.current = { x: e.clientX, y: e.clientY };
            velocityRef.current = {
                x: e.clientX - prevPosRef.current.x,
                y: e.clientY - prevPosRef.current.y,
            };
            if (!isVisibleRef.current) { isVisibleRef.current = true; setIsVisible(true); }

            // Spawn trail sparks based on movement speed
            const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
            if (now - lastMoveRef.current > 16 && speed > 2) {
                const sparkCount = Math.min(Math.floor(speed / 4), 5);
                spawnSparks(e.clientX, e.clientY, sparkCount, 0.6);
                lastMoveRef.current = now;
            }

            // Add to magic trail
            trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
            if (trailRef.current.length > 50) trailRef.current.shift();
        };

        const handleMouseDown = () => {
            setIsClicking(true);
            // Burst of sparks on click — the "spell cast" effect
            spawnSparks(posRef.current.x, posRef.current.y, 25, 2.5);
        };
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = (e: MouseEvent) => {
            // Only hide if truly leaving the browser window (relatedTarget is null)
            if (!e.relatedTarget) { isVisibleRef.current = false; setIsVisible(false); }
        };
        const handleMouseEnter = () => { isVisibleRef.current = true; setIsVisible(true); };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
            setIsHovering(!!interactive);
        };

        // ─── Main render loop ───
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Lerp portal position
            portalPosRef.current.x += (posRef.current.x - portalPosRef.current.x) * 0.12;
            portalPosRef.current.y += (posRef.current.y - portalPosRef.current.y) * 0.12;

            // Update portal element position
            if (portalRef.current) {
                portalRef.current.style.transform = `translate(${portalPosRef.current.x}px, ${portalPosRef.current.y}px)`;
            }
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
            }

            // ─── Draw magic trail ───
            if (trailRef.current.length > 2) {
                for (let i = 0; i < trailRef.current.length; i++) {
                    trailRef.current[i].age++;
                }
                // Remove old trail points
                trailRef.current = trailRef.current.filter(p => p.age < 40);

                ctx.beginPath();
                ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
                for (let i = 1; i < trailRef.current.length; i++) {
                    const p = trailRef.current[i];
                    const prev = trailRef.current[i - 1];
                    const mx = (prev.x + p.x) / 2;
                    const my = (prev.y + p.y) / 2;
                    ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
                }
                const gradient = ctx.createLinearGradient(
                    trailRef.current[0].x, trailRef.current[0].y,
                    trailRef.current[trailRef.current.length - 1].x,
                    trailRef.current[trailRef.current.length - 1].y
                );
                gradient.addColorStop(0, 'rgba(255, 150, 50, 0)');
                gradient.addColorStop(0.5, 'rgba(255, 165, 50, 0.15)');
                gradient.addColorStop(1, 'rgba(255, 200, 80, 0.35)');
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // ─── Draw sparks ───
            sparksRef.current = sparksRef.current.filter(s => {
                s.x += s.vx;
                s.y += s.vy;
                s.vx *= 0.97;
                s.vy *= 0.97;
                s.vy += 0.02; // Slight gravity
                s.life -= 1 / s.maxLife;

                if (s.life <= 0) return false;

                const alpha = s.life * 0.9;
                // Core spark
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 100%, 65%, ${alpha})`;
                ctx.fill();

                // Glow around spark
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * s.life * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 100%, 55%, ${alpha * 0.2})`;
                ctx.fill();

                return true;
            });

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafId);
        };
    }, [spawnSparks]);

    if (isTouchDevice) return null;

    // Portal sizes
    const portalSize = isClicking ? 56 : isHovering ? 60 : 44;

    return (
        <>
            {/* Canvas for sparks & trails */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-[99997] pointer-events-none"
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}
            />

            {/* Ambient glow — follows cursor instantly */}
            <div
                ref={glowRef}
                className="fixed top-0 left-0 z-[99998] pointer-events-none"
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}
            >
                <div
                    className="-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{
                        width: isHovering ? '120px' : isClicking ? '140px' : '80px',
                        height: isHovering ? '120px' : isClicking ? '140px' : '80px',
                        background: isClicking
                            ? 'radial-gradient(circle, rgba(255,165,50,0.20) 0%, rgba(255,120,30,0.08) 40%, transparent 70%)'
                            : isHovering
                                ? 'radial-gradient(circle, rgba(255,165,50,0.15) 0%, rgba(255,120,30,0.05) 40%, transparent 70%)'
                                : 'radial-gradient(circle, rgba(255,165,50,0.10) 0%, transparent 60%)',
                    }}
                />
            </div>

            {/* Magic portal — spinning rune rings */}
            <div
                ref={portalRef}
                className="fixed top-0 left-0 z-[99999] pointer-events-none"
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}
            >
                <div
                    className="-translate-x-1/2 -translate-y-1/2 relative transition-all duration-300 ease-out"
                    style={{ width: `${portalSize}px`, height: `${portalSize}px` }}
                >
                    {/* Outer rune ring — spins clockwise */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        style={{ animation: 'strange-spin 4s linear infinite' }}
                    >
                        <defs>
                            <linearGradient id="rune-gradient-outer" gradientTransform="rotate(45)">
                                <stop offset="0%" stopColor="#ff9a32" />
                                <stop offset="50%" stopColor="#ffcc44" />
                                <stop offset="100%" stopColor="#ff7718" />
                            </linearGradient>
                        </defs>
                        {/* Outer circle */}
                        <circle
                            cx="50" cy="50" r="46"
                            fill="none"
                            stroke="url(#rune-gradient-outer)"
                            strokeWidth={isHovering ? '2' : '1.5'}
                            opacity={isClicking ? '1' : '0.8'}
                            strokeDasharray={isHovering ? '8 4 2 4' : '6 4 2 4'}
                        />
                        {/* Rune-like marks — arcane symbols at cardinal points */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                            const rad = (angle * Math.PI) / 180;
                            const x1 = 50 + Math.cos(rad) * 38;
                            const y1 = 50 + Math.sin(rad) * 38;
                            const x2 = 50 + Math.cos(rad) * 46;
                            const y2 = 50 + Math.sin(rad) * 46;
                            return (
                                <line
                                    key={i}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke="#ffaa44"
                                    strokeWidth="1.2"
                                    opacity="0.7"
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </svg>

                    {/* Inner rune ring — spins counter-clockwise */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        style={{
                            animation: 'strange-spin-reverse 3s linear infinite',
                            padding: isHovering ? '12%' : '16%',
                        }}
                    >
                        <defs>
                            <linearGradient id="rune-gradient-inner" gradientTransform="rotate(-45)">
                                <stop offset="0%" stopColor="#ffcc44" />
                                <stop offset="50%" stopColor="#ff8822" />
                                <stop offset="100%" stopColor="#ffdd66" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="50" cy="50" r="44"
                            fill="none"
                            stroke="url(#rune-gradient-inner)"
                            strokeWidth={isHovering ? '2.5' : '1.8'}
                            opacity={isClicking ? '1' : '0.7'}
                            strokeDasharray={isHovering ? '3 5 7 5' : '4 6 2 6'}
                        />
                        {/* Mini rune ticks */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                            const rad = (angle * Math.PI) / 180;
                            const x = 50 + Math.cos(rad) * 44;
                            const y = 50 + Math.sin(rad) * 44;
                            return (
                                <circle
                                    key={i}
                                    cx={x} cy={y} r="1.5"
                                    fill="#ffcc55"
                                    opacity="0.6"
                                />
                            );
                        })}
                    </svg>

                    {/* Innermost glyph ring — hover only, spins fast */}
                    {isHovering && (
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 100"
                            style={{ animation: 'strange-spin 1.5s linear infinite', padding: '28%' }}
                        >
                            <circle
                                cx="50" cy="50" r="40"
                                fill="none"
                                stroke="#ffdd66"
                                strokeWidth="1.5"
                                opacity="0.5"
                                strokeDasharray="2 3"
                            />
                        </svg>
                    )}

                    {/* Center dot — the "Eye of Agamotto" */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
                        style={{
                            width: isClicking ? '7px' : isHovering ? '6px' : '4px',
                            height: isClicking ? '7px' : isHovering ? '6px' : '4px',
                            background: isClicking
                                ? 'radial-gradient(circle, #fff 0%, #ffcc44 60%, #ff8822 100%)'
                                : 'radial-gradient(circle, #ffe0aa 0%, #ffaa44 100%)',
                            boxShadow: isClicking
                                ? '0 0 12px 4px rgba(255,170,50,0.6), 0 0 24px 8px rgba(255,130,30,0.3)'
                                : isHovering
                                    ? '0 0 8px 3px rgba(255,170,50,0.5)'
                                    : '0 0 6px 2px rgba(255,170,50,0.4)',
                        }}
                    />

                    {/* Click burst ring */}
                    {isClicking && (
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{
                                width: '100%',
                                height: '100%',
                                border: '2px solid rgba(255, 180, 60, 0.6)',
                                animation: 'strange-burst 0.5s ease-out forwards',
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Cursor styles & keyframes */}
            <style>{`
        * { cursor: none !important; }

        @keyframes strange-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes strange-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes strange-burst {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
      `}</style>
        </>
    );
};

export default CustomCursor;
