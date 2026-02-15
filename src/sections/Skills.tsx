import { useState } from 'react';

// Inline SVG tech logo components
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

interface Skill {
  name: string;
  icon: React.FC<{ className?: string }>;
  level?: number;
}

interface SkillCategory {
  title: string;
  icon: React.FC<{ className?: string }>;
  skills: Skill[];
  color: string;
}

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      title: 'Machine Learning & AI',
      icon: BrainIcon,
      color: 'from-purple-600 to-violet-600',
      skills: [
        { name: 'PyTorch', icon: PyTorchIcon, level: 90 },
        { name: 'Python', icon: PythonIcon, level: 90 },
        { name: 'CNNs', icon: NeuralNetIcon, level: 85 },
        { name: 'Overfitting Prevention', icon: ShieldCheckIcon, level: 85 },
        { name: 'Hyperparameter Tuning', icon: SlidersIcon, level: 80 },
        { name: 'Backpropagation', icon: FlowIcon, level: 85 },
      ],
    },
    {
      title: 'Deep Learning & Generative AI',
      icon: GanIcon,
      color: 'from-violet-600 to-fuchsia-600',
      skills: [
        { name: 'GANs', icon: GanIcon, level: 90 },
        { name: 'VAEs', icon: BrainIcon, level: 85 },
        { name: 'NLP', icon: NlpIcon, level: 80 },
        { name: 'Flow Models', icon: FlowIcon, level: 75 },
        { name: 'BERT / DeBERT', icon: NlpIcon, level: 85 },
        { name: 'Phi-2', icon: BrainIcon, level: 80 },
      ],
    },
    {
      title: 'Backend & Cybersecurity',
      icon: DjangoIcon,
      color: 'from-fuchsia-600 to-pink-600',
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
            ].map((tag, index) => (
              <span
                key={tag.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-400 bg-white/5 border border-white/10 hover:border-purple-500/30 hover:text-purple-300 transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                <tag.icon className="w-4 h-4" />
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
