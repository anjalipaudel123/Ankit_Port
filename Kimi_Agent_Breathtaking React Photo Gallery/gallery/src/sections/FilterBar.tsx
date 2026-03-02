import type { FilterBarProps } from '@/types/gallery';

export function FilterBar({ categories, activeCategory, onSelect, photoCount }: FilterBarProps) {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={`filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      <p className="text-white/50 text-sm font-light tracking-wide transition-all duration-300">
        <span className="text-white font-medium">{photoCount}</span>
        {' '}photo{photoCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
