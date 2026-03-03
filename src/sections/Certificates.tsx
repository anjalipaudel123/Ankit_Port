import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Award, Shield, Server, Globe, Network, Monitor } from 'lucide-react';

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    icon: typeof Award;
    color: string;
    glowColor: string;
    file: string;
    category: string;
}

const certificates: Certificate[] = [
    {
        id: 1,
        title: 'Active Directory Administration',
        issuer: 'Microsoft / Training Provider',
        icon: Shield,
        color: 'from-blue-500 to-indigo-600',
        glowColor: 'rgba(99,102,241,0.3)',
        file: '/Ankit_Cert/Ankit_Paudel_Active_Directory.pdf',
        category: 'Identity & Access',
    },
    {
        id: 2,
        title: 'Windows Server Administration',
        issuer: 'Microsoft / Training Provider',
        icon: Monitor,
        color: 'from-cyan-500 to-blue-600',
        glowColor: 'rgba(6,182,212,0.3)',
        file: '/Ankit_Cert/Ankit_Paudel_Windows_Server.pdf',
        category: 'Systems',
    },
    {
        id: 3,
        title: 'Communication for Global Workspace',
        issuer: 'Professional Development',
        icon: Globe,
        color: 'from-emerald-500 to-teal-600',
        glowColor: 'rgba(16,185,129,0.3)',
        file: '/Ankit_Cert/Communication_For_Global_Workspace_Ankit_Paudel.pdf',
        category: 'Soft Skills',
    },
    {
        id: 4,
        title: 'Computer Networks',
        issuer: 'Networking Fundamentals',
        icon: Network,
        color: 'from-violet-500 to-purple-600',
        glowColor: 'rgba(139,92,246,0.3)',
        file: '/Ankit_Cert/Computer_Networks_Ankit_Paudel.pdf',
        category: 'Networking',
    },
    {
        id: 5,
        title: 'Ubuntu Server Administration',
        issuer: 'Linux / Training Provider',
        icon: Server,
        color: 'from-orange-500 to-red-600',
        glowColor: 'rgba(249,115,22,0.3)',
        file: '/Ankit_Cert/Ubuntu_Server_Ankit_Paudel.pdf',
        category: 'Systems',
    },
    {
        id: 6,
        title: 'VMware vSphere',
        issuer: 'VMware / Training Provider',
        icon: Server,
        color: 'from-amber-500 to-orange-600',
        glowColor: 'rgba(245,158,11,0.3)',
        file: '/Ankit_Cert/VMWare_vSphere_Ankit_Paudel.pdf',
        category: 'Virtualization',
    },
];

export default function Certificates() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const transitioningRef = useRef(false);
    const autoplayRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const total = certificates.length;

    const navigate = useCallback((dir: 'left' | 'right') => {
        if (transitioningRef.current) return;
        transitioningRef.current = true;
        setDirection(dir);
        setIsTransitioning(true);

        setTimeout(() => {
            setActiveIndex(prev =>
                dir === 'right'
                    ? (prev + 1) % total
                    : (prev - 1 + total) % total
            );
            setIsTransitioning(false);
            setDirection(null);
            transitioningRef.current = false;
        }, 400);
    }, [total]);

    // Autoplay
    useEffect(() => {
        autoplayRef.current = setInterval(() => navigate('right'), 5000);
        return () => clearInterval(autoplayRef.current);
    }, [navigate]);

    const pauseAutoplay = () => clearInterval(autoplayRef.current);
    const resumeAutoplay = () => {
        clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => navigate('right'), 5000);
    };

    // Keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') navigate('left');
            if (e.key === 'ArrowRight') navigate('right');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [navigate]);

    const goTo = (index: number) => {
        if (transitioningRef.current || index === activeIndex) return;
        transitioningRef.current = true;
        setDirection(index > activeIndex ? 'right' : 'left');
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsTransitioning(false);
            setDirection(null);
            transitioningRef.current = false;
        }, 400);
    };

    const cert = certificates[activeIndex];    // Get visible cards for the stack (current + 2 on each side)
    const getStackIndex = (offset: number) => ((activeIndex + offset) % total + total) % total;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full transition-all duration-700"
                    style={{
                        background: `radial-gradient(circle, ${cert.glowColor} 0%, transparent 70%)`,
                        filter: 'blur(80px)',
                    }}
                />
            </div>

            <main className="relative z-10">
                {/* Hero */}
                <section className="pt-20 pb-8 px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">Certifications</span>
                    </div>
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Credentials &<br />
                        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Achievements
                        </span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-xl mx-auto">
                        Professional certifications validating expertise across systems, networking, and security.
                    </p>
                </section>

                {/* 3D Carousel */}
                <section
                    className="relative py-12 md:py-20 px-4"
                    onMouseEnter={pauseAutoplay}
                    onMouseLeave={resumeAutoplay}
                >
                    <div className="relative max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
                        <div className="relative flex items-center justify-center" style={{ height: '420px' }}>

                            {/* Stacked cards */}
                            {[-2, -1, 0, 1, 2].map((offset) => {
                                const idx = getStackIndex(offset);
                                const c = certificates[idx];
                                const CertIcon = c.icon;
                                const isCenter = offset === 0;
                                const absOffset = Math.abs(offset);

                                // Position & style
                                const translateX = offset * 220;
                                const translateZ = -absOffset * 150;
                                const rotateY = offset * -15;
                                const opacity = isCenter ? 1 : Math.max(0.2, 1 - absOffset * 0.35);
                                const scale = isCenter ? 1 : Math.max(0.75, 1 - absOffset * 0.12);

                                // Transition for when navigating
                                let animTransform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
                                let animOpacity = opacity;

                                if (isTransitioning) {
                                    const shift = direction === 'right' ? -220 : 220;
                                    const newX = translateX + shift;
                                    const newAbsOffset = Math.abs(offset + (direction === 'right' ? -1 : 1));
                                    const newZ = -Math.min(newAbsOffset, 2) * 150;
                                    const newRotY = (offset + (direction === 'right' ? -1 : 1)) * -15;
                                    const newScale = newAbsOffset === 0 ? 1 : Math.max(0.75, 1 - Math.min(newAbsOffset, 2) * 0.12);
                                    animTransform = `translateX(${newX}px) translateZ(${newZ}px) rotateY(${newRotY}deg) scale(${newScale})`;
                                    animOpacity = newAbsOffset === 0 ? 1 : Math.max(0.2, 1 - Math.min(newAbsOffset, 2) * 0.35);
                                }

                                return (
                                    <div
                                        key={`${c.id}-${offset}`}
                                        className="absolute cursor-pointer"
                                        style={{
                                            transform: animTransform,
                                            opacity: animOpacity,
                                            zIndex: 10 - absOffset,
                                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                            transformStyle: 'preserve-3d',
                                            width: 'clamp(260px, 40vw, 360px)',
                                        }}
                                        onClick={() => !isCenter && goTo(idx)}
                                    >
                                        <div
                                            className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${isCenter
                                                ? 'border-white/20 shadow-2xl'
                                                : 'border-white/5 shadow-lg'
                                                }`}
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                                                backdropFilter: 'blur(20px)',
                                                boxShadow: isCenter
                                                    ? `0 25px 60px rgba(0,0,0,0.5), 0 0 40px ${c.glowColor}`
                                                    : '0 10px 30px rgba(0,0,0,0.3)',
                                            }}
                                        >
                                            {/* Gradient header */}
                                            <div className={`h-32 bg-gradient-to-br ${c.color} relative overflow-hidden`}>
                                                <div className="absolute inset-0 opacity-20">
                                                    <div className="absolute top-4 right-4 w-24 h-24 border border-white/20 rounded-full" />
                                                    <div className="absolute top-8 right-8 w-16 h-16 border border-white/15 rounded-full" />
                                                    <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-white/10 rounded-full" />
                                                </div>
                                                <div className="absolute bottom-4 left-5">
                                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                        <CertIcon className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-wider text-white font-medium">
                                                        {c.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {c.title}
                                                </h3>
                                                <p className="text-white/40 text-sm mb-4">{c.issuer}</p>

                                                {isCenter && (
                                                    <a
                                                        href={c.file}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${c.color} rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        View Certificate
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => navigate('left')}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-110 active:scale-90"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {certificates.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goTo(idx)}
                                    className={`rounded-full transition-all duration-500 ${idx === activeIndex
                                        ? 'w-8 h-2 bg-gradient-to-r from-amber-400 to-orange-500'
                                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('right')}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-110 active:scale-90"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </section>

                {/* Grid view of all certs */}
                <section className="px-4 pb-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <span className="text-xs uppercase tracking-[0.3em] text-white/30 font-mono">All Certificates</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {certificates.map((c) => {
                                const CertIcon = c.icon;
                                return (
                                    <a
                                        key={c.id}
                                        href={c.file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-5 rounded-xl border border-white/5 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                <CertIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                                                    {c.title}
                                                </h4>
                                                <p className="text-xs text-white/30 mt-1">{c.category}</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0 mt-0.5" />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
