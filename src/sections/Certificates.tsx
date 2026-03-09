import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, Server, Globe, Network, Monitor, ZoomIn, ExternalLink } from 'lucide-react';

interface Certificate {
    id: number;
    title: string;
    icon: typeof Shield;
    image: string;
    category: string;
}

const certificates: Certificate[] = [
    { id: 1, title: 'Active Directory Administration', icon: Shield, image: '/Ankit_Cert/Acrive Directory on Windows Server.png', category: 'Identity & Access' },
    { id: 2, title: 'Windows Server Administration', icon: Monitor, image: '/Ankit_Cert/Windows Server Administration.png', category: 'Systems' },
    { id: 3, title: 'Communication for Global Workspace', icon: Globe, image: '/Ankit_Cert/Communication Skills For Global Workplace.png', category: 'Soft Skills' },
    { id: 4, title: 'Computer Networks', icon: Network, image: '/Ankit_Cert/Computer Networking.png', category: 'Networking' },
    { id: 5, title: 'Ubuntu Server Administration', icon: Server, image: '/Ankit_Cert/ubuntu linux server basics.png', category: 'Systems' },
    { id: 6, title: 'VMware vSphere', icon: Server, image: '/Ankit_Cert/VMware vSphere Fundamentals.png', category: 'Virtualization' },
];

const loopCerts = [...certificates, ...certificates];

/* ── Lightbox ── */
function CertLightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
    }, [onClose]);

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 md:p-8" style={{ zIndex: 10000 }} onClick={onClose}>
            <div className="absolute inset-0 bg-black/92 backdrop-blur-2xl" />
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <X className="w-5 h-5" />
            </button>
            <div className="absolute top-4 left-4 sm:top-5 sm:left-6 z-10 max-w-[65%]">
                <h3 className="text-white/90 text-sm sm:text-base font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{cert.title}</h3>
                <p className="text-white/35 text-xs font-mono tracking-widest uppercase mt-1">{cert.category}</p>
            </div>
            <div className="relative z-10 max-w-5xl w-full max-h-[80vh] sm:max-h-[85vh] flex items-center justify-center mt-10 sm:mt-0" onClick={(e) => e.stopPropagation()}>
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/10 border-t-[#e10600] rounded-full animate-spin" />
                    </div>
                )}
                <img src={cert.image} alt={cert.title}
                    className={`max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl transition-all duration-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    onLoad={() => setLoaded(true)} draggable={false}
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

    useEffect(() => {
        setIsPaused(!!lightboxCert);
    }, [lightboxCert]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white overflow-x-hidden">
            <div className="gallery-film-grain" />

            <main className="relative z-10">

                {/* ═══════════════════════════════════════
                    MOBILE HERO  (< sm)
                   ═══════════════════════════════════════ */}
                <section className="sm:hidden">
                    <div className="h-1 bg-[#e10600]" />
                    <div className="px-4 pt-5 pb-4">
                        <div className="flex items-baseline justify-between mb-1">
                            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                <span className="text-gray-900 dark:text-white">My </span>
                                <span className="text-[#e10600]">Credentials</span>
                            </h1>
                            <span className="text-[10px] font-mono text-gray-400 dark:text-white/40 tracking-widest">
                                {String(certificates.length).padStart(2, '0')}
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-400 dark:text-white/35">
                            Professional certifications & achievements
                        </p>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-white/10" />
                </section>

                {/* ═══════════════════════════════════════
                    DESKTOP HERO  (≥ sm)
                    Elegant, restrained — F1 accent, not F1 copy
                   ═══════════════════════════════════════ */}
                <section className="hidden sm:block relative overflow-hidden">
                    {/* Subtle background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white dark:from-[#0a0a0a] dark:via-[#0d0d0d] to-gray-50 dark:to-[#0a0a0a]" />

                    {/* Very subtle glow — warm, not red */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#e10600]/[0.03] blur-[120px]" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
                        {/* Thin red accent line */}
                        <div className="flex items-center justify-center gap-4 mb-8 gallery-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-8 h-px bg-[#e10600]" />
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 dark:text-white/35">
                                Professional Credentials
                            </span>
                            <div className="w-8 h-px bg-[#e10600]" />
                        </div>

                        {/* Heading — elegant serif, subtle F1 red accent */}
                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-5 gallery-flip-in"
                            style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.2s' }}
                        >
                            Certifications
                        </h1>

                        <p className="text-gray-500 dark:text-white/40 text-base md:text-lg max-w-lg mx-auto mb-10 gallery-fade-in-up leading-relaxed" style={{ animationDelay: '0.4s' }}>
                            Validated expertise across systems administration, networking, and enterprise infrastructure.
                        </p>

                        {/* Minimal stat bar — refined, not telemetry-loud */}
                        <div className="inline-flex items-center gap-6 gallery-fade-in-up" style={{ animationDelay: '0.55s' }}>
                            <div className="text-center">
                                <span className="block text-2xl font-black font-mono text-gray-900 dark:text-white">{String(certificates.length).padStart(2, '0')}</span>
                                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-gray-400 dark:text-white/30">Certified</span>
                            </div>
                            <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
                            <div className="text-center">
                                <span className="block text-2xl font-black font-mono text-[#e10600]">04</span>
                                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-gray-400 dark:text-white/30">Domains</span>
                            </div>
                            <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Active</span>
                                </div>
                                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-gray-400 dark:text-white/30">Status</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom line accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/8 to-transparent" />
                </section>

                {/* ═══════════════════════════════════════
                    CAROUSEL (desktop only) — elegant style
                   ═══════════════════════════════════════ */}
                <section className="relative py-12 md:py-16 hidden sm:block">
                    <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none bg-gradient-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none bg-gradient-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent" />

                    <div className="overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => { if (!lightboxCert) setIsPaused(false); }}>
                        <div ref={trackRef} className="flex gap-6 md:gap-8" style={{ animation: 'cert-train 40s linear infinite', animationPlayState: isPaused ? 'paused' : 'running', width: 'max-content' }}>
                            {loopCerts.map((c, i) => {
                                const CertIcon = c.icon;
                                return (
                                    <div key={`${c.id}-${i}`} className="shrink-0 group cursor-pointer" style={{ width: 'clamp(300px, 36vw, 400px)' }} onClick={() => setLightboxCert(c)}>
                                        <div className="relative rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/5 hover:border-[#e10600]/20 dark:hover:border-[#e10600]/15 transition-all duration-500 bg-white dark:bg-white/[0.02]"
                                            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                                                {/* Zoom */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 scale-75 group-hover:scale-100 transition-transform duration-500">
                                                        <ZoomIn className="w-5 h-5 text-white" />
                                                    </div>
                                                </div>

                                                {/* Bottom info */}
                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shrink-0">
                                                            <CertIcon className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h3 className="text-sm font-semibold text-white drop-shadow-lg truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                                {c.title}
                                                            </h3>
                                                            <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase mt-0.5">{c.category}</p>
                                                        </div>
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

                {/* ═══════════════════════════════════════
                    GRID — clean, professional cards
                   ═══════════════════════════════════════ */}
                <section className="px-3 sm:px-6 lg:px-8 pb-12 sm:pb-24 pt-4 sm:pt-0">
                    <div className="max-w-5xl mx-auto">
                        {/* Section label — desktop */}
                        <div className="hidden sm:flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-white/8 to-gray-200 dark:to-white/8" />
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 dark:text-white/30">All Certificates</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 dark:via-white/8 to-gray-200 dark:to-white/8" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                            {certificates.map((c) => {
                                const CertIcon = c.icon;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setLightboxCert(c)}
                                        className="group relative rounded-xl overflow-hidden text-left border border-gray-200/80 dark:border-white/5 hover:border-[#e10600]/20 dark:hover:border-[#e10600]/15 bg-white dark:bg-white/[0.02] transition-all duration-300"
                                        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                                    >
                                        {/* Red top accent — only visible on hover */}
                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#e10600] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Zoom */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                                                    <ExternalLink className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-3 sm:p-4 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#e10600]/10 transition-colors duration-300">
                                                <CertIcon className="w-4 h-4 text-gray-500 dark:text-white/40 group-hover:text-[#e10600] transition-colors duration-300" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#e10600] transition-colors duration-300 truncate">
                                                    {c.title}
                                                </h4>
                                                <p className="text-[10px] text-gray-400 dark:text-white/30 font-mono tracking-wider uppercase mt-0.5">{c.category}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {lightboxCert && <CertLightbox cert={lightboxCert} onClose={() => setLightboxCert(null)} />}
        </div>
    );
}
