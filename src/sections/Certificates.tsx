import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, Server, Globe, Network, Monitor, ZoomIn } from 'lucide-react';

interface Certificate {
    id: number;
    title: string;
    icon: typeof Shield;
    image: string;
    category: string;
}

const certificates: Certificate[] = [
    {
        id: 1,
        title: 'Active Directory Administration',
        icon: Shield,
        image: '/Ankit_Cert/Acrive Directory on Windows Server.png',
        category: 'Identity',
    },
    {
        id: 2,
        title: 'Windows Server Administration',
        icon: Monitor,
        image: '/Ankit_Cert/Windows Server Administration.png',
        category: 'Systems',
    },
    {
        id: 3,
        title: 'Communication for Global Workspace',
        icon: Globe,
        image: '/Ankit_Cert/Communication Skills For Global Workplace.png',
        category: 'Skills',
    },
    {
        id: 4,
        title: 'Computer Networks',
        icon: Network,
        image: '/Ankit_Cert/Computer Networking.png',
        category: 'Networking',
    },
    {
        id: 5,
        title: 'Ubuntu Server Administration',
        icon: Server,
        image: '/Ankit_Cert/ubuntu linux server basics.png',
        category: 'Systems',
    },
    {
        id: 6,
        title: 'VMware vSphere',
        icon: Server,
        image: '/Ankit_Cert/VMware vSphere Fundamentals.png',
        category: 'Virtual',
    },
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
        <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-8" style={{ zIndex: 10000 }} onClick={onClose}>
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            {/* Close */}
            <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {/* Info */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 max-w-[60%]">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#e10600] font-black font-mono text-xs tracking-widest">
                        P{String(cert.id).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-px bg-white/20" />
                </div>
                <h3 className="text-white/80 text-xs sm:text-sm font-semibold truncate">{cert.title}</h3>
                <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.25em] bg-[#e10600] text-white inline-block mt-1">
                    {cert.category}
                </span>
            </div>
            {/* Image */}
            <div className="relative z-10 max-w-5xl w-full max-h-[80vh] sm:max-h-[85vh] flex items-center justify-center mt-10 sm:mt-0" onClick={(e) => e.stopPropagation()}>
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-[#e10600]/30 border-t-[#e10600] rounded-full animate-spin" />
                    </div>
                )}
                <img
                    src={cert.image}
                    alt={cert.title}
                    className={`max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain shadow-2xl transition-all duration-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
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

    useEffect(() => {
        if (lightboxCert) setIsPaused(true);
        else setIsPaused(false);
    }, [lightboxCert]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white overflow-x-hidden">
            {/* Film grain */}
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
                                <span className="text-[#e10600]">Certs</span>
                            </h1>
                            <span className="text-[10px] font-mono text-gray-400 dark:text-white/40 tracking-widest">
                                {String(certificates.length).padStart(2, '0')} earned
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-white/40">
                            Systems · Networking · Security
                        </p>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-white/10" />
                </section>

                {/* ═══════════════════════════════════════
                    DESKTOP HERO  (≥ sm) — F1 style
                   ═══════════════════════════════════════ */}
                <section className="hidden sm:flex relative flex-col items-center justify-center min-h-[50vh] overflow-hidden">
                    {/* F1 Ticker Bar */}
                    <div className="absolute top-0 left-0 right-0 z-20 bg-[#e10600] h-8 flex items-center overflow-hidden">
                        <div className="gallery-ticker flex items-center gap-0 whitespace-nowrap">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <span key={i} className="flex items-center gap-6 px-6">
                                    <span className="text-white text-[10px] font-black tracking-[0.25em] uppercase">Certifications</span>
                                    <span className="text-white/40 text-[10px]">·</span>
                                    <span className="text-white/80 text-[10px] font-mono tracking-widest">{String(certificates.length).padStart(2, '0')} Certs</span>
                                    <span className="text-white/40 text-[10px]">·</span>
                                    <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">Season 2026</span>
                                    <span className="text-white/40 text-[10px]">·</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 dark:from-[#0a0a0a] dark:via-[#111111] to-gray-50 dark:to-[#0a0a0a]" />

                    {/* Scan-line grid */}
                    <div className="absolute inset-0 pointer-events-none gallery-scan-grid" />

                    {/* Glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#e10600]/5 blur-[100px] gallery-float-slow" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#e10600]/3 blur-[120px] gallery-float-slow-reverse" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20 pb-12">
                        <div className="overflow-hidden mb-2">
                            <h1
                                className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white tracking-tight gallery-flip-in"
                                style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.2s' }}
                            >
                                Credentials
                            </h1>
                        </div>
                        <div className="overflow-hidden mb-8">
                            <h1
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gallery-flip-in"
                                style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.35s' }}
                            >
                                <span className="text-[#e10600]">& Certs</span>
                            </h1>
                        </div>

                        {/* Telemetry row */}
                        <div className="flex flex-wrap items-center justify-center gap-px mb-10 gallery-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            <div className="flex items-center gap-3 px-5 py-2 border-l-2 border-[#e10600] bg-gray-900/5 dark:bg-white/5">
                                <span className="text-gray-400 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Certs</span>
                                <span className="text-gray-900 dark:text-white text-lg font-black font-mono">{String(certificates.length).padStart(2, '0')}</span>
                            </div>
                            <div className="w-px h-10 bg-gray-300 dark:bg-white/10" />
                            <div className="flex items-center gap-3 px-5 py-2 bg-gray-900/5 dark:bg-white/5">
                                <span className="text-gray-400 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Domain</span>
                                <span className="text-[#e10600] text-sm font-black font-mono uppercase tracking-widest">IT</span>
                            </div>
                            <div className="w-px h-10 bg-gray-300 dark:bg-white/10" />
                            <div className="flex items-center gap-3 px-5 py-2 bg-gray-900/5 dark:bg-white/5">
                                <span className="text-gray-400 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Status</span>
                                <span className="text-gray-900 dark:text-white text-sm font-black font-mono tracking-wide">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 h-10 border-t border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center px-6 gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
                        <span className="text-gray-500 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">Credential Vault</span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                        <span className="text-gray-400 dark:text-white/30 text-[10px] font-mono tracking-widest">Ankit Paudel &nbsp;·&nbsp; 2026</span>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    CAROUSEL — F1 styled (desktop only)
                   ═══════════════════════════════════════ */}
                <section className="relative py-10 md:py-16 hidden sm:block">
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
                            {loopCerts.map((c, i) => (
                                <div
                                    key={`${c.id}-${i}`}
                                    className="shrink-0 group cursor-pointer"
                                    style={{ width: 'clamp(300px, 38vw, 420px)' }}
                                    onClick={() => setLightboxCert(c)}
                                >
                                    <div className="relative overflow-hidden border border-gray-200 dark:border-white/5 hover:border-[#e10600]/40 transition-all duration-500"
                                        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] bg-black/30 overflow-hidden">
                                            <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                            {/* Ghost number */}
                                            <div className="absolute top-3 right-3">
                                                <span className="text-white/15 font-black font-mono leading-none group-hover:text-white/25 transition-colors" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                                                    {String(c.id).padStart(2, '0')}
                                                </span>
                                            </div>

                                            {/* Category badge — sharp F1 style */}
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#e10600] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                    {c.category}
                                                </span>
                                            </div>

                                            {/* Zoom hint */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                                                <div className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 border border-white/20">
                                                    <ZoomIn className="w-6 h-6 text-white" />
                                                </div>
                                            </div>

                                            {/* Bottom info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[#e10600] font-black font-mono text-xs tracking-widest">P{String(c.id).padStart(2, '0')}</span>
                                                    <div className="flex-1 h-px bg-white/20" />
                                                </div>
                                                <h3 className="text-sm md:text-base font-semibold text-white drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {c.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    GRID — F1 styled cards
                   ═══════════════════════════════════════ */}
                <section className="px-3 sm:px-4 lg:px-8 pb-12 sm:pb-24 pt-4 sm:pt-0">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Divider — desktop */}
                        <div className="hidden sm:flex items-center gap-4 mb-10">
                            <div className="w-4 h-px bg-[#e10600]" />
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 dark:text-white/30">
                                <span className="text-gray-900 dark:text-white font-black text-sm">{String(certificates.length).padStart(2, '0')}</span>
                                <span className="mx-1 text-gray-300 dark:text-white/20">/</span>
                                Certificates
                            </span>
                            <div className="w-4 h-px bg-[#e10600]" />
                            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                            {certificates.map((c, index) => {
                                const CertIcon = c.icon;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setLightboxCert(c)}
                                        className="group relative overflow-hidden text-left border border-gray-200 dark:border-white/5 hover:border-[#e10600]/40 bg-white dark:bg-white/[0.02] transition-all duration-300"
                                        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Ghost number */}
                                            <div className="absolute top-2 right-3">
                                                <span className="text-white/15 font-black font-mono leading-none" style={{ fontSize: '2rem', lineHeight: 1 }}>
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            {/* Category badge */}
                                            <div className="absolute top-2 left-2">
                                                <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] bg-[#e10600] text-white">
                                                    {c.category}
                                                </span>
                                            </div>

                                            {/* Zoom icon */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                                <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
                                                    <ZoomIn className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info bar */}
                                        <div className="p-3 sm:p-4 flex items-center gap-3 border-t border-gray-100 dark:border-white/5">
                                            <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-[#e10600]/10 group-hover:bg-[#e10600] transition-colors duration-300">
                                                <CertIcon className="w-4 h-4 text-[#e10600] group-hover:text-white transition-colors duration-300" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#e10600] transition-colors truncate">
                                                    {c.title}
                                                </h4>
                                                <p className="text-[10px] font-mono text-gray-400 dark:text-white/30 tracking-widest uppercase mt-0.5">{c.category}</p>
                                            </div>
                                            <span className="text-[#e10600]/40 font-black font-mono text-xs tracking-widest group-hover:text-[#e10600] transition-colors">
                                                P{String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Hover glow border */}
                                        <div className="absolute inset-0 pointer-events-none transition-shadow duration-300" style={{ boxShadow: 'inset 0 0 0 0px rgba(225,6,0,0)' }} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {lightboxCert && (
                <CertLightbox cert={lightboxCert} onClose={() => setLightboxCert(null)} />
            )}
        </div>
    );
}
