import { useState } from 'react';
import {
  Brain,
  Layers,
  Server,
  GitBranch,
  Database,
  Code,
  Cpu,
  Network,
  Sparkles,
  FileText,
  Image,
  Lock,
  Shield,
  Sliders,
  CreditCard
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  level?: number;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
  color: string;
}

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      color: 'from-purple-600 to-violet-600',
      skills: [
        { name: 'PyTorch', icon: Cpu, level: 90 },
        { name: 'Model Training', icon: Layers, level: 85 },
        { name: 'Loss Functions', icon: Code, level: 80 },
        { name: 'Overfitting Prevention', icon: Shield, level: 85 },
        { name: 'Hyperparameter Tuning', icon: Sliders, level: 80 },
        { name: 'CNNs & Backpropagation', icon: Network, level: 85 },
      ],
    },
    {
      title: 'Deep Learning & Generative Models',
      icon: Sparkles,
      color: 'from-violet-600 to-fuchsia-600',
      skills: [
        { name: 'GANs', icon: Image, level: 90 },
        { name: 'VAEs', icon: Layers, level: 85 },
        { name: 'Autoregressive Models', icon: Code, level: 80 },
        { name: 'Flow-based Models', icon: GitBranch, level: 75 },
        { name: 'BERT Fine-tuning', icon: FileText, level: 85 },
        { name: 'DeBERT & Phi-2', icon: Brain, level: 80 },
      ],
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'from-fuchsia-600 to-pink-600',
      skills: [
        { name: 'Django (MVT)', icon: Server, level: 90 },
        { name: 'Django REST Framework', icon: Network, level: 85 },
        { name: 'SQL', icon: Database, level: 80 },
        { name: 'Git', icon: GitBranch, level: 85 },
        { name: 'Authentication', icon: Lock, level: 80 },
        { name: 'Payment Integration', icon: CreditCard, level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#05050a]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(107, 70, 193, 0.2) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-purple-400 uppercase tracking-widest mb-4 reveal">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white reveal stagger-1">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <div className="mt-4 h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent reveal stagger-2" />
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`reveal ${catIndex === 0 ? 'reveal-left' : catIndex === 2 ? 'reveal-right' : 'reveal-scale'}`}
              style={{ transitionDelay: `${200 + catIndex * 150}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-white">
                    {category.title}
                  </h3>
                  <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 to-transparent mt-1 animate-shimmer" />
                </div>
              </div>

              {/* Skills Cards */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      animationDelay: `${skillIndex * 50}ms`,
                    }}
                  >
                    <div className="relative p-4 rounded-xl glass-card border border-purple-500/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-glow-sm cursor-default overflow-hidden">
                      {/* Background Progress */}
                      {skill.level && (
                        <div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
                          style={{
                            width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                          }}
                        />
                      )}

                      {/* Content */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <skill.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16 reveal">
          <h3 className="text-center text-lg font-medium text-gray-400 mb-6">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Computer Vision',
              'NLP',
              'Transformers',
              'GradCAM',
              'Explainable AI',
              'REST APIs',
              'PostgreSQL',
              'Docker',
              'Linux',
              'Jupyter',
              'NumPy',
              'Pandas',
              'Matplotlib',
              'Seaborn',
            ].map((tag, index) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-sm text-gray-400 bg-white/5 border border-white/10 hover:border-purple-500/30 hover:text-purple-300 transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
