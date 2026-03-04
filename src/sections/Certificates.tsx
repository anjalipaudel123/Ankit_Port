import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Award, Shield, Server, Globe, Network, Monitor, ZoomIn } from 'lucide-react';

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

// Duplicate for seamless loop
const loopCerts = [...certificates, ...certificates];

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
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-[fadeIn_0.2s_ease]" />
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
                <X className="w-5 h-5" />
            </button>
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white/80 text-sm font-medium">{cert.title}</h3>
                <p className="text-white/40 text-xs">{cert.category}</p>
            </div>
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
    const [lightboxCert, setLightboxCert] = useState<Certificate | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // Pause animation when lightbox is open
    useEffect(() => {
        if (lightboxCert) setIsPaused(true);
        else setIsPaused(false);
    }, [lightboxCert]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white overflow-x-hidden">
            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)',
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            <main className="relative z-10">
                {/* Hero */}
                <section className="pt-20 pb-6 px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full mb-6">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-white/50 font-medium">Certifications</span>
                    </div>
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Credentials &<br />
                        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Achievements
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-white/40 text-lg max-w-xl mx-auto">
                        Professional certifications validating expertise across systems, networking, and security.
                    </p>
                </section>

                {/* Infinite Train Carousel */}
                <section className="relative py-10 md:py-20">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none bg-gradient-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent" />

                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => { if (!lightboxCert) setIsPaused(false); }}
                    >
                        <div
                            ref={trackRef}
                            className="flex gap-6 md:gap-8"
                            style={{
                                animation: 'cert-train 40s linear infinite',
                                animationPlayState: isPaused ? 'paused' : 'running',
                                width: 'max-content',
                            }}
                        >
                            {loopCerts.map((c, i) => {
                                const CertIcon = c.icon;
                                return (
                                    <div
                                        key={`${c.id}-${i}`}
                                        className="shrink-0 group cursor-pointer"
                                        style={{ width: 'clamp(300px, 38vw, 420px)' }}
                                        onClick={() => setLightboxCert(c)}
                                    >
                                        <div
                                            className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                                                backdropFilter: 'blur(20px)',
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                                            }}
                                        >
                                            {/* Certificate image */}
                                            <div className="relative aspect-[4/3] bg-black/30 overflow-hidden">
                                                <img
                                                    src={c.image}
                                                    alt={c.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                                {/* Zoom hint */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                                                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                                                        <ZoomIn className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>

                                                {/* Category badge */}
                                                <div className="absolute top-3 right-3">
                                                    <span className={`px-3 py-1 bg-gradient-to-r ${c.color} rounded-full text-[10px] uppercase tracking-wider text-white font-medium shadow-lg`}>
                                                        {c.category}
                                                    </span>
                                                </div>

                                                {/* Bottom info overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 shadow-lg`}>
                                                            <CertIcon className="w-5 h-5 text-white" />
                                                        </div>
                                                        <h3
                                                            className="text-sm md:text-base font-semibold text-white drop-shadow-lg"
                                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                                        >
                                                            {c.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Grid — all certs */}
                <section className="px-4 pb-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent" />
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-white/30 font-mono">All Certificates</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {certificates.map((c) => {
                                const CertIcon = c.icon;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setLightboxCert(c)}
                                        className="group relative rounded-xl border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-300 overflow-hidden text-left"
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
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors truncate">
                                                    {c.title}
                                                </h4>
                                                <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">{c.category}</p>
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
