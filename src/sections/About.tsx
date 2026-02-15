import { MapPin, Mail, Download, Github, Linkedin, Award, BookOpen, Code2, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: expRef, isVisible: expVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: eduRef, isVisible: eduVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: testimonialRef, isVisible: testimonialVisible } = useScrollReveal<HTMLDivElement>();

  const experiences: Experience[] = [
    {
      company: 'Paramount Computer Systems',
      role: 'Identity and Access Management (IAM) Intern',
      period: 'Feb 2026 - Present',
      description: 'Supporting identity administration and access management operations in the Middle East\'s largest cybersecurity company. Working with Active Directory, Windows Server, user/computer account management, group-based access control, and security best practices.',
    },
    {
      company: 'Freelance',
      role: 'ML Engineer & Backend Developer',
      period: '2023 - Present',
      description: 'Building end-to-end ML pipelines and scalable backend systems for various clients and projects.',
    },
    {
      company: 'Academic Research',
      role: 'Deep Learning Researcher',
      period: '2022 - 2023',
      description: 'Implemented generative models from scratch including GANs, VAEs, and Flow-based models.',
    },
    {
      company: 'Self-Directed Learning',
      role: 'Backend Developer',
      period: '2021 - 2022',
      description: 'Mastered Django, DRF, and database design through hands-on projects and certifications.',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "Ankit has an exceptional ability to translate complex machine learning concepts into practical solutions. His work on our GAN project exceeded all expectations with clean, well-documented code.",
      author: "Project Collaborator",
      role: "Research Partner",
    },
    {
      quote: "Working with Ankit was a great experience. He brings both technical depth and creative problem-solving to every project. His Django backend work was clean, scalable, and production-ready.",
      author: "Team Member",
      role: "Software Developer",
    },
  ];

  const skills = [
    { name: 'PyTorch', level: 90, category: 'ML/DL' },
    { name: 'Django', level: 85, category: 'Backend' },
    { name: 'Python', level: 90, category: 'Language' },
    { name: 'SQL', level: 80, category: 'Database' },
    { name: 'GANs/VAEs', level: 85, category: 'ML/DL' },
    { name: 'Transformers', level: 80, category: 'ML/DL' },
    { name: 'REST APIs', level: 85, category: 'Backend' },
    { name: 'Git', level: 85, category: 'Tools' },
    { name: 'Active Directory', level: 75, category: 'IAM' },
    { name: 'Windows Server', level: 75, category: 'IAM' },
    { name: 'Access Control', level: 80, category: 'IAM' },
    { name: 'Kerberos/NTLM', level: 70, category: 'Security' },
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
                    <Code2 className="w-5 h-5 text-indigo-500" />
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
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {exp.company.charAt(0)}
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

      {/* Testimonials Section */}
      <section
        ref={testimonialRef}
        className="py-24 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${testimonialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest mb-2 block">
              Testimonials
            </span>
            <h2 className="text-4xl font-serif text-gray-900">
              What others say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`relative p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-700 ${testimonialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Quote mark */}
                <div className="absolute -top-4 -left-2 text-6xl text-indigo-200 font-serif leading-none">
                  "
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
