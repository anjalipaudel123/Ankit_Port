import { useState } from 'react';
import { ExternalLink, Github, FileText, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  tech: string[];
  description: string;
  image: string;
  links: { label: string; url: string; icon: React.ElementType }[];
  year: string;
}

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Complete E-learning Platform',
      tech: ['Django', 'DRF', 'PyTorch'],
      description: 'Implemented backend with user authentication, course management, and enrollment workflows using Django MVT. Integrated ML-based recommendation features for personalized course suggestions.',
      image: '/project-elearning.jpg',
      links: [
        { label: 'Live Demo', url: '#', icon: ExternalLink },
        { label: 'GitHub', url: '#', icon: Github },
      ],
      year: '2025',
    },
    {
      id: 2,
      title: 'Sketch-to-Image GAN',
      tech: ['PyTorch', 'GANs', 'Computer Vision'],
      description: 'Built sketch-to-image generation pipeline from scratch using Sketchy Database with custom generator and discriminator. Designed training and evaluation loops to optimize image quality.',
      image: '/project-gan.jpg',
      links: [
        { label: 'GitHub', url: '#', icon: Github },
        { label: 'Research', url: '#', icon: FileText },
      ],
      year: '2025',
    },
    {
      id: 3,
      title: 'GradCAM vs GradCAM++ Analysis',
      tech: ['PyTorch', 'CNNs', 'Explainability'],
      description: 'Performed research comparing GradCAM and GradCAM++ for CNN interpretability. Visualized activation maps and summarized insights for model explainability.',
      image: '/project-gradcam.jpg',
      links: [
        { label: 'GitHub', url: '#', icon: Github },
        { label: 'Report', url: '#', icon: FileText },
      ],
      year: '2025',
    },
    {
      id: 4,
      title: 'E-commerce with Payment Integration',
      tech: ['Django', 'REST APIs', 'SQL'],
      description: 'Implemented backend workflows for product management, inventory, and orders. Added payment integration and authentication for secure transactions.',
      image: '/project-ecommerce.jpg',
      links: [
        { label: 'Live Demo', url: '#', icon: ExternalLink },
        { label: 'GitHub', url: '#', icon: Github },
      ],
      year: '2024',
    },
    {
      id: 5,
      title: 'NID Verification Portal',
      tech: ['Django', 'Backend', 'Security'],
      description: 'Developed portal for national ID verification with backend validation logic and data retrieval workflows. Implemented authentication and authorization for sensitive data handling.',
      image: '/project-nid.jpg',
      links: [
        { label: 'Case Study', url: '#', icon: FileText },
      ],
      year: '2024',
    },
    {
      id: 6,
      title: 'Essay Evaluation Model (DeBERT v3)',
      tech: ['PyTorch', 'Transformers', 'NLP'],
      description: 'Fine-tuned DeBERT v3 Large for automated essay scoring on custom datasets. Achieved high accuracy in evaluating essay quality and providing feedback.',
      image: '/project-debert.jpg',
      links: [
        { label: 'GitHub', url: '#', icon: Github },
        { label: 'Demo', url: '#', icon: ExternalLink },
      ],
      year: '2025',
    },
  ];

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f0f1a]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-purple-400 uppercase tracking-widest mb-4 reveal">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white reveal stagger-1">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto reveal stagger-2">
            A collection of my work in machine learning, deep learning, and backend development.
            Each project represents a unique challenge and solution.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative reveal-scale`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-full rounded-2xl overflow-hidden glass-card border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:shadow-glow">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/50 to-transparent" />

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-purple-300">
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-8">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-md border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors group/link"
                      >
                        <link.icon className="w-4 h-4" />
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: hoveredProject === project.id
                      ? 'radial-gradient(circle at 50% 0%, rgba(107, 70, 193, 0.15) 0%, transparent 60%)'
                      : 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 reveal">
          <a
            href="https://github.com/ankitpaudel07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-xl hover:shadow-glow transition-all duration-300 group"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
