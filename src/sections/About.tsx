import { MapPin, Mail, Download, Github, Linkedin, Award, BookOpen, Sparkles, Shield, Server, Briefcase, GraduationCap, Database, GitBranch, Key, Lock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Inline SVG skill icons
const PyTorchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 13.94 9.866 9.866 0 0013.94 0 9.866 9.866 0 000-13.94l-3.486 3.486a4.932 4.932 0 010 6.97 4.932 4.932 0 01-6.97 0 4.932 4.932 0 010-6.97l5.121-5.121L12.005 0zm5.453 3.467a1.233 1.233 0 100 2.466 1.233 1.233 0 000-2.466z" /></svg>
);
const DjangoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.108.535-4.805 0-7.3-2.17-7.3-6.339 0-3.994 2.648-6.57 6.753-6.57.882 0 1.55.076 1.731.153V0zm0 9.143c-.459-.153-.842-.229-1.32-.229-1.99 0-3.14 1.222-3.14 3.338 0 2.055 1.089 3.186 3.078 3.186.459 0 .841-.038 1.382-.115V9.143zM21.338 6.11v9.597c0 3.338-.25 4.94-1.003 6.32-.688 1.32-1.59 2.15-3.454 3.073l-3.643-1.73c1.864-.842 2.767-1.62 3.376-2.82.634-1.222.852-2.648.852-6.188V6.11h3.872zM17.695 0h3.924v3.924h-3.924V0z" /></svg>
);
const PythonIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.35.12-.33.18-.3.24-.28.3-.25.35-.22.38-.19.4-.16.43-.13.44-.1.43-.07.42-.05.4-.02.35-.01h.28l.35.04zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.89.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-.16l-.06-.01h-8.16v.83h5.18l.01 2.76.02.36-.05.34-.12.33-.18.3-.24.28-.3.25-.35.22-.38.2-.4.16-.43.13-.44.1-.43.07-.42.04-.4.02-.35.01h-.28l-.35-.04-.34-.07-.33-.1-.3-.13-.27-.17-.24-.2-.2-.24-.17-.27-.13-.3-.1-.32-.08-.34-.05-.34-.03-.34V10.67l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z" /></svg>
);
const NeuralNetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><circle cx="12" cy="12" r="2.5" /><line x1="7.8" y1="7.2" x2="10.2" y2="10.2" /><line x1="16.2" y1="7.2" x2="13.8" y2="10.2" /><line x1="7.8" y1="16.8" x2="10.2" y2="13.8" /><line x1="16.2" y1="16.8" x2="13.8" y2="13.8" /></svg>
);
const TransformerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="8" y="14" width="8" height="7" rx="1" /><line x1="6.5" y1="10" x2="10" y2="14" /><line x1="17.5" y1="10" x2="14" y2="14" /></svg>
);
const RestApiIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="8" cy="6" r="1.5" fill="currentColor" /><circle cx="16" cy="12" r="1.5" fill="currentColor" /><circle cx="10" cy="18" r="1.5" fill="currentColor" /></svg>
);
const ActiveDirectoryIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="12" cy="9" r="3" /><path d="M7 19v-1a5 5 0 0110 0v1" /></svg>
);
const WindowsServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="12" y1="3" x2="12" y2="17" /><line x1="8" y1="20" x2="16" y2="20" /><line x1="12" y1="17" x2="12" y2="20" /></svg>
);

interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
  icon: React.ElementType;
}

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: expRef, isVisible: expVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: eduRef, isVisible: eduVisible } = useScrollReveal<HTMLDivElement>();

  const experiences: Experience[] = [
    {
      company: 'Paramount Computer Systems',
      role: 'Identity and Access Management (IAM) Intern',
      period: 'Feb 2026 - Present',
      description: 'Supporting identity administration and access management operations in the Middle East\'s largest cybersecurity company. Working with Active Directory, Windows Server, user/computer account management, group-based access control, and security best practices.',
      icon: Shield,
    },
    {
      company: 'Freelance',
      role: 'ML Engineer & Backend Developer',
      period: '2023 - Present',
      description: 'Building end-to-end ML pipelines and scalable backend systems for various clients and projects.',
      icon: Briefcase,
    },
    {
      company: 'Academic Research',
      role: 'Deep Learning Researcher',
      period: '2022 - 2023',
      description: 'Implemented generative models from scratch including GANs, VAEs, and Flow-based models.',
      icon: GraduationCap,
    },
    {
      company: 'Self-Directed Learning',
      role: 'Backend Developer',
      period: '2021 - 2022',
      description: 'Mastered Django, DRF, and database design through hands-on projects and certifications.',
      icon: Server,
    },
  ];

  const skills = [
    { name: 'PyTorch', level: 90, category: 'ML/DL', icon: PyTorchIcon },
    { name: 'Django', level: 85, category: 'Backend', icon: DjangoIcon },
    { name: 'Python', level: 90, category: 'Language', icon: PythonIcon },
    { name: 'SQL', level: 80, category: 'Database', icon: Database },
    { name: 'GANs/VAEs', level: 85, category: 'ML/DL', icon: NeuralNetIcon },
    { name: 'Transformers', level: 80, category: 'ML/DL', icon: TransformerIcon },
    { name: 'REST APIs', level: 85, category: 'Backend', icon: RestApiIcon },
    { name: 'Git', level: 85, category: 'Tools', icon: GitBranch },
    { name: 'Active Directory', level: 75, category: 'IAM', icon: ActiveDirectoryIcon },
    { name: 'Windows Server', level: 75, category: 'IAM', icon: WindowsServerIcon },
    { name: 'Access Control', level: 80, category: 'IAM', icon: Lock },
    { name: 'Kerberos/NTLM', level: 70, category: 'Security', icon: Key },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Profile Image */}
            <div className={`relative transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-indigo-200 rounded-2xl -z-10" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl -z-10" />

                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/ankit.jpeg"
                    alt="Ankit Paudel"
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`lg:pt-8 transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-500 uppercase tracking-wider">About me</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
                Ankit Paudel
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                <span className="font-semibold text-gray-900">IAM Intern at Paramount Computer Systems</span> and <span className="font-semibold text-gray-900">ML Engineer & Backend Developer</span> with 3+ years of experience in cybersecurity, intelligent systems, and scalable backend solutions.
              </p>

              <p className="text-gray-600 leading-relaxed mb-4">
                Currently working remotely as an Identity and Access Management intern at the Middle East's largest cybersecurity company, managing Active Directory, Windows Server, and access control operations.
              </p>

              <p className="text-gray-600 leading-relaxed mb-8">
                I'm a Computer Science student passionate about cybersecurity and building intelligent systems. Over the past 3 years, I've worked in ML, backend development, and now IAM security, implementing deep learning models from scratch, building scalable backend systems, and securing enterprise infrastructure through proper access management.
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Kathmandu, Nepal</span>
                </div>
                <a
                  href="mailto:ankit.p@paramountassure.com"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">ankit.p@paramountassure.com</span>
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/ankitt_resume.pdf"
                  download="Ankit_Paudel_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={skillsRef}
        className="py-24 px-6 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest mb-2 block">
              Expertise
            </span>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Technical Skills
            </h2>
            <p className="text-gray-600">
              Technologies and tools I work with on a daily basis
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <skill.icon className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{skill.category}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{
                      width: skillsVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${300 + index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={expRef}
        className="py-24 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`mb-12 transition-all duration-700 ${expVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest mb-2 block">
              Journey
            </span>
            <h2 className="text-4xl font-serif text-gray-900">
              Experience
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 ${expVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                        <exp.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{exp.company}</p>
                        <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 mt-3 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-500">
                    <Award className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        ref={eduRef}
        className="py-24 px-6 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`mb-12 transition-all duration-700 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest mb-2 block">
              Learning
            </span>
            <h2 className="text-4xl font-serif text-gray-900">
              Education
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`group p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  In Progress
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">Samriddhi College, Kathmandu</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                BSc Computer Science and Information Technology
              </h3>
              <p className="text-gray-600">Expected 2026</p>
            </div>

            <div className={`group p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Completed
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">Sipalaya Infotech</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Django Certification
              </h3>
              <p className="text-gray-600">2024-2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Let's work together
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Have a project in mind? I'd love to hear about it.
          </p>
          <a
            href="mailto:ankit.p@paramountassure.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Get in touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Designed & built by</p>
              <p className="text-white font-medium">Ankit Paudel</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/ankitpaudel07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-paudel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              © 2026 Ankit Paudel. Crafted with passion in Kathmandu, Nepal.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
