import { Instagram, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Behance icon component since lucide doesn't have it
function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
    </svg>
  );
}

export function Footer() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: BehanceIcon, href: '#', label: 'Behance' },
  ];

  return (
    <footer 
      ref={ref}
      className="relative border-t border-white/10 bg-[#0a0a0a]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <h2 
              className="text-3xl font-bold text-white tracking-wider mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              LENS
            </h2>
          </div>

          {/* Tagline */}
          <p
            className={`text-white/50 text-sm font-light mb-8 transition-all duration-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '0.15s', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Capturing moments that last forever
          </p>

          {/* Social Links */}
          <div 
            className={`flex gap-4 mb-10 transition-opacity duration-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-90 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{ 
                  transitionDelay: `${0.4 + index * 0.08}s`,
                  transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            className={`h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8 transition-all duration-600 ${
              isVisible ? 'w-24' : 'w-0'
            }`}
            style={{ transitionDelay: '0.4s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />

          {/* Copyright */}
          <p
            className={`text-white/30 text-xs font-light transition-all duration-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.6s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            &copy; {new Date().getFullYear()} LENS Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
