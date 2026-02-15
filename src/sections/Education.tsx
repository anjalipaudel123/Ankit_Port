import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

interface EducationItem {
  type: 'education' | 'certification';
  title: string;
  institution: string;
  location: string;
  period: string;
  status?: string;
  description?: string;
}

const Education = () => {
  const items: EducationItem[] = [
    {
      type: 'education',
      title: 'BSc Computer Science and Information Technology',
      institution: 'Samriddhi College',
      location: 'Kathmandu, Nepal',
      period: 'Expected 2026',
      status: 'In Progress',
      description: 'Pursuing a comprehensive degree covering software engineering, data structures, algorithms, database management, and artificial intelligence.',
    },
    {
      type: 'certification',
      title: 'Django Certification',
      institution: 'Sipalaya Infotech',
      location: 'Kathmandu, Nepal',
      period: '2024-2025',
      description: 'Professional certification in Django web framework covering MVT architecture, ORM, authentication, REST APIs, and deployment.',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#05050a]" />
      
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 70, 193, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 70, 193, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-purple-400 uppercase tracking-widest mb-4 reveal">
            Background
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white reveal stagger-1">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <div className="mt-4 h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent reveal stagger-2" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-violet-500 to-transparent hidden md:block transform -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={item.title}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div 
                    className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} reveal ${
                      isLeft ? 'reveal-left' : 'reveal-right'
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    <div className={`glass-card rounded-2xl p-6 border-l-4 ${
                      item.type === 'education' 
                        ? 'border-purple-500' 
                        : 'border-violet-500'
                    } hover:border-glow transition-all duration-300 group`}>
                      {/* Type Badge */}
                      <div className={`flex items-center gap-2 mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          item.type === 'education'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-violet-500/20 text-violet-300'
                        }`}>
                          {item.type === 'education' ? (
                            <GraduationCap className="w-3.5 h-3.5" />
                          ) : (
                            <Award className="w-3.5 h-3.5" />
                          )}
                          {item.type === 'education' ? 'Education' : 'Certification'}
                        </span>
                        {item.status && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                            {item.status}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                        {item.title}
                      </h3>

                      {/* Institution */}
                      <div className={`flex items-center gap-4 text-sm text-gray-400 mb-3 ${
                        isLeft ? 'md:justify-end' : ''
                      }`}>
                        <span className="font-medium text-purple-300">{item.institution}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>

                      {/* Period */}
                      <div className={`flex items-center gap-2 text-sm text-gray-500 mb-4 ${
                        isLeft ? 'md:justify-end' : ''
                      }`}>
                        <Calendar className="w-4 h-4" />
                        {item.period}
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className={`text-sm text-gray-400 leading-relaxed ${
                          isLeft ? 'md:text-right' : ''
                        }`}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative flex-shrink-0 hidden md:block">
                    <div className={`w-4 h-4 rounded-full ${
                      item.type === 'education' 
                        ? 'bg-purple-500' 
                        : 'bg-violet-500'
                    } animate-pulse-glow`} />
                    <div className={`absolute inset-0 w-4 h-4 rounded-full ${
                      item.type === 'education' 
                        ? 'bg-purple-500' 
                        : 'bg-violet-500'
                    } blur-md`} />
                  </div>

                  {/* Empty Space for Alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center reveal">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-400">
              Continuously learning and exploring new technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
