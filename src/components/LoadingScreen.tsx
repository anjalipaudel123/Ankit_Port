import { useEffect, useState, useRef, useCallback } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

// ─── Spark particle for the portal ───
interface PortalSpark {
    angle: number;
    radius: number;
    speed: number;
    size: number;
    hue: number;
    opacity: number;
    drift: number;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [phase, setPhase] = useState<'conjure' | 'expand' | 'open' | 'done'>('conjure');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<PortalSpark[]>([]);
    const rafRef = useRef<number>(0);
    const phaseRef = useRef(phase);

    // Keep phase ref in sync
    useEffect(() => {
        phaseRef.current = phase;
    }, [phase]);

    // Generate initial sparks
    const initSparks = useCallback(() => {
        const sparks: PortalSpark[] = [];
        for (let i = 0; i < 120; i++) {
            sparks.push({
                angle: Math.random() * Math.PI * 2,
                radius: 0.85 + Math.random() * 0.3,
                speed: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
                size: Math.random() * 2 + 0.5,
                hue: Math.random() * 40 + 20,
                opacity: Math.random() * 0.7 + 0.3,
                drift: Math.random() * 6 - 3,
            });
        }
        sparksRef.current = sparks;
    }, []);

    // Canvas animation for portal sparks
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        initSparks();

        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const currentPhase = phaseRef.current;

            // Portal radius based on phase
            let portalR: number;
            if (currentPhase === 'conjure') {
                portalR = Math.min(time * 3, 160);
            } else if (currentPhase === 'expand') {
                portalR = 160 + (time - 60) * 12;
            } else {
                portalR = Math.max(canvas.width, canvas.height) * 1.2;
            }

            // Draw sparks orbiting the portal ring
            sparksRef.current.forEach((s) => {
                s.angle += (s.speed * 0.02);
                const r = portalR * s.radius + Math.sin(time * 0.05 + s.angle) * s.drift;
                const x = cx + Math.cos(s.angle) * r;
                const y = cy + Math.sin(s.angle) * r;

                const fade = currentPhase === 'open' || currentPhase === 'done' ? 0 : s.opacity;

                // Spark glow
                ctx.beginPath();
                ctx.arc(x, y, s.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 100%, 60%, ${fade * 0.15})`;
                ctx.fill();

                // Spark core
                ctx.beginPath();
                ctx.arc(x, y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 100%, 70%, ${fade * 0.9})`;
                ctx.fill();
            });

            time++;
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [initSparks]);

    // Phase timeline
    useEffect(() => {
        // Phase 1: Portal conjures (0-1.2s) — rings spin up from nothing
        const t1 = setTimeout(() => setPhase('expand'), 1200);
        // Phase 2: Portal expands (1.2-2.4s) — rings grow, portal "opens"
        const t2 = setTimeout(() => setPhase('open'), 2400);
        // Phase 3: Portal fully open (2.4-3.2s) — clip-path reveals site
        const t3 = setTimeout(() => setPhase('done'), 3200);
        // Phase 4: Cleanup
        const t4 = setTimeout(() => onComplete(), 3600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <div
            className="fixed inset-0 z-[99999] pointer-events-none"
            style={{ perspective: '1200px' }}
        >
            {/* Dark backdrop — clips away as portal opens */}
            <div
                className="absolute inset-0 bg-[#07070c] portal-backdrop"
                style={{
                    clipPath:
                        phase === 'open'
                            ? 'circle(0% at 50% 50%)'
                            : phase === 'done'
                                ? 'circle(0% at 50% 50%)'
                                : 'circle(100% at 50% 50%)',
                    transition:
                        phase === 'open'
                            ? 'clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                            : 'none',
                }}
            >
                {/* Subtle star field */}
                <div className="absolute inset-0 portal-stars" />
            </div>

            {/* Canvas for orbiting sparks */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{
                    opacity: phase === 'open' || phase === 'done' ? 0 : 1,
                    transition: 'opacity 0.6s ease',
                }}
            />

            {/* Portal container — centered */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer ambient glow */}
                <div
                    className="absolute rounded-full transition-all"
                    style={{
                        width: phase === 'expand' || phase === 'open' ? '600px' : phase === 'conjure' ? '340px' : '0px',
                        height: phase === 'expand' || phase === 'open' ? '600px' : phase === 'conjure' ? '340px' : '0px',
                        background: 'radial-gradient(circle, rgba(255,150,40,0.12) 0%, rgba(255,100,20,0.04) 50%, transparent 70%)',
                        transitionDuration: phase === 'expand' ? '1200ms' : '600ms',
                        opacity: phase === 'open' || phase === 'done' ? 0 : 1,
                    }}
                />

                {/* Outer ring — largest, spins clockwise */}
                <svg
                    className="absolute portal-ring-outer"
                    viewBox="0 0 400 400"
                    style={{
                        width: phase === 'expand' ? '500px' : phase === 'open' || phase === 'done' ? '800px' : '320px',
                        height: phase === 'expand' ? '500px' : phase === 'open' || phase === 'done' ? '800px' : '320px',
                        opacity: phase === 'done' ? 0 : phase === 'open' ? 0.3 : phase === 'conjure' ? 0.9 : 1,
                        transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1), height 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
                    }}
                >
                    <defs>
                        <linearGradient id="portalGrad1" gradientTransform="rotate(45)">
                            <stop offset="0%" stopColor="#ff8a20" />
                            <stop offset="50%" stopColor="#ffcc44" />
                            <stop offset="100%" stopColor="#ff6a10" />
                        </linearGradient>
                    </defs>
                    <circle cx="200" cy="200" r="190" fill="none" stroke="url(#portalGrad1)" strokeWidth="2" strokeDasharray="12 6 4 6" opacity="0.8" />
                    <circle cx="200" cy="200" r="180" fill="none" stroke="#ffaa33" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.5" />
                    {/* Rune marks */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
                        const rad = (angle * Math.PI) / 180;
                        const x1 = 200 + Math.cos(rad) * 174;
                        const y1 = 200 + Math.sin(rad) * 174;
                        const x2 = 200 + Math.cos(rad) * 190;
                        const y2 = 200 + Math.sin(rad) * 190;
                        return (
                            <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffbb44" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
                        );
                    })}
                    {/* Glyphs at cardinal points */}
                    {[0, 90, 180, 270].map((angle) => {
                        const rad = (angle * Math.PI) / 180;
                        const cx = 200 + Math.cos(rad) * 182;
                        const cy = 200 + Math.sin(rad) * 182;
                        return (
                            <g key={`glyph-${angle}`}>
                                <circle cx={cx} cy={cy} r="6" fill="none" stroke="#ffcc55" strokeWidth="1" opacity="0.7" />
                                <circle cx={cx} cy={cy} r="2" fill="#ffcc55" opacity="0.9" />
                            </g>
                        );
                    })}
                </svg>

                {/* Middle ring — spins counter-clockwise */}
                <svg
                    className="absolute portal-ring-middle"
                    viewBox="0 0 400 400"
                    style={{
                        width: phase === 'expand' ? '380px' : phase === 'open' || phase === 'done' ? '650px' : '240px',
                        height: phase === 'expand' ? '380px' : phase === 'open' || phase === 'done' ? '650px' : '240px',
                        opacity: phase === 'done' ? 0 : phase === 'open' ? 0.2 : phase === 'conjure' ? 0.85 : 1,
                        transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1), height 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
                    }}
                >
                    <defs>
                        <linearGradient id="portalGrad2" gradientTransform="rotate(-30)">
                            <stop offset="0%" stopColor="#ffcc44" />
                            <stop offset="50%" stopColor="#ff9922" />
                            <stop offset="100%" stopColor="#ffdd66" />
                        </linearGradient>
                    </defs>
                    <circle cx="200" cy="200" r="185" fill="none" stroke="url(#portalGrad2)" strokeWidth="2.5" strokeDasharray="8 5 15 5" opacity="0.9" />
                    <circle cx="200" cy="200" r="170" fill="none" stroke="#ffaa33" strokeWidth="1" strokeDasharray="2 12" opacity="0.4" />
                    {/* Arcane symbols — small circles */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                        const rad = (angle * Math.PI) / 180;
                        const cx = 200 + Math.cos(rad) * 178;
                        const cy = 200 + Math.sin(rad) * 178;
                        return <circle key={angle} cx={cx} cy={cy} r="2.5" fill="#ffbb44" opacity="0.6" />;
                    })}
                </svg>

                {/* Inner ring — spins clockwise fast */}
                <svg
                    className="absolute portal-ring-inner"
                    viewBox="0 0 400 400"
                    style={{
                        width: phase === 'expand' ? '260px' : phase === 'open' || phase === 'done' ? '500px' : '160px',
                        height: phase === 'expand' ? '260px' : phase === 'open' || phase === 'done' ? '500px' : '160px',
                        opacity: phase === 'done' ? 0 : phase === 'open' ? 0.15 : phase === 'conjure' ? 0.7 : 0.9,
                        transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1), height 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
                    }}
                >
                    <circle cx="200" cy="200" r="185" fill="none" stroke="#ffcc44" strokeWidth="1.8" strokeDasharray="4 3 8 3" opacity="0.8" />
                    <circle cx="200" cy="200" r="165" fill="none" stroke="#ffaa22" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.4" />
                    {/* Central hex pattern */}
                    {[0, 60, 120, 180, 240, 300].map((angle) => {
                        const rad = (angle * Math.PI) / 180;
                        const x = 200 + Math.cos(rad) * 168;
                        const y = 200 + Math.sin(rad) * 168;
                        const x2 = 200 + Math.cos(rad) * 185;
                        const y2 = 200 + Math.sin(rad) * 185;
                        return <line key={angle} x1={x} y1={y} x2={x2} y2={y2} stroke="#ffcc55" strokeWidth="1" opacity="0.5" strokeLinecap="round" />;
                    })}
                </svg>

                {/* Center content — name reveal inside portal */}
                <div
                    className="relative z-10 flex flex-col items-center text-center"
                    style={{
                        opacity: phase === 'open' || phase === 'done' ? 0 : phase === 'conjure' ? 0 : 1,
                        transform: phase === 'expand' ? 'scale(1)' : 'scale(0.8)',
                        transition: 'opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s',
                    }}
                >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/40 mb-4 portal-center-glow">
                        <span className="text-white font-bold text-2xl font-serif">A</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight mb-2 drop-shadow-lg">
                        Ankit Paudel
                    </h1>
                    <p className="text-xs text-amber-300/70 tracking-[0.25em] uppercase">
                        Where Identity Meets Intelligence
                    </p>
                </div>
            </div>

            {/* Portal edge glow — rings of light at the opening boundary */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                    opacity: phase === 'open' ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: '2px',
                        height: '2px',
                        boxShadow: '0 0 80px 40px rgba(255,170,50,0.3), 0 0 160px 80px rgba(255,120,30,0.15), 0 0 240px 120px rgba(255,80,10,0.05)',
                    }}
                />
            </div>

            <style>{`
        /* Spinning rune rings */
        .portal-ring-outer {
          animation: portal-spin 6s linear infinite;
        }
        .portal-ring-middle {
          animation: portal-spin-reverse 4.5s linear infinite;
        }
        .portal-ring-inner {
          animation: portal-spin 3s linear infinite;
        }

        @keyframes portal-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes portal-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        /* Star field */
        .portal-stars {
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,200,100,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 60%, rgba(255,180,80,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 10%, rgba(255,220,120,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 40%, rgba(255,160,60,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 70%, rgba(255,200,100,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 80%, rgba(255,180,80,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 90%, rgba(255,220,120,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 15%, rgba(255,170,70,0.3) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 45% 45%, rgba(255,200,100,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 55%, rgba(255,180,80,0.4) 0%, transparent 100%);
        }

        /* Center glow pulse */
        .portal-center-glow {
          animation: center-pulse 1.5s ease-in-out infinite alternate;
        }
        @keyframes center-pulse {
          0% { box-shadow: 0 0 20px 8px rgba(255,150,40,0.3); }
          100% { box-shadow: 0 0 30px 15px rgba(255,150,40,0.5); }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
