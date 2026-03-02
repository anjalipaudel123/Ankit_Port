import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, X, CheckCircle2, Lightbulb, Target } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

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
  const { ref: passionRef, isVisible: passionVisible } = useScrollReveal<HTMLDivElement>();
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
      title: 'E-Learning Platform',
      subtitle: 'AI-powered personalized learning',
      description: 'A full-stack learning management system with intelligent course recommendations, progress tracking, and seamless user experience.',
      painPoints: [
        'Students overwhelmed by course catalogs with no personalization',
        'Low engagement due to irrelevant content suggestions',
        'Instructors lacked data on student learning patterns',
      ],
      image: '/project-elearning.jpg',
      tags: ['Django', 'DRF', 'PyTorch', 'PostgreSQL'],
      color: 'from-violet-500 to-purple-600',
      approach: [
        'Built collaborative filtering + content-based hybrid recommendation engine in PyTorch',
        'Designed RESTful API with Django REST Framework for seamless frontend integration',
        'Implemented real-time progress tracking with WebSocket connections',
        'PostgreSQL with optimized queries for handling 10k+ course catalog',
      ],
      results: [
        '40% improvement in course completion rates with personalized paths',
        'Sub-200ms API response times under concurrent load',
        'Recommendation accuracy of 82% measured by user engagement metrics',
      ],
      keyFeatures: [
        'AI-powered course recommendations',
        'Real-time progress dashboards',
        'Instructor analytics portal',
        'Adaptive learning paths',
      ],
    },
    {
      id: 2,
      title: 'Sketch-to-Image GAN',
      subtitle: 'Generative AI for artists',
      description: 'Custom GAN architecture that transforms rough sketches into photorealistic images, trained from scratch on diverse datasets.',
      painPoints: [
        'Hours spent on manual rendering of concept art',
        'No quick visualization before full production',
        'Commercial tools too expensive for indie creators',
      ],
      image: '/project-gan.jpg',
      tags: ['PyTorch', 'GANs', 'Computer Vision'],
      color: 'from-pink-500 to-rose-600',
      approach: [
        'Designed custom Pix2Pix-inspired generator with U-Net skip connections',
        'PatchGAN discriminator for local texture quality assessment',
        'Progressive training strategy: 64×64 → 128×128 → 256×256 resolution',
        'Augmentation pipeline with elastic deformations for sketch diversity',
      ],
      results: [
        'FID score of 34.7 on held-out test set (lower is better)',
        'Generates photorealistic 256×256 images from rough sketches in < 2s',
        'Trained on 15k sketch-photo pairs across multiple domains',
      ],
      keyFeatures: [
        'Sketch-to-photo translation',
        'Multi-domain support (faces, landscapes, objects)',
        'Progressive resolution training',
        'Real-time inference pipeline',
      ],
    },
    {
      id: 3,
      title: 'GradCAM Analysis',
      subtitle: 'Making AI explainable',
      description: 'Comparative research on CNN interpretability techniques, visualizing model attention to build trust in AI decisions.',
      painPoints: [
        'Deep learning as opaque black boxes',
        'Stakeholders hesitant to trust AI without explanations',
        'Regulatory requirements for model transparency',
      ],
      image: '/project-gradcam.jpg',
      tags: ['PyTorch', 'CNNs', 'XAI', 'Research'],
      color: 'from-blue-500 to-indigo-600',
      approach: [
        'Implemented GradCAM, GradCAM++, and ScoreCAM from scratch in PyTorch',
        'Comparative analysis across ResNet-50, VGG-16, and EfficientNet architectures',
        'Quantitative evaluation using insertion/deletion metrics',
        'Visualized attention maps across medical imaging and natural image datasets',
      ],
      results: [
        'Published comparative analysis of 3 XAI techniques across 3 architectures',
        'Identified GradCAM++ as most consistent for fine-grained localization',
        'Created reusable XAI toolkit for future research projects',
      ],
      keyFeatures: [
        'Multi-method comparison framework',
        'Architecture-agnostic implementation',
        'Quantitative + qualitative evaluation',
        'Medical imaging application',
      ],
    },
    {
      id: 4,
      title: 'E-Commerce Platform',
      subtitle: 'Scalable online marketplace',
      description: 'Complete e-commerce backend with real-time inventory, secure payments, and comprehensive order management.',
      painPoints: [
        'Manual order processing prone to errors',
        'Inventory sync issues causing overselling',
        'Complex payment integration challenges',
      ],
      image: '/project-ecommerce.jpg',
      tags: ['Django', 'REST APIs', 'Stripe', 'Redis'],
      color: 'from-emerald-500 to-teal-600',
      approach: [
        'Designed modular Django backend with clean service-layer architecture',
        'Stripe integration with webhook handling for payment lifecycle',
        'Redis-backed caching for product catalog and session management',
        'Celery task queue for async order processing and email notifications',
      ],
      results: [
        'Zero overselling incidents with atomic inventory transactions',
        'Payment processing success rate of 99.2%',
        '3x faster page loads with Redis caching layer',
      ],
      keyFeatures: [
        'Secure payment processing',
        'Real-time inventory management',
        'Order lifecycle automation',
        'Admin dashboard with analytics',
      ],
    },
  ];

  const passionProjects: Project[] = [
    {
      id: 5,
      title: 'NID Verification Portal',
      subtitle: 'Secure e-governance identity',
      description: 'Secure e-governance identity verification with multi-factor authentication and audit trails.',
      painPoints: [
        'Manual identity verification slow and error-prone',
        'No centralized audit trail for verification attempts',
        'Security vulnerabilities in existing paper-based systems',
      ],
      image: '/project-nid.jpg',
      tags: ['Django', 'Security', 'Government'],
      color: 'from-amber-500 to-orange-600',
      approach: [
        'Multi-factor authentication with document + biometric verification',
        'Django backend with role-based access control for government officials',
        'Comprehensive audit logging for every verification attempt',
        'Encrypted data storage compliant with data protection standards',
      ],
      results: [
        'Reduced verification time from 30 minutes to under 2 minutes',
        'Complete audit trail for regulatory compliance',
        '99.5% uptime with proper error handling and failover',
      ],
      keyFeatures: [
        'Multi-factor identity verification',
        'Role-based access control',
        'Complete audit logging',
        'Encrypted data at rest and in transit',
      ],
    },
    {
      id: 6,
      title: 'Essay Evaluation AI',
      subtitle: 'NLP-powered scoring',
      description: 'NLP-powered automated essay scoring using fine-tuned transformer models.',
      painPoints: [
        'Manual essay grading inconsistent across evaluators',
        'Weeks-long turnaround for large batches of essays',
        'Lack of detailed feedback for students',
      ],
      image: '/project-debert.jpg',
      tags: ['PyTorch', 'NLP', 'BERT'],
      color: 'from-cyan-500 to-blue-600',
      approach: [
        'Fine-tuned DeBERTa model on essay scoring datasets',
        'Multi-criteria scoring: coherence, grammar, argumentation, evidence',
        'Attention visualization to show which parts influenced the score',
        'RESTful API for integration with learning management systems',
      ],
      results: [
        '0.87 QWK score (Quadratic Weighted Kappa) on test set',
        'Scores align with human evaluators 91% of the time',
        'Processes 100 essays in under 60 seconds',
      ],
      keyFeatures: [
        'Multi-criteria automated scoring',
        'Attention-based explanations',
        'Batch processing capability',
        'LMS integration ready',
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
                { name: 'Python', emoji: '🐍' },
                { name: 'PyTorch', emoji: '🔥' },
                { name: 'Django', emoji: '🎸' },
                { name: 'PostgreSQL', emoji: '🐘' },
                { name: 'Active Directory', emoji: '🔐' },
                { name: 'Windows Server', emoji: '🖥️' },
                { name: 'Docker', emoji: '🐳' },
                { name: 'Linux', emoji: '🐧' },
                { name: 'Git', emoji: '📦' },
                { name: 'REST APIs', emoji: '🔗' },
                { name: 'GANs', emoji: '🎨' },
                { name: 'Transformers', emoji: '🤖' },
                { name: 'Computer Vision', emoji: '👁️' },
                { name: 'DaVinci Resolve', emoji: '🎬' },
                { name: 'Photography', emoji: '📷' },
              ].map((tech) => (
                <div key={`${setIndex}-${tech.name}`} className="flex items-center gap-3 group cursor-default">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{tech.emoji}</span>
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

      {/* Passion Projects */}
      <section
        ref={passionRef}
        className={`py-24 px-6 bg-gray-50 transition-all duration-1000 ${passionVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className={`mb-12 transition-all duration-700 ${passionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest mb-2 block">
              Side Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Passion Projects
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Outside my core work, I explore ideas that push me to learn new technologies,
              prototype faster, and build with more clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {passionProjects.map((project, index) => (
              <div
                key={project.title}
                className={`group cursor-pointer transition-all duration-700 ${passionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-500">{project.description}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
              © 2026 Ankit Paudel. Crafted with passion.
            </p>
            <p className="text-sm text-gray-400">
              Kathmandu, Nepal
            </p>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
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
        </div>
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
