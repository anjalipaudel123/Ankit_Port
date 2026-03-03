import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, X, CheckCircle2, Lightbulb, Target, Camera, Film } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Inline SVG tech logos for marquee
const PythonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 255" className={className}><defs><linearGradient id="pyA" x1="12.96%" y1="12.07%" x2="79.64%" y2="87.58%"><stop offset="0%" stopColor="#387EB8" /><stop offset="100%" stopColor="#366994" /></linearGradient><linearGradient id="pyB" x1="19.13%" y1="20.58%" x2="90.43%" y2="88.01%"><stop offset="0%" stopColor="#FFE052" /><stop offset="100%" stopColor="#FFC331" /></linearGradient></defs><path fill="url(#pyA)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 110 22.24 11.12 11.12 0 010-22.24z" /><path fill="url(#pyB)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.519 33.897zm34.114-19.586a11.12 11.12 0 110-22.24 11.12 11.12 0 010 22.24z" /></svg>
);
const PyTorchLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#EE4C2C"><path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.867-3.867 3.867-10.155 0-14.022l-2.343 2.343a6.528 6.528 0 010 9.336 6.528 6.528 0 01-9.336 0 6.528 6.528 0 010-9.336l4.366-4.366 2.344-2.343V0zm4.695 4.685a1.173 1.173 0 100 2.345 1.173 1.173 0 000-2.345z" /></svg>
);
const DjangoLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#092E20"><path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.56-1.121.764-2.42.764-5.937V6.059h3.899zM17.39.021h3.924v4.026H17.39z" /></svg>
);
const PostgreSQLLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#336791"><path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.403.524 9.594 1.01 8.97.766 7.786.396 6.508.4 5.156.405 3.921.862 3.088 1.903 2.26 2.937 1.879 4.436 2.107 6.357c.063.529.176 1.088.34 1.673a29.362 29.362 0 00.733 2.252l.001.002c.296.838.694 1.742 1.234 2.535.553.812 1.253 1.548 2.187 1.9.476.18.99.201 1.491.09.206-.046.401-.123.576-.228.017.226.043.46.083.706.136.842.417 1.672.764 2.137.174.234.398.441.692.489a.986.986 0 00.725-.159c.458-.31.67-.84.856-1.337l.005-.015c.041-.11.074-.182.11-.265-.015 1.003-.022 2.008.037 2.741.034.41.092.78.216 1.087.062.153.15.303.29.416a.764.764 0 00.546.17c.443-.017.777-.242 1.064-.558.29-.318.52-.725.72-1.206.199-.478.357-1.003.48-1.517.063-.261.109-.49.15-.719l.003-.016c.083-.389.134-.611.177-.731.027-.073.032-.066.047-.06l.002.001c.17.101.347.153.54.152.436-.002.743-.27 1.007-.575.26-.298.477-.658.673-1.043.253-.496.444-1.004.574-1.395.018-.053.035-.103.05-.15.028.254.06.51.098.77.065.45.155.932.309 1.308.148.361.38.712.782.834.199.06.411.048.604-.005a1.6 1.6 0 00.525-.258c.478-.345.834-.903 1.126-1.607.578-1.393.968-3.29 1.09-5.418a8.21 8.21 0 001.167-1.406c.452-.664.751-1.284.953-1.834.406-1.105.499-1.985.465-2.658-.035-.673-.217-1.066-.418-1.26-.132-.128-.267-.177-.387-.195a.874.874 0 00-.186-.007z" /></svg>
);
const DockerLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.576a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.886c0 .102.082.186.185.186zm0 2.716h2.118a.186.186 0 00.186-.186V6.292a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.886c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.292a.186.186 0 00-.185-.186H8.1a.186.186 0 00-.185.186v1.886c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.292a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.886c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186H8.1a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186H2.216a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM23.078 13.347c-.473-.35-1.561-.462-2.399-.31-.108-.753-.57-1.408-1.116-1.878l-.374-.312-.327.36c-.393.436-.606 1.04-.557 1.623.024.263.104.52.237.746a3.066 3.066 0 01-1.282.312H.782a.786.786 0 00-.78.792c-.025 1.455.235 2.91.782 4.26.663 1.583 1.652 2.753 2.94 3.478C5.268 23.36 7.236 24 9.535 24c5.21 0 9.186-2.418 11.307-6.83.93.018 2.926.009 3.95-1.965l.055-.102-.37-.245-.4-.51z" /></svg>
);
const LinuxLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#FCC624"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.585.047 1.042-.245 1.15-.688.054-.235-.015-.468-.064-.643.067-.249.193-.43.324-.716.2-.43.22-.596.366-.94.082-.197.18-.466.2-.745.026-.356-.04-.71-.154-.957a1.415 1.415 0 00-.397-.541c-.264-.194-.501-.396-.757-.529-.508-.285-.963-.695-1.378-1.25-.39-.519-.644-1.135-.87-1.635a5.89 5.89 0 01-.242-.577c-.161-.445-.384-.88-.474-1.207-.071-.34-.106-.776.107-1.24.155-.338.342-.556.494-.699.35-.326.573-.732.573-1.288 0-1.197-1.478-5.165-2.254-6.263C14.37.658 13.416 0 12.504 0z" /></svg>
);
const GitLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#F05032"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 11-1.512-.065V8.78a1.838 1.838 0 01-.998-2.41L7.629 3.64.452 10.818a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.428-10.43a1.55 1.55 0 000-2.187" /></svg>
);
const ActiveDirectoryLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#0078D4"><path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z" /></svg>
);
const WindowsServerLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#00ADEF"><rect x="1" y="1" width="10" height="10" rx="1" /><rect x="13" y="1" width="10" height="10" rx="1" /><rect x="1" y="13" width="10" height="10" rx="1" /><rect x="13" y="13" width="10" height="10" rx="1" /></svg>
);
const RestApiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#6366F1"><path d="M7 7H5v2h2V7zm0 4H5v2h2v-2zm0 4H5v2h2v-2zm10-8h-6v2h6V7zm0 4h-6v2h6v-2zm0 4h-6v2h6v-2zm2-12H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h16v14z" /></svg>
);
const GANsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#A855F7"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
);
const TransformersLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#FF6F00"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="8" y="14" width="8" height="7" rx="1" /><line x1="6.5" y1="10" x2="10" y2="14" stroke="#FF6F00" strokeWidth="1.5" /><line x1="17.5" y1="10" x2="14" y2="14" stroke="#FF6F00" strokeWidth="1.5" /></svg>
);
const ComputerVisionLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#10B981"><circle cx="12" cy="12" r="3" /><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" fill="none" stroke="#10B981" strokeWidth="1.5" /><circle cx="12" cy="12" r="5.5" fill="none" stroke="#10B981" strokeWidth="1" /></svg>
);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  painPoints: string[];
  image: string;
  tags: string[];
  color: string;
  approach?: string[];
  results?: string[];
  keyFeatures?: string[];
}

const Home = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { ref: introRef, isVisible: introVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 50,
        y: (e.clientY - rect.top - rect.height / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Modal: Escape key + body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: 1,
      title: 'IELTS-Calibrated Essay Scoring',
      subtitle: 'Transformer-based automated essay grading',
      description: 'A solo research project building an automated essay scoring system using DeBERTa v3 Large, fine-tuned on the ASAP dataset with a custom calibration layer that maps predictions to 0–100 scores and IELTS Band 1–9.',
      painPoints: [
        'Manual essay scoring is slow, subjective, and inconsistent across evaluators',
        'Existing AES systems lack mapping to real-world scoring scales like IELTS',
        'Hard to trust model outputs without agreement-aware evaluation metrics',
      ],
      image: '/project-debert.jpg',
      tags: ['PyTorch', 'Transformers', 'DeBERTa v3', 'NLP'],
      color: 'from-cyan-500 to-blue-600',
      approach: [
        'Fine-tuned DeBERTa v3 Large on the ASAP essay scoring dataset',
        'Added a custom calibration layer to map raw predictions to 0–100 and IELTS Band 1–9',
        'Trained on Google Colab with A100 GPU for efficient large-model fine-tuning',
        'Evaluated using Quadratic Weighted Kappa (QWK) — an agreement-aware metric used in scoring research',
      ],
      results: [
        'Achieved QWK of 0.80+ on the evaluation set',
        'Scores map cleanly to interpretable IELTS-style bands',
        'Research-grade evaluation pipeline built from scratch',
      ],
      keyFeatures: [
        'DeBERTa v3 Large fine-tuning',
        'Custom IELTS band calibration layer',
        'QWK-based evaluation pipeline',
        'End-to-end training on Colab A100',
      ],
    },
    {
      id: 2,
      title: 'Grad-CAM Robustness Study',
      subtitle: 'Explainable AI under real-world perturbations',
      description: 'An explainability research project comparing Grad-CAM vs Grad-CAM++ on a ResNet50 melanoma classifier (ISIC dataset), testing how stable their explanations remain under lighting changes and gamma noise.',
      painPoints: [
        'Medical AI explanations must stay reliable even when image conditions vary slightly',
        'Most XAI studies assume clean inputs — real clinical images have noise and lighting inconsistency',
        'No clear comparison existed for Grad-CAM vs Grad-CAM++ robustness on dermatology images',
      ],
      image: '/project-gradcam.jpg',
      tags: ['PyTorch', 'ResNet50', 'XAI', 'ISIC Dataset'],
      color: 'from-blue-500 to-indigo-600',
      approach: [
        'Trained ResNet50 for binary classification: Melanoma vs Nevus (NV) on the ISIC dataset',
        'Implemented Grad-CAM and Grad-CAM++ explainability methods',
        'Applied slight lighting perturbations and 3 levels of gamma noise to test images',
        'Compared heatmap stability across both methods under each perturbation',
      ],
      results: [
        'Grad-CAM++ produced more stable explanations than Grad-CAM under perturbations',
        'Documented robustness differences across 3 gamma noise levels',
        'Built a reusable comparison pipeline for future XAI robustness studies',
      ],
      keyFeatures: [
        'Melanoma vs Nevus binary classifier',
        'Grad-CAM vs Grad-CAM++ comparison',
        'Perturbation robustness testing',
        'Medical imaging explainability',
      ],
    },
    {
      id: 3,
      title: 'Nepal AI Travel Recommender',
      subtitle: 'ML-driven travel assistant with Phi-2 chatbot',
      description: 'A solo project building an ML-powered travel recommendation system for Nepal that suggests destinations based on budget, season, and location, paired with a Phi-2 chatbot grounded on custom Nepal travel datasets.',
      painPoints: [
        'Travel planning in Nepal is messy — prices, seasonality, and location constraints all matter',
        'Generic travel sites lack local, data-driven recommendations for Nepal',
        'No conversational AI tool existed for Nepal-specific travel guidance',
      ],
      image: '/project-elearning.jpg',
      tags: ['Python', 'Django', 'Phi-2', 'ML Pipeline'],
      color: 'from-emerald-500 to-teal-600',
      approach: [
        'Built custom Nepal travel datasets covering budget ranges, seasons, and locations',
        'Designed ML recommendation pipeline that ranks destinations based on user inputs',
        'Integrated Phi-2 chatbot fine-tuned/grounded on the custom travel data',
        'Django backend serving recommendations and chatbot responses',
      ],
      results: [
        'Recommendations account for budget, season, and location simultaneously',
        'Phi-2 chatbot answers Nepal-specific travel questions grounded in real data',
        'End-to-end pipeline from user input to ranked destination list',
      ],
      keyFeatures: [
        'Budget + season + location filtering',
        'Custom Nepal travel datasets',
        'Phi-2 chatbot integration',
        'Django backend API',
      ],
    },
    {
      id: 4,
      title: 'Secure RBAC System',
      subtitle: 'JWT auth, role-based access, and audit logging',
      description: 'A solo IAM-focused Django project implementing secure JWT authentication, a role-based access control system with a permission matrix (Admin/Manager/User), and comprehensive audit logging for security traceability.',
      painPoints: [
        'Most beginner projects skip access control entirely — no auth beyond login',
        'No clear separation between authentication (who you are) and authorization (what you can do)',
        'Security-relevant actions go untracked with no audit trail for review',
      ],
      image: '/project-ecommerce.jpg',
      tags: ['Django', 'DRF', 'JWT', 'IAM'],
      color: 'from-amber-500 to-orange-600',
      approach: [
        'Implemented JWT-based authentication with Django REST Framework',
        'Designed role hierarchy: Admin → Manager → User with a central permission matrix',
        'Built middleware-based permission enforcement on all protected endpoints',
        'Added database audit logging for login events, access attempts, and role changes',
      ],
      results: [
        'Clean separation of authentication vs authorization layers',
        'Central permission matrix makes role management maintainable',
        'Full audit trail for security review and traceability',
      ],
      keyFeatures: [
        'JWT authentication flow',
        'Role-based permission matrix',
        'Middleware permission enforcement',
        'Audit logging for security events',
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl"
            style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-pink-200/20 to-rose-200/20 blur-3xl"
            style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Tagline with character animation */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.2] tracking-tight">
            <span className="block mb-2">
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Securing infrastructure,
              </span>
            </span>
            <span className="block mb-2">
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.2s' }}>
                building{' '}
                <span className="text-gradient font-semibold">intelligent systems</span>,
              </span>
            </span>
            <span className="block">
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.3s' }}>
                crafting{' '}
                <span className="text-gradient font-semibold">scalable solutions</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Hero Image with parallax */}
        <div
          className="relative z-10 w-full max-w-3xl mx-auto mt-8"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <div className="relative">
            <img
              src="/hero-jump.png"
              alt="Jumping across gap"
              className="w-full h-auto drop-shadow-2xl"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent rounded-3xl blur-2xl -z-10" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section
        ref={introRef}
        className={`py-24 px-6 transition-all duration-1000 ${introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">About my work</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
            Currently working as an <span className="font-semibold text-gray-900">IAM Intern at Paramount Computer Systems</span>, a regional cybersecurity leader in the Middle East. I also build intelligent systems as a <span className="font-semibold text-gray-900">Machine Learning Engineer</span> and <span className="font-semibold text-gray-900">Backend Developer</span>. Off-screen, I'm behind a camera or color grading in <span className="font-semibold text-gray-900">DaVinci Resolve</span>.
          </p>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 overflow-hidden border-y border-gray-100 bg-gray-50/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-12 px-6 shrink-0">
              {[
                { name: 'Python', icon: PythonLogo },
                { name: 'PyTorch', icon: PyTorchLogo },
                { name: 'Django', icon: DjangoLogo },
                { name: 'PostgreSQL', icon: PostgreSQLLogo },
                { name: 'Active Directory', icon: ActiveDirectoryLogo },
                { name: 'Windows Server', icon: WindowsServerLogo },
                { name: 'Docker', icon: DockerLogo },
                { name: 'Linux', icon: LinuxLogo },
                { name: 'Git', icon: GitLogo },
                { name: 'REST APIs', icon: RestApiLogo },
                { name: 'GANs', icon: GANsLogo },
                { name: 'Transformers', icon: TransformersLogo },
                { name: 'Computer Vision', icon: ComputerVisionLogo },
                { name: 'DaVinci Resolve', icon: Film },
                { name: 'Photography', icon: Camera },
              ].map((tech) => (
                <div key={`${setIndex}-${tech.name}`} className="flex items-center gap-3 group cursor-default">
                  <tech.icon className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-lg font-medium text-gray-400 group-hover:text-gray-900 transition-colors duration-300 tracking-wide">
                    {tech.name}
                  </span>
                  <span className="text-gray-200 text-2xl font-thin ml-6">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        className="py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`flex items-end justify-between mb-16 transition-all duration-700 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest mb-2 block">
                Selected Works
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
                Case Studies
              </h2>
            </div>
            <p className="hidden md:block text-gray-500 max-w-md text-right">
              Each project represents a unique challenge and the solution that strengthened the product.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${hoveredProject === project.id ? 'scale-110' : 'scale-100'
                          }`}
                      />
                    </div>
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>

                  {/* Floating tag */}
                  <div className="absolute -bottom-4 -right-4 bg-white shadow-lg rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                      <span className="text-sm font-medium text-gray-700">{project.tags[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl font-serif text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-lg text-gray-500 mb-4">{project.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                  {/* Pain Points */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      Problem Pain Points
                    </h4>
                    <ul className="space-y-2">
                      {project.painPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group/btn inline-flex items-center gap-2 text-gray-900 font-medium hover:text-indigo-600 transition-colors"
                  >
                    <span className="relative">
                      Read case study
                      <span className="absolute bottom-0 left-0 w-full h-px bg-current transform origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className={`py-32 px-6 transition-all duration-1000 ${ctaVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              Open to opportunities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
              Let's build something
              <br />
              <span className="text-gradient">extraordinary</span> together
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              I'm currently seeking a team that values innovative solutions, clean code,
              and meaningful impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/ankitt_resume.pdf"
                download="Ankit_Paudel_Resume.pdf"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
              <a
                href="mailto:ankit.p@paramountassure.com"
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-900 rounded-full font-medium hover:border-gray-900 transition-colors"
              >
                Get in touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-sm text-gray-400 mb-1">Want to collaborate?</p>
              <a
                href="mailto:ankit.p@paramountassure.com"
                className="text-2xl font-serif text-gray-900 hover:text-indigo-600 transition-colors"
              >
                ankit.p@paramountassure.com
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/ankitpaudel07"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-paudel/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2026 Ankit Paudel.
            </p>
            <p className="text-sm text-gray-400">
              Kathmandu, Nepal
            </p>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modal-backdrop" />

          {/* Modal */}
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl animate-modal-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
              {/* Hero image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-white font-bold">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.subtitle && (
                    <p className="text-white/80 mt-1 text-lg">{selectedProject.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 space-y-8">
                {/* Overview */}
                <div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Pain Points */}
                {selectedProject.painPoints && selectedProject.painPoints.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-red-500" />
                      <h3 className="text-lg font-semibold text-gray-900">The Challenge</h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedProject.painPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Approach */}
                {selectedProject.approach && selectedProject.approach.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-semibold text-gray-900">Approach</h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedProject.approach.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Features */}
                {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.keyFeatures.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {selectedProject.results && selectedProject.results.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Results & Impact</h3>
                    <div className="space-y-3">
                      {selectedProject.results.map((result, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-indigo-500 mt-0.5">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Close CTA */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg"
                  >
                    Close
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        @keyframes modal-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-modal-backdrop {
          animation: modal-backdrop 0.3s ease-out forwards;
        }

        .animate-modal-enter {
          animation: modal-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
