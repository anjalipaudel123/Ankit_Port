import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Initialize scroll reveal animations with smooth professional timing
const initScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add smooth delay before activation
          setTimeout(() => {
            entry.target.classList.add('active');
          }, 50);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  // Observe all reveal elements
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-fade-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate'
  );
  revealElements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
};

// Smooth scroll enhancement
if (typeof window !== 'undefined') {
  // Enable smooth scrolling with momentum
  document.documentElement.style.scrollBehavior = 'smooth';

  // Add passive event listeners for better performance
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Trigger any scroll-based animations
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Run after DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScrollReveal, 100);
  });

  // Re-run on route changes
  const reinitOnUpdate = setInterval(() => {
    const elements = document.querySelectorAll('.reveal:not(.observed)');
    if (elements.length > 0) {
      elements.forEach(el => el.classList.add('observed'));
      initScrollReveal();
    }
  }, 500);

  setTimeout(() => clearInterval(reinitOnUpdate), 5000);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
