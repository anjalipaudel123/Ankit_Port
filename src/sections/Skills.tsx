import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ── Inline SVG Icons ──────────────────────────────────────────────────
const PythonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 255" className={className} fill="currentColor"><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 110 22.24 11.12 11.12 0 010-22.24z" /><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.519 33.897zm34.114-19.586a11.12 11.12 0 110-22.24 11.12 11.12 0 010 22.24z" /></svg>
);
const PyTorchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.867-3.867 3.867-10.155 0-14.022l-2.343 2.343a6.528 6.528 0 010 9.336 6.528 6.528 0 01-9.336 0 6.528 6.528 0 010-9.336l4.366-4.366 2.344-2.343V0zm4.695 4.685a1.173 1.173 0 100 2.345 1.173 1.173 0 000-2.345z" /></svg>
);
const DjangoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.56-1.121.764-2.42.764-5.937V6.059h3.899zM17.39.021h3.924v4.026H17.39z" /></svg>
);
const GitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 11-1.512-.065V8.78a1.838 1.838 0 01-.998-2.41L7.629 3.64.452 10.818a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.428-10.43a1.55 1.55 0 000-2.187" /></svg>
);
const DatabaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
);
const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
);
const NeuralNetIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="12" cy="4" r="2" /><circle cx="12" cy="20" r="2" /><line x1="8" y1="6" x2="10" y2="5" /><line x1="8" y1="18" x2="10" y2="19" /><line x1="14" y1="5" x2="16" y2="11" /><line x1="14" y1="19" x2="16" y2="13" /></svg>
);
const GanIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
);
const BrainIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a3 3 0 00-2.83 4H6a3 3 0 00-.83 5.88A3 3 0 006 15.5H6.17A3 3 0 009.5 22h1V2z" /><path d="M14.5 2a3 3 0 012.83 4H18a3 3 0 01.83 5.88A3 3 0 0118 15.5h-.17A3 3 0 0114.5 22h-1V2z" /></svg>
);
const NlpIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7v-2h10v2zm0-3H7V9h10v2zm0-3H7V6h10v2z" /></svg>
);
const FlowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z" /></svg>
);
const SlidersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" /></svg>
);
const RestApiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M7 7H5v2h2V7zm0 4H5v2h2v-2zm0 4H5v2h2v-2zm10-8h-6v2h6V7zm0 4h-6v2h6v-2zm0 4h-6v2h6v-2zm2-12H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h16v14z" /></svg>
);
const ActiveDirectoryIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4zm8-6h-2v2h-2v2h2v2h2v-2h2v-2h-2V8z" /></svg>
);
const KerberosIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 1a11 11 0 100 22 11 11 0 000-22zm0 2a9 9 0 110 18 9 9 0 010-18zm-1 3v4H8l4 5 4-5h-3V6h-2z" /></svg>
);
const DockerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.576a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.886c0 .102.082.186.185.186zm0 2.716h2.118a.186.186 0 00.186-.186V6.292a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.886c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.292a.186.186 0 00-.185-.186H8.1a.186.186 0 00-.185.186v1.886c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.292a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.886c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186H8.1a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186H2.216a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM23.078 13.347c-.473-.35-1.561-.462-2.399-.31-.108-.753-.57-1.408-1.116-1.878l-.374-.312-.327.36c-.393.436-.606 1.04-.557 1.623.024.263.104.52.237.746a3.066 3.066 0 01-1.282.312H.782a.786.786 0 00-.78.792c-.025 1.455.235 2.91.782 4.26.663 1.583 1.652 2.753 2.94 3.478C5.268 23.36 7.236 24 9.535 24c5.21 0 9.186-2.418 11.307-6.83.93.018 2.926.009 3.95-1.965l.055-.102-.37-.245-.4-.51z" /></svg>
);
const LinuxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.585.047 1.042-.245 1.15-.688.054-.235-.015-.468-.064-.643.067-.249.193-.43.324-.716.2-.43.22-.596.366-.94.082-.197.18-.466.2-.745.026-.356-.04-.71-.154-.957a1.415 1.415 0 00-.397-.541c-.264-.194-.501-.396-.757-.529-.508-.285-.963-.695-1.378-1.25-.39-.519-.644-1.135-.87-1.635a5.89 5.89 0 01-.242-.577c-.161-.445-.384-.88-.474-1.207-.071-.34-.106-.776.107-1.24.155-.338.342-.556.494-.699.35-.326.573-.732.573-1.288 0-1.197-1.478-5.165-2.254-6.263C14.37.658 13.416 0 12.504 0z" /></svg>
);
const JupyterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M7.157 22.201A1.784 1.784 0 015.374 20.4a1.784 1.784 0 011.783-1.8c.978 0 1.782.81 1.782 1.8 0 .978-.804 1.8-1.782 1.8zm9.686-1.2c-.978 0-1.783-.81-1.783-1.8s.805-1.8 1.783-1.8a1.784 1.784 0 011.782 1.8c0 .99-.804 1.8-1.782 1.8zm3.738-14.1c-.6 0-1.08-.48-1.08-1.08s.48-1.08 1.08-1.08 1.08.48 1.08 1.08-.48 1.08-1.08 1.08zM12 18.001c-3.526 0-6.654-1.14-8.514-2.94a.642.642 0 01.462-1.08.66.66 0 01.456.186c1.632 1.566 4.41 2.554 7.596 2.554 3.186 0 5.964-.99 7.596-2.554a.636.636 0 01.918.018.636.636 0 01-.006.876C18.654 16.861 15.526 18 12 18zM12 6.001c3.222 0 6.12.96 7.926 2.496a.636.636 0 01.06.894.624.624 0 01-.894.066C17.49 8.085 14.886 7.281 12 7.281c-2.886 0-5.49.804-7.092 2.172a.63.63 0 01-.894-.06.636.636 0 01.06-.894C5.88 6.959 8.778 6 12 6z" /></svg>
);

// ── Particle Canvas Background ────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(80, Math.floor((w * h) / 15000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 250,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      initParticles(w, h);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(270, 60%, 60%, ${(1 - cdist / 150) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// ── Radial Progress Ring ──────────────────────────────────────────────
const ProgressRing = ({ progress, isActive, color }: { progress: number; isActive: boolean; color: string }) => {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (circumference * (isActive ? progress : 0)) / 100;

  return (
    <svg className="absolute -top-1 -right-1 w-10 h-10" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="none" strokeWidth="2" stroke="rgba(255,255,255,0.06)" />
      <circle
        cx="20" cy="20" r="18" fill="none" strokeWidth="2.5"
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
      />
      <text
        x="20" y="20"
        textAnchor="middle" dominantBaseline="central"
        fill="rgba(255,255,255,0.5)"
        fontSize="9" fontWeight="600"
        style={{
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {progress}
      </text>
    </svg>
  );
};

// ── Types ─────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: React.FC<{ className?: string }>;
  level: number;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  skills: Skill[];
  gradient: string;
  accentColor: string;
  glowColor: string;
}

// ── Main Component ────────────────────────────────────────────────────
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const { ref: tagsRef, isVisible: tagsVisible } = useScrollReveal<HTMLDivElement>();

  const categories: SkillCategory[] = [
    {
      title: 'Machine Learning & AI',
      subtitle: 'Neural architectures & training',
      icon: BrainIcon,
      gradient: 'from-violet-600 via-purple-600 to-indigo-600',
      accentColor: '#a78bfa',
      glowColor: 'rgba(167, 139, 250, 0.15)',
      skills: [
        { name: 'PyTorch', icon: PyTorchIcon, level: 90 },
        { name: 'Python', icon: PythonIcon, level: 95 },
        { name: 'CNNs', icon: NeuralNetIcon, level: 85 },
        { name: 'Overfitting Prevention', icon: ShieldCheckIcon, level: 85 },
        { name: 'Hyperparameter Tuning', icon: SlidersIcon, level: 80 },
        { name: 'Backpropagation', icon: FlowIcon, level: 85 },
      ],
    },
    {
      title: 'Deep Learning & Gen AI',
      subtitle: 'Generative models & NLP',
      icon: GanIcon,
      gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
      accentColor: '#f472b6',
      glowColor: 'rgba(244, 114, 182, 0.15)',
      skills: [
        { name: 'GANs', icon: GanIcon, level: 90 },
        { name: 'VAEs', icon: BrainIcon, level: 85 },
        { name: 'NLP', icon: NlpIcon, level: 80 },
        { name: 'Flow Models', icon: FlowIcon, level: 75 },
        { name: 'BERT / DeBERTa', icon: NlpIcon, level: 85 },
        { name: 'Phi-2', icon: BrainIcon, level: 80 },
      ],
    },
    {
      title: 'Backend & Cybersecurity',
      subtitle: 'Infrastructure & identity',
      icon: DjangoIcon,
      gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
      accentColor: '#2dd4bf',
      glowColor: 'rgba(45, 212, 191, 0.15)',
      skills: [
        { name: 'Django', icon: DjangoIcon, level: 90 },
        { name: 'REST APIs', icon: RestApiIcon, level: 85 },
        { name: 'SQL', icon: DatabaseIcon, level: 80 },
        { name: 'Git', icon: GitIcon, level: 85 },
        { name: 'Active Directory', icon: ActiveDirectoryIcon, level: 80 },
        { name: 'Kerberos / NTLM', icon: KerberosIcon, level: 75 },
      ],
    },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setActiveCategory(null);
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const additionalSkills = [
    { name: 'Computer Vision', icon: GanIcon },
    { name: 'NLP', icon: NlpIcon },
    { name: 'Transformers', icon: BrainIcon },
    { name: 'GradCAM', icon: NeuralNetIcon },
    { name: 'Explainable AI', icon: BrainIcon },
    { name: 'REST APIs', icon: RestApiIcon },
    { name: 'PostgreSQL', icon: DatabaseIcon },
    { name: 'Docker', icon: DockerIcon },
    { name: 'Linux', icon: LinuxIcon },
    { name: 'Jupyter', icon: JupyterIcon },
    { name: 'NumPy', icon: PythonIcon },
    { name: 'Pandas', icon: PythonIcon },
    { name: 'Windows Server', icon: ShieldCheckIcon },
    { name: 'IAM', icon: ActiveDirectoryIcon },
  ];

  return (
    <div className="bg-[#05050a] min-h-screen" ref={sectionRef}>
      <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
        {/* Particle Canvas Background */}
        <ParticleField />

        {/* Radial gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/[0.04] rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/[0.02] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Section Header ───────────────────────────────────────── */}
          <div
            ref={headerRef}
            className={`text-center mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-medium text-purple-300/80 uppercase tracking-[0.2em]">
                Expertise
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Technical{' '}
              <span className="relative inline-block">
                <span className="text-gradient">Arsenal</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path
                    d="M1 5.5Q50 1 100 5.5Q150 10 199 5.5"
                    stroke="url(#underline-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: headerVisible ? 0 : 300,
                      transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) 0.5s, opacity 0.3s ease 0.5s',
                      opacity: headerVisible ? 1 : 0,
                    }}
                  />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            <p className="text-gray-500 text-lg max-w-xl mx-auto mt-6">
              Building at the intersection of machine intelligence, backend systems, and security infrastructure
            </p>
          </div>

          {/* ── Category Cards Grid ──────────────────────────────────── */}
          <div ref={gridRef} className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, catIndex) => {
              const isActive = activeCategory === catIndex;

              return (
                <div
                  key={category.title}
                  className={`group relative transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`}
                  style={{ transitionDelay: `${300 + catIndex * 200}ms` }}
                  onClick={() => setActiveCategory(isActive ? null : catIndex)}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${isActive
                        ? 'ring-1 ring-white/20 shadow-2xl'
                        : 'ring-1 ring-white/[0.06] hover:ring-white/[0.12]'
                      }`}
                    style={{
                      boxShadow: isActive ? `0 0 60px ${category.glowColor}, 0 0 120px ${category.glowColor}` : 'none',
                    }}
                  >
                    {/* Animated gradient border (top edge) */}
                    <div className={`h-[2px] w-full bg-gradient-to-r ${category.gradient} transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`} />

                    {/* Card body */}
                    <div className="relative p-6 lg:p-8 bg-[#0a0a14]/80 backdrop-blur-xl">
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(ellipse at 50% 0%, ${category.glowColor}, transparent 70%)`,
                          opacity: isActive ? 1 : 0,
                        }}
                      />

                      <div className="relative z-10">
                        {/* Category header */}
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} p-[1px]`}>
                              <div className="w-full h-full rounded-2xl bg-[#0a0a14] flex items-center justify-center">
                                <span style={{ color: category.accentColor }}>
                                  <category.icon className="w-7 h-7" />
                                </span>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white leading-tight">
                                {category.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-0.5">{category.subtitle}</p>
                            </div>
                          </div>

                          <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isActive ? 'rotate-45 border-white/30' : 'group-hover:border-white/20'}`}>
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </div>
                        </div>

                        {/* Skills list */}
                        <div className="space-y-3">
                          {category.skills.map((skill, skillIndex) => {
                            const isSkillHovered = hoveredSkill === skill.name;
                            return (
                              <div
                                key={skill.name}
                                style={{
                                  transitionDelay: isActive ? `${skillIndex * 60}ms` : '0ms',
                                }}
                                onMouseEnter={() => setHoveredSkill(skill.name)}
                                onMouseLeave={() => setHoveredSkill(null)}
                              >
                                <div className={`relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${isSkillHovered ? 'bg-white/[0.04]' : ''
                                  }`}>
                                  <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isSkillHovered
                                      ? 'bg-white/[0.08] scale-110'
                                      : 'bg-white/[0.03]'
                                    }`}>
                                    <span style={{ color: isSkillHovered ? category.accentColor : 'rgba(255,255,255,0.4)' }} className="transition-colors duration-300">
                                      <skill.icon className="w-5 h-5" />
                                    </span>
                                    <ProgressRing
                                      progress={skill.level}
                                      isActive={isSkillHovered}
                                      color={category.accentColor}
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className={`text-sm font-medium transition-colors duration-300 ${isSkillHovered ? 'text-white' : 'text-gray-400'
                                        }`}>
                                        {skill.name}
                                      </span>
                                      <span
                                        className="text-xs font-mono transition-all duration-300"
                                        style={{
                                          color: isSkillHovered ? category.accentColor : 'transparent',
                                        }}
                                      >
                                        {skill.level}%
                                      </span>
                                    </div>

                                    <div className="h-[3px] w-full rounded-full bg-white/[0.04] overflow-hidden">
                                      <div
                                        className="h-full rounded-full transition-all duration-700 ease-out"
                                        style={{
                                          width: isSkillHovered || isActive ? `${skill.level}%` : '0%',
                                          background: `linear-gradient(90deg, ${category.accentColor}, ${category.accentColor}88)`,
                                          boxShadow: isSkillHovered ? `0 0 8px ${category.accentColor}44` : 'none',
                                          transitionDelay: isActive ? `${skillIndex * 80}ms` : '0ms',
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Category average */}
                        <div className={`mt-6 pt-5 border-t border-white/[0.04] flex items-center justify-between transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                          <span className="text-xs text-gray-600 uppercase tracking-wider">Average proficiency</span>
                          <span className="text-sm font-mono" style={{ color: category.accentColor }}>
                            {Math.round(category.skills.reduce((a, s) => a + s.level, 0) / category.skills.length)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Additional Skills ─────────────────────────────────────── */}
          <div
            ref={tagsRef}
            className={`mt-20 transition-all duration-1000 ${tagsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="text-center mb-8">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-[0.15em]">
                Also in the toolkit
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {additionalSkills.map((tag, index) => (
                <span
                  key={tag.name}
                  className={`group/tag inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-default transition-all duration-500 ${tagsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                    }`}
                  style={{
                    transitionDelay: `${600 + index * 50}ms`,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(167, 139, 250, 0.08)';
                    el.style.borderColor = 'rgba(167, 139, 250, 0.2)';
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = '0 4px 20px rgba(167, 139, 250, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.02)';
                    el.style.borderColor = 'rgba(255,255,255,0.06)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <tag.icon className="w-3.5 h-3.5 text-gray-500 group-hover/tag:text-purple-400 transition-colors duration-300" />
                  <span className="text-gray-500 group-hover/tag:text-gray-300 transition-colors duration-300">{tag.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── Bottom accent line ────────────────────────────────────── */}
          <div className="mt-24 flex justify-center">
            <div
              className={`h-px w-32 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent transition-all duration-1000 delay-500 ${tagsVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
