import { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  links: { type: string; url: string }[];
}

const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Learning Platform',
      category: 'Full Stack',
      description: 'Complete learning management system with ML-powered course recommendations',
      image: '/project-elearning.jpg',
      tech: ['Django', 'DRF', 'PyTorch'],
      links: [
        { type: 'demo', url: '#' },
        { type: 'github', url: '#' },
      ],
    },
    {
      id: 2,
      title: 'Sketch-to-Image GAN',
      category: 'Deep Learning',
      description: 'AI-powered sketch to realistic image generation using custom GAN architecture',
      image: '/project-gan.jpg',
      tech: ['PyTorch', 'GANs', 'CV'],
      links: [
        { type: 'github', url: '#' },
        { type: 'paper', url: '#' },
      ],
    },
    {
      id: 3,
      title: 'GradCAM Analysis',
      category: 'Research',
      description: 'Comparative analysis of GradCAM and GradCAM++ for CNN interpretability',
      image: '/project-gradcam.jpg',
      tech: ['PyTorch', 'CNNs', 'XAI'],
      links: [
        { type: 'github', url: '#' },
        { type: 'report', url: '#' },
      ],
    },
    {
      id: 4,
      title: 'E-Commerce Platform',
      category: 'Backend',
      description: 'Full-featured e-commerce with payment integration and inventory management',
      image: '/project-ecommerce.jpg',
      tech: ['Django', 'REST', 'SQL'],
      links: [
        { type: 'demo', url: '#' },
        { type: 'github', url: '#' },
      ],
    },
    {
      id: 5,
      title: 'NID Verification Portal',
      category: 'E-Governance',
      description: 'Secure national ID verification system with authentication workflows',
      image: '/project-nid.jpg',
      tech: ['Django', 'Security', 'APIs'],
      links: [
        { type: 'case', url: '#' },
      ],
    },
    {
      id: 6,
      title: 'Essay Evaluation AI',
      category: 'NLP',
      description: 'Automated essay scoring using fine-tuned DeBERT v3 Large model',
      image: '/project-debert.jpg',
      tech: ['PyTorch', 'NLP', 'BERT'],
      links: [
        { type: 'github', url: '#' },
        { type: 'demo', url: '#' },
      ],
    },
  ];

  return (
    <section id="portfolio-section" className="bg-black py-20 px-8">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          SELECTED WORKS
        </h2>
        <p className="text-gray-400 max-w-2xl">
          A collection of projects showcasing expertise in machine learning,
          deep learning, and backend development.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white">
                {project.category}
              </div>

              {/* Hover Links */}
              <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                {project.links.map((link) => (
                  <a
                    key={link.type}
                    href={link.url}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {link.type === 'github' ? (
                      <Github className="w-5 h-5" />
                    ) : link.type === 'demo' ? (
                      <ExternalLink className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-800 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="mt-12 text-center">
        <a
          href="https://github.com/ankitpaudel07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all"
        >
          <Github className="w-5 h-5" />
          View All on GitHub
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
