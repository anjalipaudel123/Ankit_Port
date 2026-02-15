import { Mail, User, Briefcase, MapPin, Linkedin, Github } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] lg:w-[320px] bg-white border-r border-gray-200 z-50 overflow-y-auto">
      <div className="p-6">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src="/avatar-3d.png"
                alt="Ankit Paudel"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Open to Work
            </div>
          </div>
        </div>

        {/* Name & Info */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Ankit Paudel</h2>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
            <span>@ankitpaudel</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Nepal
            </span>
          </p>
          <p className="text-sm font-medium text-gray-700 mt-2">
            ML Engineer & Backend Developer
          </p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 text-center mb-3">3+ Years Experience</p>
          <div className="flex justify-center gap-3">
            {/* Company Logos */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold">
              ML
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-xs font-bold">
              DJ
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold">
              PT
            </div>
          </div>
        </div>

        {/* Message Button */}
        <button
          onClick={() => setActiveSection('contact')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors mb-4"
        >
          <Mail className="w-4 h-4" />
          <span className="font-medium">Message</span>
        </button>

        {/* Bookmark Button */}
        <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200 pt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id === 'profile' ? 'about' : 'portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${(item.id === 'portfolio' && activeSection === 'portfolio') ||
                  (item.id === 'profile' && activeSection === 'about')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs text-gray-500 mb-3">Connect with me</p>
          <div className="flex gap-3">
            <a
              href="https://github.com/ankitpaudel07"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ankit-paudel/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs text-gray-500 mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {['PyTorch', 'Django', 'Python', 'SQL', 'GANs', 'VAEs'].map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
