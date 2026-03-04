import type { FilterBarProps } from './types';

export function FilterBar({ categories, activeCategory, onSelect, photoCount }: FilterBarProps) {
    return (
        <div className="flex flex-col items-center gap-6 gallery-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => onSelect(cat.value)}
                        className={`gallery-filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <p className="text-gray-500 dark:text-white/50 text-sm font-light tracking-wide transition-all duration-300">
                <span className="text-gray-900 dark:text-white font-medium">{photoCount}</span>
                {' '}photo{photoCount !== 1 ? 's' : ''}
            </p>
        </div>
    );
}
