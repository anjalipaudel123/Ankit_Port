import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Award, Shield, Server, Globe, Network, Monitor, ZoomIn } from 'lucide-react';

interface Certificate {
    id: number;
    title: string;
    icon: typeof Award;
    color: string;
    glowColor: string;
    image: string;
    category: string;
}

const certificates: Certificate[] = [
    {
        id: 1,
        title: 'Active Directory Administration',
        icon: Shield,
        color: 'from-blue-500 to-indigo-600',
        glowColor: 'rgba(99,102,241,0.4)',
        image: '/Ankit_Cert/Acrive Directory on Windows Server.png',
        category: 'Identity & Access',
    },
    {
        id: 2,
        title: 'Windows Server Administration',
        icon: Monitor,
        color: 'from-cyan-500 to-blue-600',
        glowColor: 'rgba(6,182,212,0.4)',
        image: '/Ankit_Cert/Windows Server Administration.png',
        category: 'Systems',
    },
    {
        id: 3,
        title: 'Communication for Global Workspace',
        icon: Globe,
        color: 'from-emerald-500 to-teal-600',
        glowColor: 'rgba(16,185,129,0.4)',
        image: '/Ankit_Cert/Communication Skills For Global Workplace.png',
        category: 'Soft Skills',
    },
    {
        id: 4,
        title: 'Computer Networks',
        icon: Network,
        color: 'from-violet-500 to-purple-600',
        glowColor: 'rgba(139,92,246,0.4)',
        image: '/Ankit_Cert/Computer Networking.png',
        category: 'Networking',
    },
    {
        id: 5,
        title: 'Ubuntu Server Administration',
        icon: Server,
        color: 'from-orange-500 to-red-600',
        glowColor: 'rgba(249,115,22,0.4)',
        image: '/Ankit_Cert/ubuntu linux server basics.png',
        category: 'Systems',
    },
    {
        id: 6,
        title: 'VMware vSphere',
        icon: Server,
        color: 'from-amber-500 to-orange-600',
        glowColor: 'rgba(245,158,11,0.4)',
        image: '/Ankit_Cert/VMware vSphere Fundamentals.png',
        category: 'Virtualization',
    },
];

// Lightbox component — portaled to body
function CertLightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
            style={{ zIndex: 10000 }}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-[fadeIn_0.2s_ease]" />

            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white/80 text-sm font-medium">{cert.title}</h3>
                <p className="text-white/40 text-xs">{cert.category}</p>
            </div>

            {/* Image */}
            <div
                className="relative z-10 max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                    </div>
                )}
                <img
                    src={cert.image}
                    alt={cert.title}
                    className={`max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                    onLoad={() => setLoaded(true)}
                    draggable={false}
                />
            </div>
        </div>,
        document.body
    );
}

export default function Certificates() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxCert, setLightboxCert] = useState<Certificate | null>(null);
    const transitioningRef = useRef(false);
    const autoplayRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const total = certificates.length;

    const navigate = useCallback((dir: 'left' | 'right') => {
        if (transitioningRef.current) return;
        transitioningRef.current = true;

        setActiveIndex(prev =>
            dir === 'right'
                ? (prev + 1) % total
                : (prev - 1 + total) % total
        );

        setTimeout(() => {
            transitioningRef.current = false;
        }, 600);
    }, [total]);

    // Slow autoplay — glides every 3s
    useEffect(() => {
        autoplayRef.current = setInterval(() => navigate('right'), 3000);
        return () => clearInterval(autoplayRef.current);
    }, [navigate]);

    const pauseAutoplay = () => clearInterval(autoplayRef.current);
    const resumeAutoplay = () => {
        clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => navigate('right'), 3000);
    };

    // Keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (lightboxCert) return;
            if (e.key === 'ArrowLeft') navigate('left');
            if (e.key === 'ArrowRight') navigate('right');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [navigate, lightboxCert]);

    const goTo = (index: number) => {
        if (transitioningRef.current || index === activeIndex) return;
        transitioningRef.current = true;
        setActiveIndex(index);
        setTimeout(() => {
            transitioningRef.current = false;
        }, 600);
    };

    const cert = certificates[activeIndex];

    const getStackIndex = (offset: number) => ((activeIndex + offset) % total + total) % total;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full transition-all duration-1000 ease-out"
                    style={{
                        background: `radial-gradient(circle, ${cert.glowColor} 0%, transparent 70%)`,
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            <main className="relative z-10">
                {/* Hero */}
                <section className="pt-20 pb-6 px-4 text-center">
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

                {/* 3D Image Carousel */}
                <section
                    className="relative py-8 md:py-16 px-4"
                    onMouseEnter={pauseAutoplay}
                    onMouseLeave={resumeAutoplay}
                >
                    <div className="relative max-w-6xl mx-auto" style={{ perspective: '1400px' }}>
                        <div className="relative flex items-center justify-center" style={{ height: '480px' }}>
                            {[-2, -1, 0, 1, 2].map((offset) => {
                                const idx = getStackIndex(offset);
                                const c = certificates[idx];
                                const CertIcon = c.icon;
                                const isCenter = offset === 0;
                                const absOffset = Math.abs(offset);

                                const translateX = offset * 260;
                                const translateZ = -absOffset * 180;
                                const rotateY = offset * -12;
                                const opacity = isCenter ? 1 : Math.max(0.15, 1 - absOffset * 0.4);
                                const scale = isCenter ? 1 : Math.max(0.7, 1 - absOffset * 0.15);

                                return (
                                    <div
                                        key={`card-${offset}`}
                                        className="absolute"
                                        style={{
                                            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                            opacity,
                                            zIndex: 10 - absOffset,
                                            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            transformStyle: 'preserve-3d',
                                            width: 'clamp(280px, 42vw, 400px)',
                                        }}
                                    >
                                        <div
                                            className={`relative rounded-2xl overflow-hidden border transition-all duration-700 group ${isCenter
                                                    ? 'border-white/20 shadow-2xl cursor-pointer'
                                                    : 'border-white/5 shadow-lg cursor-pointer'
                                                }`}
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                                                backdropFilter: 'blur(20px)',
                                                boxShadow: isCenter
                                                    ? `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${c.glowColor}`
                                                    : '0 10px 30px rgba(0,0,0,0.3)',
                                            }}
                                            onClick={() => isCenter ? setLightboxCert(c) : goTo(idx)}
                                        >
                                            {/* Certificate image */}
                                            <div className="relative aspect-[4/3] bg-black/30 overflow-hidden">
                                                <img
                                                    src={c.image}
                                                    alt={c.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {isCenter && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                                                            <ZoomIn className="w-5 h-5 text-white" />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="absolute top-3 right-3">
                                                    <span className={`px-3 py-1 bg-gradient-to-r ${c.color} rounded-full text-[10px] uppercase tracking-wider text-white font-medium shadow-lg`}>
                                                        {c.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card info */}
                                            <div className="p-4 flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0`}>
                                                    <CertIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3
                                                        className="text-sm font-semibold text-white truncate"
                                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                                    >
                                                        {c.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={() => navigate('left')}
                            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-110 active:scale-90"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {certificates.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`rounded-full transition-all duration-700 ${i === activeIndex
                                            ? 'w-8 h-2 bg-gradient-to-r from-amber-400 to-orange-500'
                                            : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('right')}
                            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-110 active:scale-90"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </section>

                {/* Grid — all certs */}
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
                                    <button
                                        key={c.id}
                                        onClick={() => setLightboxCert(c)}
                                        className="group relative rounded-xl border border-white/5 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden text-left"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={c.image}
                                                alt={c.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-4 flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                <CertIcon className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                                                    {c.title}
                                                </h4>
                                                <p className="text-xs text-white/30 mt-0.5">{c.category}</p>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none">
                                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                                                <ZoomIn className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {/* Lightbox */}
            {lightboxCert && (
                <CertLightbox cert={lightboxCert} onClose={() => setLightboxCert(null)} />
            )}
        </div>
    );
}
